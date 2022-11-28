import { RESPONSE_DATA } from "../types/routes.types";

// on
export interface ServerToClientEvents {
    'get devices': (data: RESPONSE_DATA) => void;
    'get status': (data: RESPONSE_DATA) => void;
    'get stats': (data: RESPONSE_DATA) => void;
}

// emits
export interface ClientToServerEvents {
    'get devices': () => void;
    'get status': () => void;
    'get stats': () => void;
}
