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
        return { message: `Tipo de efecto ${efecto.tipo} no requiere modificar habilidad` };
    }

    // Buscar habilidad por nombre o regex flexible
    let habilidad = await Habilidad.findOne({
        nombre: new RegExp(`^${efecto.objetivo}$`, "i")
    });

    if (!habilidad) {
        habilidad = await Habilidad.findOne({
            nombre: new RegExp(`${efecto.objetivo}`, "i")
        });
    }

    if (!habilidad) {
        console.warn(`Habilidad objetivo '${efecto.objetivo}' no encontrada en DB.`);
        return null;
    }

    let habilidadJugador = await HabilidadJugador.findOne({
        runTrabajo: idRunTrabajo,
        habilidad: habilidad._id
    });

    // Si la partida no cuenta con el registro de la habilidad, la creamos
    if (!habilidadJugador) {
        habilidadJugador = await HabilidadJugador.create({
            runTrabajo: idRunTrabajo,
            habilidad: habilidad._id,
            nivel: Math.min(10, Math.max(0, efecto.valor))
        });
        return habilidadJugador;
    }

    // Incrementar o decrementar el nivel asegurando que llegue hasta el tope de 10
    const nuevoNivel = habilidadJugador.nivel + efecto.valor;
    habilidadJugador.nivel = Math.min(10, Math.max(0, nuevoNivel));

    return habilidadJugador.save();
}
