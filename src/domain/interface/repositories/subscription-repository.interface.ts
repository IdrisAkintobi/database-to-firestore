import { SubscriptionDTO } from 'src/infrastructure/db/mysql/dto/subscription.dto';

export interface DBSubscriptionRepositoryInterface {
    save(subscription: SubscriptionDTO): Promise<void>;
    saveMany(subscriptions: SubscriptionDTO[]): Promise<void>;
}
