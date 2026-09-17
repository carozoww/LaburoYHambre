import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
    runTrabajo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RunTrabajo',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dineroGenerado: { type: Number, required: true },
    edadFinal: { type: Number, default: 65 }
}, { timestamps: true });

export const Ranking = mongoose.model('Ranking', rankingSchema);
