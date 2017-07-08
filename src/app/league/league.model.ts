import {GenericModel, JsonLD} from "../utils/index";

export interface ILeague extends JsonLD {
    id?: string;
    leagueName?: string;
    leagueYear?: string;
}

export const DEFAULT_LEAGUE = {
    leagueName: 'abc',
    leagueyear: '2017'
}

export class LeagueModel extends GenericModel implements ILeague {
    constructor(league?: ILeague) {
        super(league);
        return Object.assign(this, DEFAULT_LEAGUE, league);
    }

    serialize() {
        let payload = Object.assign({}, this);
        return payload;
    }
}
