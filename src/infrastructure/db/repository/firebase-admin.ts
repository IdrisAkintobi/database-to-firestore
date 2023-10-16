import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseAdminRepository {
    async getUserByPhoneNumber(phoneNumber: string): Promise<auth.UserRecord> {
        return auth().getUserByPhoneNumber(phoneNumber);
    }

    async getUserByEmail(email: string): Promise<auth.UserRecord> {
        return auth().getUserByEmail(email);
    }

    async getUser(uid: string): Promise<auth.UserRecord> {
        return auth().getUser(uid);
    }

    async updateUserEmail(uid: string, email: string): Promise<auth.UserRecord> {
        return auth().updateUser(uid, { email });
    }
}
