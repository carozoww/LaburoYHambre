import * as opcionService from "../services/opcion.service.js";
import * as efectoOpcionService from "../services/efectoOpcion.service.js";
import * as efectoService from "../services/efecto.service.js";
import { RunTrabajo } from "../models/runTrabajo.model.js";
import mongoose from "mongoose";

export async function returnOpcion(req, res, next) {
  try {
    const opciones = await opcionService.getAllOpcionesPorEvento(
      req.params.idEvento,
    );
    return res.status(200).json(opciones);
  } catch (err) {
    next(err);
  }
}

//diablaso de funcion
export async function tomarOpcion(req, res, next) {
  try {
    const { idEvento, idRunTrabajo } = req.params;
    const { opcionId } = req.body;

    //verificamos que esten todos los datos necesarios
    if (!opcionId || !idEvento || !idRunTrabajo) {
      const error = new Error("Faltan datos requeridos");
      error.status = 400;
      throw error;
    }

    // Validamos el formato del ID de la partida
    if (!mongoose.Types.ObjectId.isValid(idRunTrabajo)) {
      const error = new Error("El ID de la partida no es válido");
      error.status = 400;
      throw error;
    }

    // buscamos la partida y comprobamos que siga activa
    const runTrabajo = await RunTrabajo.findById(idRunTrabajo);

    if (!runTrabajo) {
      const error = new Error("Partida no encontrada");
      error.status = 404;
      throw error;
    }

    if (!req.userId || runTrabajo.user.toString() !== req.userId.toString()) {
      const error = new Error("La partida no pertenece al usuario");
      error.status = 403;
      throw error;
    }

    if (runTrabajo.estado !== "En proceso") {
      const error = new Error("La partida no está activa");
      error.status = 400;
      throw error;
    }

    // verificamos que la opción pertenezca al evento
    const opcion = await opcionService.verificarOpcionDeEvento(
      opcionId,
      idEvento,
    );

    // Impedimos resolver dos veces el mismo evento
    const decisionRepetida = runTrabajo.decisionesTomadas.some(
      (decision) => decision.evento.toString() === idEvento,
    );

    if (decisionRepetida) {
      const error = new Error("Este evento ya fue resuelto");
      error.status = 400;
      throw error;
    }

    // Obtenemos y aplicamos los efectos de la opc.
    const relaciones = await efectoOpcionService.getEfectosPorOpcion(opcionId);
    const efectosAplicados = [];

    for (const relacion of relaciones) {
      efectosAplicados.push(
        await efectoService.aplicarEfecto(relacion.efecto._id, idRunTrabajo),
      );
    }

    // guardamos la decisión para evitar repetirla
    runTrabajo.decisionesTomadas.push({
      evento: idEvento,
      opcion: opcionId,
    });
    await runTrabajo.save();

    return res.status(200).json({
      message: "Opción aplicada",
      opcion,
      efectosAplicados,
    });
  } catch (err) {
    next(err);
  }
}
