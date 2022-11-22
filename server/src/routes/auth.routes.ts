// prev -> auth/

import express from "express";
import { RESPONSE_DATA } from "../types/routes.types";
const router = express.Router();

export interface GET_USER_DATA {
    id: string;
    name: string
}

router.get("/get-user", (req, res) => {
    const response: RESPONSE_DATA = {
        msg: "Todo bien pa",
        data: {},
        isAuth: false
    }

    res.json(response);
});

export default router;
