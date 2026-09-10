import * as runTrabajoService from "../services/runTrabajo.service.js";

export async function createRunTrabajo(req,res,next){
    try{
        const runtrabajo = await runTrabajoService.createRunTrabajo(req.body);
        res.status(201).json(runtrabajo);
    }catch(err){
        next(err);
    }
}


export async function returnRunTrabajo(req,res,next){
    try{
        const runtrabajo = await runTrabajoService.returnRunTrabajo();
        res.status(201).json(runtrabajo);
    }catch(err){
        next(err);
    }
}

export async function aumentarDinero(req, res, next) {
    try {
        const runtrabajo = await runTrabajoService.increaseDinero(req.params.idUsuario);
        res.status(201).json(runtrabajo);
    } catch(err) { 
        next(err); 
    }
}

export async function aumentarEdad(req, res, next) {
    try {
        const runtrabajo = await runTrabajoService.increaseEdad(req.params.idUsuario);
        res.status(201).json(runtrabajo);
    } catch(err) { 
        next(err); 
    }
}

export async function modificarEstado(req, res, next) {
    try {
        const runtrabajo = await runTrabajoService.modifyEstado(req.params.idUsuario);
        res.status(201).json(runtrabajo);
    } catch(err) { 
        next(err); 
    }
}

export async function asignarEstudio(req, res, next) {
    try {
        const runTrabajo = await runTrabajoService.modifyEstado(req.params.idUsuario,req.body);
        res.status(201).json(runTrabajo);
    } catch(err) { 
        next(err); 
    }
}

export async function iniciarRun(req, res, next) {
    try {

    } catch(err) { 
        next(err); 
    }
}

export async function obtenerRunTrabajo(req, res, next) {
    try {
        const runTrabajo = await runTrabajoService.returnRunTrabajoById(req.params.idUsuario);
        res.status(201).json(runTrabajo);
    } catch(err) {
        next(err); 
    }
}

export async function obtenerRunTrabajoActivo(req, res, next) {
    try {
        const runTrabajo = await runTrabajoService.returnRunTrabajoActivo(req.params.idUsuario);
        res.status(201).json(runTrabajo);
    } catch(err) { 
        next(err); 
    }
}

export async function asignarTrabajo(req, res, next) {
    try {
        const runTrabajo = await runTrabajoService.asignTrabajo(req.params.idUsuario,req.body);
        res.status(201).json(runTrabajo);
    } catch(err) { 
        next(err); 
    }
}

export async function aumentarAnio(req, res, next) {
    try {
        const runTrabajo = await runTrabajoService.increaseAnio();
        res.status(201).json(runTrabajo);
    } catch(err) { 
        next(err); 
    }
}

export async function avanzarTurno(req, res, next) {
    try {
        const runTrabajo = await runTrabajoService.nextTurn();
        res.status(201).json(runTrabajo);
    } catch(err) { 
        next(err); 
    }
}
