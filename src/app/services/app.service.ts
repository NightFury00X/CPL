import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {JwtTokenHelper, TokenManagerService} from "./token-manager.service";

export interface IUser {
    username?: string;
    userId?: string;
    givenName?: string;
    familyName?: string;
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
    username: string;
    userId: string;
    givenName: string;
    familyName: string;

    constructor(public user: IUser = {}) {
        Object.assign(this, user);
    }

    fullName() {
        return [this.givenName, this.familyName].join(' ');
    }
}
;

export const DEFAULTS: IApp = {
    isAuthenticated: false
};

@Injectable()
export class AppService {
    public $stream: BehaviorSubject<IApp>;
    private _observer: any;
    // Application state representation
    private _data: IApp = Object.assign({}, DEFAULTS);

    constructor(private jwtHelper: JwtTokenHelper,
                private tokenManager: TokenManagerService
                // private profilesSrv: ProfilesService,
                // private notificationsSvc: NotificationsCollection
    ) {
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
                data.user.username = decodedToken.username;
                data.user.userId = decodedToken.userId;
            } catch (e) {
            }
        } else { // signed out user - clear everything
            data = Object.assign({}, data, DEFAULTS);
        }
        return this._setData(data);
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
