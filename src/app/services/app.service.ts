import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {JwtTokenHelper, TokenManagerService} from "./token-manager.service";
import {Router} from "@angular/router";

export interface IUser {
    userEmail?: string;
    userId?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    fullName?(): string;
}

export const ACTIONS: any = {
    AUTHENTICATION_CHANGE: 'AUTHENTICATION.CHANGE',
    SIGNED_IN: 'SIGNED.IN',
    SIGNED_OUT: 'SIGNED_OUT'
};

export interface IApp {
    action?: string;
    isAuthenticated: boolean;
    user?: IUser;
}
;

export class UserModel implements IUser {
    email: string;
    _id: string;
    firstName: string;
    lastName: string;
    role: string;

    constructor(public user: IUser = {}) {
        Object.assign(this, user);
    }

    fullName() {
        return [this.firstName, this.lastName].join(' ');
    }
}

export const DEFAULTS: IApp = {
    isAuthenticated: false,
    user: new UserModel()
};

@Injectable()
export class AppService {
    public $stream: BehaviorSubject<IApp>;
    private _observer: any;
    // Application state representation
    private _data: IApp = Object.assign({}, DEFAULTS);

    constructor(private jwtHelper: JwtTokenHelper,
                private tokenManager: TokenManagerService,
                private router: Router) {
        this.initData();
        this.$stream = new BehaviorSubject(this._data);
    }

    initData() {
        this._data = Object.assign({}, DEFAULTS);
    }

    set(state: IApp): IApp {
        let data = Object.assign({}, this._data, state);
        return this._setData(data);
    }

    setToken(token: string) {
        let isValidToken;
        try {
            isValidToken = !this.jwtHelper.isTokenExpired(token);
        } catch (e) {
            console.error('Invalid token ', e);
            isValidToken = false;
        }
        return this.setAuthenticated(isValidToken);
    }

    signout() {
        this.tokenManager.invalidate();
        this.setToken(this.tokenManager.get());
        this.initData();
    }

    setAuthenticated(isAuthenticated: boolean) {
        let data = Object.assign(this._data);
        data.isAuthenticated = isAuthenticated;
        data.action = ACTIONS.AUTHENTICATION_CHANGE;
        if (isAuthenticated) {
            try {
                let decodedToken = this.jwtHelper.decodeToken(this.tokenManager.get());
                data.user.userEmail = decodedToken.email;
                data.user.userId = decodedToken._id;
                data.user.firstName = decodedToken.firstName;
                data.user.lastName = decodedToken.lastName;
            } catch (e) {
                console.error(e);
            }
        } else { // signed out user - clear everything
            data = Object.assign({}, data, DEFAULTS);
        }
        return this._setData(data);
    }

    isAuthenticated() {
        let data = Object.assign(this._data);
        return data.isAuthenticated;
    }

    setUser(user: IUser) {
        let data = Object.assign(this._data);
        data.user = new UserModel(user);
        return this._setData(data);
    }

    getUser() {
        return this._data.user;
    }

    /**
     * Function responsible for setting newly calculated data and notifying observers.
     */
    private _setData(data: IApp = DEFAULTS) {
        this._data = Object.assign({}, DEFAULTS, data);
        // this._observer.next(data);
        this.$stream.next(data);
        return data;
    }
}
