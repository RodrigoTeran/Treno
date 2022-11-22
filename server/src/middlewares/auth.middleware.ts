import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { RESPONSE_DATA } from "../types/routes.types";
import { pool } from "../db/index";
import { USER } from "../types/users.types";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const response: RESPONSE_DATA = {
        isAuth: false,
        message: "",
        readMsg: true,
        typeMsg: "danger",
        data: null
    };
    try {
        const cookie = req.cookies["jwt"];

        if (!cookie) {
            response.message = "Sin sesión";
            return res.status(200).json(response);
        }

        const claims: any = jwt.verify(cookie, process.env.JWT_SECRET);

        if (!claims) {
            response.message = "Sin sesión";
            return res.status(200).json(response);

        }

        const claimId = claims._id;

        // User auth
        const data = await pool.query(`SELECT * FROM users WHERE id = '${claimId}' LIMIT 1;`);
        if (data.rowCount === 0) {
            response.message = "Sin sesión";
            return res.status(200).json(response);
        }

        const currUser: USER = data.rows[0];
        req.user = currUser;

        next();
    } catch (error) {
        console.error(error);

        // Send Error
        response.data = null;
        response.isAuth = false;
        response.message = error.message;
        response.readMsg = true;
        response.typeMsg = "danger";
        res.status(500).json(response);
    }
};
