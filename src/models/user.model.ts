import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    fullName: {
        type: Schema.Types.String,
        required: [true, "El nombre y apellido son obligatorios"],
    },
    email: {
        type: Schema.Types.String,
        required: [true, "El correo es obligatorio"]
    },
    password: {
        type: Schema.Types.String,
        required: [true, "La contraseña es obligatoria"]
    },
    rol: {
        type: Schema.Types.String,
        required: [true, "Se requiere un rol para el usuario"]
    },
    state: {
        type: Schema.Types.Boolean,
        default: true
    }
})

usersSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export = model("Usuarios", usersSchema)