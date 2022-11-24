export type TYPE_MSG = "success" | "danger" | "info";

export type MESSAGE = {
    msg: string;
    type: TYPE_MSG;
    index: number;
}