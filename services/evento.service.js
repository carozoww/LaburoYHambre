import {Evento} from "../models/evento.model.js"
import {Opcion} from "../models/opcion.model.js"

export async function getEvento(){
    const evento = await Evento.find();
    return evento;
}

export async function getEventoById(id){
    const evento = await Evento.findById(id);
    return evento;
}

export async function getOpcionesEvento(idEvento){
    const eventos = await Opcion.find({ evento: idEvento})
    /* 
    const opciones = await Opcion.aggregate([
        {
            $match: {
                evento: new mongoose.Types.ObjectId(idEvento)
            }
        }
    ]);
    */

    return eventos;
}