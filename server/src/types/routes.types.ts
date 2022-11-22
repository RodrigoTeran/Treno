export interface RESPONSE_DATA {
    isAuth: boolean;
    message: string;
    readMsg: boolean;
    typeMsg: "success" | "danger" | "info";
    data: any;
}