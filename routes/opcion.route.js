import express from 'express';
import * as opcionController from '../controllers/opcion.controller.js';

const router = express.Router();

// Endpoint comentado ya que se crearán directamente en la base de datos (datos estáticos)
// router.post('/crear',opcionController.createOpcion);
router.get('/ver',opcionController.returnOpcion);
router.post('/tomarOpcion/:idEvento/:idRunTrabajo', opcionController.tomarOpcion);


export default router;