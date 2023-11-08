import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'user' })
@Index([
    'userId',
    'phoneNumber',
    'email',
    'createdOn',
    'activePlan',
    'recentSubscriptionDate',
    'recentSubscriptionExpires',
    'countryCode',
    'countryDate',
    'network',
])
export class UserEntity {
    @Column({ type: 'varchar', name: 'user_id', primary: true, default: 'uuid_generate_v4()' })
    userId: string;

    @Column({ type: 'varchar', length: 15, name: 'first_name' })
    firstName?: string;

    @Column({ type: 'varchar', length: 15, name: 'last_name' })
    lastName?: string;

    @Column({ type: 'varchar', length: 32, name: 'full_name' })
    fullName?: string;

    @Column({ type: 'varchar', length: 16, name: 'phone_number' })
    phoneNumber?: string;

    @Column({ type: 'varchar', length: 40 })
    email?: string;

    @Column({ type: 'bigint', name: 'created_on' })
    createdOn?: number;

    @Column({ type: 'varchar', length: 32, name: 'active_plan' })
    activePlan?: string;

    @Column({ type: 'varchar', length: 32, name: 'active_plan_id' })
    activePlanId?: string;

    @Column({ type: 'varchar', length: 32 })
    subscription?: string;

    @Column({ type: 'bigint', name: 'recent_subscription_date' })
    recentSubscriptionDate?: number;

    @Column({ type: 'bigint', name: 'recent_subscription_expires' })
    recentSubscriptionExpires?: number;

    @Column({ type: 'bool', name: 'paid_user' })
    paidUser?: boolean;

    @Column({ type: 'varchar' })
    provider?: string;

    @Column({ type: 'varchar', name: 'provider_id' })
    providerId?: string;

    @Column({ type: 'varchar', name: 'provider_sub' })
    providerSub?: string;

    @Column({ type: 'varchar', name: 'country_code' })
    countryCode?: string;

    @Column({ type: 'varchar', name: 'country_date' })
    countryDate: string;

    @Column({ type: 'varchar', length: 16 })
    network: string;

    @Column({ type: 'varchar', name: 'nunchee_id' })
    nuncheeId?: string;

    @Column({ type: 'jsonb', name: 'billing_account' })
    billingAccount?: {
        email: string;
        full_name: string;
    };

    @Column({ type: 'varchar', name: 'external_provider_uid' })
    externalProviderUID?: string;

    @Column({ type: 'varchar', name: 'token_id' })
    tokenId?: string;

    @Column({ type: 'varchar', name: 'agent_code' })
    agentCode?: string;

    @Column({ type: 'varchar' })
    referrer?: string;

    @Column({ type: 'varchar', name: 'alt_phone' })
    altPhone?: string;

    @Column({ type: 'jsonb', name: 'used_vouchers' })
    usedVouchers?: Record<string, number>;
}
