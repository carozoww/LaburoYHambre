import { RunTrabajo } from "../models/runTrabajo.model.js";
import { Trabajo } from "../models/trabajo.model.js";
import { HabilidadJugador } from "../models/habilidadJugador.model.js";

export async function createRunTrabajo(idJugador){
    return RunTrabajo.create({
        user: idJugador,
        fecha: new Date(),
        edadActual: 18,
        anioActual: 2022,
        trabajo: null,
        estudio: null,
        salarioActual: 0,
        estado: "En proceso",
        empleado: false,
        dineroGenerado: 0,
        decisionesTomadas:[{}]
    });
}

export async function returnRunTrabajo(){
    const runTrabajo = await RunTrabajo.find();
    return runTrabajo;
}

export async function returnRunTrabajoById(idUser){
    const runTrabajo = await RunTrabajo.find({usuario: idUser});
    return runTrabajo;
}

export async function returnRunTrabajoActivo(idUser){
    const runTrabajo = await runTrabajo.find({usuario: idUser, estado:"En proceso"});
    return runTrabajo;
}

export async function increaseDinero(idUsuario){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario});
    if(runTrabajo.estado = "Completada"){
        throw new Error('1');
    }
    runTrabajo.dineroGenerado += salarioActual;
    await runTrabajo.save();
    return runTrabajo;
}

export async function increaseEdad(idUsuario){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario});
    if(runTrabajo.estado = "Completada"){
        throw new Error('1');
    }
    runTrabajo.edadActual++;
    await runTrabajo.save();
    return runTrabajo;
}

export async function modifyEstado(idUsuario){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario,estado: "En proceso"});
    if(runTrabajo.estado = "Completada"){
        throw new Error('1');
    }
    runTrabajo.estado = "Completada";
    await runTrabajo.save();
    return runTrabajo;
}

export async function asignEstudio(idUsuario,idEstudio){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario});
    if(runTrabajo.estado = "Completada"){
        throw new Error('1');
    }
    runTrabajo.estudio = idEstudio;
    await runTrabajo.save();
    return runTrabajo;
}

export async function asignTrabajo(idRunTrabajo,idTrabajo){
    const runTrabajo = await RunTrabajo.findById(idRunTrabajo);
    if(runTrabajo.estado = "Completada"){
        throw new Error('1');
    }
    const habilidadesJugador = await HabilidadJugador.find({runTrabajo:idRunTrabajo});
    const idsHabilidades = habilidadesJugador.map(h => h.habilidad);
    const esTrabajoDisponible = await Trabajo.findOne({
        _id: idTrabajo, habilidad: {$in: idsHabilidades}
    });

    if(esTrabajoDisponible){
        runTrabajo.trabajo = idTrabajo;
        await runTrabajo.save();
    } else{
        throw new Error("1");
    }
    
    return runTrabajo;
}

export async function increaseAnio(idUsuario){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario});
    if(runTrabajo.estado = "Completada"){
        throw new Error('1');
    }
    runTrabajo.anioActual++;
    await runTrabajo.save();
    return runTrabajo;
}

export async function nextTurn(idUsuario){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario});
    if(runTrabajo.estado = "Completada"){
        throw new Error('1');
    }
    runTrabajo.dineroGenerado += salarioActual;
    runTrabajo.edadActual++;
    runTrabajo.anioActual++;
    await runTrabajo.save();
    return runTrabajo;
}

export async function startRun(idUsuario){
    const existeRunActiva = await RunTrabajo.findOne({usuario:idUsuario,estado: "En proceso"});
    if(existeRunActiva){
        throw new Error("1");
    }else{
        return createRunTrabajo(idUsuario);
    }
}