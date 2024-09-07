import { Column, Entity, Index, OneToMany } from 'typeorm';
import { SubscriptionsEntity } from './subscription.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @Column({ type: 'varchar', primary: true, default: 'uuid_generate_v4()' })
    id: string;

    @Column({ type: 'varchar', length: 191, nullable: true })
    first_name?: string;

    @Column({ type: 'varchar', length: 191, nullable: true })
    last_name?: string;

    @Column({ type: 'varchar', length: 191, nullable: true })
    full_name?: string;

    @Column({ type: 'varchar', length: 32 })
    @Index()
    phone_number: string;

    @Column({ type: 'varchar', length: 191, nullable: true })
    @Index()
    email?: string;

    @Column({ type: 'bigint', default: Date.now() })
    @Index()
    created_on: number;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Index()
    active_plan?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Index()
    active_plan_id?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @OneToMany(() => SubscriptionsEntity, subscription => subscription.user_id)
    subscription?: string;

    @Column({ type: 'bigint', nullable: true })
    @Index()
    recent_subscription_date?: number;

    @Column({ type: 'bigint', nullable: true })
    @Index()
    recent_subscription_expires?: number;

    @Column({ type: 'bool', nullable: true })
    paid_user?: boolean;

    @Column({ type: 'varchar', length: 64, nullable: true })
    provider?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    provider_id?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    provider_sub?: string;

    @Column({ type: 'varchar', length: 32 })
    @Index()
    country_code: string;

    @Column({ type: 'varchar', length: 32, nullable: true })
    country_date: string;

    @Column({ type: 'varchar', length: 32, nullable: true })
    @Index()
    network: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    nunchee_id?: string;

    @Column({ type: 'json', nullable: true })
    billing_account?: {
        email: string;
        full_name: string;
    };

    @Column({ type: 'varchar', length: 64, nullable: true })
    external_provider_uid?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    token_id?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    agent_code?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    referrer?: string;

    @Column({ type: 'varchar', length: 32, nullable: true })
    alt_phone?: string;

    @Column({ type: 'json', nullable: true })
    used_vouchers?: Record<string, number>;
}
