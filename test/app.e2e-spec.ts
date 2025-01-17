import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (status)', () => {
        return request(app.getHttpServer()).get('/status').expect(200).expect({
            rejected: 0,
            fulfilled: 0,
            status: 'idle',
            newRecords: [],
            collectionSchema: {},
            total: 0,
        });
    });
});
