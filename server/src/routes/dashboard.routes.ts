// prev -> dashboard/

import express from "express";
const router = express.Router();

// Controllers
import { linkDevice, changeDevicePlace } from "../controllers/dashboard/index";

// Middlewares
import { authenticate } from "../middlewares/auth.middleware";

router.post("/link-device", authenticate, linkDevice);
router.put("/edit-device-name", authenticate, changeDevicePlace);

export default router;
