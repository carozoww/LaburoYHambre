import express from 'express';
import * as eventoController from '../controllers/evento.controller.js';

const router = express.Router();

router.post('/crear',eventoController.createEvento);
router.get('/ver',eventoController.returnEvento);
router.get('/obtenerOpciones/:idEvento', eventoController.obtenerOpciones);
router.get('/calcular/:idRunTrabajo', eventoController.calcularOpcion);

export default router;