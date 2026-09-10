import {Trabajo} from "../models/trabajo.model.js";
import { HabilidadJugador } from "../models/habilidadJugador.model.js";

export async function returnTrabajo(){
    const trabajos = await Trabajo.find();
    return trabajos;
}

export async function returnTrabajosDisponibles(idRunTrabajo){
    const habilidadesJugador = await HabilidadJugador.find({runTrabajo:idRunTrabajo});
    const idsHabilidades = habilidadesJugador.map(h => h.habilidad)
    const trabajosDisponibles = await Trabajo.find({habilidad: {$in: idsHabilidades} });
    return trabajosDisponibles;

}