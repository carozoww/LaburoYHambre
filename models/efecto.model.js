import mongoose from "mongoose";

const efectoSchema = mongoose.Schema({
    tipo: {type:String,required:true},
    objetivo: {type:String, required:true},
    valor: {type:Number,required:true}

}, {timestamps:true})

const Efecto = new mongoose.model('Efecto',efectoSchema);
