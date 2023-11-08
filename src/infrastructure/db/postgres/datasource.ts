import { DataSource } from 'typeorm';

export const DBDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'testdb',
    entities: [__dirname + '/entities/**/*{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: 'all',
    maxQueryExecutionTime: 1000,
});
