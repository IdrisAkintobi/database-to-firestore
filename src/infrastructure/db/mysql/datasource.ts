import 'dotenv/config';
import { DataSource } from 'typeorm';

export const DBDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/entities/**/*{.ts,.js}'],
    synchronize: false,
    poolSize: 10,
    maxQueryExecutionTime: 1500,
    charset: 'utf8mb4',
});
