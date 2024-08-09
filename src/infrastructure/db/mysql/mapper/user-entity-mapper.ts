import { UserDto } from '../dto/user/user.dto';
import { UserEntity } from '../entities/user.entity';

export class UserEntityMapper {
    public static mapToUserEntity(userDto: UserDto): UserEntity {
        const userEntity = new UserEntity();

        userEntity.userId = userDto.id;
        userEntity.phoneNumber = userDto.phone_number;
        userEntity.email = userDto.email;
        userEntity.createdOn = userDto?.created_on;
        userEntity.activePlan = userDto.active_plan;
        userEntity.activePlanId = userDto.active_plan_id;
        userEntity.subscription = userDto.subscription;
        userEntity.recentSubscriptionDate = userDto.recent_subscription_date;
        userEntity.recentSubscriptionExpires = userDto?.recent_subscription_expires;
        userEntity.countryCode = userDto.country_code;
        userEntity.countryDate = userDto.country_date;
        userEntity.network = userDto.network;
        userEntity.nuncheeId = userDto.nunchee_id;
        userEntity.firstName = userDto.first_name;
        userEntity.lastName = userDto.last_name;
        userEntity.fullName = userDto.full_name;
        userEntity.paidUser = userDto.paid_user;
        userEntity.provider = userDto.provider;
        userEntity.providerId = userDto.provider_id;
        userEntity.providerSub = userDto.provider_sub;
        userEntity.billingAccount = userDto.billing_account;
        userEntity.externalProviderUID = userDto.external_provider_uid;
        userEntity.tokenId = userDto.token_id;
        userEntity.agentCode = userDto.agent_code;
        userEntity.referrer = userDto.referrer;
        userEntity.altPhone = userDto.alt_phone;
        userEntity.usedVouchers = userDto.used_vouchers;

        return userEntity;
    }

    public static mapToUserDto(userEntity: UserEntity): UserDto {
        const userDto: UserDto = {
            id: userEntity.userId,
            phone_number: userEntity.phoneNumber,
            email: userEntity.email,
            created_on: userEntity.createdOn,
            active_plan: userEntity.activePlan,
            active_plan_id: userEntity.activePlanId,
            subscription: userEntity.subscription,
            recent_subscription_date: userEntity.recentSubscriptionDate,
            recent_subscription_expires: userEntity.recentSubscriptionExpires,
            country_code: userEntity.countryCode,
            country_date: userEntity.countryDate,
            network: userEntity.network,
            nunchee_id: userEntity.nuncheeId,
            first_name: userEntity.firstName,
            last_name: userEntity.lastName,
            full_name: userEntity.fullName,
            paid_user: userEntity.paidUser,
            provider: userEntity.provider,
            provider_id: userEntity.providerId,
            provider_sub: userEntity.providerSub,
            billing_account: userEntity.billingAccount,
            external_provider_uid: userEntity.externalProviderUID,
            token_id: userEntity.tokenId,
            agent_code: userEntity.agentCode,
            referrer: userEntity.referrer,
            alt_phone: userEntity.altPhone,
            used_vouchers: userEntity.usedVouchers,
        };

        return userDto;
    }

    public static mapToUserEntities(userDtos: UserDto[]): UserEntity[] {
        return userDtos.map(this.mapToUserEntity);
    }
}
