import { RESPONSE_DATA } from "../../types/routes.types";
import { BODY_LOG_IN } from "./auth.types";
import { pool } from "../../db/index";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { USER } from "../../types/users.types";
import jwt from "jsonwebtoken";

export const logIn = async (req: Request, res: Response) => {
    const response: RESPONSE_DATA = {
        isAuth: false,
        message: "",
        readMsg: true,
        typeMsg: "danger",
        data: null
    };
    try {
        const {
            username,
            password
        }: BODY_LOG_IN = req.body;

        if (username.trim() == "" || password.trim() == "") {
            response.message = "El nombre de usuario y/o la contraseña son incorrectos.";
            return res.status(200).json(response);
        }

        const data = await pool.query(`SELECT * FROM users WHERE username = '${username}' LIMIT 1;`);
        if (data.rowCount === 0) {
            response.message = "El nombre de usuario y/o la contraseña son incorrectos.";
            return res.status(200).json(response);
        }

        // It always needs to be at least one
        const currUser: USER = data.rows[0];
        const currPwd = currUser.pwd;

        // Check password
        const comparison = await bcrypt.compare(password, currPwd);
        if (!comparison) {
            response.message = "El nombre de usuario y/o la contraseña son incorrectos.";
            return res.status(200).json(response);
        }

        // Create cookie
        const token = jwt.sign({ _id: currUser.id }, process.env.JWT_SECRET);

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: true,
            sameSite: "none"
        });

        // All fine
        response.readMsg = false;
        response.typeMsg = "success";
        response.isAuth = true;
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        response.message = "Error del servidor."
        res.status(500).json(response);
    }
};

// Protected
export const getUser = (req: Request, res: Response) => {
    const response: RESPONSE_DATA = {
        isAuth: true,
        message: "",
        readMsg: false,
        typeMsg: "success",
        data: null
    };
    try {
        // So Password if not sent
        let userData: Partial<USER> = req.user;
        delete userData["pwd"];
        delete userData["created_at"];

        response.data = {
            user: userData
        };

        res.status(200).json(response);

    } catch (error) {
        console.error(error);
        response.isAuth = false;
        response.message = "Error del servidor."
        response.readMsg = true;
        response.typeMsg = "danger";
        res.status(500).json(response);
    };
}
export const logOut = (_: Request, res: Response) => {
    const response: RESPONSE_DATA = {
        isAuth: false,
        message: "",
        readMsg: false,
        typeMsg: "success",
        data: null
    };
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            maxAge: 0,
            secure: true,
            sameSite: "none"
        });
        
        res.status(200).json(response);

    } catch (error) {
        console.error(error);
        response.isAuth = false;
        response.message = "Error del servidor."
        response.readMsg = true;
        response.typeMsg = "danger";
        res.status(500).json(response);
    };
}