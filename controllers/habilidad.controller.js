import * as HabilidadService from "../services/habilidad.service.js";

export async function returnHabilidad(req, res, next) { 
    try {
        const habilidades = await HabilidadService.getHabilidad();
        res.status(201).json(habilidades);
    } catch(err) { 
        next(err); 
    } 
}

export async function obtenerHabilidad(req, res, next) { 
    try {
        const habilidad = await HabilidadService.getHabilidadById(req.params.idHabilidad);
        res.status(201).json(habilidad);
    } catch(err) { 
        next(err); 
    } 
}
