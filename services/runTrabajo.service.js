import { RunTrabajo } from "../models/runTrabajo.model.js";
import { Trabajo } from "../models/trabajo.model.js";
import { Habilidad } from "../models/habilidad.model.js";
import { HabilidadJugador } from "../models/habilidadJugador.model.js";
import { Estudio } from "../models/estudio.model.js";

export async function createRunTrabajo(idJugador) {
  // Buscar el único estudio: Tecnólogo en Informática
  const estudioTecnologo = await Estudio.findOne({ nombre: new RegExp("Tecnólogo en Informática", "i") });
  const trabajoInicial = await Trabajo.findOne({ puesto: new RegExp("Pasante Trainee de Informática", "i") }) ||
                         await Trabajo.findOne({ puesto: new RegExp("Trainee", "i") });

  const salarioInicial = trabajoInicial ? (trabajoInicial.salarioBase || 10000) : 10000;
  const puestoTexto = trabajoInicial ? `${trabajoInicial.puesto} @ Startup Tech Innovadora` : 'Pasante Trainee de Informática @ Startup Tech Innovadora';

  const nuevaRun = await RunTrabajo.create({
    user: idJugador,
    fecha: new Date(),
    edadActual: 18,
    anioActual: 2027, // Año inicial 2027
    trabajo: trabajoInicial ? trabajoInicial._id : null,
    estudio: estudioTecnologo ? estudioTecnologo._id : null,
    salarioActual: salarioInicial,
    estado: "En proceso",
    empleado: true,
    dineroGenerado: salarioInicial,
    anosEnTrabajoActual: 0,
    decisionesTomadas: [],
    historialAnual: [{
      edad: 18,
      anio: 2027,
      puestoEmpresa: puestoTexto,
      salarioAnual: salarioInicial,
      dineroAcumulado: salarioInicial
    }]
  });

  // Inicializar habilidades del jugador en MongoDB con nivel inicial de 2
  try {
    const habilidadesGlobales = await Habilidad.find();
    if (habilidadesGlobales && habilidadesGlobales.length > 0) {
      for (const hab of habilidadesGlobales) {
        await HabilidadJugador.create({
          runTrabajo: nuevaRun._id,
          habilidad: hab._id,
          nivel: 2
        });
      }
    }
  } catch (err) {
    console.warn("No se pudieron inicializar habilidades del jugador:", err);
  }

  return nuevaRun;
}

export async function returnRunTrabajo() {
  return RunTrabajo.find().populate('user trabajo estudio');
}

export async function returnRunTrabajoById(idUser) {
  return RunTrabajo.find({ user: idUser }).populate('trabajo estudio');
}

export async function returnRunTrabajoActivo(idUser) {
  let run = await RunTrabajo.findOne({ user: idUser, estado: "En proceso" }).populate('trabajo estudio');
  if (!run) {
    run = await RunTrabajo.findOne({ usuario: idUser, estado: "En proceso" }).populate('trabajo estudio');
  }
  return run;
}

export async function increaseDinero(idUsuario) {
  const runTrabajo = await returnRunTrabajoActivo(idUsuario);
  if (!runTrabajo) {
    throw new Error('No existe una partida activa para este usuario');
  }
  if (runTrabajo.estado === "Completada") {
    throw new Error('La partida ya está completada');
  }

  // Si está despedido (empleado === false o sin trabajo), el incremento es estrictamente 0
  const incremento = (runTrabajo.empleado === false || !runTrabajo.trabajo)
    ? 0
    : (runTrabajo.salarioActual || (runTrabajo.trabajo ? runTrabajo.trabajo.salarioBase : 10000));

  runTrabajo.dineroGenerado += incremento;
  await runTrabajo.save();
  return runTrabajo;
}

