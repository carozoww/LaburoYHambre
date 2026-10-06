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

    // si el evento es de MUERTE ABSURDA
    if (eventoObj && eventoObj.tipo === "MUERTE") {
      runTrabajo.estado = "MUERTO";
      runTrabajo.muerto = true;
      runTrabajo.empleado = false;
      runTrabajo.salarioActual = 0;
    }
    // si el evento o la opción provocan despido
    else if (
      eventoObj && (
        eventoObj.tipo === "DESPIDO" ||
        (opcion && opcion.texto && /mantenerse desempleado|reemplazó tu puesto|despedido|desempleado/i.test(opcion.texto))
      )
    ) {
      if (opcion && opcion.texto && /mantenerse desempleado/i.test(opcion.texto)) {
        /*runTrabajo.empleado = false;
        runTrabajo.trabajo = null;
        runTrabajo.salarioActual = 0;
        runTrabajo.anosEnTrabajoActual = 0; */
      } else if (eventoObj && eventoObj.tipo === "DESPIDO") {
        runTrabajo.empleado = false;
        runTrabajo.trabajo = null;
        runTrabajo.salarioActual = 0;
        runTrabajo.anosEnTrabajoActual = 0;
      }
    }
    // si la opción asigna explícitamente un trabajo
    else if (opcion && opcion.trabajo) {
      const trabajoAsignado = await Trabajo.findById(opcion.trabajo);
      if (trabajoAsignado) {
        runTrabajo.trabajo = trabajoAsignado._id;
        runTrabajo.empleado = true;
        runTrabajo.anosEnTrabajoActual = 0;

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
    }
    // si el jugador está desocupado y ACEPTA una oferta laboral sin id específico
    else if (
      (!runTrabajo.empleado || !runTrabajo.trabajo) &&
      opcion && opcion.texto && /aceptar|firmar|incorporarse|sumarse/i.test(opcion.texto) &&
      !/rechazar|desempleado/i.test(opcion.texto)
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

    // aplicar consecuencias de dinero solo si está empleado, o mantener en 0 si está desempleado
    if (!runTrabajo.empleado || !runTrabajo.trabajo) {
      runTrabajo.salarioActual = 0;
      // Si el jugador está despedido o nunca trabajó, el patrimonio acumulado se fija en 0
      const tuvoTrabajoPrevio = (runTrabajo.historialAnual || []).some((h) => h.salarioAnual > 0);
      if (!tuvoTrabajoPrevio) {
        runTrabajo.dineroGenerado = 0;
      }
    } else {
      if (
        (eventoObj && (eventoObj.tipo === "CATASTROFE" || /colapso|bolsa|cripto|divorcio/i.test(eventoObj.titulo || ""))) ||
        (opcion && opcion.texto && /caída del 50%|50% de tu patrimonio|mercado derrumbó|divorcio/i.test(opcion.texto || ""))
      ) {
        runTrabajo.dineroGenerado = Math.round((runTrabajo.dineroGenerado || 0) * 0.5);
      } else if (opcion && opcion.texto && /casarte|celebrar la boda/i.test(opcion.texto || "")) {
        runTrabajo.dineroGenerado = Math.max(0, (runTrabajo.dineroGenerado || 0) - 25000);
        runTrabajo.salarioActual = Math.round((runTrabajo.salarioActual || 0) * 0.85);
      } else if (opcion && opcion.texto && /conectarlo a la computadora/i.test(opcion.texto || "")) {
        const azarHackeo = Math.random() < 0.70;
        if (azarHackeo) {
          runTrabajo.salarioActual = 0; // Suspensión por infectar la red
        }
      } else if (opcion && opcion.texto && /rechazar las vacaciones|trabajar sin parar/i.test(opcion.texto || "")) {
        // Burnout: reducir habilidades principales en backend
        const { HabilidadJugador } = await import("../models/habilidadJugador.model.js");
        const habs = await HabilidadJugador.find({ runTrabajo: runTrabajo._id });
        for (const h of habs) {
          h.nivel = Math.max(0, h.nivel - 1);
          await h.save();
        }
      } else if (eventoObj && (eventoObj.tipo === "EMPRENDIMIENTO" || eventoObj.tipo === "INVERSION") && opcion && /invertir|arriesgar|conectar/i.test(opcion.texto || "")) {
        const azarExito = Math.random() >= 0.5;
        if (azarExito) {
          runTrabajo.dineroGenerado += 40000;
        } else {
          runTrabajo.dineroGenerado = Math.max(0, runTrabajo.dineroGenerado - 15000);
        }
      } else if (
        eventoObj &&
        typeof eventoObj.bonificacion === "number" &&
        eventoObj.bonificacion !== 0 &&
        eventoObj.tipo !== "DESEMPLEO" &&
        eventoObj.tipo !== "OFERTA"
      ) {
        const nuevoDinero = runTrabajo.dineroGenerado + eventoObj.bonificacion;
        runTrabajo.dineroGenerado = Math.max(0, nuevoDinero);
      }
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
