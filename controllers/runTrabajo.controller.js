import * as runTrabajoService from "../services/runTrabajo.service.js";

export async function createRunTrabajo(req, res, next) {
  try {
    const runtrabajo = await runTrabajoService.createRunTrabajo(req.body.idUsuario || req.body.userId);
    res.status(201).json(runtrabajo);
  } catch (err) {
    next(err);
  }
}

export async function returnRunTrabajo(req, res, next) {
  try {
    const runtrabajo = await runTrabajoService.returnRunTrabajo();
    res.status(200).json(runtrabajo);
  } catch (err) {
    next(err);
  }
}

export async function getRankingGlobal(req, res, next) {
  try {
    const ranking = await runTrabajoService.getRankingGlobal();
    res.status(200).json(ranking);
  } catch (err) {
    next(err);
  }
}

export async function aumentarDinero(req, res, next) {
  try {
    const runtrabajo = await runTrabajoService.increaseDinero(req.params.idUsuario);
    res.status(200).json(runtrabajo);
  } catch (err) {
    next(err);
  }
}

export async function aumentarEdad(req, res, next) {
  try {
    const runtrabajo = await runTrabajoService.increaseEdad(req.params.idUsuario);
    res.status(200).json(runtrabajo);
  } catch (err) {
    next(err);
  }
}

export async function modificarEstado(req, res, next) {
  try {
    const runtrabajo = await runTrabajoService.modifyEstado(req.params.idUsuario);
    res.status(200).json(runtrabajo);
  } catch (err) {
    next(err);
  }
}

export async function asignarEstudio(req, res, next) {
  try {
    const runTrabajo = await runTrabajoService.asignEstudio(req.params.idUsuario, req.body.idEstudio);
    res.status(200).json(runTrabajo);
  } catch (err) {
    next(err);
  }
}

export async function iniciarRun(req, res, next) {
  try {
    const runTrabajo = await runTrabajoService.startRun(req.params.idUsuario);
    res.status(201).json(runTrabajo);
  } catch (err) {
    next(err);
  }
}

export async function obtenerRunTrabajo(req, res, next) {
  try {
    const runTrabajo = await runTrabajoService.returnRunTrabajoById(req.params.idUsuario);
    res.status(200).json(runTrabajo);
  } catch (err) {
    next(err);
  }
}

export async function obtenerRunTrabajoDetalle(req,res,next){
  try{
    const runTrabajo = await runTrabajoService.returnRunTrabajoDetalle(req.params.idRunTrabajo);
    res.status(200).json(runTrabajo);
  }catch(err){
    next(err)
  }
}

export async function obtenerRunTrabajoActivo(req, res, next) {
  try {
    const runTrabajo = await runTrabajoService.returnRunTrabajoActivo(req.params.idUsuario);
    res.status(200).json(runTrabajo);
  } catch (err) {
    next(err);
  }
}

export async function asignarTrabajo(req, res, next) {
  try {
    const runTrabajo = await runTrabajoService.asignTrabajo(req.params.idRunTrabajo, req.params.idTrabajo || req.body.idTrabajo);
    res.status(200).json(runTrabajo);
  } catch (err) {
    next(err);
  }
}

export async function aumentarAnio(req, res, next) {
  try {
    const runTrabajo = await runTrabajoService.increaseAnio(req.params.idRunTrabajo, req.params.idUsuario);
    res.status(200).json(runTrabajo);
  } catch (err) {
    next(err);
  }
}
