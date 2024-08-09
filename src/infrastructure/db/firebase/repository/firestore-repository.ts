import { firestore } from 'firebase-admin';
import { UserDto } from '../../mysql/dto/user/user.dto';

export class FirestoreRepository {
    protected removeUndefinedFields(payload: UserDto | Record<string, unknown>): void {
        for (const key in payload) {
            if (payload[key] === undefined) {
                delete payload[key];
            }
        }
    }

    protected getEntityFromDocumentSnapshot<T>(
        snapshot: firestore.DocumentSnapshot,
    ): T | undefined {
        if (!snapshot.exists) {
            return undefined;
        }

        return snapshot.data() as T;
    }

    protected getEntityFromQuerySnapshot<T>(snapshot: firestore.QuerySnapshot): T | undefined {
        if (snapshot.empty) {
            return undefined;
        }

        return snapshot.docs[0].data() as T;
    }

    protected getEntitiesFromValueMap<T>(snapshot: firestore.QuerySnapshot): T[] | undefined {
        if (snapshot.empty) {
            return undefined;
        }

        return snapshot.docs.map(doc => doc.data() as T);
    }
}
