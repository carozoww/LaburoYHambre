import * as EmpresaService from "../services/empresa.service.js";

export async function returnEmpresas(req, res, next) { 
    try {
        const empresa = await EmpresaService.getEmpresa();
        res.status(201).json(empresa);
    } catch(err) { 
        next(err); 
    } 
}

export async function obtenerEmpresa(req, res, next) { 
    try {
        const empresa = await EmpresaService.getEmpresaById(req.params.idEmpresa);
        res.status(201).json(empresa);
    } catch(err) { 
        next(err); 
    } 
}

//no entiendo esta funcion no es lo mismo que la de obtenerEmpresa????
export async function obtenerDetalleEmpresa(req, res, next) { 
    try {

    } catch(err) { 
        next(err); 
    } 
}
