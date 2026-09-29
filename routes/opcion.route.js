import express from 'express';
import * as opcionController from '../controllers/opcion.controller.js';
import { authorizeRun } from '../middleware/authorizeRun.js';

const router = express.Router();
router.param('idRunTrabajo', authorizeRun);

// Endpoint comentado ya que se crearán directamente en la base de datos (datos estáticos)
// router.post('/crear',opcionController.createOpcion);
router.get('/evento/:idEvento/opciones', opcionController.returnOpcion);
router.post('/tomarOpcion/:idEvento/:idRunTrabajo', opcionController.tomarOpcion);


export default router;
