import {Opcion} from "../models/opcion.model.js";
import mongoose from "mongoose"; 

//funcion completa verificando de todo lo necesario
export async function getOpcionPorId(id){

    try{
        const opcion = await Opcion.findById(id);
        
        if (!opcion){
            const error = new Error("Opcion no encontrada");
            error.status = 404;
            throw error;
        }
        return opcion;
    }catch(err){
        if (err.name === "CastError"){ //este error puede ser generado por Mongoose, no es el de acá arriba
            const castError = new Error("El ID de la opcion no es válido");
            castError.status = 400;
            throw castError;
        }
        throw err;
    }
}

export async function getAllOpcionesPorEvento(idEvento){
    try{
        const opciones = await Opcion.find({evento:idEvento});
        if(!opciones || opciones.length === 0){
            const error = new Error("No se encontraron opciones para el evento");
            error.status = 404;
            throw error;
        }
        return opciones;

    } catch(err){
        if (err.name === "CastError"){
            const castError = new Error("El ID del evento no es válido");
            castError.status = 400;
            throw castError;
        }
        throw err;
    }
}

export async function verificarOpcionDeEvento(idOpcion, idEvento){
    try{
        validarId(idOpcion, "opcion");
        validarId(idEvento, "evento");

        const opcion = await Opcion.findOne({_id:idOpcion, evento:idEvento});
        
        if(!opcion){
            const error = new Error("La opcion no pertenece al evento");
            error.status = 400;
            throw error;
        }

        return opcion;
    } catch(err){
        if (err.name === "CastError"){
            const castError = new Error("El ID de la opcion o del evento no es válido");
            castError.status = 400;
            throw castError;
        }
        throw err;
    }
}

function validarId(id, nombre) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error(`El ID de ${nombre} no es válido`);
        error.status = 400;
        throw error;
    }
}