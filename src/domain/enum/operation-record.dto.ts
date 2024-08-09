export type OperationRecordType = {
    lastKey: string;
    processed: number;
    date: string;
    status: OperationRecordStatus;
    message: string;
    newRecords: Array<Record<string, any>>;
    collectionSchema: Record<string, any>;
};

export enum OperationRecordStatus {
    IDLE = 'idle',
    RUNNING = 'running',
    DONE = 'done',
    ERROR = 'error',
}
