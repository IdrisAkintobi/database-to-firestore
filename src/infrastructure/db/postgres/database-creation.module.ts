import { Module } from '@nestjs/common';

import { UtilModule } from '../../../infrastructure/utils/util.module';
import { DatabaseCreationService } from './database-creation.service';

@Module({
    imports: [UtilModule],
    providers: [
        {
            provide: 'DatabaseCreationServiceInterface',
            useClass: DatabaseCreationService,
        },
    ],
    exports: ['DatabaseCreationServiceInterface'],
})
export class DatabaseCreationModule {}
