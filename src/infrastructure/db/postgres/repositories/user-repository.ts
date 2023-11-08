import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PGUserRepositoryInterface } from 'src/domain/interface/repositories/user-repository.interface';
import { UserDto } from '../dto/user/user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserEntityMapper } from '../mapper/user-entity-mapper';

@Injectable()
export class UserRepository implements PGUserRepositoryInterface {
    constructor(
        @InjectRepository(UserEntity) private readonly ormRepository: Repository<UserEntity>,
    ) {}

    async save(user: UserDto): Promise<void> {
        const userEntity = UserEntityMapper.mapToUserEntity(user);

        await this.ormRepository.upsert(userEntity, ['userId']);
    }

    // create batch upsert
    async saveAll(users: UserDto[]): Promise<void> {
        const userEntities = UserEntityMapper.mapToUserEntities(users);

        await this.ormRepository.upsert(userEntities, ['userId']);
    }
}
