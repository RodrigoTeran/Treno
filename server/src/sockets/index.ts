import { ServerToClientEvents, ClientToServerEvents } from "../types/socket.types";
import { Socket } from "socket.io";
import { RESPONSE_DATA } from "../types/routes.types";
import { pool } from "../db/index";
import { selectDevicesByClientId } from "../controllers/dashboard/dashboard.queries";
import { DATA_GET_DEVICES } from "../controllers/dashboard/dashboard.types";

export const manageSocketConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    try {
        const clientId: any = socket.handshake.query.clientId;
        socket.join(clientId);
        console.log("clientId:", clientId);
        const rooms: Array<string> = Array.from(socket.rooms);
        console.log("rooms: ", rooms);

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
                console.log("rooms: ", rooms);
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



    } catch (error) {
        console.error(error);
    }
}


