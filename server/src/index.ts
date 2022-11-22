import dotenv from "dotenv";
dotenv.config();

import { app } from "./server";

async function main() {
    try {
        app.listen(app.get("port"));
        console.log(`Server on port: ${app.get("port")}`);
    } catch (error) {
        console.error(`Unable to connect: ${error}`);
    }
}

main();