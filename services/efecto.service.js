import mongoose from "mongoose";
import { Efecto } from "../models/efecto.model.js";
import { Habilidad } from "../models/habilidad.model.js";
import { HabilidadJugador } from "../models/habilidadJugador.model.js";

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

export async function aplicarEfecto(idEfecto, idRunTrabajo) {
    if (!mongoose.Types.ObjectId.isValid(idRunTrabajo)) {
        const error = new Error("El ID de la partida no es válido");
        error.status = 400;
        throw error;
    }

    const efecto = await getEfectoPorId(idEfecto);

    if (efecto.tipo !== "MODIFICAR_HABILIDAD") {
        const error = new Error(`Tipo de efecto no soportado: ${efecto.tipo}`);
        error.status = 400;
        throw error;
    }

    const habilidad = await Habilidad.findOne({
        nombre: new RegExp(`^${efecto.objetivo}$`, "i")
    });

    if (!habilidad) {
        const error = new Error("La habilidad objetivo no existe");
        error.status = 404;
        throw error;
    }

    const habilidadJugador = await HabilidadJugador.findOne({
        runTrabajo: idRunTrabajo,
        habilidad: habilidad._id
    });

    if (!habilidadJugador) {
        const error = new Error("La partida no tiene esa habilidad");
        error.status = 404;
        throw error;
    }

    habilidadJugador.nivel = Math.max(
        0,
        habilidadJugador.nivel + efecto.valor
    );

    return habilidadJugador.save();
}
