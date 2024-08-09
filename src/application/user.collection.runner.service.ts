import { Inject, Injectable } from '@nestjs/common';
import { database } from 'firebase-admin';

import { OperationRecordStatus } from '../domain/enum/operation-record.dto';
import { FirebaseAdminRepository } from '../infrastructure/db/firebase/repository/firebase-admin';
import { UsersFirestoreRepository } from '../infrastructure/db/firebase/repository/user.firestore.repository';
import { UserDto } from '../infrastructure/db/mysql/dto/user/user.dto';
import { UserRepository } from '../infrastructure/db/mysql/repositories/user-repository';
import { OperationRecordService } from './operation.record.service';

@Injectable()
export class UserCollectionRunnerService {
    record = { lastKey: '', batchSize: 100 };
    private collectionRef: database.Query;

    constructor(
        @Inject(FirebaseAdminRepository) private firebaseAdminRepository: FirebaseAdminRepository,
        private usersFirestoreRepository: UsersFirestoreRepository,
        @Inject(OperationRecordService) private operationRecordService: OperationRecordService,
        @Inject('UserRepository') private userRepository: UserRepository,
    ) {}

    async updateUserCollection() {
        if (!this.collectionRef) {
            this.collectionRef = database().ref('users').orderByKey();
        }

        await this.operationRecordService.updateOperationRecord({
            status: OperationRecordStatus.RUNNING,
        });

        try {
            await this.updateQueryBatch();
        } catch (error) {
            console.log('error', error);
            await this.operationRecordService.updateOperationRecord({
                status: OperationRecordStatus.ERROR,
                message: error['message'],
            });
        }
    }

    private async updateQueryBatch() {
        let query: database.Query;

        while (true) {
            try {
                if (this.record.lastKey) {
                    query = this.collectionRef
                        .startAfter(`${this.record.lastKey}`)
                        .limitToFirst(this.record.batchSize + 1);
                } else {
                    query = this.collectionRef.limitToFirst(this.record.batchSize);
                }

                const snapshot = await query.once('value');
                const usersData = snapshot.val();
                const userEntities = Object.values(usersData) as UserDto[];

                if (!snapshot.val() || userEntities.length === 0) {
                    await this.operationRecordService.updateOperationRecord({
                        status: OperationRecordStatus.DONE,
                    });
                    break;
                }

                await this.usersFirestoreRepository.saveMany(userEntities);
                this.record.lastKey = userEntities[userEntities.length - 1].id;

                await this.operationRecordService.updateOperationRecord({
                    processed: userEntities.length,
                    lastKey: this.record.lastKey,
                });
            } catch (error) {
                throw error;
            }
        }
    }

    private isRegularEmail(email: string) {
        // ensure email is not a like of +2348068098631@wi-flix
        const [emailId, domain] = email.split('@');
        return !domain.match(/wi-flix.com$/) && !emailId.match(/^\+\d+$/);
    }
}
