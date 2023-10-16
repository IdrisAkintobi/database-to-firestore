import { Network } from './enum/network';
import { SubscriptionAttribute } from './subscription-attribute';
import { SubscriptionKind } from './enum/subscription-kind';
import { Currency } from './enum/currency';
import { SubscriptionState } from './enum/subscription-state';

type SubscriptionParams = {
    subscriptionId: string;
    kind: SubscriptionKind;
    state: SubscriptionState;
    userId: string;
    orderId?: string;
    cost: number;
    currency: Currency;
    createdDate: Date;
    expiryDate: Date;
    countryDate: string;
    plan: string;
    planId: string;
    userName?: string;
    cancelled?: boolean;
    expired?: boolean;
    serviceId?: string;
    serviceName?: string;
    providerId?: string;
    network?: Network;
    freemium?: boolean;
    subscriptionInformation?: Record<SubscriptionAttribute, unknown>;
};

export class Subscription {
    private readonly _subscriptionId: string;

    private _state: SubscriptionState;

    private readonly _kind: SubscriptionKind;

    private readonly _userId: string;

    private readonly _orderId?: string;

    private readonly _cost: number;

    private readonly _currency: Currency;

    private readonly _createdDate: Date;

    private readonly _expiryDate: Date;

    private readonly _countryDate: string;

    private readonly _plan: string;

    private readonly _planId: string;

    private readonly _userName: string;

    private readonly _cancelled?: boolean;

    private readonly _expired?: boolean;

    private readonly _serviceName?: string;

    private readonly _serviceId?: string;

    private readonly _providerId?: string;

    private readonly _network?: Network;

    private readonly _freemium?: boolean;

    private readonly _subscriptionInformation?: Record<SubscriptionAttribute, unknown>;

    constructor({
        subscriptionId,
        kind,
        state,
        userId,
        orderId,
        cost,
        currency,
        createdDate,
        expiryDate,
        countryDate,
        plan,
        planId,
        userName,
        expired,
        cancelled,
        serviceId,
        serviceName,
        providerId,
        network,
        freemium,
        subscriptionInformation,
    }: SubscriptionParams) {
        this._subscriptionId = subscriptionId;
        this._kind = kind;
        this._state = state;
        this._userId = userId;
        this._orderId = orderId;
        this._cost = cost;
        this._currency = currency;
        this._createdDate = createdDate;
        this._expiryDate = expiryDate;
        this._countryDate = countryDate;
        this._plan = plan;
        this._planId = planId;
        this._userName = userName;
        this._expired = expired;
        this._cancelled = cancelled;
        this._serviceId = serviceId;
        this._serviceName = serviceName;
        this._providerId = providerId;
        this._network = network;
        this._freemium = freemium;
        this._subscriptionInformation = subscriptionInformation;
    }

    get subscriptionId(): string {
        return this._subscriptionId;
    }

    get state(): SubscriptionState {
        return this._state;
    }

    set state(subscriptionState: SubscriptionState) {
        this._state = subscriptionState;
    }

    get userId(): string {
        return this._userId;
    }

    get kind(): SubscriptionKind {
        return this._kind;
    }

    get orderId(): string | undefined {
        return this._orderId;
    }

    get cost(): number {
        return this._cost;
    }

    get currency(): Currency {
        return this._currency;
    }

    get createdDate(): Date {
        return this._createdDate;
    }

    get expiryDate(): Date {
        return this._expiryDate;
    }

    get countryDate(): string {
        return this._countryDate;
    }

    get expired(): boolean {
        return this._expired;
    }

    get plan(): string {
        return this._plan;
    }

    get planId(): string {
        return this._planId;
    }

    get userName(): string {
        return this._userName;
    }

    get cancelled(): boolean | undefined {
        return this._cancelled;
    }

    get serviceId(): string | undefined {
        return this._serviceId;
    }

    get serviceName(): string | undefined {
        return this._serviceName;
    }

    get providerId(): string | undefined {
        return this._providerId;
    }

    get network(): Network | undefined {
        return this._network;
    }

    get freemium(): boolean | undefined {
        return this._freemium;
    }

    get subscriptionInformation(): Record<SubscriptionAttribute, unknown> | undefined {
        return this._subscriptionInformation;
    }
}
