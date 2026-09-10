import * as TrabajoService from "../services/trabajo.service.js"

export async function returnTrabajo(req, res, next) { 
    try {
        const trabajos = await TrabajoService.returnTrabajo();
        res.status(201).json(trabajos);
    } catch(err) { 
        next(err); 
    } 
}

export async function trabajosDisponibles(req, res, next) { 
    try {

    } catch(err) { 
        next(err); 
    } 
}

export async function trabajoDetalle(req, res, next) { 
    try {

    } catch(err) { 
        next(err); 
    } 
}
