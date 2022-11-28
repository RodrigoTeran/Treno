import { DEVICE } from "../../types/devices.types";

export type BODY_LINK_DEVICE = {
    key: string;
}

export type BODY_CHANGE_PLACE_DEVICE = {
    key: string;
    newPlace: string
}

export type DATA_GET_DEVICES = {
    devices: Array<DEVICE>
}

export type DATA_GET_STATUS = {
    isBehavingBad: boolean,
    room: DEVICE | null
}