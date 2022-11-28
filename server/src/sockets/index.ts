import { ServerToClientEvents, ClientToServerEvents } from "../types/socket.types";
import { Socket } from "socket.io";
import { RESPONSE_DATA } from "../types/routes.types";
import { pool } from "../db/index";
import { selectDevicesByClientId, getStatusDevices, getLastSignal } from "../controllers/dashboard/dashboard.queries";
import { DATA_GET_DEVICES, DATA_GET_STATUS, DATA_GET_STATS } from "../controllers/dashboard/dashboard.types";
import { DEVICE, SIGNAL } from "../types/devices.types";

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

        // Get stats from signals
        socket.on("get stats", async (key: string) => {
            const response: RESPONSE_DATA = {
                isAuth: false,
                message: "",
                readMsg: true,
                typeMsg: "danger",
                data: null
            };
            try {
                if (!key) return;

                key = key.toString();
                if (key.trim() === "") return;
                const dataLastSignal = await pool.query(getLastSignal(key));
                let lastSignal: SIGNAL | null = null;

                if (dataLastSignal.rows.length > 0) {
                    lastSignal = dataLastSignal.rows[0];
                };

                const data: DATA_GET_STATS = {
                    lastSignal,
                    percentagePet: 0
                };

                response.data = data;

                // All fine
                response.readMsg = false;
                response.typeMsg = "success";
                response.isAuth = true;
                response.message = "";

                socket.emit("get stats", response)

            } catch (error) {
                console.error(error);
                response.message = "Error del servidor."
                socket.emit("get stats", response)
            }
        });
    } catch (error) {
        console.error(error);
    }
}


