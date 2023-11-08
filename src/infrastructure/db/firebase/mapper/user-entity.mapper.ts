import { AbstractUser } from '../../../../domain/abstract-user';
import { AnonymousUser } from '../../../../domain/anonymous-user';
import { User } from '../../../../domain/user';
import { UserEntity } from '../entity/user.entity';

export class UserEntityMapper {
    static map(user: AbstractUser): UserEntity {
        switch (true) {
            case user instanceof AnonymousUser: {
                return this.mapAnonymousUserToUserEntity(user);
            }

            case user instanceof User: {
                return this.mapUserToUserEntity(user as User);
            }
        }
    }

    static mapAnonymousUserToUserEntity(user: AnonymousUser): UserEntity {
        return {
            id: user.userId,
            created_on: user.createdOn.getTime(),
            paid_user: user.paidUser,
            provider: user.provider,
            provider_id: user.providerId,
            subscription: user.subscription,
            active_plan: user.activePlan,
            active_plan_id: user.activePlanId,
            recent_subscription_date: user.recentSubscriptionDate?.getTime(),
            recent_subscription_expires: user.recentSubscriptionExpires?.getTime(),
        };
    }

    static mapUserToUserEntity(user: User): UserEntity {
        return {
            id: user.userId,
            phone_number: user.phoneNumber,
            country_code: user.countryCode,
            country_date: user.countryDate,
            created_on: user.createdOn.getTime(),
            email: user.email,
            full_name: user.fullName,
            network: user.network,
            paid_user: user.paidUser,
            provider: user.provider,
            provider_id: user.providerId,
            subscription: user.subscription,
            active_plan: user.activePlan,
            active_plan_id: user.activePlanId,
            recent_subscription_date: user.recentSubscriptionDate?.getTime(),
            recent_subscription_expires: user.recentSubscriptionExpires?.getTime(),
        };
    }

    static mapFromUserEntity(userEntity?: UserEntity): AbstractUser | undefined {
        if (!userEntity) {
            return undefined;
        }

        return this.isAnonymousUser(userEntity)
            ? this.mapUserEntityToAnonymousUser(userEntity)
            : this.mapUserEntityToUser(userEntity);
    }

    private static isAnonymousUser(userEntity: UserEntity): boolean {
        return !userEntity.phone_number;
    }

    private static mapUserEntityToUser(userEntity: UserEntity): User {
        return new User({
            userId: userEntity.id,
            phoneNumber: userEntity.phone_number,
            countryCode: userEntity.country_code,
            createdOn: userEntity.created_on ? new Date(userEntity.created_on) : undefined,
            email: userEntity.email,
            fullName: userEntity.full_name,
            network: userEntity.network,
            paidUser: userEntity.paid_user,
            provider: userEntity.provider,
            providerId: userEntity.provider_id,
            subscription: userEntity.subscription,
            activePlan: userEntity.active_plan,
            activePlanId: userEntity.active_plan_id,
            recentSubscriptionDate: userEntity.recent_subscription_date
                ? new Date(userEntity.recent_subscription_date)
                : undefined,
            recentSubscriptionExpires: userEntity.recent_subscription_expires
                ? new Date(userEntity.recent_subscription_expires)
                : undefined,
        });
    }

    private static mapUserEntityToAnonymousUser(userEntity: UserEntity): AnonymousUser {
        return new AnonymousUser({
            userId: userEntity.id,
            createdOn: userEntity.created_on ? new Date(userEntity.created_on) : undefined,
            paidUser: userEntity.paid_user,
            provider: userEntity.provider,
            providerId: userEntity.provider_id,
            subscription: userEntity.subscription,
            activePlan: userEntity.active_plan,
            activePlanId: userEntity.active_plan_id,
            recentSubscriptionDate: userEntity.recent_subscription_date
                ? new Date(userEntity.recent_subscription_date)
                : undefined,
            recentSubscriptionExpires: userEntity.recent_subscription_expires
                ? new Date(userEntity.recent_subscription_expires)
                : undefined,
        });
    }
}
