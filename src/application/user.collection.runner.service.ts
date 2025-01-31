import { Inject, Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { OperationRecordStatus } from '../domain/enum/operation-record.dto';
import { UserDto } from '../domain/user.dto';
import { FirebaseAdminRepository } from '../infrastructure/db/firebase/repository/firebase-admin';
import { UsersFirestoreRepository } from '../infrastructure/db/firebase/repository/user.firestore.repository';
import { OperationRecordService } from './operation.record.service';

@Injectable()
export class UserCollectionRunnerService {
    record = { lastKey: process.env.LAST_KEY || '', batchSize: 1000 };
    private collectionRef: firestore.CollectionReference;

    constructor(
        @Inject(FirebaseAdminRepository) private firebaseAdminRepository: FirebaseAdminRepository,
        private usersFirestoreRepository: UsersFirestoreRepository,
        @Inject(OperationRecordService) private operationRecordService: OperationRecordService,
    ) {}

    async updateUserCollection() {
        this.collectionRef = firestore().collection('users');
        await this.operationRecordService.updateOperationRecord({
            status: OperationRecordStatus.RUNNING,
        });

        try {
            await this.updateQueryBatch();
        } catch (error) {
            console.error('Error updating user collection', error);
            await this.operationRecordService.updateOperationRecord({
                status: OperationRecordStatus.ERROR,
                message: error['message'],
            });
        }
    }

    private async updateQueryBatch() {
        let query: firestore.Query;

        while (true) {
            if (this.record.lastKey) {
                query = this.collectionRef
                    .orderBy(firestore.FieldPath.documentId())
                    .startAfter(this.record.lastKey)
                    .limit(this.record.batchSize);
            } else {
                query = this.collectionRef
                    .orderBy(firestore.FieldPath.documentId())
                    .limit(this.record.batchSize);
            }

            const snapshot = await query.get();
            if (snapshot.empty) {
                await this.operationRecordService.updateOperationRecord({
                    status: OperationRecordStatus.DONE,
                });
                break;
            }

            const userEntities: UserDto[] = [];
            snapshot.forEach(doc => {
                const userData = doc.data() as UserDto;
                userData.id = doc.id;
                userEntities.push(userData);
            });

            const promiseArray: Array<Promise<unknown>> = [];

            userEntities.forEach(({ id, email }) => {
                if (email && this.isRegularEmail(email)) {
                    promiseArray.push(this.firebaseAdminRepository.updateUserEmail(id, email));
                }
            });

            const problematicRecords: Array<UserDto> = [];
            const allSettled = await Promise.allSettled(promiseArray);
            allSettled.forEach((v, i) => {
                if (v.status === 'rejected') {
                    problematicRecords.push(userEntities[i]);
                }
            });

            //sleep
            await new Promise(r => setTimeout(r, 1000));

            if (problematicRecords.length) {
                const dbBatch = firestore().batch();
                const col = firestore().collection('problematic-users');

                problematicRecords.forEach(record => {
                    const docRef = col.doc(record.id);
                    dbBatch.set(docRef, record);
                });
                // Commit the batch
                await dbBatch.commit();
            }

            this.record.lastKey = userEntities[userEntities.length - 1].id;
            await this.operationRecordService.updateOperationRecord({
                processed: userEntities.length,
                lastKey: this.record.lastKey,
            });
        }
    }

    private isRegularEmail(email: string): boolean {
        const isValidEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmailFormat) {
            return false;
        }

        const [emailId, domain] = email.split('@');
        const isWiFlixDomain = domain === 'wi-flix.com' || domain.endsWith('.wi-flix.com');
        const isPhoneNumberLikeEmailId = /^\+\d+$/.test(emailId);
        return !isWiFlixDomain && !isPhoneNumberLikeEmailId;
    }
}
