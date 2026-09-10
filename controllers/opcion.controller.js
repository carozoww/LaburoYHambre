import * as opcionService from "../services/opcion.service.js";

export async function returnOpcion(req, res, next) { 
    try {
        const opciones = await opcionService.getAllOpcionesPorEvento(req.params.idEvento);
        return res.status(200).json(opciones);

    } catch (err) { 
        next(err);
    } 
}

export async function tomarOpcion(req, res, next) { 
    try {
        //verificamos que existan
        const { idEvento, idRunTrabajo } = req.params;
        const { opcionId } = req.body;

        if(!opcionId || !idEvento || !idRunTrabajo){
            const error = new Error("Faltan datos requeridos");
            error.status = 400;
            throw error;
        }

        const opcion = await opcionService.verificarOpcionDeEvento(opcionId, idEvento);

        return res.status(200).json({ message: "Opción válida", opcion, idRunTrabajo });

    } catch (err) { 
        next(err);
    } 
}
