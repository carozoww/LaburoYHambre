import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
    titulo: {type:String, required: true},
    tipo: {type:String,required:true},
    bonificacion: {type:Number,required:true},
    probabilidad: {type: Number,required:true},
    descripcion: {type:String,required:true},
    edadMaxima: {type:Number,required:true},
    edadMinima: {type:NUmber,required:true},
    cd: {type:Number,required:true}
}, {timestamps:true})

const Evento = new mongoose.model('Evento',eventoSchema);

