import {Evento} from "../models/evento.model.js"
import {Opcion} from "../models/opcion.model.js"
import {RunTrabajo} from "../models/runTrabajo.model.js"
import {HabilidadJugador} from "../models/habilidadJugador.model.js"

export async function getEvento(){
    const evento = await Evento.find();
    return evento;
}

export async function getEventoById(id){
    const evento = await Evento.findById(id);
    return evento;
}

export async function getOpcionesEvento(idEvento){
    const eventos = await Opcion.find({ evento: idEvento})
    /* 
    const opciones = await Opcion.aggregate([
        {
            $match: {
                evento: new mongoose.Types.ObjectId(idEvento)
            }
        }
    ]);
    */

    return eventos;
}

export async function asignarEvento(idRunTrabajo, idEvento, idHabilidadJugador){
    const runTrabajo = await RunTrabajo.findById(idRunTrabajo);
    const evento = await Evento.findById(idEvento);

    const verificar = await verificarAsignacion(idRunTrabajo, idEvento, idHabilidadJugador);

    //si todo esta bien se calcula un numero alazar y se compara con la probabilidad del evento
    if(verificar.message == "200"){
        //en caso de que la probabilidad sea 1, se asigna el evento sin calcular el numero alazar ya que siempre se cumplira la condicion
        //en caso de que la probabilidad sea 0, no se asigna el evento ya que nunca se cumplira la condicion
        if(evento.probabilidad == 1){
            runTrabajo.decisionesTomadas.push({evento: idEvento});
            await runTrabajo.save();
            return {message: "Evento asignado correctamente"};
        }
        const azar = Math.random();
        if(azar <= evento.probabilidad && evento.probabilidad > 0){
            runTrabajo.decisionesTomadas.push({evento: idEvento});
            await runTrabajo.save();
            return {message: "Evento asignado correctamente"};
        }
        return {message: "No se pudo asignar el evento"};
    }
    return {message: verificar.message};
}

export async function verificarAsignacion(idRunTrabajo, idEvento, idHabilidadJugador){
    const runTrabajo = await RunTrabajo.findById(idRunTrabajo);
    const evento = await Evento.findById(idEvento);
    const habilidadJugador = await HabilidadJugador.findOne({ _id: idHabilidadJugador, runTrabajo: idRunTrabajo });

    //verificamos que los datos no sean nulos
    if(!runTrabajo || !evento){
        const error = new Error("Datos no encontrados");
        error.status = 404;
        throw error;
    }

    //verificamos que la run este en proceso
    if(runTrabajo.estado != "En proceso"){
        const error = new Error("La run asingada no está en proceso");
        error.status = 400;
        throw error;
    }

    //verificamos que el evento no este repetido
    if(runTrabajo.decisionesTomadas.some(decision => decision.evento.toString() === idEvento)){
        if(evento.repetible == false){
            const error = new Error("El evento ya está asignado");
            error.status = 400;
            throw error;
        }
    }

    //verificamos la edad minima del evento
    if(evento.edadMinima > runTrabajo.edadActual){
        const error = new Error("El evento requiere una edad minima");
        error.status = 400;
        throw error;
    }
    
    //verificamos la edad maxima del evento
    if(evento.edadMaxima < runTrabajo.edadActual){
        const error = new Error("El evento requiere una edad maxima");
        error.status = 400;
        throw error;
    }

    //verificamos que la run tenga el trabajo requerido
    if(evento.reqTrabajo == true && !runTrabajo.trabajo){
        const error = new Error("El evento requiere un trabajo");
        error.status = 400;
        throw error;
    }

    //verificamos que la run tenga el estudio requerido
    if(evento.reqEstudio == true && !runTrabajo.estudio){
        const error = new Error("El evento requiere un estudio");
        error.status = 400;
        throw error;
    }

    //verificamos que la run cumpla con las habilidades requeridas
    if (evento.habilidadesRequeridas && evento.habilidadesRequeridas.length > 0) {
        if (!habilidadJugador || !habilidadJugador.habilidad || !evento.habilidadesRequeridas.includes(habilidadJugador.habilidad.toString())) {
            const error = new Error("Jugador no cumple con las habilidades requeridas");
            error.status = 400;
            throw error;
        }
    }

    //verificamos que el evento ocurra cada 4 años
    if(runTrabajo.anioActual % 4 != 0){
        const error = new Error("El evento solo ocurre cada 4 años");
        error.status = 400;
        throw error;
    }

    return {message: "200"};
}

