import { Router, Request, Response } from "express";
import { check } from "express-validator"
import { playerDelete, playerGet, playerPost, playerPut } from "../controllers/players.controllers";
import {validatefield, validateDocument, validateID} from "../middlewares/validar-campos"


const router = Router();

router.post("/api/v1/player", [
check("fullName", "El nombre y apellido son obligatorios").notEmpty(), 
check("position", "La posición es obligatoria").notEmpty(),
check("age", "La edad es obligatoria").notEmpty(),
check("documentNumber", "El dumento es obligatorio").custom(validateDocument), 
validatefield     
],playerPost)

router.get("/api/v1/player", playerGet)

router.put("/api/v1/player/:id",[
check("id", "No es un ID valido").isMongoId(),
check("id").custom(validateID),
validatefield
], playerPut)

router.delete("/api/v1/player/:id",[
check("id", "No es un ID valido").isMongoId(),
check("id").custom(validateID),
validatefield
], playerDelete)

export = router