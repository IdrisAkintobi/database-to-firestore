import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { OperationRecordStatus, OperationRecordType } from '../domain/enum/operation-record.dto';
import { FirestoreRepository } from '../infrastructure/db/firebase/repository/firestore-repository';

@Injectable()
export class OperationRecordService extends FirestoreRepository {
    private collectionRef: firestore.CollectionReference;
    private operationRecord: OperationRecordType = {
        lastKey: '',
        processed: 0,
        date: new Date().toLocaleDateString('en-US').replaceAll('/', '-') + '_' + process.ppid,
        status: OperationRecordStatus.IDLE,
        message: '',
        newRecords: [],
        collectionSchema: {},
    };

    private async save(): Promise<void> {
        if (!this.collectionRef) this.collectionRef = firestore().collection('runner_status');
        await this.collectionRef.doc(this.operationRecord.date).set(this.operationRecord);
    }

    getOperationRecord() {
        return this.operationRecord;
    }

    async updateOperationRecord(updateData: Partial<Omit<OperationRecordType, 'date'>>) {
        this.operationRecord = {
            ...this.operationRecord,
            ...updateData,
            processed: this.operationRecord.processed + (updateData.processed || 0),
        };
        await this.save();
    }

    async updateCollectionSchema(
        objKey: string,
        entity: Record<string, any>,
        objRef = this.operationRecord.collectionSchema,
    ) {
        objRef[objKey] ??= {};
        const schema = objRef[objKey];
        if (JSON.stringify(entity) === JSON.stringify(schema)) return;
        for (const [key, val] of Object.entries(entity)) {
            if (typeof val === 'object') {
                this.updateCollectionSchema(key, val, schema);
            } else {
                if (!schema[key]) {
                    schema[key] = typeof val;
                }
            }
        }
        await this.save();
    }
}
