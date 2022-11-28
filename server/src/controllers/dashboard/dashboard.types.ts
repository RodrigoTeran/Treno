import { DEVICE } from "../../types/devices.types";

export type BODY_LINK_DEVICE = {
    key: string;
}

export type DATA_GET_DEVICES = {
    devices: Array<DEVICE>
}