import { Request, Response } from "express";
import Player from "../models/player.model";

export const playerPost = async (req: Request, res: Response) => {

        const {fullName, age, position, documentNumber} = req.body
        const newPlayer = new Player({fullName, age, position, documentNumber})

        await newPlayer.save();
        res.json({newPlayer})  
}

export const playerGet =  async (req: Request, res: Response) => {

    const {limit = 10, start = 0} = req.query;
    const query = {state: true}

    const [total, players] = await Promise.all([
        Player.countDocuments(query),
        Player.find(query).limit(Number(limit)).skip(Number(start))
    ])
    res.json({total, players})
}

export const playerPut = async (req: Request, res: Response) => {

    const { id } = req.params
    const {__v, _id, documentNumber, ...rest} = req.body

    const playerUpdate = await Player.findByIdAndUpdate(id, rest)

    res.json(playerUpdate)
}

export const playerDelete = async (req: Request, res: Response) => {
    const { id } = req.params

    const player = await Player.findByIdAndUpdate(id, {state:false})

    res.json(player)
}

