import {API_BASE_URL, API_PORT} from "./api_server";

export const BASE: string = `http://${API_BASE_URL}:${API_PORT}/api`;

//League API
export const CREATELEAGUE: string = `${BASE}/createleague`;
export const GETALLLEAGUE: string = `${BASE}/allleague`;
export const FIND_LEAGUE_BY_ID: string = `${BASE}/league`;

export const API = {
    BASE,
    CREATELEAGUE,
    GETALLLEAGUE,
    FIND_LEAGUE_BY_ID
}
