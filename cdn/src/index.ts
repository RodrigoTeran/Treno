import dotenv from "dotenv";
dotenv.config();

import { app } from "./server";
import { connectDatabse } from "./database";

connectDatabse();

app.listen(app.get("port"), () => {
    console.log("Server on port:", app.get("port"));
    console.log("Origin:", process.env.CLIENT_URL);
});
