import express from 'express';
import * as habilidadJugadorController from '../controllers/habilidadJugador.controller.js';

const router = express.Router();

router.post('/crear',habilidadJugadorController.createHabilidadJugador);
router.get('/ver',habilidadJugadorController.returnHabilidadJugador);
router.patch('/aumentarHabilidad/:idRunTrabajo/:idHabilidad', habilidadJugadorController.aumentarHabilidad);
router.patch('/disminuirHabilidad/:idRunTrabajo/:idHabilidad', habilidadJugadorController.disminuirHabilidad);
router.post('/aplicarEfecto/:idRunTrabajo/:idEfecto', habilidadJugadorController.aplicarEfecto);
router.post('/removerEfecto/:idRunTrabajo/:idEfecto', habilidadJugadorController.removerEfecto);
router.get('/obtenerHabilidades/:idRunTrabajo', habilidadJugadorController.obtenerHabilidades);
router.get('/obtenerEfectos/:idRunTrabajo', habilidadJugadorController.obtenerEfectos);


export default router;