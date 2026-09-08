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
