type UserSubscription = {
    subscription: string;
    active_plan: string;
    active_plan_id: string;
    recent_subscription_date?: number;
    recent_subscription_expires?: number;
};

export { UserSubscription };
