import {Request, Response} from "express"
import Stadium from "../models/stadium.model"

export const stadiumsPost = async (req: Request, res: Response) => {
    const {name, location, documentNumber, since} = req.body


    const newStadium = new Stadium({name, location, documentNumber, since})
    await newStadium.save()
    res.json({newStadium})
}

export const stadiumsGet =  async (req: Request, res: Response) => {

    const {limit = 0, start = 0} = req.query;
    const query = {state: true}

    const [total, stadiums] = await Promise.all([
        Stadium.countDocuments(query),
        Stadium.find(query).limit(Number(limit)).skip(Number(start))
    ])
    res.json({total, stadiums})
}

export const stadiumsPut = async (req: Request, res: Response) => {

    const { id } = req.params
    const {__v, _id, documentNumber, ...rest} = req.body

    const stadiumUpdate = await Stadium.findByIdAndUpdate(id, rest)

    res.json(stadiumUpdate)
}

export const stadiumsDelete = async (req: Request, res: Response) => {
    const { id } = req.params

    const stadium = await Stadium.findByIdAndUpdate(id, {state:false})

    res.json(stadium)
}
