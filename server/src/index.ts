import dotenv from "dotenv";
dotenv.config();

import { app, server } from "./server";
import { timerMin } from "./cronos/index";

async function main() {
    try {
        server.listen(app.get("port"));
        timerMin();
        console.log(`Server on port: ${app.get("port")}`);
    } catch (error) {
        console.error(`Unable to connect: ${error}`);
    }
}

main();