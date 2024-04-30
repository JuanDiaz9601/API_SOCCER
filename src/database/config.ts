import mongoose from "mongoose";


const dbConnetion = async () => {

    try {
       await mongoose.connect("mongodb+srv://user_node_cafe:qkDx3PBsbkC6sMIV@miclustercafe.jdcn82c.mongodb.net/soccerDB")
       console.log("Conexion con la base de datos establecida!")
    } catch (error) {
        console.log(error)
        throw Error("Error en la conexion con base de datos")
    }

}

export = dbConnetion