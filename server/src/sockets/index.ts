import { ServerToClientEvents, ClientToServerEvents } from "../types/socket.types";
import { Socket } from "socket.io";
import { RESPONSE_DATA } from "../types/routes.types";
import { pool } from "../db/index";
import { selectDevicesByClientId, getStatusDevices } from "../controllers/dashboard/dashboard.queries";
import { DATA_GET_DEVICES, DATA_GET_STATUS } from "../controllers/dashboard/dashboard.types";
import { DEVICE } from "../types/devices.types";

export const manageSocketConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    try {
        const clientId: any = socket.handshake.query.clientId;
        socket.join(clientId);

        // Get devices
        socket.on("get devices", async () => {
            const response: RESPONSE_DATA = {
                isAuth: false,
                message: "",
                readMsg: true,
                typeMsg: "danger",
                data: null
            };
            try {
                const rooms: Array<string> = Array.from(socket.rooms);
                if (rooms.length < 1) return;

                const clientId: number = parseInt(rooms[1]);

                const dataResponse = await pool.query(selectDevicesByClientId(clientId));
                const data: DATA_GET_DEVICES = {
                    devices: dataResponse.rows
                };

                response.data = data;

                // All fine
                response.readMsg = false;
                response.typeMsg = "success";
                response.isAuth = true;
                response.message = "";

                socket.emit("get devices", response)

            } catch (error) {
                console.error(error);
                response.message = "Error del servidor."
                socket.emit("get devices", response)
            }
        });

        // Get status
        socket.on("get status", async () => {
            const response: RESPONSE_DATA = {
                isAuth: false,
                message: "",
                readMsg: true,
                typeMsg: "danger",
                data: null
            };
            try {
                const rooms: Array<string> = Array.from(socket.rooms);
                if (rooms.length < 1) return;

                const clientId: number = parseInt(rooms[1]);

                const dataResponse = await pool.query(getStatusDevices(clientId));
                const isBehavingBad: boolean = dataResponse.rows.length > 0;

                let room: DEVICE | null = null;
                if (isBehavingBad) {
                    room = dataResponse.rows[0];
                }

                const data: DATA_GET_STATUS = {
                    isBehavingBad,
                    room
                };

                response.data = data;

                // All fine
                response.readMsg = false;
                response.typeMsg = "success";
                response.isAuth = true;
                response.message = "";

                socket.emit("get status", response)

            } catch (error) {
                console.error(error);
                response.message = "Error del servidor."
                socket.emit("get status", response)
            }
        });

        // // Get status
        // socket.on("get stats", async () => {
        //     const response: RESPONSE_DATA = {
        //         isAuth: false,
        //         message: "",
        //         readMsg: true,
        //         typeMsg: "danger",
        //         data: null
        //     };
        //     try {
        //         const rooms: Array<string> = Array.from(socket.rooms);
        //         if (rooms.length < 1) return;

        //         const clientId: number = parseInt(rooms[1]);

        //         const dataResponse = await pool.query(getStatusDevices(clientId));
        //         const isBehavingBad: boolean = dataResponse.rows.length > 0;

        //         let room: DEVICE | null = null;
        //         if (isBehavingBad) {
        //             room = dataResponse.rows[0];
        //         }

        //         const data: DATA_GET_STATUS = {
        //             isBehavingBad,
        //             room
        //         };

        //         response.data = data;

        //         // All fine
        //         response.readMsg = false;
        //         response.typeMsg = "success";
        //         response.isAuth = true;
        //         response.message = "";

        //         socket.emit("get status", response)

        //     } catch (error) {
        //         console.error(error);
        //         response.message = "Error del servidor."
        //         socket.emit("get status", response)
        //     }
        // });
    } catch (error) {
        console.error(error);
    }
}


