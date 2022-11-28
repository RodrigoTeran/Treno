import { REQUEST } from './index.routes';
import { USER } from "../types/user.types";

export const getUser: REQUEST = {
    url: `${process.env.REACT_APP_API_URI}/auth/get-user`,
    method: 'get',
};

export interface GET_USER_DATA {
    user: USER
}

export const login: REQUEST = {
    url: `${process.env.REACT_APP_API_URI}/auth/log-in`,
    method: "put",
};

export interface LOGIN_BODY {
    username: string;
    password: string;
}

export const logout: REQUEST = {
    url: `${process.env.REACT_APP_API_URI}/auth/log-out`,
    method: 'post',
};


export const signUp: REQUEST = {
    url: `${process.env.REACT_APP_API_URI}/auth/sign-up`,
    method: "post",
};

export interface SIGNUP_BODY {
    username: string;
    password: string;
    confirmPassword: string;
    deviceKey: string;
}