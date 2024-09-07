import { UserDto } from 'src/infrastructure/db/mysql/dto/user.dto';

export interface DBUserRepositoryInterface {
    save(user: UserDto): Promise<void>;
    saveMany(users: UserDto[]): Promise<void>;
}
