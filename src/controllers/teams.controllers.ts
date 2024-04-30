import { Request, Response } from "express"
import Team from "../models/teams.model"
import Player from "../models/player.model"

export const teamsPost = async (req: Request, res: Response) => {
    const { name, location, stadium, since, documentNumber } = req.body


    const newTeam = new Team({ name, location, stadium, since, documentNumber })
    await newTeam.save()
    res.json({ newTeam })
}

export const teamsGet = async (req: Request, res: Response) => {

    const { limit = 0, start = 0 } = req.query;
    const query = { state: true }

    const [total, teams] = await Promise.all([
        Team.countDocuments(query),
        Team.find(query).limit(Number(limit)).skip(Number(start))
    ])
    res.json({ total, teams })
}

export const teamsPut = async (req: Request, res: Response) => {

    const { id } = req.params
    const { __v, _id, documentNumber, ...rest } = req.body

    const teamUpdate = await Team.findByIdAndUpdate(id, rest)

    res.json(teamUpdate)
}

export const addPlayersToTeam = async (req: Request, res: Response) => {
    const { id } = req.params
    const { players: playersId }: { players: string[] } = req.body

    try {
        const team = await Team.findById(id)
        if (!team) {
            return res.status(404).json({ msn: "Equipo no encontrado" })
        }
        if (playersId.length === 0) {
            return res.status(400).json({
                message: "Players dont be empty!"
            })
        }
        //VALIDAR SI EL ID DEL JUGAR YA EXISTE EN ARRAY DE EQUIPO
        const playersInUse = team?.players?.map((i) => String(i._id))

        const filterplayersId = playersId.filter((Id) => {
            return !playersInUse?.includes(Id)
        })

        if (filterplayersId?.length === 0) {
            return res.status(400).json({
                message: "Los jugadores ya se encuentran agregados"
            })
        } else
            for await (const Id of filterplayersId) {
                const player = await Player.findById(Id)
                team.players?.push(player)
            }

        await team.save()
        return res.json({ msn: "Jugador agregado correctamente" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msn: "El valor ingresado no corresponde con un id valido" })
    }
}

export const teamsDelete = async (req: Request, res: Response) => {
    const { id } = req.params

    const team = await Team.findByIdAndUpdate(id, { state: false })

    res.json(team)
}

export const playersDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    const { players: playersId }: { players: string[] } = req.body

    try {
        const team = await Team.findById(id);
        //existe el equipo con el id ?
        if (!team) {
            return res.status(404).json({ msn: "Equipo no encontrado" })
        }
        //validar el array no venga vacio o con caracteres que no correspodan a un ID
        if (playersId.length === 0) {
            return res.status(400).json({
                message: "Players dont be empty!"
            })
        } else for (const Id of playersId) {
            team.players = team?.players?.filter((player) => player._id != Id)
        }

        await team.save()
        return res.status(404).json({ msn: "Jugadores eliminados correctamente" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ msn: "Error al eliminar al jugador" })
    }
}