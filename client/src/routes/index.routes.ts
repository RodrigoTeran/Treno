import { METHODS } from '../utils/fetcher';
import { TYPE_MSG } from "../types/messages.types";

export interface RESPONSE_DATA {
    isAuth: boolean;
    message: string;
    readMsg: boolean;
    typeMsg: TYPE_MSG;
    data: any;
}

export interface REQUEST {
    url: string;
    method: METHODS;
}
