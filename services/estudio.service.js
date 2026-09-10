import {Estudio} from "../models/estudio.model.js"

export async function getEstudio(){
    const estudio = await Estudio.find();
    return estudio;
}

export async function getEstudioById(id){
    const estudio = await Estudio.findById(id);
    return estudio;
}