export async function increaseEdad(idUsuario) {
  const runTrabajo = await returnRunTrabajoActivo(idUsuario);
  if (!runTrabajo) {
    throw new Error('No existe una partida activa para este usuario');
  }
  if (runTrabajo.estado === "Completada") {
    throw new Error('La partida ya está completada');
  }

  runTrabajo.edadActual += 1;
  runTrabajo.anioActual += 1;

  // Si está empleado, actualizar antigüedad y aplicar ascenso a Senior a los 7 años
  if (runTrabajo.empleado && runTrabajo.trabajo) {
    runTrabajo.anosEnTrabajoActual = (runTrabajo.anosEnTrabajoActual || 0) + 1;

    // Regla de Seniority a los 7 años en el mismo empleo
    if (runTrabajo.anosEnTrabajoActual >= 7 && !runTrabajo.esSeniorInterno) {
      runTrabajo.esSeniorInterno = true;
      runTrabajo.salarioActual = Math.round(runTrabajo.salarioActual * 1.5);
    } else if (runTrabajo.anosEnTrabajoActual >= 4 && runTrabajo.anosEnTrabajoActual % 4 === 0) {
      runTrabajo.salarioActual = Math.round(runTrabajo.salarioActual * 1.25);
    }
  } else {
    runTrabajo.anosEnTrabajoActual = 0;
    runTrabajo.esSeniorInterno = false;
  }

  if (runTrabajo.edadActual >= 65) {
    runTrabajo.estado = "Completada";
  }

  // Poblar objeto trabajo y empresa para registro exacto de historial
  await runTrabajo.populate({
    path: 'trabajo',
    populate: { path: 'empresa' }
  });

  let nombrePuesto = runTrabajo.trabajo ? (runTrabajo.trabajo.puesto || runTrabajo.trabajo.nombre) : 'Desarrollador';
  if (runTrabajo.esSeniorInterno && !nombrePuesto.includes('Senior') && !nombrePuesto.includes('VP')) {
    nombrePuesto = nombrePuesto.replace(/Junior|Mid|Pasante|Trainee/gi, 'Senior');
    if (!nombrePuesto.includes('Senior')) {
      nombrePuesto = `Senior ${nombrePuesto}`;
    }
  }

  const empresaNombre = (runTrabajo.trabajo && runTrabajo.trabajo.empresa && typeof runTrabajo.trabajo.empresa === 'object')
    ? (runTrabajo.trabajo.empresa.nombre || 'Startup Tech Innovadora')
    : 'Startup Tech Innovadora';

  const puestoTexto = (runTrabajo.empleado && runTrabajo.trabajo)
    ? `${nombrePuesto} @ ${empresaNombre}`
    : 'DESPEDIDO / En búsqueda laboral';

  const salarioAnualActual = (runTrabajo.empleado && runTrabajo.trabajo)
    ? (runTrabajo.salarioActual || runTrabajo.trabajo.salarioBase || 0)
    : 0;

  if (!runTrabajo.historialAnual) {
    runTrabajo.historialAnual = [];
  }

  runTrabajo.historialAnual.push({
    edad: runTrabajo.edadActual,
    anio: runTrabajo.anioActual,
    puestoEmpresa: puestoTexto,
    salarioAnual: salarioAnualActual,
    dineroAcumulado: runTrabajo.dineroGenerado
  });

  await runTrabajo.save();
  return runTrabajo;
}

export async function modifyEstado(idUsuario) {
  const runTrabajo = await returnRunTrabajoActivo(idUsuario);
  if (!runTrabajo) {
    throw new Error('No existe una partida activa');
  }
  runTrabajo.estado = "Completada";
  await runTrabajo.save();
  return runTrabajo;
}

export async function asignEstudio(idUsuario, idEstudio) {
  const runTrabajo = await returnRunTrabajoActivo(idUsuario);
  if (!runTrabajo) {
    throw new Error('No existe una partida activa');
  }
  runTrabajo.estudio = idEstudio;
  await runTrabajo.save();
  return runTrabajo;
}

export async function asignTrabajo(idRunTrabajo, idTrabajo) {
  const runTrabajo = await RunTrabajo.findById(idRunTrabajo);
  if (!runTrabajo) {
    throw new Error('Partida no encontrada');
  }
  if (runTrabajo.estado === "Completada") {
    throw new Error('La partida ya se encuentra completada');
  }
  
  const trabajo = await Trabajo.findById(idTrabajo);
  if (trabajo) {
    runTrabajo.trabajo = trabajo._id;
    runTrabajo.empleado = true;
    runTrabajo.salarioActual = trabajo.salarioBase || trabajo.salarioAnual || 30000;
    runTrabajo.anosEnTrabajoActual = 0;
    await runTrabajo.save();
  }
  return runTrabajo;
}

export async function increaseAnio(idRunTrabajo, idUsuario) {
  let runTrabajo = null;
  if (idRunTrabajo) {
    runTrabajo = await RunTrabajo.findById(idRunTrabajo);
  }
  if (!runTrabajo && idUsuario) {
    runTrabajo = await returnRunTrabajoActivo(idUsuario);
  }
  if (!runTrabajo) {
    throw new Error('Partida no encontrada');
  }
  return runTrabajo;
}

export async function startRun(idUsuario) {
  const existeRunActiva = await returnRunTrabajoActivo(idUsuario);
  if (existeRunActiva) {
    return existeRunActiva;
  }
  return createRunTrabajo(idUsuario);
}