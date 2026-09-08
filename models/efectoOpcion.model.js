import mongoose from "mongoose";

const efectoOpcionSchema = new mongoose.Schema({
    efecto: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Efecto',
        required:true
    },
    opcion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opcion',
        required:true
    }
}, {timestamps:true});

const EfectoOpcion = new mongoose.model('EfectoOpcion',efectoOpcionSchema);

