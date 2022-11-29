import cron from "node-cron";
import { pool } from "../db/index";
import { getLastSignal, getAllDevices, updateStatusDeviceByKey } from "../controllers/dashboard/dashboard.queries";
import { DEVICE, SIGNAL } from "../types/devices.types";

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
        const signal: SIGNAL = signalData[0];
        const diff: number = diffMinutes(new Date(), signal.created_at);
        if (diff >= 5) {
            // Update to false
            await pool.query(updateStatusDeviceByKey(device.key, false));
        }
    }

    index += 1;
    if (devices.length === index) return;
    await checkState(devices, index);
}

export const timerMin = () => {
    cron.schedule("*/5 * * * *", async () => {
        // Update states
        const allDevicesData = await pool.query(getAllDevices());
        const devices: Array<DEVICE> = allDevicesData.rows;

        if (devices.length === 0) return;
        await checkState(devices, 0);
    });
};
