import * as EstudioService from "../services/estudio.service.js"

export async function returnEstudios(req, res, next) { 
    try {
        const estudios = await EstudioService.getEstudio();
        res.status(201).json(estudios);        
    } catch(err) { 
        next(err); 
    } 
}


export async function obtenerEstudio(req, res, next) { 
    try {
        const estudio = await EstudioService.getEstudioById(req.params.idEstudio);
        res.status(201).json(estudio);
    } catch(err) { 
        next(err); 
    } 
}
