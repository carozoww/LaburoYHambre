import express from 'express';
import * as efectoOpcionController from '../controllers/efectoOpcion.controller.js';

const router = express.Router();

// Endpoint comentado ya que se crearán directamente en la base de datos (datos estáticos)
// router.post('/crear/:idEfecto/:idOpcion',efectoOpcionController.createEfectoOpcion);
router.get('/ver',efectoOpcionController.returnEfectoOpcion);
router.get('/opcion/:idOpcion',efectoOpcionController.verEfectosOpcion);
router.get('/efecto/:idEfecto',efectoOpcionController.verOpcionesEfecto);
router.get('/obtenerEfectoOpcion/:idEfectoOpcion', efectoOpcionController.obtenerEfectoOpcion);
// Endpoints comentados por ser entidades estáticas
// router.patch('/modificarEfectoOpcion/:idEfectoOpcion', efectoOpcionController.modificarEfectoOpcion);
// router.delete('/eliminarEfectoOpcion/:idEfectoOpcion', efectoOpcionController.eliminarEfectoOpcion);


export default router;
