import { User } from '../user';
import { AbstractUser } from '../abstract-user';

export interface UserRepositoryInterface {
    save(user: AbstractUser): Promise<void>;
    findOneByUserId(userId: string): Promise<AbstractUser | undefined>;
    findOneByPhoneNumber(phoneNumber: string): Promise<User | undefined>;
    findOneByEmail(email: string): Promise<User | undefined>;
}
