import { Router, Request, Response } from "express";
import User from "../models/user.model";
import generateJWT from "../helpers/generate_JWT";
const bcryptjs = require("bcryptjs");

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body
    try {
        //Verificar si el email existe
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msn: "El correo ingresado no se encentra registrado"
            })
        }
        //Verificar si el usuario está activo
        if (!user.state) {
            return res.status(400).json({
                msn: "El usuario no se encuentra activo"
            })
        }
        //Verificar contraseña
        const validatePassword = bcryptjs.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msn: "La contrasela ingresada no coincide"
            })
        }
        //Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }


}

