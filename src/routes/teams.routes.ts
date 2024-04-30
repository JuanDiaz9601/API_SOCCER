import { Router, Request, Response } from 'express';
import { check } from "express-validator"
import { addPlayersToTeam, playersDelete, teamsDelete, teamsGet, teamsPost, teamsPut } from '../controllers/teams.controllers';
import { validateDocumentTeams, validateIDTeams, validatefield } from '../middlewares/validar-campos';
import { playerDelete } from '../controllers/players.controllers';


const router = Router()


router.post("/api/v1/teams", [
    check("name", "El nombre del equipo es obligatorio").notEmpty(),
    check("location", "La posición es obligatoria").notEmpty(),
    check("stadium", "El nombre del estadio es obligatorio").notEmpty(),
    check("since", "La fecha de creacion del equipo es obligatoria").notEmpty(),
    check("documentNumber", "El numero de identificación es obligatorio").custom(validateDocumentTeams),
    validatefield
], teamsPost)

router.get("/api/v1/teams", teamsGet)

router.put("/api/v1/teams/:id", [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(validateIDTeams),
    validatefield
], teamsPut)

router.patch("/api/v1/teams/:id", [
    check("id", "No es un ID valido").isMongoId(),
    //check("id").custom(validateIDTeams),
    validatefield
], addPlayersToTeam)

router.patch("/api/v1/teams/player/:id", [
    check("id", "No es un ID valido").isMongoId(),
    //check("id").custom(validateIDTeams),
    validatefield
], playersDelete)

router.delete("/api/v1/teams/:id", [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(validateIDTeams),
    validatefield
], teamsDelete)


export = router