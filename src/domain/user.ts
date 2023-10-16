import { Country } from './enum/country';
import { Network } from './enum/network';
import { AbstractUser } from './abstract-user';

type UserParams = {
    userId: string;
    email?: string;
    phoneNumber: string;
    countryCode: Country;
    createdOn: Date;
    network?: Network;
    fullName?: string;
    subscription?: string;
    activePlan?: string;
    activePlanId?: string;
    recentSubscriptionDate?: Date;
    recentSubscriptionExpires?: Date;
    provider?: string;
    providerId?: string;
    paidUser?: boolean;
};

export class User extends AbstractUser {
    private readonly _phoneNumber: string;

    private readonly _fullName?: string;

    private readonly _countryCode: Country;

    private readonly _email?: string;

    private readonly _network?: Network;

    constructor({
        phoneNumber,
        fullName,
        countryCode,
        email,
        network,
        ...abstractUserParams
    }: UserParams) {
        super(abstractUserParams);
        this._phoneNumber = phoneNumber;
        this._fullName = fullName;
        this._countryCode = countryCode;
        this._email = email;
        this._network = network;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    get fullName(): string {
        return this._fullName;
    }

    get countryCode(): Country {
        return this._countryCode;
    }

    get email(): string {
        return this._email;
    }

    get network(): Network {
        return this._network;
    }

    get countryDate(): string {
        return `${this._countryCode}_${this._createdOn.getTime()}`;
    }
}
