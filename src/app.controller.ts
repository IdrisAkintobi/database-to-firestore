import { Controller, Get, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { OperationRecordService } from './application/operation.record.service';
import { UserCollectionRunnerService } from './application/user.collection.runner.service';
import { OperationRecordType } from './domain/enum/operation-record.dto';
import { AuthGuard } from './guard/auth-guard';

@Controller('/')
export class AppController {
    constructor(
        @Inject(OperationRecordService)
        private readonly operationRecordService: OperationRecordService,
        @Inject(UserCollectionRunnerService)
        private readonly userCollectionRunnerService: UserCollectionRunnerService,
    ) {}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    getHello(): string {
        return 'ok';
    }

    @UseGuards(AuthGuard)
    @Get('status')
    getOperationRecord(): OperationRecordType {
        return this.operationRecordService.getOperationRecord();
    }

    @UseGuards(AuthGuard)
    @Post('update-collection')
    async updateCollection(): Promise<void> {
        await this.userCollectionRunnerService.updateUserCollection();
    }
}
