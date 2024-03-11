/* import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nombre: String,
    apellido: String,
    password: String,
    edad: Number,
    // los correos son elementos unicos, se pueden limitar desde frontend, backend
    //  y la base de datos,  ya que este elemento usualmente no se repite
    email: {
        type: String,
        unique: true
    }
})

export const userModel = model("users", userSchema) */