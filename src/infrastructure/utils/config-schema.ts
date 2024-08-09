import { z } from 'zod';

export const firebaseConfigSchema = z.object({
    apiKey: z.string(),
    databaseURL: z.string().url(),
});

export const gCloudServiceAccountSchema = z.object({
    projectId: z.string(),
    privateKey: z.string(),
    clientEmail: z.string().email(),
});

export const dbConfigSchema = z.object({
    host: z.string(),
    port: z.number(),
    username: z.string(),
    password: z.string(),
    database: z.string(),
});

export const apiKeySchema = z.object({
    apiKey: z.string(),
});
