// prev -> auth/

import express from "express";
const router = express.Router();

// Controllers
import { logIn, getUser } from "../controllers/auth/index";

// Middlewares
import { authenticate } from "../middlewares/auth.middleware";

router.put("/log-in", logIn);
router.get("/get-user", authenticate, getUser);

export default router;
