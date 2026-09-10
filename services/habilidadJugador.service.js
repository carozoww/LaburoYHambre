import mongoose from "mongoose";
import { HabilidadJugador } from "../models/habilidadJugador.model.js";

function validarId(id, nombre) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`El ID de ${nombre} no es válido`);
    error.status = 400;
    throw error;
  }
}

export async function crearHabilidadJugador(data) {
  const { idRunTrabajo, idHabilidad, nivel } = data;

  validarId(idRunTrabajo, "la partida");
  validarId(idHabilidad, "la habilidad");

  if (nivel === undefined || nivel < 0) {
    const error = new Error("El nivel debe ser mayor o igual a cero");
    error.status = 400;
    throw error;
  }

  return HabilidadJugador.create({
    runTrabajo: idRunTrabajo,
    habilidad: idHabilidad,
    nivel,
  });
}

export async function obtenerHabilidadesPorRun(idRunTrabajo) {
  validarId(idRunTrabajo, "la partida");
  return HabilidadJugador.find({ runTrabajo: idRunTrabajo }).populate(
    "habilidad",
  );
}

export async function obtenerTodasHabilidadesJugador() {
  return HabilidadJugador.find().populate("habilidad");
}

export async function obtenerHabilidad(idRunTrabajo, idHabilidad) {
  validarId(idRunTrabajo, "la partida");
  validarId(idHabilidad, "la habilidad");

  const habilidadJugador = await HabilidadJugador.findOne({
    runTrabajo: idRunTrabajo,
    habilidad: idHabilidad,
  }).populate("habilidad");

  if (!habilidadJugador) {
    const error = new Error("La habilidad no pertenece a esa partida");
    error.status = 404;
    throw error;
  }

  return habilidadJugador;
}

export async function aumentarHabilidad(idRunTrabajo, idHabilidad) {
  const habilidadJugador = await obtenerHabilidad(
    idRunTrabajo,
    idHabilidad,
  );

  habilidadJugador.nivel += 1;

  return habilidadJugador.save();
}

export async function disminuirHabilidad(idRunTrabajo, idHabilidad) {
  const habilidadJugador = await obtenerHabilidad(
    idRunTrabajo,
    idHabilidad,
  );

  if (habilidadJugador.nivel <= 0) {
    const error = new Error("La habilidad no puede quedar por debajo de cero");
    error.status = 400;
    throw error;
  }

  habilidadJugador.nivel -= 1;

  return habilidadJugador.save();
}
