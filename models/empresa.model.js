import mongoose from "mongoose";


const empresaSchema = new mongoose.Schema({
    nombre: {type:String, required:true},
    tier: {type: Number,required:true },
    tamanio: {type: String, required:true},
    tipo: {type:String, required:true}
}, {timestamps:true})

export const Empresa = new mongoose.model('Empresa',empresaSchema);
