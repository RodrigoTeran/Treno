import { RESPONSE_DATA } from "../types/routes.types";

// on
export interface ServerToClientEvents {
    'get devices': (data: RESPONSE_DATA) => void;
}

// emits
export interface ClientToServerEvents {
    'get devices': () => void;
}
