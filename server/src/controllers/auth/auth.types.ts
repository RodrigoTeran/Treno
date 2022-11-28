export type BODY_LOG_IN = {
    username: string;
    password: string;
}

export type BODY_SIGN_UP = {
    username: string;
    password: string;
    confirmPassword: string;
    deviceKey: string;
}