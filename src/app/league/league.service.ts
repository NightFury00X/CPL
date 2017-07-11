import {Injectable} from '@angular/core';
import {API} from "../config";
import {HttpProxyService} from "../services/http-proxy.service";

@Injectable()
export class LeagueService {

    constructor(public http: HttpProxyService) {
    }

    all() {
        return this.http.get(API.GETALLLEAGUE);
    }

    findBy(_id: string) {
        return this.http.get([API.FIND_LEAGUE_BY_ID, _id].join('/'));
    }

    onSave(leagueData: any) {
        return this.http.post(API.CREATELEAGUE, JSON.stringify(leagueData));
    }

    onDelete(_id: string) {
        return this.http.delete([API.FIND_LEAGUE_BY_ID, _id].join('/'));
    }
}
