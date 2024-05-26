import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

//
interface JwtPayload {
    uid: string;
}

const validateJWT = async (req: any, res: Response, next: NextFunction) => {
    //el header espera como argumento el nombre de la key en los headers, con el if validarmos si la req.header contiene un valor o token
    const token = req.header("x-token")
    if (!token) {
        return res.status(401).json({
            msn: "No hay un token en la petición"
        })
    }
    try {
        //validar que el token sea valido
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY as string) as JwtPayload;
        //validar si el usuario existe
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                msn: "Token no valido - usuario no existe en DB",
            });
        } else if (!user.state) {
            return res.status(401).json({
                msn: "Token no valido - usuario inactivo en DB",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msn: "Token no valido"
        })
    }
}

export = validateJWT