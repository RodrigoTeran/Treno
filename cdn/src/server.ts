import express from "express";
import cors from "cors";
import Grid from "gridfs-stream";
import mongoose from "mongoose";

export const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        credentials: true
    })
);

// Gridfs
export let gfs;

const connectionMongoDB = mongoose.connection;
connectionMongoDB.once("open", function () {
    gfs = Grid(connectionMongoDB.db, mongoose.mongo);
    gfs.collection("photos");
});

app.set("port", process.env.PORT);

// Routes
import fileRoutes from "./routes/files.routes";
app.use("/files", fileRoutes);
