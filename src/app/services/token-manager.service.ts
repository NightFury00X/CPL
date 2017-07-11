import {Injectable} from '@angular/core';
import {REFRESH_TOKEN, REMEMBER_ME_ENABLED, TOKEN} from "../constant";

@Injectable()
export class TokenManagerService {

    constructor() {
    }

    get(): string {
        return localStorage.getItem(TOKEN.key);
    }

    getRefreshToken(): string {
        return localStorage.getItem(REFRESH_TOKEN.key);
    }

    getRememberMe() {
        return JSON.parse(localStorage.getItem(REMEMBER_ME_ENABLED.key));
    }

    setRememberMe(isRememberMe: boolean) {
        localStorage.setItem(REMEMBER_ME_ENABLED.key, JSON.stringify(isRememberMe || false));
    }

    set(token: string, refreshToken: string): void {
        if (token) {
            localStorage.setItem(TOKEN.key, token);
        }
        if (refreshToken) {
            localStorage.setItem(REFRESH_TOKEN.key, refreshToken);
        }
    }

    invalidate() {
        localStorage.removeItem(TOKEN.key);
        localStorage.removeItem(REFRESH_TOKEN.key);
        localStorage.removeItem(REMEMBER_ME_ENABLED.key);
    }

}
