import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, RequestOptionsArgs} from "@angular/http";
import {TokenManagerService} from "./token-manager.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpWrapperService {
    headers: Headers;

    constructor(private http: Http,
                private tokenManager: TokenManagerService) {

    }

    getHeaders(): Headers {
        let token = this.tokenManager.get();
        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
    }

    _mergeOptions(options: RequestOptionsArgs = {}): RequestOptionsArgs {
        let defaultOptions = new RequestOptions({headers: this.getHeaders()});
        return defaultOptions.merge(options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        let mergedOptions = this._mergeOptions(options);
        return this.http.get(url, mergedOptions);
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
        let mergedOptions = this._mergeOptions(options);
        return this.http.post(url, body, mergedOptions);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
        let mergedOptions = this._mergeOptions(options);
        return this.http.put(url, body, mergedOptions);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        let mergedOptions = this._mergeOptions(options);
        return this.http.delete(url, mergedOptions);
    }

    refreshToken() {
        /*let payload = {};
         payload[REFRESH_TOKEN.key] = this.tokenManager.getRefreshToken();
         // Server expects '_username=uroslates%40gmail.com&_password=password'
         let prepareBody = (json: any) => {
         return Object.keys(json).map((key) => {
         return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
         }).join('&');
         };
         // let URL = API.REFRESH_TOKEN + '?Content-Type:application/x-www-form-urlencoded';
         // For signin Content-Type header is exception due to backend issues
         this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
         return this.http.post(URL, prepareBody(payload), {headers: this.headers});*/
    }

}
