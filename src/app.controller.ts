import { Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { OperationRecordService } from './application/operation.record.service';
import { UserCollectionRunnerService } from './application/user.collection.runner.service';
import { AuthGuard } from './guard/auth-guard';

@UseGuards(AuthGuard)
@Controller('/')
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
