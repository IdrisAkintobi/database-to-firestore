export interface SubscriptionDTO {
    id: string;
    cancelled?: boolean;
    country_date: string;
    extras?: Record<string, unknown>;
    nunchee_user?: string;
    created: number;
    expires: number;
    expired?: boolean;
    order_id?: string;
    plan?: string;
    plan_id?: string;
    user_id?: string;
    user_name?: string;
}
