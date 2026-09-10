import mongoose from "mongoose";
import { EfectoOpcion } from "../models/efectoOpcion.model.js";

function validarId(id, nombre) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error(`El ID de ${nombre} no es válido`);
        error.status = 400;
        throw error;
    }
}

export async function getEfectosPorOpcion(idOpcion) {
    validarId(idOpcion, "la opción");

    const relaciones = await EfectoOpcion.find({ opcion: idOpcion })
        .populate("efecto");

    return relaciones;
}

export async function getOpcionesPorEfecto(idEfecto) {
    validarId(idEfecto, "el efecto");

    const relaciones = await EfectoOpcion.find({ efecto: idEfecto }).populate("opcion");

    if (relaciones.length === 0) {
        const error = new Error("No se encontraron opciones para el efecto");
        error.status = 404;
        throw error;
    }

    return relaciones;
}

export async function getAllEfectoOpciones() {
    return EfectoOpcion.find().populate("efecto opcion");
}

export async function getEfectoOpcionPorId(id) {
    validarId(id, "la relación efecto-opción");

    const relacion = await EfectoOpcion.findById(id).populate("efecto opcion");

    if (!relacion) {
        const error = new Error("Relación efecto-opción no encontrada");
        error.status = 404;
        throw error;
    }

    return relacion;
}
