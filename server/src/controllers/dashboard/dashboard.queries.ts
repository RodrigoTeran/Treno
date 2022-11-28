export const selectDevicesByClientId = (client_id: number) => {
    return {
        name: 'select-devices-by-client_id',
        text: 'SELECT * FROM devices WHERE client_id = $1;',
        values: [client_id]
    }
};