import express from "express";

import * as runTrabajoController from '../controllers/runTrabajo.controller.js'

const router = express.Router();

router.post('/crear',runTrabajoController.createRunTrabajo);
router.get('/ver',runTrabajoController.returnRunTrabajo);
router.patch('/aumentarDinero/:idUsuario', runTrabajoController.aumentarDinero);
router.patch('/aumentarEdad/:idUsuario', runTrabajoController.aumentarEdad);
router.patch('/modificarEstado/:idUsuario', runTrabajoController.modificarEstado);
router.post('/asignarEstudio/:idUsuario', runTrabajoController.asignarEstudio);
router.post('/iniciarRun', runTrabajoController.iniciarRun);
router.get('/obtenerRunTrabajo/:idUsuario', runTrabajoController.obtenerRunTrabajo);
router.get('/obtenerRunTrabajoActivo/:idUsuario', runTrabajoController.obtenerRunTrabajoActivo);
router.post('/asignarTrabajo/:idRunTrabajo/:idTrabajo', runTrabajoController.asignarTrabajo);
router.patch('/aumentarAnio/:idRunTrabajo/:idUsuario', runTrabajoController.aumentarAnio);
router.patch('/empleado/:idRunTrabajo/:idUsuario', runTrabajoController.empleado);

//este es un endpoint por si queremos que se aumente la edad, el dinero, el año y todo eso de una en vez por separado
//router.post('/avanzarTurno/:idRunTrabajo', runTrabajoController.avanzarTurno);

export default router;