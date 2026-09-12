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
    const habilidadJugador = await HabilidadJugador.findById(idHabilidadJugador);

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