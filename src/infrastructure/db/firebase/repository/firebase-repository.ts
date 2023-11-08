import { database } from 'firebase-admin';

export class FirebaseRepository {
    protected removeUndefinedFields(payload: Record<string, unknown>): void {
        for (const key in payload) {
            if (payload[key] === undefined) {
                delete payload[key];
            }
        }
    }

    protected getEntityFromValueMap<T>(snapshot: database.DataSnapshot): T | undefined {
        if (!snapshot.val()) {
            return undefined;
        }

        const valueMap = snapshot.val() as { [key: string]: T };
        if (!Object.keys(valueMap).length) {
            return undefined;
        }

        return Object.values(valueMap)[0];
    }

    protected getEntitiesFromValueMap<T>(snapshot: database.DataSnapshot): T[] | undefined {
        if (!snapshot.val()) {
            return undefined;
        }

        const valueMap = snapshot.val() as { [key: string]: T };
        if (!Object.keys(valueMap).length) {
            return undefined;
        }

        return Object.values(valueMap);
    }
}
