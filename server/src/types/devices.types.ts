export type DEVICE = {
    id: number;
    key: string;
    icon: string | null;
    place: string | null;
    client_id: string | null;
    state: boolean
    created_at: Date
}

export type SIGNAL = {
    id: number;
    device_key: string;
    created_at: Date
}