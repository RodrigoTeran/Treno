import { RESPONSE_DATA } from '../routes/index.routes';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const CONFIG: AxiosRequestConfig<Object> = {
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
};

interface Params {
    uri: string;
    body?: Object;
}

type METHOD = (params: Params) => Promise<RESPONSE>;

interface FETCHER {
    get: METHOD;
    post: METHOD;
    put: METHOD;
    delete: METHOD;
}

export type METHODS = keyof FETCHER;

export interface RESPONSE extends AxiosResponse {
    data: RESPONSE_DATA;
}

export const fetcher: FETCHER = {
    get: async ({ uri }) => {
        const response: RESPONSE = await axios.get(uri, CONFIG);
        return response;
    },
    post: async ({ uri, body }) => {
        const response: RESPONSE = await axios.post(uri, body, CONFIG);
        return response;
    },
    put: async ({ uri, body }) => {
        const response: RESPONSE = await axios.put(uri, body, CONFIG);
        return response;
    },
    delete: async ({ uri }) => {
        const response: RESPONSE = await axios.delete(uri, CONFIG);
        return response;
    },
};
