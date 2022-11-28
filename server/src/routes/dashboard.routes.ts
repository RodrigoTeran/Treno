// prev -> dashboard/

import express from "express";
const router = express.Router();

// Controllers
import { linkDevice } from "../controllers/dashboard/index";

// Middlewares
import { authenticate } from "../middlewares/auth.middleware";

router.post("/link-device", authenticate, linkDevice);

export default router;
