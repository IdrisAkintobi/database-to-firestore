export type OperationRecordType = {
    rejected: number;
    fulfilled: number;
    status: OperationRecordStatus;
    newRecords: Array<Record<string, any>>;
    collectionSchema: Record<string, any>;
};

export enum OperationRecordStatus {
    IDLE = 'idle',
    RUNNING = 'running',
    DONE = 'done',
}
