import {Injectable} from '@angular/core';
import {Headers, Response} from "@angular/http";
import {HttpProxyService} from "./http-proxy.service";
import {API} from "../config";
import {ISignin, SigninModel} from "../auth/model/signin";
import {Observable} from "rxjs/Observable";
import {REFRESH_TOKEN, TOKEN} from "../constant";
import {TokenManagerService} from "./token-manager.service";
import {AppService} from "./app.service";

@Injectable()
export class AuthService {
    header: Headers = new Headers();

    constructor(public http: HttpProxyService,
                private tokenManager: TokenManagerService,
                private appService: AppService) {
        this.setHeader();
    }

    setHeader() {
        this.header.append('Content-Type', 'application/json');
    }

    signin(signinModel: ISignin): Observable<any> {
        let payload = new SigninModel(signinModel);
        let prepareBody = (json: any) => {
            return Object.keys(json).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
            }).join('&');
        };
        // For signin Content-Type header is exception due to backend issues
        this.header.set('Content-Type', 'application/x-www-form-urlencoded');
        return this.http
            .post(API.SIGNIN, prepareBody(payload.serialize()), {headers: this.header});
    }

    signout(): Observable<any> {
        return Observable.create((observer) => {
            try {
                // this.tokenManager.invalidate();
                // this.appSrv.setToken(this.tokenManager.get());
                this.appService.signout();
                observer.next();
                observer.complete();

            } catch (e) {
                console.error('Signout: ', e);
                observer.error(e);
            }
        });
    }

    storeJwt(response: Response) {
        let jwt: string = response[TOKEN.key];
        let refreshJwt: string = response[REFRESH_TOKEN.key];
        this.tokenManager.set(jwt, refreshJwt);
    }

}
