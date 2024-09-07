import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DBSubscriptionRepositoryInterface } from '../../../../domain/interface/repositories/subscription-repository.interface';
import { SubscriptionDTO } from '../dto/subscription.dto';
import { SubscriptionsEntity } from '../entities/subscription.entity';

@Injectable()
export class SubscriptionRepository implements DBSubscriptionRepositoryInterface {
    constructor(
        @InjectRepository(SubscriptionsEntity)
        private readonly ormRepository: Repository<SubscriptionsEntity>,
    ) {}

    async save(subscription: SubscriptionDTO): Promise<void> {
        await this.ormRepository.insert(subscription);
    }

    // create batch upsert
    async saveMany(subscriptions: SubscriptionDTO[]): Promise<void> {
        await this.ormRepository.save(subscriptions);
    }
}
