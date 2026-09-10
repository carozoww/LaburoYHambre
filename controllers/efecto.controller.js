import * as efectoService from "../services/efecto.service.js";

export async function returnEfecto(req, res, next) {
    try {
        const efectos = await efectoService.getAllEfectos();
        return res.status(200).json(efectos);
    } catch (err) {
        next(err);
    }
}

export async function obtenerEfecto(req, res, next) {
    try {
        const efecto = await efectoService.getEfectoPorId(req.params.idEfecto);
        return res.status(200).json(efecto);
    } catch (err) {
        next(err);
    }
}
