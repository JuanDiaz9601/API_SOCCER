import { Schema, model } from "mongoose"

const stadiumSchema = new Schema({
    name: {
        type: String,
        required: [true, "el nombre es obligatorio"],
    },
    location: {
        type: String,
        required: [true, "la ubicacion es obligatoria"],
    },
    documentNumber: {
        type: String,
        required: [true, "el codigo de identificación es obligatorio"]
    },
    since: {
        type: String,
        required: [true, "la fecha de creacion del estadio es obligatoria"]
    },
    state: {
        type: Schema.Types.Boolean,
        default: true,
    }
})

export = model("Stadiums", stadiumSchema)