import {Empresa} from "../models/empresa.model.js";

export async function getEmpresa(){
    const empresa = await Empresa.find();
    return empresa;
}

export async function getEmpresaById(id){
    const empresa = await Empresa.findById(id);
    return empresa;
}