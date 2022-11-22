import { REQUEST } from './index.routes';

export const getUser: REQUEST = {
    url: `${process.env.REACT_APP_API_URI}/auth/get-user`,
    method: 'get',
};

export interface GET_USER_DATA {
    id: string;
    name: string
}

export const login: REQUEST = {
    url: `${process.env.REACT_APP_API_URI}/auth/login`,
    method: "put",
};

export interface LOGIN_BODY {
    username: string;
    password: string;
}

export const logout: REQUEST = {
    url: `${process.env.REACT_APP_API_URI}/auth/logout`,
    method: 'post',
};
