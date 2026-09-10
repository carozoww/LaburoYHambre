import * as EventoService from "../services/empresa.service.js";

export async function returnEvento(req, res, next) {
    try {
        const eventos = await EventoService.getEvento();
        res.status(201).json(eventos);
    } catch(err) { 
        next(err); 
    } 
}


export async function obtenerOpciones(req, res, next) {
    try {
        const eventos = await EventoServices.getOpcionesEvento(req.params.idEvento);
        res.status(201).json(eventos);
    } catch(err) { 
        next(err); 
    } 
}


export async function calcularOpcion(req, res, next) { 
    try {

    } catch(err) { 
        next(err); 
    } 
}
