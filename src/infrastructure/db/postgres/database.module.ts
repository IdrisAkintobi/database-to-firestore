import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationService } from '../../../infrastructure/utils/config.service';
import { UtilModule } from '../../../infrastructure/utils/util.module';

export const DatabaseModule = TypeOrmModule.forRootAsync({
    imports: [UtilModule],
    useFactory: async (configService: ConfigurationService) => {
        const dbConfig = configService.getPostgresConfig();

        return {
            type: 'postgres',
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
