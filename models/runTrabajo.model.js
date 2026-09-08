import mongoose from "mongoose";

const runTrabajoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    fecha: {type:Date,required: true},
    edadActual: {type:Number,required:true},
    anioActual: {type:Number,required:true},
    trabajo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Trabajo',
        required: true
    },
    estudio:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudio',
        required:true
    },
    salarioActual:{ type:Number,required:true},
    estado: {type:String, enum:['En proceso','Completada'], default:'En proceso'},
    empleado: {type: Boolean, required: true, default: false},
    dineroGenerado: {type: Number, required:true}
})

const RunTrabajo = new mongoose.model('RunTrabajo', runTrabajoSchema);

