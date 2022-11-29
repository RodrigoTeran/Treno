import { Request, Response } from "express";
import { pool } from "../../db/index";
import { updateStatusDeviceByKey } from "../dashboard/dashboard.queries";
import { selectDevicesByKey, selectClientById } from "../auth/auth.queries";
import { DEVICE } from "../../types/devices.types";

export const createSignal = async (req: Request, _: Response) => {
    try {
        console.log("llegó xd")
        const { key }: any = req.params;
        if (!key) return;
        if (key.trim() === "") return;

        await pool.query(updateStatusDeviceByKey(key, true));

        const devices = await pool.query(selectDevicesByKey(key));
        if (devices.rows.length === 0) return;
        const device: DEVICE = devices.rows[0];
        const client_id: number = parseInt(device.client_id);

        if (isNaN(client_id)) return;
        const client = await pool.query(selectClientById(client_id));

        console.log("key:", key);
        console.log("client:", client);
        console.log("device:", device);

    } catch (error) {
        console.error(error);
    }
}