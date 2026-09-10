import {Habilidad} from "../models/habilidad.model.js";

export async function getHabilidad(){
    const habilidad = await Habilidad.find();
    return habilidad;
}

export async function getHabilidadById(id){
    const habilidad = await Habilidad.findById(id);
    return habilidad;
}