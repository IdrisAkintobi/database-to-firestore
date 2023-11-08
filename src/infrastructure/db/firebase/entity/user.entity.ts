import { Country } from '../../../../domain/enum/country';
import { Network } from '../../../../domain/enum/network';
import { UserSubscription } from '../../../../domain/user-subscription';

type UserEntity = {
    id: string;
    created_on: number;
    phone_number?: string;
    country_code?: Country;
    email?: string;
    full_name?: string;
    network?: Network;
    provider?: string;
    provider_id?: string;
    paid_user?: boolean;

    subscription?: string;
    active_plan?: string;
    active_plan_id?: string;
    recent_subscription_date?: number;
    recent_subscription_expires?: number;

    // filter keys
    country_date?: string;
} & UserSubscription;

export { UserEntity };