export async function evaluarEvento(idRunTrabajo) {
  const runTrabajo = await RunTrabajo.findById(idRunTrabajo);
  if (!runTrabajo || runTrabajo.estado !== "En proceso") {
    return null;
  }

  const anio = runTrabajo.anioActual || 2027;
  const edad = runTrabajo.edadActual || 18;
  const esEmpleado = runTrabajo.empleado === true && runTrabajo.trabajo !== null;
  const dineroActual = runTrabajo.dineroGenerado || 0;

  const transcurridos = anio - 2027;
  // Evaluación de eventos únicamente cada 3 años como mínimo
  const esCicloEvaluacion = transcurridos > 0 && transcurridos % 3 === 0;

  if (!esCicloEvaluacion) {
    return null;
  }

  // Tirar dado orgánico (75% de probabilidad de que salte un evento en el ciclo de 3 años)
  if (esEmpleado && Math.random() > 0.75) {
    return null;
  }

  let eventosDB = await Evento.find();
  if (!eventosDB || eventosDB.length === 0) {
    return null;
  }

  // obtener lista de IDs de eventos ya resueltos en esta partida
  const eventosResueltosIds = (runTrabajo.decisionesTomadas || [])
    .map((d) => d.evento ? d.evento.toString() : d.toString())
    .filter(Boolean);

  // A. Filtrar por rango de edad (Antes de los 21 años SOLO puede aparecer el evento de conseguir el primer trabajo)
  eventosDB = eventosDB.filter((ev) => {
    const min = typeof ev.edadMinima === "number" ? ev.edadMinima : 18;
    const max = typeof ev.edadMaxima === "number" ? ev.edadMaxima : 65;
    if (edad < 21 && ev.tipo !== "DESEMPLEO" && ev.tipo !== "OFERTA") {
      return false;
    }
    return edad >= min && edad <= max;
  });

  // B. Verificar si el jugador previamente aceptó la propuesta de matrimonio
  let seCasó = false;
  if (runTrabajo.decisionesTomadas && runTrabajo.decisionesTomadas.length > 0) {
    const opcionesTomadas = runTrabajo.decisionesTomadas.map((d) => d.opcion ? d.opcion.toString() : "").filter(Boolean);
    if (opcionesTomadas.length > 0) {
      const { Opcion } = await import("../models/opcion.model.js");
      const opcionesDBTomadas = await Opcion.find({ _id: { $in: opcionesTomadas } });
      seCasó = opcionesDBTomadas.some((op) => /casarte|celebrar la boda/i.test(op.texto || op.titulo || ""));
    }
  }

  // C. Si no se casó previamente, NO pueden aparecer los eventos de divorcio ni nacimiento de hijo
  if (!seCasó) {
    eventosDB = eventosDB.filter((ev) => {
      const tit = (ev.titulo || "").toLowerCase();
      if (tit.includes("divorcio") || tit.includes("hijo")) {
        return false;
      }
      return true;
    });
  }

  // D. Filtrar eventos ya resueltos si repetible === false
  eventosDB = eventosDB.filter((ev) => {
    const evId = ev._id.toString();
    const yaResuelto = eventosResueltosIds.includes(evId);
    const esRepetible = ev.repetible === true;
    if (yaResuelto && !esRepetible) {
      return false;
    }
    return true;
  });

  // E. Filtrar por requisitos de trabajo
  eventosDB = eventosDB.filter((ev) => {
    if (ev.reqTrabajo === true && !esEmpleado) {
      return false;
    }
    return true;
  });

  // F. Filtrar gastos por fondos suficientes
  eventosDB = eventosDB.filter((ev) => {
    if (ev.tipo === "GASTO" || (typeof ev.bonificacion === "number" && ev.bonificacion < 0)) {
      const costo = Math.abs(ev.bonificacion || 0);
      if (dineroActual < costo) {
        return false;
      }
    }
    return true;
  });

  if (eventosDB.length === 0) return null;

  // G. Si está desempleado (y edad >= 20), priorizar ofertas laborales si existen
  if (!esEmpleado && edad >= 20) {
    const eventosEmpleo = eventosDB.filter((ev) => ev.tipo === "DESEMPLEO" || ev.tipo === "OFERTA");
    if (eventosEmpleo.length > 0) {
      eventosDB = eventosEmpleo;
    }
  }

  // F. Selección ponderada por probabilidad
  const totalWeight = eventosDB.reduce((sum, ev) => sum + (ev.probabilidad || 0.5), 0);
  let randomVal = Math.random() * totalWeight;
  let selectedIndex = 0;

  for (let i = 0; i < eventosDB.length; i++) {
    randomVal -= (eventosDB[i].probabilidad || 0.5);
    if (randomVal <= 0) {
      selectedIndex = i;
      break;
    }
  }

  const rawEv = eventosDB[selectedIndex] || eventosDB[0];
  const evId = rawEv._id.toString();

  // Obtener opciones y sus efectos
  const opcionesDB = await Opcion.find({ evento: evId });
  const { getEfectosPorOpcion } = await import("./efectoOpcion.service.js");

  const opcionesConEfectos = await Promise.all(
    opcionesDB.map(async (op) => {
      const opId = op._id.toString();
      const relaciones = await getEfectosPorOpcion(opId);
      const efectos = (relaciones || [])
        .map((rel) => rel.efecto)
        .filter((ef) => ef && typeof ef === "object")
        .map((ef) => ({
          id: ef._id.toString(),
          _id: ef._id.toString(),
          tipo: ef.tipo || "MODIFICAR_HABILIDAD",
          objetivo: ef.objetivo || "Backend",
          valor: typeof ef.valor === "number" ? ef.valor : 1,
        }));

      let rawTexto = op.texto || op.titulo || "Seleccionar opción";

      if (!esEmpleado && /conservar|estabilidad|empresa actual|tu empresa|mantener/i.test(rawTexto)) {
        rawTexto = "Rechazar oferta y mantenerse desempleado";
      } else if (esEmpleado && /conservar|estabilidad|empresa actual|tu empresa/i.test(rawTexto)) {
        rawTexto = "Rechazar oferta y mantenerse en el trabajo actual";
      }

      // Ofertas laborales: incluir el salario ofrecido en paréntesis ($XX,XXX / año)
      if ((rawEv.tipo === "DESEMPLEO" || rawEv.tipo === "OFERTA") && rawEv.bonificacion && /aceptar|firmar|incorporarse|sumarse/i.test(rawTexto)) {
        if (!rawTexto.includes("$")) {
          rawTexto = `${rawTexto} ($${rawEv.bonificacion.toLocaleString()} / año)`;
        }
      }

      // Gastos de una sola opción: incluir el monto en paréntesis ($X,XXX)
      if ((rawEv.tipo === "GASTO" || (typeof rawEv.bonificacion === "number" && rawEv.bonificacion < 0)) && opcionesDB.length === 1) {
        const costo = Math.abs(rawEv.bonificacion || 0);
        if (costo > 0 && !rawTexto.includes("$")) {
          rawTexto = `${rawTexto} ($${costo.toLocaleString()})`;
        }
      }

      return {
        id: opId,
        _id: opId,
        evento: evId,
        titulo: op.titulo,
        texto: rawTexto,
        trabajo: op.trabajo,
        efectos,
      };
    })
  );

  return {
    id: evId,
    _id: evId,
    titulo: rawEv.titulo,
    descripcion: rawEv.descripcion,
    tipo: rawEv.tipo,
    bonificacion: rawEv.bonificacion,
    probabilidad: rawEv.probabilidad,
    opciones: opcionesConEfectos,
  };
}
