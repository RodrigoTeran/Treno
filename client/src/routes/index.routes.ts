import { METHODS } from '../utils/fetcher';

export interface RESPONSE_DATA {
    msg: string;
    data: any;
    isAuth: boolean;
}

export interface REQUEST {
    url: string;
    method: METHODS;
}
