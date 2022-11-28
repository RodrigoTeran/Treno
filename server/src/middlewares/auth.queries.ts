export const selectClientsById = (id: string) => {
    return {
        name: 'get-clients-by-id',
        text: 'SELECT * FROM clients WHERE id = $1 LIMIT 1;',
        values: [id]
    }
};