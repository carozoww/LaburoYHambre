import express from 'express';
import * as trabajosController from '../controllers/trabajos.controller.js';

const router = express.Router();

router.post('/crear',trabajosController.createTrabajo);
router.get('/obtener',trabajosController.returnTrabajo);
router.get('/disponibles/:idRunTrabajo', trabajosController.trabajosDisponibles);
router.get('/detalleTrabajo/:id', trabajosController.trabajoDetalle);
router.patch('/modificar/:idTrabajo', trabajosController.modificarTrabajo);
router.delete('/eliminar/:idTrabajo', trabajosController.eliminarTrabajo);


export default router;