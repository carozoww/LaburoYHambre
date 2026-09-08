import mongoose from "mongoose";

const estudioSchema = new mongoose.Schema({
    nombre: { type:String, required:true},
    tier: {type: Number, required:true}
}, {timestamps:true}) 

export const Estudio = new mongoose.model('Estudio', estudioSchema);
