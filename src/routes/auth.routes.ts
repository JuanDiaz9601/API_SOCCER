import { Router, Request, Response } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.controller";
import { validatefield } from "../middlewares/validar-campos";

const router = Router()

router.post("/api/v1/login", [
    check("email", "El valor ingresado es nulo o no corresponde a un correo real").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validatefield
], login)

export = router;