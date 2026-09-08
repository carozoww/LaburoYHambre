import { RunTrabajo } from "../models/runTrabajo.model.js"

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
    const runTrabajo = RunTrabajo.find();
    return runTrabajo;
}