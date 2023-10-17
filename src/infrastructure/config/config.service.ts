import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ZodErrorParser } from '../utils/zod.error.parser';
import { apiKeySchema, firebaseConfigSchema, gCloudServiceAccountSchema } from './config-schema';

const getFirebaseConfigFromEnv = () => {
    try {
        return firebaseConfigSchema.parse({
            apiKey: process.env.FIREBASE_API_KEY,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
        });
    } catch (e) {
        ZodErrorParser(e);
    }
};

const getGCloudServiceAccountFromEnv = () => {
    try {
        return gCloudServiceAccountSchema.parse({
            projectId: process.env.GCLOUD_PROJECT_ID,
            privateKey: process.env.SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
        });
    } catch (e) {
        ZodErrorParser(e);
    }
};

const getApiKeyFromEnv = () => {
    try {
        return apiKeySchema.parse({
            apiKey: process.env.API_KEY,
        });
    } catch (e) {
        ZodErrorParser(e);
    }
};

@Injectable()
export class ConfigService {
    private _getFirebaseConfig: z.infer<typeof firebaseConfigSchema>;
    private _getGCloudServiceAccount: z.infer<typeof gCloudServiceAccountSchema>;
    private _getApiKey: z.infer<typeof apiKeySchema>;
    constructor() {
        this._getFirebaseConfig = getFirebaseConfigFromEnv();
        this._getGCloudServiceAccount = getGCloudServiceAccountFromEnv();
        this._getApiKey = getApiKeyFromEnv();
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
}
