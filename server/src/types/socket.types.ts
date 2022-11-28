import { RESPONSE_DATA } from "../types/routes.types";

// emits
export interface ServerToClientEvents {
    'get devices': (data: RESPONSE_DATA) => void;
    'get status': (data: RESPONSE_DATA) => void;
    'get stats': (data: RESPONSE_DATA) => void;
}

// on
export interface ClientToServerEvents {
    'get devices': () => void;
    'get status': () => void;
    'get stats': (key: string) => void;
}
