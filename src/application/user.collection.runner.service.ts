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
    record = { lastKey: process.env.LAST_KEY || '', batchSize: 1000 };
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
            await this.operationRecordService.updateOperationRecord({
                status: OperationRecordStatus.ERROR,
                message: error['message'],
            });
        }
    }

    private async updateQueryBatch() {
        let query: database.Query;

        while (true) {
            if (this.record.lastKey) {
                query = this.collectionRef
                    .startAfter(`${this.record.lastKey}`)
                    .limitToFirst(this.record.batchSize + 1);
            } else {
                query = this.collectionRef.limitToFirst(this.record.batchSize);
            }

            const snapshot = await query.once('value');
            if (!snapshot.exists()) {
                await this.operationRecordService.updateOperationRecord({
                    status: OperationRecordStatus.DONE,
                });
                break;
            }
            const usersData = snapshot.val();
            const userEntities = Object.values(usersData) as UserDto[];
            const userEntitiesKey = Object.keys(usersData);

            for (let i = 0; i < userEntities.length; i++) {
                userEntities[i].id ??= userEntitiesKey[i];
            }

            // await this.usersFirestoreRepository.saveMany(userEntities, userEntitiesKey);
            await this.userRepository.saveMany(userEntities);
            this.record.lastKey = userEntities[userEntities.length - 1].id;

            await this.operationRecordService.updateOperationRecord({
                processed: userEntities.length,
                lastKey: this.record.lastKey,
            });
        }
    }

    private isRegularEmail(email: string) {
        // ensure email is not a like of +2348068098631@wi-flix
        const [emailId, domain] = email.split('@');
        return !domain.match(/wi-flix.com$/) && !emailId.match(/^\+\d+$/);
    }
}
