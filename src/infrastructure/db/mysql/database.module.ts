import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationService } from '../../utils/config.service';
import { UtilModule } from '../../utils/util.module';
import { DatabaseCreationService } from './database-creation.service';

const DatabaseRootModule = TypeOrmModule.forRootAsync({
    imports: [UtilModule],
    useFactory: async (configService: ConfigurationService) => {
        const dbConfig = configService.getDbConfig();

        return {
            type: 'mysql',
            host: dbConfig.host,
            port: dbConfig.port,
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            entities: [`${__dirname}/**/{entities,views}/*.{entity,view}.{ts,js}`],
            migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
            synchronize: false,
            migrationsRun: true,
            logging: 'all',
            maxQueryExecutionTime: 1000,
            keepConnectionAlive: true,
            autoLoadEntities: true,
        };
    },
    inject: ['ConfigurationService'],
});

@Module({
    imports: [DatabaseRootModule],
    providers: [DatabaseCreationService],
    exports: [DatabaseCreationService],
})
export class DatabaseModule implements OnModuleInit {
    constructor(private readonly databaseCreationService: DatabaseCreationService) {}
    async onModuleInit() {
        // await this.databaseCreationService.init();
    }
}
