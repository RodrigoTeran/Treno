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