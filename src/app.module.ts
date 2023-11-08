import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OperationRecordService } from './application/operation.record.service';
import { UserCollectionRunnerService } from './application/user.collection.runner.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
    imports: [InfrastructureModule],
    controllers: [AppController],
    providers: [OperationRecordService, UserCollectionRunnerService],
})
export class AppModule {}
