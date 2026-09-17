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
  let habs = await HabilidadJugador.find({ runTrabajo: idRunTrabajo }).populate("habilidad");

  try {
    const { Habilidad } = await import("../models/habilidad.model.js");
    const todasGlobales = await Habilidad.find();
    if (todasGlobales && todasGlobales.length > habs.length) {
      const idsExistentes = habs.map((h) => (h.habilidad ? String(h.habilidad._id || h.habilidad) : "")).filter(Boolean);
      for (const habGlobal of todasGlobales) {
        if (!idsExistentes.includes(String(habGlobal._id))) {
          await HabilidadJugador.create({
            runTrabajo: idRunTrabajo,
            habilidad: habGlobal._id,
            nivel: 2,
          });
        }
      }
      habs = await HabilidadJugador.find({ runTrabajo: idRunTrabajo }).populate("habilidad");
    }
  } catch (e) {
    console.warn("No se pudieron auto-crear habilidades faltantes:", e);
  }

  return habs;
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
