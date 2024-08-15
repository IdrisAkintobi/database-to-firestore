import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DBUserRepositoryInterface } from 'src/domain/interface/repositories/user-repository.interface';
import { UserDto } from '../dto/user/user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository implements DBUserRepositoryInterface {
    constructor(
        @InjectRepository(UserEntity) private readonly ormRepository: Repository<UserEntity>,
    ) {}

    async save(user: UserDto): Promise<void> {
        await this.ormRepository.upsert(user, ['id']);
    }

    // create batch upsert
    async saveMany(users: UserDto[]): Promise<void> {
        await this.ormRepository.upsert(users, ['id']);
    }
}
