import { RunTrabajo } from "../models/runTrabajo.model.js";

export async function obtenerRankingGlobal() {
    // Buscar partidas finalizadas ordenadas por dinero acumulado de mayor a menor
    let runs = await RunTrabajo.find({ estado: "Completada" })
        .populate('user trabajo')
        .sort({ dineroGenerado: -1 })
        .limit(50);

    // Si no hay suficientes partidas completadas, retornar las runs con mayor patrimonio acumulado
    if (!runs || runs.length === 0) {
        runs = await RunTrabajo.find()
            .populate('user trabajo')
            .sort({ dineroGenerado: -1 })
            .limit(50);
    }

    return runs;
}
