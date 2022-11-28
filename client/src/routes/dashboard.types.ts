import { REQUEST } from './index.routes';
import { DEVICE } from "../types/devices.types";

export const getDevices: REQUEST = {
    url: `${process.env.REACT_APP_API_URI}/dashboard/get-devices`,
    method: 'get',
};

export interface GET_DEVICES_DATA {
    devices: Array<DEVICE>
}

export const linkDevice: REQUEST = {
    url: `${process.env.REACT_APP_API_URI}/dashboard/link-device`,
    method: 'post',
};

export interface LINK_DEVICE_BODY {
    key: string;
}
