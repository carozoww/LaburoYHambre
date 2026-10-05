import * as EventoService from "../services/evento.service.js";

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
        const eventos = await EventoService.getOpcionesEvento(req.params.idEvento);
        res.status(201).json(eventos);
    } catch(err) { 
        next(err); 
    } 
}


export async function asignarEvento(req, res, next) { 
    try {
        const eventos = await EventoService.asignarEvento(req.params.idRunTrabajo,req.params.idEvento,req.params.idHabilidadJugador);
        res.status(201).json(eventos);
    } catch(err) { 
        next(err); 
    } 
}

export async function evaluarEvento(req, res, next) {
    try {
        const evento = await EventoService.evaluarEvento(req.params.idRunTrabajo);
        res.status(200).json(evento);
    } catch(err) {
        next(err);
    }
}

export async function verificarAsignacion(req, res, next) {
    try {
        const resultado = await EventoService.verificarAsignacion(req.params.idRunTrabajo, req.params.idEvento, req.params.idHabilidadJugador);
        res.status(200).json(resultado);
    } catch(err) {
        next(err);
    }
}
