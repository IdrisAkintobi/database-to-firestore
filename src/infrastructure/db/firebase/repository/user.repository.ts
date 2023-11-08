import { Injectable } from '@nestjs/common';
import { database } from 'firebase-admin';

import { AbstractUser } from '../../../../domain/abstract-user';
import { UserRepositoryInterface } from '../../../../domain/interface/user-repository.interface';
import { User } from '../../../../domain/user';
import { UserEntity } from '../entity/user.entity';
import { UserEntityMapper } from '../mapper/user-entity.mapper';
import { FirebaseRepository } from './firebase-repository';

@Injectable()
export class UserRepository extends FirebaseRepository implements UserRepositoryInterface {
    async save(user: AbstractUser): Promise<void> {
        const userEntity = UserEntityMapper.map(user);
        this.removeUndefinedFields(userEntity);
        await database().ref('users').child(userEntity.id).set(userEntity);
    }

    async findOneByUserId<T extends AbstractUser>(userId: string): Promise<T | undefined> {
        const ref = database().ref('users').child(userId);
        const userSnapshot = await ref.once('value');

        return UserEntityMapper.mapFromUserEntity(userSnapshot.val() as UserEntity) as T;
    }

    async findUserByAttribute<T extends AbstractUser>(
        attribute: string,
        value: string | number | boolean,
    ): Promise<T | undefined> {
        const ref = database().ref('users').orderByChild(attribute).equalTo(value);

        const snapshot = await ref.once('value');
        const userEntity = this.getEntityFromValueMap<UserEntity>(snapshot);
        return UserEntityMapper.mapFromUserEntity(userEntity) as T;
    }

    async findOneByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
        return this.findUserByAttribute<User>('phone_number', phoneNumber);
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.findUserByAttribute<User>('email', email);
    }
}
