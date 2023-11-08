import { UserDto } from 'src/infrastructure/db/postgres/dto/user/user.dto';

export interface PGUserRepositoryInterface {
    save(user: UserDto): Promise<void>;
}
