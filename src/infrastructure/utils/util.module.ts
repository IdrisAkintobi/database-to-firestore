import { Logger, Module } from '@nestjs/common';

import { ConfigurationService } from './config.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: 'process.env',
            useValue: process.env,
        },
        {
            provide: 'ConfigurationService',
            useClass: ConfigurationService,
        },
        {
            provide: 'LoggerInterface',
            useValue: new Logger(),
        },
    ],
    exports: ['ConfigurationService', 'LoggerInterface'],
})
export class UtilModule {}
