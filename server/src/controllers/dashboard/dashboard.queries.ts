export const selectDevicesByClientId = (client_id: number) => {
    return {
        name: 'select-devices-by-client_id',
        text: 'SELECT * FROM devices WHERE client_id = $1;',
        values: [client_id]
    }
};

export const getStatusDevices = (client_id: number) => {
    return {
        name: 'get-status-devices',
        text: 'SELECT * FROM devices WHERE client_id = $1 AND state = TRUE;',
        values: [client_id]
    }
};

export const getLastSignal = (key: string) => {
    return {
        name: 'get-last-signal',
        text: 'SELECT * FROM signals WHERE device_key = $1 ORDER BY created_at LIMIT 1;',
        values: [key]
    }
};

export const getAllDevices = () => {
    return {
        name: 'get-all-devices',
        text: 'SELECT * FROM devices;',
    }
};

export const updateStatusDeviceByKey = (key: string, status: boolean) => {
    return {
        name: 'update-device-status-by-key',
        text: 'UPDATE devices SET state = $1 WHERE key = $2;',
        values: [status, key]
    }
};