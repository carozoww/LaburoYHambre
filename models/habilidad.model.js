import mongoose from "mongoose";

const habilidadSchema = new mongoose.Schema({
    nombre: {type:String,required:true},
    categoria: {type:String,required:true}
}, {timestamps:true})

export const Habilidad = new mongoose.model('Habilidad',habilidadSchema);