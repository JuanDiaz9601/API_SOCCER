import {Schema, model } from "mongoose";

const teamsSchema = new Schema({
    name: {
        type: String,
        required: [true, "el nombre es obligatorio"],
    },
    location: {
        type: String,
        required: [true, "la ubicacion es obligatoria"],
    },
    stadium: {
        type: String,
        required: [true, "el nombre del estadio es obligatorio"],
    },
    since: {
        type: String,
        required: [true, "la fecha de creacion es obligatoria"]
    },
    documentNumber: {
        type: String,
        required: [true, "el codigo de identificación es obligatorio"]
    },
    players: {
        type: Array,
        required: false
    },
    state: {
        type: Schema.Types.Boolean,
        default: true,
    }
})

export = model("Teams", teamsSchema);