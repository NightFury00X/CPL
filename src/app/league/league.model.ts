import {GenericModel} from "../utils/index";

export interface ILeagueModal {
    _id?: string;
    createdAt?: string;
    leagueName?: string;
    leagueYear?: string;
    updatedAt?: string;
}

export const DEFAULT_LEAGUE = {
    leagueName: '',
    leagueyear: ''
}

export class LeagueModel extends GenericModel implements ILeagueModal {
    constructor(attributes: ILeagueModal = DEFAULT_LEAGUE) {
        super(attributes);
        return Object.assign(this, attributes);
    }
}
