import {Injectable} from '@angular/core';
import {REFRESH_TOKEN, REMEMBER_ME_ENABLED, TOKEN} from "../constant";

declare let escape: any;

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

/**
 * Helper class to decode and find JWT expiration.
 */
@Injectable()
export class JwtTokenHelper {
    public urlBase64Decode(str: string) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw 'Illegal base64url string!';
            }
        }
        //polifyll https://github.com/davidchambers/Base64.js
        return decodeURIComponent(escape(window.atob(output)));
    }

    public decodeToken(token: string) {
        let parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }
        let decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }
        return JSON.parse(decoded);
    }

    public getTokenExpirationDate(token: string) {
        let decoded: any;
        decoded = this.decodeToken(token);
        if (typeof decoded.exp === 'undefined') {
            return null;
        }
        let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    public isTokenExpired(token: string = '', offsetSeconds?: number) {
        if (!token) {
            return true;
        }
        let date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return false;
        }
        // Token expired?
        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }

    toString(token) {
        let isTokenValid;
        try {
            isTokenValid = this.isTokenExpired(token);
        } catch (e) {
            console.error('Token has expired! ', e);
            isTokenValid = false;
        }
        console.log('\n\n');
        console.log('Token: ', this.decodeToken(token));
        console.log('Expires on: ', this.getTokenExpirationDate(token));
        console.log('Is expired? ', this.isTokenExpired(token));
        console.log('\n\n');
    }
}
