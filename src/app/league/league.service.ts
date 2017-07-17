import {Injectable} from '@angular/core';
import {API} from "../config";
import {HttpProxyService} from "../services/http-proxy.service";

@Injectable()
export class LeagueService {

    constructor(public http: HttpProxyService) {
    }
}
