import * as opcionService from "../services/opcion.service.js";
import * as efectoOpcionService from "../services/efectoOpcion.service.js";
import * as efectoService from "../services/efecto.service.js";
import { RunTrabajo } from "../models/runTrabajo.model.js";
import { Evento } from "../models/evento.model.js";
import { Trabajo } from "../models/trabajo.model.js";
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

export async function tomarOpcion(req, res, next) {
  try {
    const { idEvento, idRunTrabajo } = req.params;
    const { opcionId } = req.body;

    if (!opcionId || !idEvento || !idRunTrabajo) {
      return res.status(400).json({ message: "Faltan datos requeridos para la opción" });
    }

    if (!mongoose.Types.ObjectId.isValid(idRunTrabajo)) {
      return res.status(400).json({ message: "El ID de la partida no es válido" });
    }

    const runTrabajo = await RunTrabajo.findById(idRunTrabajo);

    if (!runTrabajo) {
      return res.status(404).json({ message: "Partida no encontrada" });
    }

    if (runTrabajo.estado !== "En proceso") {
      return res.status(400).json({ message: "La partida no está activa" });
    }

    // Comprobar si el evento ya fue resuelto anteriormente
    const decisionRepetida = runTrabajo.decisionesTomadas.some(
      (decision) => decision.evento && decision.evento.toString() === idEvento.toString(),
    );

    if (decisionRepetida) {
      const runTrabajoPobladoRep = await RunTrabajo.findById(idRunTrabajo).populate('user trabajo estudio');
      return res.status(200).json({
        message: "Este evento ya fue resuelto anteriormente",
        runTrabajo: runTrabajoPobladoRep,
      });
    }

    // Obtener información del evento para aplicar consecuencias laborales o económicas
    const eventoObj = await Evento.findById(idEvento);

    // Verificar y obtener la opción
    let opcion = null;
    try {
      opcion = await opcionService.verificarOpcionDeEvento(opcionId, idEvento);
    } catch (e) {
      opcion = await opcionService.getOpcionPorId(opcionId);
    }

    // A. Si el evento es de MUERTE ABSURDA
    if (eventoObj && eventoObj.tipo === "MUERTE") {
      runTrabajo.estado = "Completada";
      runTrabajo.empleado = false;
      runTrabajo.salarioActual = 0;
    }
    // B. Si el evento o la opción provocan despido (lay-off)
    else if (eventoObj && (eventoObj.tipo === "DESPIDO" || (opcion && opcion.texto && opcion.texto.toLowerCase().includes("desempleado")))) {
      runTrabajo.empleado = false;
      runTrabajo.trabajo = null;
      runTrabajo.salarioActual = 0;
      runTrabajo.anosEnTrabajoActual = 0;
    }
    // C. Si la opción o evento ofrece contratación laboral
    else if (opcion && opcion.trabajo) {
      const trabajoAsignado = await Trabajo.findById(opcion.trabajo);
      if (trabajoAsignado) {
        runTrabajo.trabajo = trabajoAsignado._id;
        runTrabajo.empleado = true;
        runTrabajo.anosEnTrabajoActual = 0;

        // Regla de Seniority: Si el jugador tiene >= 7 en la habilidad del puesto, entra como Senior (+50% sueldo)
        let esSeniorPorHabilidad = false;
        if (trabajoAsignado.habilidad) {
          const { HabilidadJugador } = await import("../models/habilidadJugador.model.js");
          const habJugador = await HabilidadJugador.findOne({ runTrabajo: runTrabajo._id, habilidad: trabajoAsignado.habilidad });
          if (habJugador && habJugador.nivel >= 7) {
            esSeniorPorHabilidad = true;
          }
        }

        const salarioBase = trabajoAsignado.salarioBase || trabajoAsignado.salarioAnual || 30000;
        runTrabajo.salarioActual = esSeniorPorHabilidad ? Math.round(salarioBase * 1.5) : salarioBase;
      }
    } else if (
      (eventoObj && (eventoObj.tipo === "DESEMPLEO" || eventoObj.tipo === "OFERTA")) ||
      (opcion && opcion.texto && /aceptar|firmar|incorporarse|contrato|oferta|empleo|puesto|trabajar|junior|mid|senior|vp/i.test((opcion.texto || "") + " " + (opcion.titulo || "")))
    ) {
      const trabajosDisponibles = await Trabajo.find({ edadMinima: { $lte: runTrabajo.edadActual } }).sort({ salarioBase: -1 });
      const trabajoElegido = trabajosDisponibles[0] || (await Trabajo.findOne({ puesto: /Junior/i }));
      if (trabajoElegido) {
        runTrabajo.trabajo = trabajoElegido._id;
        runTrabajo.empleado = true;
        runTrabajo.anosEnTrabajoActual = 0;

        let esSeniorPorHabilidad = false;
        if (trabajoElegido.habilidad) {
          const { HabilidadJugador } = await import("../models/habilidadJugador.model.js");
          const habJugador = await HabilidadJugador.findOne({ runTrabajo: runTrabajo._id, habilidad: trabajoElegido.habilidad });
          if (habJugador && habJugador.nivel >= 7) {
            esSeniorPorHabilidad = true;
          }
        }

        const salarioBase = trabajoElegido.salarioBase || trabajoElegido.salarioAnual || 28000;
        runTrabajo.salarioActual = esSeniorPorHabilidad ? Math.round(salarioBase * 1.5) : salarioBase;
      }
    }

    // D. Aplicar consecuencias de dinero y proyectos a ciegas / riesgo
    if (eventoObj && (eventoObj.tipo === "EMPRENDIMIENTO" || eventoObj.tipo === "INVERSION") && opcion && /invertir|arriesgar|conectar/i.test(opcion.texto || "")) {
      // 50% de probabilidad de éxito masivo o pérdida de capital
      const azarExito = Math.random() >= 0.5;
      if (azarExito) {
        runTrabajo.dineroGenerado += 40000;
      } else {
        runTrabajo.dineroGenerado = Math.max(0, runTrabajo.dineroGenerado - 15000);
      }
    } else if (eventoObj && typeof eventoObj.bonificacion === "number" && eventoObj.bonificacion !== 0) {
      const nuevoDinero = runTrabajo.dineroGenerado + eventoObj.bonificacion;
      runTrabajo.dineroGenerado = Math.max(0, nuevoDinero);
    }

    // Aplicar los efectos de habilidades de la opción seleccionada
    const relaciones = await efectoOpcionService.getEfectosPorOpcion(opcionId);
    const efectosAplicados = [];

    if (relaciones && relaciones.length > 0) {
      for (const relacion of relaciones) {
        if (relacion.efecto) {
          const efectoId = relacion.efecto._id || relacion.efecto;
          const resEfecto = await efectoService.aplicarEfecto(efectoId, idRunTrabajo);
          if (resEfecto) efectosAplicados.push(resEfecto);
        }
      }
    }

    // Registrar la decisión tomada en la partida
    runTrabajo.decisionesTomadas.push({
      evento: idEvento,
      opcion: opcionId,
      fecha: new Date(),
    });
    await runTrabajo.save();

    const runTrabajoPoblado = await RunTrabajo.findById(idRunTrabajo).populate('user trabajo estudio');

    return res.status(200).json({
      message: "Opción aplicada con éxito",
      opcion,
      efectosAplicados,
      runTrabajo: runTrabajoPoblado,
    });
  } catch (err) {
    next(err);
  }
}
