import express from 'express';
import dotenv from "dotenv"
import dbConnetion = require('../database/config');

dotenv.config()

class Server {
    private app: express.Application;
    private port: number;

    constructor(){
        this.app = express();
        this.port = Number(process.env.PORT);
        //Contectar DB
        this.conectionDB()
        //Middlewares
        this.middlewares()
        //Rutas del server (Preguntar yeison)
        this.routes()
        //sin las () si ejecuto el metodo conexion funciona, pero el de middlewares no
    }
    async conectionDB(){
        await dbConnetion()
    }

    middlewares(){
        //Lectura y parseo del body
        this.app.use(express.json())
    }

    routes(){
        //no funciona como js this.path
        this.app.use("/", require("../routes/players.routes"))
        this.app.use("/", require("../routes/teams.routes"))
        this.app.use("/", require("../routes/stadiums.routes"))  
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
        })
    }

}

export = Server