import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import {
    apiKeySchema,
    dbConfigSchema,
    firebaseConfigSchema,
    gCloudServiceAccountSchema,
} from './config-schema';
import { ZodErrorParser } from './zod.error.parser';

const getFirebaseConfigFromEnv = (env: NodeJS.ProcessEnv) => {
    try {
        return firebaseConfigSchema.parse({
            apiKey: env.FIREBASE_API_KEY,
            databaseURL: env.FIREBASE_DATABASE_URL,
        });
    } catch (e) {
        ZodErrorParser(e);
    }
};

const getGCloudServiceAccountFromEnv = (env: NodeJS.ProcessEnv) => {
    try {
        return gCloudServiceAccountSchema.parse({
            projectId: env.GCLOUD_PROJECT_ID,
            privateKey: env.SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: env.SERVICE_ACCOUNT_CLIENT_EMAIL,
        });
    } catch (e) {
        ZodErrorParser(e);
    }
};

const getDbConfigFromEnv = (env: NodeJS.ProcessEnv) => {
    try {
        return dbConfigSchema.parse({
            host: env.DB_HOST,
            port: parseInt(env.DB_PORT, 10),
            username: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            database: env.DB_NAME,
        });
    } catch (e) {
        ZodErrorParser(e);
    }
};

const getApiKeyFromEnv = (env: NodeJS.ProcessEnv) => {
    try {
        return apiKeySchema.parse({
            apiKey: env.API_KEY,
        });
    } catch (e) {
        ZodErrorParser(e);
    }
};

@Injectable()
export class ConfigurationService {
    private _getFirebaseConfig: z.infer<typeof firebaseConfigSchema>;
    private _getGCloudServiceAccount: z.infer<typeof gCloudServiceAccountSchema>;
    private _getApiKey: z.infer<typeof apiKeySchema>;
    private _getDbConfig: z.infer<typeof dbConfigSchema>;
    constructor(@Inject('process.env') private env: NodeJS.ProcessEnv) {
        this._getFirebaseConfig = getFirebaseConfigFromEnv(env);
        this._getGCloudServiceAccount = getGCloudServiceAccountFromEnv(env);
        this._getApiKey = getApiKeyFromEnv(env);
        this._getDbConfig = getDbConfigFromEnv(env);
    }

    getFirebaseConfig() {
        return this._getFirebaseConfig;
    }

    getGCloudServiceAccount() {
        return this._getGCloudServiceAccount;
    }

    getApiKey() {
        return this._getApiKey;
    }

    getDbConfig() {
        return this._getDbConfig;
    }
}
