import { AbstractUser } from '../../../domain/abstract-user';
import { UserDto } from '../../../infrastructure/db/mysql/dto/user/user.dto';

export interface UserFirebaseRepositoryInterface {
    save(user: UserDto): Promise<void>;
    saveMany(user: UserDto[], keys: string[]): Promise<void>;
    find(userId: string): Promise<AbstractUser | undefined>;
}
