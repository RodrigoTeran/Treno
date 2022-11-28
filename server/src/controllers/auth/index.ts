import { RESPONSE_DATA } from "../../types/routes.types";
import { BODY_LOG_IN, BODY_SIGN_UP } from "./auth.types";
import { pool } from "../../db/index";
import { selectClientsByUsername, selectDevicesByKey, createNewClient, addFktoDevice } from "./auth.queries";
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

        const data = await pool.query(selectClientsByUsername(username));
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

export const signUp = async (req: Request, res: Response) => {
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
            password,
            deviceKey,
            confirmPassword
        }: BODY_SIGN_UP = req.body;

        if (username.trim() == "" || password.trim() == "" || deviceKey.trim() == "" || confirmPassword.trim() == "") {
            response.message = "La información está incompleta.";
            return res.status(200).json(response);
        }

        if (password !== confirmPassword) {
            response.message = "Las contraseñas no coinciden.";
            return res.status(200).json(response);
        }

        const dataUsers = await pool.query(selectClientsByUsername(username));
        if (dataUsers.rowCount > 0) {
            response.message = "El nombre de usuario ya está registrado.";
            return res.status(200).json(response);
        }

        // Check for device key
        const dataDevices = await pool.query(selectDevicesByKey(deviceKey));
        if (dataDevices.rowCount === 0) {
            response.message = "La clave del dispositivo no está registrada.";
            return res.status(200).json(response);
        }

        // Create new user
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(password, salt);
        await pool.query(createNewClient(username, hashedPassword));

        const dataNewUser = await pool.query(selectClientsByUsername(username));
        const currUser: USER = dataNewUser.rows[0];

        // Link device and user
        await pool.query(addFktoDevice(currUser.id, deviceKey));

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