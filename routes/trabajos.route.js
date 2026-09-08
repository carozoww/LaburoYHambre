import express from 'express';
import * as trabajosController from '../controllers/trabajos.controller.js';

const router = express.Router();

// Endpoint comentado ya que se crearán directamente en la base de datos (datos estáticos)
// router.post('/crear',trabajosController.createTrabajo);
router.get('/obtener',trabajosController.returnTrabajo);
router.get('/disponibles/:idRunTrabajo', trabajosController.trabajosDisponibles);
router.get('/detalleTrabajo/:id', trabajosController.trabajoDetalle);
// Endpoints comentados por ser entidades estáticas
// router.patch('/modificar/:idTrabajo', trabajosController.modificarTrabajo);
// router.delete('/eliminar/:idTrabajo', trabajosController.eliminarTrabajo);


export default router;