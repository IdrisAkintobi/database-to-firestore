import { Controller, Get, Inject, Post } from '@nestjs/common';
import { OperationRecordService } from './application/operation.record.service';
import { UserCollectionRunnerService } from './application/user.collection.runner.service';

@Controller()
export class AppController {
    constructor(
        @Inject(OperationRecordService)
        private readonly operationRecordService: OperationRecordService,
        @Inject(UserCollectionRunnerService)
        private readonly userCollectionRunnerService: UserCollectionRunnerService,
    ) {}

    @Get('status')
    getOperationRecord(): { rejected: number; fulfilled: number } {
        return this.operationRecordService.getOperationRecord();
    }

    @Post('update-collection')
    async updateCollection(): Promise<void> {
        await this.userCollectionRunnerService.updateUserCollection();
    }
}
