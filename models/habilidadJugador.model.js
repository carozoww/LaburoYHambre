import mongoose from "mongoose";

const habilidadJugadorSchema = new mongoose.Schema({
    runTrabajo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RunTrabajo',
        required:true
    },
    habilidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habilidad',
        required: true
    },
    nivel: {type: String, required: true}
})

export const HabilidadJugador = new mongoose.model('HabilidadJugador', habilidadJugadorSchema);
