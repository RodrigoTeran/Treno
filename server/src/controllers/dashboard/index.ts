import { RESPONSE_DATA } from "../../types/routes.types";
import { Request, Response } from "express";
import { BODY_LINK_DEVICE, BODY_CHANGE_PLACE_DEVICE } from "./dashboard.types";
import { selectDevicesByKey, addFktoDevice, changePlaceDevice } from "../auth/auth.queries";
import { pool } from "../../db/index";
import { USER } from "../../types/users.types";

export const linkDevice = async (req: Request, res: Response) => {
    const response: RESPONSE_DATA = {
        isAuth: false,
        message: "",
        readMsg: true,
        typeMsg: "danger",
        data: null
    };
    try {
        const { key }: BODY_LINK_DEVICE = req.body;
        if (key.trim() === "") {
            response.message = "La clave del dispositivo no está registrada.";
            return res.status(200).json(response);
        }

        const data = await pool.query(selectDevicesByKey(key));
        if (data.rowCount === 0) {
            response.message = "La clave del dispositivo no está registrada.";
            return res.status(200).json(response);
        }

        // Add
        const currUser: USER = req.user;
        await pool.query(addFktoDevice(currUser.id, key));

        // All fine
        response.readMsg = true;
        response.typeMsg = "success";
        response.isAuth = true;
        response.message = "Dispositivo enlazado correctamente!"
        res.status(200).json(response);

    } catch (error) {
        console.error(error);
        response.message = "Error del servidor."
        res.status(500).json(response);
    }
}

export const changeDevicePlace = async (req: Request, res: Response) => {
    const response: RESPONSE_DATA = {
        isAuth: false,
        message: "",
        readMsg: true,
        typeMsg: "danger",
        data: null
    };
    try {
        const { key, newPlace }: BODY_CHANGE_PLACE_DEVICE = req.body;
        if (key.trim() === "" || newPlace.trim() === "") {
            response.message = "La clave del dispositivo no está registrada.";
            return res.status(200).json(response);
        }

        const data = await pool.query(selectDevicesByKey(key));
        if (data.rowCount === 0) {
            response.message = "La clave del dispositivo no está registrada.";
            return res.status(200).json(response);
        }

        // Update
        await pool.query(changePlaceDevice(newPlace, key));

        // All fine
        response.readMsg = true;
        response.typeMsg = "success";
        response.isAuth = true;
        response.message = "Actualizada la posición del dispositivo con éxito!"
        res.status(200).json(response);

    } catch (error) {
        console.error(error);
        response.message = "Error del servidor."
        res.status(500).json(response);
    }
}
