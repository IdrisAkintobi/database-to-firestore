import { Subscription } from './subscription';

export type AbstractUserParams = {
    userId: string;
    createdOn: Date;
    subscription?: string;
    activePlan?: string;
    activePlanId?: string;
    recentSubscriptionDate?: Date;
    recentSubscriptionExpires?: Date;
    provider?: string;
    providerId?: string;
    paidUser?: boolean;
};

export class AbstractUser {
    private readonly _userId: string;

    protected readonly _createdOn: Date;

    private _subscription?: string;

    private _activePlan?: string;

    private _activePlanId?: string;

    private _recentSubscriptionDate?: Date;

    private _recentSubscriptionExpires?: Date;

    private readonly _provider?: string;

    private readonly _providerId?: string;

    private readonly _paidUser?: boolean;

    constructor({
        userId,
        createdOn,
        subscription,
        activePlan,
        activePlanId,
        recentSubscriptionDate,
        recentSubscriptionExpires,
        provider,
        providerId,
        paidUser,
    }: AbstractUserParams) {
        this._userId = userId;
        this._createdOn = createdOn;
        this._subscription = subscription;
        this._activePlan = activePlan;
        this._activePlanId = activePlanId;
        this._recentSubscriptionDate = recentSubscriptionDate;
        this._recentSubscriptionExpires = recentSubscriptionExpires;
        this._provider = provider;
        this._providerId = providerId;
        this._paidUser = paidUser;
    }

    get userId(): string {
        return this._userId;
    }

    get createdOn(): Date {
        return this._createdOn;
    }

    get subscription(): string | undefined {
        return this._subscription;
    }

    get activePlan(): string | undefined {
        return this._activePlan;
    }

    get activePlanId(): string | undefined {
        return this._activePlanId;
    }

    get recentSubscriptionDate(): Date | undefined {
        return this._recentSubscriptionDate;
    }

    get recentSubscriptionExpires(): Date | undefined {
        return this._recentSubscriptionExpires;
    }

    get provider(): string | undefined {
        return this._provider;
    }

    get providerId(): string | undefined {
        return this._providerId;
    }

    get paidUser(): boolean | undefined {
        return this._paidUser;
    }

    public setSubscription(subscription: Subscription): void {
        this._subscription = subscription.subscriptionId;
        this._activePlanId = subscription.planId;
        this._activePlan = subscription.plan;
        this._recentSubscriptionDate = subscription.createdDate;
        this._recentSubscriptionExpires = subscription.expiryDate;
    }
}
