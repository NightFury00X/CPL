import {API_BASE_URL, API_PORT} from "./api_server";

export const BASE: string = `http://${API_BASE_URL}:${API_PORT}/api`;

// Auth API
export const SIGNIN: string = `${BASE}/auth/login`;

export const API = {
    SIGNIN
};
