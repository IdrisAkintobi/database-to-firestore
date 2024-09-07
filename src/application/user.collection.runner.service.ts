import { Inject, Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { OperationRecordStatus } from '../domain/enum/operation-record.dto';
import { FirebaseAdminRepository } from '../infrastructure/db/firebase/repository/firebase-admin';
import { UsersFirestoreRepository } from '../infrastructure/db/firebase/repository/user.firestore.repository';
import { UserDto } from '../infrastructure/db/mysql/dto/user.dto';
import { UserRepository } from '../infrastructure/db/mysql/repositories/user-repository';
import { OperationRecordService } from './operation.record.service';

@Injectable()
export class UserCollectionRunnerService {
    record = { lastDate: +process.env.LAST_TIMESTAMP || 0, batchSize: 10 };
    private collectionRef: firestore.CollectionReference;

    constructor(
        @Inject(FirebaseAdminRepository) private firebaseAdminRepository: FirebaseAdminRepository,
        private usersFirestoreRepository: UsersFirestoreRepository,
        @Inject(OperationRecordService) private operationRecordService: OperationRecordService,
        @Inject('UserRepository') private userRepository: UserRepository,
    ) {}

    async updateUserCollection() {
        if (!this.collectionRef) {
            this.collectionRef = firestore().collection('users');
        }

        await this.operationRecordService.updateOperationRecord({
            status: OperationRecordStatus.RUNNING,
        });

        try {
            await this.updateQueryBatch();
        } catch (error) {
            await this.operationRecordService.updateOperationRecord({
                status: OperationRecordStatus.ERROR,
                message: error['message'],
            });
        }
    }

    private async updateQueryBatch() {
        let query: firestore.Query;

        const startDate = 0; // Starting from January 1st, 2024

        while (true) {
            if (this.record.lastDate) {
                query = this.collectionRef
                    .where('created_on', '>', this.record.lastDate)
                    .orderBy('created_on')
                    .limit(this.record.batchSize);
            } else {
                query = this.collectionRef
                    .where('created_on', '>=', startDate)
                    .orderBy('created_on')
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
            const usersUid: { uid: string }[] = [];
            snapshot.forEach(doc => {
                const data = doc.data() as UserDto;
                usersUid.push({ uid: doc.id });
                data.id = doc.id;
                userEntities.push(data);
            });

            // await this.subscriptionRepository.saveMany(userEntities);

            const authUsers = await this.firebaseAdminRepository.getUsers(usersUid);
            //@ts-expect-error: uid will always be present
            const uidToDeleteArray = authUsers.notFound.map(({ uid }) => uid);
            await this.usersFirestoreRepository.deleteMany(uidToDeleteArray);

            this.record.lastDate = userEntities[userEntities.length - 1].created_on;

            await this.operationRecordService.updateOperationRecord({
                processed: userEntities.length,
                deleted: uidToDeleteArray.length,
                lastTimestamp: this.record.lastDate,
            });
        }
    }

    private isRegularEmail(email: string) {
        const [emailId, domain] = email.split('@');
        return !domain.match(/wi-flix.com$/) && !emailId.match(/^\+\d+$/);
    }
}
