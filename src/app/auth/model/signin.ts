export interface ISignin {
    email: string;
    password: string;
}

export interface ISiginLD {
    email: string;
    password: string;
}

export class SigninModel {
    constructor(public model: ISignin) {}

    serialize(signinModel: ISignin = this.model): ISiginLD {
        return {
            email: signinModel.email,
            password: signinModel.password,
        };
    }
}
