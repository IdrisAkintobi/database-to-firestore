import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';

import { AbstractUser } from '../../../../domain/abstract-user';
import { UserFirebaseRepositoryInterface } from '../../../../domain/interface/repositories/user-firestore-repository.interface';
import { UserDto } from '../../mysql/dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserEntityMapper } from '../mapper/user-entity.mapper';
import { FirestoreRepository } from './firestore-repository';

@Injectable()
export class UsersFirestoreRepository
    extends FirestoreRepository
    implements UserFirebaseRepositoryInterface
{
    async save(user: UserDto): Promise<void> {
        this.removeUndefinedFields(user);

        const usersRef = firestore().collection('users').doc(user.id);

        await usersRef.set(user);
    }

    async saveMany(users: UserDto[], keys: string[]): Promise<void> {
        // remove undefined fields
        users.forEach(user => {
            this.removeUndefinedFields(user);
        });

        // save all users at once
        const usersRef = firestore().collection('users');
        const batch = firestore().batch();
        for (let i = 0; i < users.length; i++) {
            const userDocRef = usersRef.doc(users[i].id || keys[i]);
            batch.set(userDocRef, users[i]);
        }
        await batch.commit();
    }

    async find(userId: string): Promise<AbstractUser | undefined> {
        const usersRef = firestore().collection('users').where('id', '==', userId).limit(1);

        const userSnapshot = await usersRef.get();
        const user = this.getEntityFromQuerySnapshot<UserEntity>(userSnapshot);

        return UserEntityMapper.mapFromUserEntity(user);
    }

    // Add deleteMany function
    async deleteMany(userIds: string[]): Promise<void> {
        const usersRef = firestore().collection('users');
        const batch = firestore().batch();

        // Delete each user by their ID
        for (const userId of userIds) {
            const userDocRef = usersRef.doc(userId);
            batch.delete(userDocRef);
        }

        await batch.commit(); // Commit the batch operation
    }
}
