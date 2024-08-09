import { UserDto } from 'src/infrastructure/db/mysql/dto/user/user.dto';

export interface DBUserRepositoryInterface {
    save(user: UserDto): Promise<void>;
}
