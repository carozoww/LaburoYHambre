import express from 'express';
import * as habilidadJugadorController from '../controllers/habilidadJugador.controller.js';
import { authorizeBodyRun, authorizeRun } from '../middleware/authorizeRun.js';

const router = express.Router();
router.param('idRunTrabajo', authorizeRun);

router.post('/crear', authorizeBodyRun, habilidadJugadorController.createHabilidadJugador);
router.patch('/aumentarHabilidad/:idRunTrabajo/:idHabilidad', habilidadJugadorController.aumentarHabilidad);
router.patch('/disminuirHabilidad/:idRunTrabajo/:idHabilidad', habilidadJugadorController.disminuirHabilidad);
router.post('/aplicarEfecto/:idRunTrabajo/:idEfecto', habilidadJugadorController.aplicarEfecto);
router.post('/removerEfecto/:idRunTrabajo/:idEfecto', habilidadJugadorController.removerEfecto);
router.get('/obtenerHabilidades/:idRunTrabajo', habilidadJugadorController.obtenerHabilidades);
router.get('/obtenerEfectos/:idRunTrabajo', habilidadJugadorController.obtenerEfectos);


export default router;
