import { RunTrabajo } from "../models/runTrabajo.model.js";

export async function createRunTrabajo(data){
    return RunTrabajo.create({
        user: data.user,
        fecha: data.fecha,
        edadActual: data.edadActual,
        anioActual: data.anioActual,
        trabajo: data.trabajo,
        estudio: data.estudio,
        salarioActual: data.salarioActual,
        estado: data.estado,
        empleado: data.empleado,
        dineroGenerado: data.dineroGenerado
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
    runTrabajo.dineroGenerado += salarioActual;
    return runTrabajo;
}

export async function increaseEdad(idUsuario){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario});
    runTrabajo.edadActual++;
    return runTrabajo;
}

export async function modifyEstado(idUsuario){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario,estado: "En proceso"});
    runTrabajo.estado = "Completada";
    return runTrabajo;
}

export async function asignEstudio(idUsuario,idEstudio){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario});
    runTrabajo.estudio = idEstudio;
    return runTrabajo;
}

export async function asignTrabajo(idUsuario,idTrabajo){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario});
    runTrabajo.trabajo = idTrabajo;
    return runTrabajo;
}

export async function increaseAnio(idUsuario){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario});
    runTrabajo.anioActual++;
    return runTrabajo;
}

export async function nextTurn(idUsuario){
    const runTrabajo = await RunTrabajo.find({usuario: idUsuario});
    runTrabajo.dineroGenerado += salarioActual;
    runTrabajo.edadActual++;
    runTrabajo.anioActual++;
    return runTrabajo;
}