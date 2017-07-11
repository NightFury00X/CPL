import {Injectable} from '@angular/core';
import {Headers} from "@angular/http";
import {HttpProxyService} from "./http-proxy.service";
import {API} from "../config";

@Injectable()
export class AuthService {
    header: Headers = new Headers()

    constructor(public http: HttpProxyService) {
        this.setHeader();
    }

    setHeader() {
        this.header.append('Content-Type', 'application/json');
    }

}
