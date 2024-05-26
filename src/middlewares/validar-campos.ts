import { validationResult } from "express-validator"
import { Request, Response } from 'express';
import Player from "../models/player.model";
import Team from "../models/teams.model";
import Stadium from "../models/stadium.model";
import User from "../models/user.model";

export const validatefield = (req: Request, res: Response, next: Function) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next()
}

export const validateDocument = async (documentNumber: Request) => {
    const usedDocument = await Player.findOne({ documentNumber })
    if (usedDocument) {
        throw new Error(`El numero de documento ${documentNumber} ya se encuentra registrado`)
    }
}

export const validateID = async (id: Request) => {
    const playerID = await Player.findById(id)
    if (!playerID) {
        throw new Error(`El usuario con el ${id} no existe en la base de datos`)
    }
}

export const validateIDUser = async (id: Request) => {
    const userID = await User.findById(id)
    if (!userID) {
        throw new Error(`El usuario con el ${id} no existe en la base de datos`)
    }
}

export const validateDocumentTeams = async (documentNumber: Request) => {
    const usedDocument = await Team.findOne({ documentNumber })
    if (usedDocument) {
        throw new Error(`El numero de documento ${documentNumber} ya se encuentra registrado`)
    }
}

export const validateIDTeams = async (id: Request) => {
    const playerID = await Team.findById(id)
    if (!playerID) {
        throw new Error(`El usuario con el ${id} no existe en la base de datos`)
    }
}

export const validateDocumentStadiums = async (documentNumber: Request) => {
    const usedDocument = await Stadium.findOne({ documentNumber })
    if (usedDocument) {
        throw new Error(`El numero de documento ${documentNumber} ya se encuentra registrado`)
    }
}

export const validateIDStadiums = async (id: Request) => {
    const playerID = await Stadium.findById(id)
    if (!playerID) {
        throw new Error(`El usuario con el ${id} no existe en la base de datos`)
    }
}




//export = {validatefield, validateDocument}