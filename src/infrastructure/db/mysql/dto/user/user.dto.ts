export interface UserDto {
    id: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    phone_number: string;
    email?: string;
    created: number;
    created_on: number;
    active_plan?: string;
    active_plan_id?: string;
    subscription?: string;
    recent_subscription_date?: number;
    recent_subscription_expires?: number;
    paid_user?: boolean;
    provider?: string;
    provider_id?: string;
    provider_sub?: string;
    country_code: string;
    country_date: string;
    network: string;
    nunchee_id: string;
    billing_account?: {
        email: string;
        full_name: string;
    };
    external_provider_uid?: string;
    token_id?: string;
    agent_code?: string;
    referrer?: string;
    alt_phone?: string;
    used_vouchers?: Record<string, number>;
}
