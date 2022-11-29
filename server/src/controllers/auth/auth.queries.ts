export const selectClientsByUsername = (username: string) => {
    return {
        name: 'get-clients-by-username',
        text: 'SELECT * FROM clients WHERE username = $1 LIMIT 1;',
        values: [username]
    }
};

export const selectDevicesByKey = (key: string) => {
    return {
        name: 'select-devices-by-key',
        text: 'SELECT * FROM devices WHERE key = $1 LIMIT 1;',
        values: [key]
    }
};

export const createNewClient = (username: string, password: string) => {
    return {
        name: 'insert-new-client',
        text: 'INSERT INTO clients(username, pwd) VALUES($1, $2);',
        values: [username, password]
    }
};

export const addFktoDevice = (client_id: number, key: string) => {
    return {
        name: 'link-client-and-device',
        text: 'UPDATE devices SET client_id = $1 WHERE key = $2;',
        values: [client_id, key]
    }
};

export const changePlaceDevice = (place: string, key: string) => {
    return {
        name: 'update-place-device',
        text: 'UPDATE devices SET place = $1 WHERE key = $2;',
        values: [place, key]
    }
};

export const selectClientById = (id: number) => {
    return {
        name: 'get-client-by-id',
        text: 'SELECT * FROM clients WHERE id = $1 LIMIT 1;',
        values: [id]
    }
};