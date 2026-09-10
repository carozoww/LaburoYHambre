import * as efectoOpcionService from "../services/efectoOpcion.service.js";

export async function returnEfectoOpcion(req, res, next) {
    try {
        const relaciones = await efectoOpcionService.getAllEfectoOpciones();
        return res.status(200).json(relaciones);
    } catch (err) {
        next(err);
    }
}

export async function verEfectosOpcion(req, res, next) {
    try {
        const relaciones = await efectoOpcionService.getEfectosPorOpcion(req.params.idOpcion);
        return res.status(200).json(relaciones);
    } catch (err) {
        next(err);
    }
}

export async function verOpcionesEfecto(req, res, next) {
    try {
        const relaciones = await efectoOpcionService.getOpcionesPorEfecto(req.params.idEfecto);
        return res.status(200).json(relaciones);
    } catch (err) {
        next(err);
    }
}

export async function obtenerEfectoOpcion(req, res, next) {
    try {
        const relacion = await efectoOpcionService.getEfectoOpcionPorId(req.params.idEfectoOpcion);
        return res.status(200).json(relacion);
    } catch (err) {
        next(err);
    }
}
