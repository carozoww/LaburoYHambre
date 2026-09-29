import express from 'express';
import * as eventoController from '../controllers/evento.controller.js';
import { authorizeRun } from '../middleware/authorizeRun.js';

const router = express.Router();
router.param('idRunTrabajo', authorizeRun);

// Endpoint comentado ya que se crearán directamente en la base de datos (datos estáticos)
// router.post('/crear',eventoController.createEvento);
router.get('/ver',eventoController.returnEvento);
router.get('/obtenerOpciones/:idEvento', eventoController.obtenerOpciones);
router.post('/asignarEvento/:idRunTrabajo/:idEvento/:idHabilidadJugador', eventoController.asignarEvento);
router.post('/verificarAsignacion/:idRunTrabajo/:idEvento/:idHabilidadJugador', eventoController.verificarAsignacion);
export default router;
