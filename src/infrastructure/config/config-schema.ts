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
