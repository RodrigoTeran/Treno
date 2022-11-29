import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./types/socket.types";

export const app = express();
export const server = http.createServer(app);
export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents
>(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true
  }
});

app.set("port", process.env.PORT);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true
  })
);

// Routes
import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import arduinoRoutes from "./routes/arduino.routes";
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/arduino", arduinoRoutes);

// Socket Io
import { manageSocketConnection } from "./sockets/index";

io.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
  manageSocketConnection(socket);
});
