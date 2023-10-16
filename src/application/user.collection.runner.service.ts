import { Inject, Injectable } from '@nestjs/common';
import { database } from 'firebase-admin';
import { OperationRecordStatus } from '../domain/enum/operation-record.dto';
import { FirebaseAdminRepository } from '../infrastructure/db/repository/firebase-admin';
import { OperationRecordService } from './operation.record.service';

@Injectable()
export class UserCollectionRunnerService {
    record = { count: 0, lastKey: undefined, batchSize: 2, listenerAttached: false };
    constructor(
        @Inject(FirebaseAdminRepository) private firebaseAdminRepository: FirebaseAdminRepository,
        @Inject(OperationRecordService) private operationRecordService: OperationRecordService,
    ) {}

    async updateUserCollection() {
        const db = database();
        const collectionRef = db.ref('users');
        this.operationRecordService.setOperationRecordStatus(OperationRecordStatus.RUNNING);

        // add listener for newly added user
        if (!this.record.listenerAttached) {
            collectionRef
                .orderByChild('created_on')
                .startAt(Date.now())
                .on('child_added', snapshot => {
                    const userEntity = snapshot.val();
                    this.operationRecordService.addNewRecord(userEntity);
                });
            this.record.listenerAttached = true;
        }

        // Log the number of documents in the collection
        // const collectionCount = (await collectionRef.get()).numChildren();
        // console.log(`${collectionCount} documents collection.`);

        return new Promise((resolve, reject) => {
            this.updateQueryBatch(collectionRef, resolve).catch(reject);
        });
    }

    private async updateQueryBatch(
        collectionRef: database.Reference,
        resolve: (value?: unknown) => void,
    ) {
        let query: database.Query;

        if (this.record.lastKey) {
            query = collectionRef
                .orderByKey()
                .startAfter(`${this.record.lastKey}`)
                .limitToFirst(this.record.batchSize + 1);
        } else {
            query = collectionRef.orderByKey().limitToFirst(this.record.batchSize);
        }

        const promiseArray = [];
        try {
            const snapshot = await query.once('value');

            if (!snapshot.val() || this.record.count > 2) {
                this.operationRecordService.setOperationRecordStatus(OperationRecordStatus.DONE);
                // When there are no documents left, we are done
                resolve();
                return;
            }

            this.record.count += 1;
            // Update user email
            snapshot.forEach(userSnapShot => {
                const userEntity = userSnapShot.val();
                this.operationRecordService.updateCollectionSchema('users', userEntity);
                this.record.lastKey = userSnapShot.key;
                if (userEntity?.email && this.isRegularEmail(userEntity.email)) {
                    promiseArray.push(
                        // this.firebaseAdminRepository.updateUserEmail(userEntity.id, userEntity.email),
                        Promise.resolve(),
                    );
                }
            });
        } catch (error) {
            console.log('error', error);
            this.operationRecordService.setOperationRecordStatus(OperationRecordStatus.DONE);
            resolve();
            return;
        }

        const result = await Promise.allSettled(promiseArray);
        this.operationRecordService.updateOperationRecord(result);

        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
            this.updateQueryBatch(collectionRef, resolve);
        });
    }

    private isRegularEmail(email: string) {
        // ensure email is not a like of +2348068098631@wi-flix
        const [emailId, domain] = email.split('@');
        return !domain.match(/wi-flix.com$/) && !emailId.match(/^\+\d+$/);
    }
}
