import {Schema, model } from "mongoose";

const playersSchema = new Schema({
    fullName: {
        type: Schema.Types.String,
        required: [true, "el nombre y apellido son obligatorios"],
    },
    documentNumber: {
        type: Schema.Types.String,
        required: [true, "el ducumento es obligatoria"]
    },
    age: {
        type: Schema.Types.Number,
        required: [true, "la edad es obligatoria"]
    },
    position: {
        type: Schema.Types.String,
        required: [true, "la posicion es obligatoria"]
    },
    state: {
        type: Schema.Types.Boolean,
        default: true,
    }

})

export = model("Players", playersSchema);