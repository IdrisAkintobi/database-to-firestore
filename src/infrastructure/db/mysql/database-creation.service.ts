import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { DBDataSource } from './datasource';

@Injectable()
export class DatabaseCreationService {
    private static readonly MYSQL_DUPLICATE_DATABASE_ERROR_CODE = 'ER_DB_CREATE_EXISTS';

    private queryRunner: QueryRunner;

    public constructor() {
        this.queryRunner = DBDataSource.createQueryRunner();
    }

    public async init(): Promise<void> {
        try {
            await DBDataSource.initialize(); // Initialize the DataSource before making queries
            await this.queryRunner.query(`CREATE DATABASE \`${process.env.DB_NAME}\``);
            console.debug('Database created');
        } catch (error: unknown) {
            const e = error as { code: string };
            if (e.code === DatabaseCreationService.MYSQL_DUPLICATE_DATABASE_ERROR_CODE) {
                console.debug('Database already exists');
            } else {
                console.error('Database could not be created.', error);
            }
        } finally {
            await this.queryRunner.release();
            await DBDataSource.destroy(); // Close the DataSource connection when done
        }
    }
}
