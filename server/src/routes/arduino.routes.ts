// prev -> arduino/

import express from "express";
const router = express.Router();

// Controllers
import { createSignal } from "../controllers/arduino/index";

router.get("/signal/:key", createSignal);

export default router;
