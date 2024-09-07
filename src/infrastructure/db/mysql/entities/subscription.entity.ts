import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'subscriptions' })
export class SubscriptionsEntity {
    @Column({ type: 'varchar', primary: true })
    id: string;

    @Column({ type: 'bool', nullable: true })
    @Index()
    cancelled?: boolean;

    @Column({ type: 'varchar', length: 32, nullable: true })
    country_date: string;

    @Column({ type: 'json', nullable: true })
    extras?: Record<string, unknown>;

    @Column({ type: 'varchar', length: 64, nullable: true })
    nunchee_user?: string;

    @Column({ type: 'bigint' })
    @Index()
    created: number;

    @Column({ type: 'bigint' })
    @Index()
    expires: number;

    @Column({ type: 'bool', nullable: true })
    @Index()
    expired?: boolean;

    @Column({ type: 'varchar', length: 64, nullable: true })
    order_id?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Index()
    plan?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Index()
    plan_id?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    @ManyToOne(() => UserEntity, user => user.subscription)
    @JoinColumn({ name: 'user_id' })
    @Index()
    user_id?: string;

    @Column({ type: 'varchar', length: 191, nullable: true })
    user_name?: string;
}
