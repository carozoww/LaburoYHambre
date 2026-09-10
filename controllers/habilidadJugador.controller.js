import * as habilidadJugadorService from "../services/habilidadJugador.service.js";

export async function createHabilidadJugador(req, res, next) {
  try {
    const resultado = await habilidadJugadorService.crearHabilidadJugador(
      req.body,
    );
    return res.status(201).json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function returnHabilidadJugador(req, res, next) {
  try {
    const resultado =
      await habilidadJugadorService.obtenerTodasHabilidadesJugador();
    return res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function aumentarHabilidad(req, res, next) {
  try {
    const resultado = await habilidadJugadorService.aumentarHabilidad(
      req.params.idRunTrabajo,
      req.params.idHabilidad,
    );
    return res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function disminuirHabilidad(req, res, next) {
  try {
    const resultado = await habilidadJugadorService.disminuirHabilidad(
      req.params.idRunTrabajo,
      req.params.idHabilidad,
    );
    return res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function obtenerHabilidades(req, res, next) {
  try {
    const resultado = await habilidadJugadorService.obtenerHabilidadesPorRun(
      req.params.idRunTrabajo,
    );
    return res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
}

function noImplementado(req, res) {
  return res.status(501).json({ message: "Operación todavía no implementada" });
}

export const aplicarEfecto = noImplementado;
export const removerEfecto = noImplementado;
export const obtenerEfectos = noImplementado;
