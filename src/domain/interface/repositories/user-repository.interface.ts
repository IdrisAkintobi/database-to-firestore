import { UserDto } from 'src/domain/user.dto';

export interface DBUserRepositoryInterface {
    save(user: UserDto): Promise<void>;
    saveMany(users: UserDto[]): Promise<void>;
}
