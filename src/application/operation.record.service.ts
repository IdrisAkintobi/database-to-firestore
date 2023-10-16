import { Injectable } from '@nestjs/common';
import { OperationRecordStatus, OperationRecordType } from '../domain/enum/operation-record.dto';

@Injectable()
export class OperationRecordService {
    private readonly operationRecord: OperationRecordType = {
        rejected: 0,
        fulfilled: 0,
        status: OperationRecordStatus.IDLE,
        newRecords: [],
        collectionSchema: {},
    };

    getOperationRecord() {
        return {
            ...this.operationRecord,
            total: this.operationRecord.fulfilled + this.operationRecord.rejected,
        };
    }

    // create method that accepts return value of promise.allSettled and add to operation record
    updateOperationRecord(promiseAllSettledResult: PromiseSettledResult<any>[]) {
        const fulfilled = promiseAllSettledResult.filter(result => result.status === 'fulfilled');
        const rejected = promiseAllSettledResult.filter(result => result.status === 'rejected');

        this.operationRecord.fulfilled = this.operationRecord.fulfilled += fulfilled.length;
        this.operationRecord.rejected = this.operationRecord.rejected += rejected.length;
    }

    setOperationRecordStatus(status: OperationRecordStatus) {
        this.operationRecord.status = status;
    }

    addNewRecord(record: any) {
        this.operationRecord.newRecords.push(record);
    }

    updateCollectionSchema(
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
    }
}
