import { DEVICE } from "../types/devices.types";
import { RESPONSE_DATA } from "../routes/index.routes";


export interface GET_DEVICES_DATA {
    devices: Array<DEVICE>;
}

interface RESPONSE_DATA_SOCKET extends RESPONSE_DATA {
    data: GET_DEVICES_DATA
}

// on
export interface ServerToClientEvents {
    'get devices': (data: RESPONSE_DATA_SOCKET) => void;
}

// emits
export interface ClientToServerEvents {
    'get devices': () => void;
}
