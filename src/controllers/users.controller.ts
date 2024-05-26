import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
// porque con el import no reconoce la libreria?

export const userPost = async (req: Request, res: Response) => {

    const { fullName, email, password, rol } = req.body
    const newUser = new User({ fullName, email, password, rol })

    //Encriptar la contraseña
    const turns = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password, turns);

    await newUser.save();
    res.json({ newUser })
}

export const userGet = async (req: Request, res: Response) => {

    const { limit = 10, start = 0 } = req.query;
    const query = { state: true }

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).limit(Number(limit)).skip(Number(start))
    ])
    res.json({ total, users })
}

export const userPut = async (req: Request, res: Response) => {

    const { id } = req.params
    const { __v, _id, email, state, ...rest } = req.body

    const userUpdate = await User.findByIdAndUpdate(id, rest)

    res.json(userUpdate);
}

export const userDelete = async (req: Request, res: Response) => {
    const { id } = req.params

    const userDelete = await User.findByIdAndUpdate(id, { state: false })

    res.json(userDelete);
}

