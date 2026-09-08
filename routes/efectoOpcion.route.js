import express from 'express';
import * as efectoOpcionController from '../controllers/efectoOpcion.controller.js';

const router = express.Router();

router.post('/crear/:idEfecto/:idOpcion',efectoOpcionController.createEfectoOpcion);
router.get('/ver',efectoOpcionController.returnEfectoOpcion);
router.get('/ver/:idOpcion',efectoOpcionController.verEfectosOpcion);
router.get('/ver/:idEfecto',efectoOpcionController.verOpcionesEfecto);
router.get('/obtenerEfectoOpcion/:idEfectoOpcion', efectoOpcionController.obtenerEfectoOpcion);
router.patch('/modificarEfectoOpcion/:idEfectoOpcion', efectoOpcionController.modificarEfectoOpcion);
router.delete('/eliminarEfectoOpcion/:idEfectoOpcion', efectoOpcionController.eliminarEfectoOpcion);


export default router;