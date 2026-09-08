import mongoose from "mongoose";

const opcionSchema = new mongoose.Schema({
    evento: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Evento',
        required: true
    },
    titulo: {type:String, required:true},
    texto: {type:String,required:true}
}, {timestamps:true})

const Opcion = new mongoose.model('Opcion',opcionSchema);
