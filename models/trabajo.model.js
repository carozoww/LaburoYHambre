import mongoose from "mongoose";

const trabajoSchema = new mongoose.Schema({
    nombre: {type:String, required:true},
    area: {
        type:String, 
        enum:[
            'Programacion',
            'Base de datos',
            'Infraestructura',
            'Java',
            'Php',
            'Web'
        ],
        default: 'Programacion'
    },
    habilidad:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habiidad',
        required: true
    },
    salarioBase:{type:Number, required:true},
    edadMinima:{type:Number, required:true},
    descripcion:{type: String,required:true},
    empresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        required:true
    } 
}, {timestamps:true})

const Trabajo = new mongoose.model('Trabajo',trabajoSchema);
