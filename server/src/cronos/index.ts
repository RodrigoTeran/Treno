import cron from "node-cron";
import { pool } from "../db/index";
import { getLastSignal, getAllDevices, updateStatusDeviceByKey } from "../controllers/dashboard/dashboard.queries";
import { selectClientById } from "../controllers/auth/auth.queries";

import { DEVICE, SIGNAL } from "../types/devices.types";
import { USER } from "../types/users.types";
import { chill } from "../controllers/arduino/index";

const diffMinutes = (dt2: Date, dt1: Date): number => {
    let diff: number = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
};

const checkState = async (devices: Array<DEVICE>, index: number) => {
    // Check
    const device: DEVICE = devices[index];
    const signalData = await pool.query(getLastSignal(device.key));
    if (signalData.rows.length !== 0 && device.state) {
        const signal: SIGNAL = signalData.rows[0];
        const diff: number = diffMinutes(new Date(), signal.created_at);
        if (diff >= 1) {
            // Update to false
            await pool.query(updateStatusDeviceByKey(device.key, false));
            const users = await pool.query(selectClientById(parseInt(device.client_id)));
            if (users.rows.length === 0) return;
            const client: USER = users.rows[0];
            console.log("client:", client);
            await chill(client, client.id);
        }
    }

    index += 1;
    if (devices.length === index) return;
    await checkState(devices, index);
}

export const timerMin = () => {
    cron.schedule("* * * * *", async () => {
        // Update states
        console.log("cronos");
        const allDevicesData = await pool.query(getAllDevices());
        const devices: Array<DEVICE> = allDevicesData.rows;

        if (devices.length === 0) return;
        await checkState(devices, 0);
    });
};
