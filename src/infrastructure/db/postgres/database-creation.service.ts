import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { LoggerInterface } from '../../../domain/interface/logger.interface';
import { ConfigurationService } from '../../../infrastructure/utils/config.service';
import { DatabaseCreationServiceInterface } from './database-creation-service.interface';

@Injectable()
export class DatabaseCreationService implements DatabaseCreationServiceInterface {
    private static readonly POSTGRESQL_DUPLICATE_DATABASE_ERROR_CODE = '42P04';

    public constructor(
        @Inject('LoggerInterface') private readonly logger: LoggerInterface,
        @Inject('ConfigurationService')
        private readonly configService: ConfigurationService,
        private readonly dataSource: DataSource,
    ) {}

    public async createDatabaseIfNotExists(): Promise<void> {
        const dbConfig = this.configService.getPostgresConfig();
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.query(`CREATE DATABASE "${dbConfig.database}"`);
            this.logger.debug('Database created');
        } catch (error: unknown) {
            const e = error as { code: string };
            if (e.code === DatabaseCreationService.POSTGRESQL_DUPLICATE_DATABASE_ERROR_CODE) {
                this.logger.debug('Database already exists');
            } else {
                this.logger.error('Database could not be created.', error);
            }
        }

        await queryRunner.release();
    }

    public async runMigrations(): Promise<void> {
        await this.dataSource.runMigrations();
    }
}
