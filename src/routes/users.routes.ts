import { Router, Request, Response } from "express";
import { check } from "express-validator";
import { validatefield, validateDocument, validateID, validateIDUser } from "../middlewares/validar-campos"
import { userDelete, userGet, userPost, userPut } from "../controllers/users.controller";

const router = Router();

router.post("/api/v1/user", [
    check("fullName", "El nombre y apellido son obligatorios").notEmpty(),
    check("email", "El valor ingresado es nulo o no corresponde a un correo real").isEmail(),
    check("password", "La contraseña es obligatoria y debe tener mas de cinco caracteres").isLength({ min: 6, max: 13 }),
    check("rol", "El rol es obligatorio"),
    validatefield
], userPost)

router.get("/api/v1/user", userGet)

router.put("/api/v1/user/:id", [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(validateIDUser),
    validatefield
], userPut)

router.delete("/api/v1/user/:id", [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(validateIDUser),
    validatefield
], userDelete)


export = router
