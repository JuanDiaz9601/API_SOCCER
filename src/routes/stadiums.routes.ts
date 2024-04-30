import {Router, Request, Response} from "express"
import {check} from "express-validator"
import { validateDocumentStadiums, validateIDStadiums, validatefield } from "../middlewares/validar-campos"
import { stadiumsDelete, stadiumsGet, stadiumsPost, stadiumsPut } from "../controllers/stadiums.controller"

const router = Router()

router.post("/api/v1/stadium",[
    check("name", "El nombre del equipo es obligatorio").notEmpty(), 
    check("location", "La posición es obligatoria").notEmpty(),
    check("since", "La fecha de creacion del equipo es obligatoria").notEmpty(),
    check("documentNumber", "El numero de identificación es obligatorio").custom(validateDocumentStadiums), 
validatefield 
], stadiumsPost)

router.get("/api/v1/stadium", stadiumsGet)

router.put("/api/v1/stadium/:id", [
check("id", "No es un ID valido").isMongoId(),
check("id").custom(validateIDStadiums),
validatefield
], stadiumsPut)

router.delete("/api/v1/stadium/:id",[
check("id", "No es un ID valido").isMongoId(),
check("id").custom(validateIDStadiums),
validatefield
], stadiumsDelete)

export = router