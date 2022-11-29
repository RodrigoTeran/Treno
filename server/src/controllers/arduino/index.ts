import { Request, Response } from "express";
import { pool } from "../../db/index";
import { updateStatusDeviceByKey, selectDevicesByClientId, getStatusDevices, insertSignal } from "../dashboard/dashboard.queries";
import { selectDevicesByKey, selectClientById } from "../auth/auth.queries";
import { DEVICE } from "../../types/devices.types";
import { io } from "../../server";
import { RESPONSE_DATA } from "../../types/routes.types";
import { USER } from "../../types/users.types";
import { DATA_GET_DEVICES, DATA_GET_STATUS } from "../dashboard/dashboard.types";

export const chill = async (client: USER, client_id: number) => {
    console.log("chill")
    const responseDevices: RESPONSE_DATA = {
        isAuth: false,
        message: "",
        readMsg: true,
        typeMsg: "danger",
        data: null
    };

    try {
        const clientId: number = client.id;

        const dataResponse = await pool.query(selectDevicesByClientId(clientId));
        const data: DATA_GET_DEVICES = {
            devices: dataResponse.rows
        };

        responseDevices.data = data;

        // All fine
        responseDevices.readMsg = false;
        responseDevices.typeMsg = "success";
        responseDevices.isAuth = true;
        responseDevices.message = "";

        io.to(clientId.toString()).emit("get devices", responseDevices);

    } catch (error) {
        console.error(error);
        responseDevices.message = "Error del servidor."
        io.to(client_id.toString()).emit("get devices", responseDevices);
    }

    const responseStatus: RESPONSE_DATA = {
        isAuth: false,
        message: "",
        readMsg: true,
        typeMsg: "danger",
        data: null
    };
    try {
        const dataResponse = await pool.query(getStatusDevices(client_id));
        const isBehavingBad: boolean = dataResponse.rows.length > 0;

        let room: DEVICE | null = null;
        if (isBehavingBad) {
            room = dataResponse.rows[0];
        }

        const data: DATA_GET_STATUS = {
            isBehavingBad,
            room
        };

        responseStatus.data = data;

        // All fine
        responseStatus.readMsg = false;
        responseStatus.typeMsg = "success";
        responseStatus.isAuth = true;
        responseStatus.message = "";

        io.to(client_id.toString()).emit("get status", responseStatus);

    } catch (error) {
        console.error(error);
        responseStatus.message = "Error del servidor."
        io.to(client_id.toString()).emit("get status", responseStatus);
    }
}

export const createSignal = async (req: Request, res: Response) => {
    try {
        const { key }: any = req.params;
        if (!key) return;
        if (key.trim() === "") return;

        res.json({
            msg: key
        });

        await pool.query(updateStatusDeviceByKey(key, true));

        const devices = await pool.query(selectDevicesByKey(key));
        if (devices.rows.length === 0) return;
        const device: DEVICE = devices.rows[0];
        const client_id: number = parseInt(device.client_id);

        if (isNaN(client_id)) return;
        const clients = await pool.query(selectClientById(client_id));
        if (clients.rows.length === 0) return;

        // Create signal
        await pool.query(insertSignal(key));

        const client: USER = clients.rows[0];

        console.log("key:", key);
        console.log("client:", client);
        console.log("device:", device);

        await chill(client, client_id);

    } catch (error) {
        console.error(error);
    }
}