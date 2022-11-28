import { DEVICE, SIGNAL } from "../types/devices.types";
import { RESPONSE_DATA } from "../routes/index.routes";


export interface GET_DEVICES_DATA {
    devices: Array<DEVICE>;
}

export interface GET_STATUS_DATA {
    isBehavingBad: boolean,
    room: DEVICE | null
}

export interface GET_STATS_DATA {
    lastSignal: SIGNAL | null,
    percentagePet: number
}

interface RESPONSE_DATA_SOCKET_GET_DEVICE_DATA extends RESPONSE_DATA {
    data: GET_DEVICES_DATA
}

interface RESPONSE_DATA_SOCKET_GET_STATUS_DATA extends RESPONSE_DATA {
    data: GET_STATUS_DATA
}

interface RESPONSE_DATA_SOCKET_GET_STATS_DATA extends RESPONSE_DATA {
    data: GET_STATS_DATA
}

// on
export interface ServerToClientEvents {
    'get devices': (data: RESPONSE_DATA_SOCKET_GET_DEVICE_DATA) => void;
    'get status': (data: RESPONSE_DATA_SOCKET_GET_STATUS_DATA) => void;
    'get stats': (data: RESPONSE_DATA_SOCKET_GET_STATS_DATA) => void;
}

// emits
export interface ClientToServerEvents {
    'get devices': () => void;
    'get status': () => void;
    'get stats': (key: string) => void;
}
