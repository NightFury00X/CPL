import {Injectable} from "@angular/core";
import {HttpWrapperService} from "./http-wrapper.service";
import {RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class HttpProxyService {
    lastAttemptedApiCall: any;

    constructor(private http: HttpWrapperService,) {
    }

    proxy(method: string, methodArgs): Observable<any> {
        this.setLastAttemptedApiCall(method, methodArgs);
        return Observable.create((observer) => {
            this.http[method].apply(this.http, methodArgs)
                .subscribe(
                    (response) => {
                        observer.emit(response);
                    },
                    (error) => {
                        observer.emit(error);
                    }
                );
        });
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http.get(url, options)
            .map(res => res.json());
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http.post(url, body, options)
            .map((res) => res.json());
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http.put(url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http.delete(url, options)
            .map((res) => res.json());
    }


    private setLastAttemptedApiCall(method: string, args: IArguments) {
        this.lastAttemptedApiCall = {
            method: method,
            args: args
        };
    }
}
