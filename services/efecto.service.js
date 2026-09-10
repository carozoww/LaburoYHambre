import mongoose from "mongoose";
import { Efecto } from "../models/efecto.model.js";

function validarId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El ID del efecto no es válido");
        error.status = 400;
        throw error;
    }
}

export async function getAllEfectos() {
    return Efecto.find();
}

export async function getEfectoPorId(idEfecto) {
    validarId(idEfecto);

    const efecto = await Efecto.findById(idEfecto);

    if (!efecto) {
        const error = new Error("Efecto no encontrado");
        error.status = 404;
        throw error;
    }

    return efecto;
}
