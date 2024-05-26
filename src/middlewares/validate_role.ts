import { NextFunction, Request, Response } from "express";

const validateRol = (req: any, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(500).json({
            msn: "Se quiere verificar el rol sin validar el token primero"
        })
    }

    const { rol, fullName } = req.user
    if (rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            msn: "No es administrador"
        });
    }
    next()
}



export = validateRol