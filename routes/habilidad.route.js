import express from 'express';
import * as habilidadController from '../controllers/habilidad.controller.js';

const router = express.Router();

router.post('/crear',habilidadController.createHabilidad);
router.get('/ver',habilidadController.returnHabilidad);
router.get('/obtenerHabilidad/:idHabilidad', habilidadController.obtenerHabilidad);
router.patch('/modificarHabilidad/:idHabilidad', habilidadController.modificarHabilidad);
router.delete('/eliminarHabilidad/:idHabilidad', habilidadController.eliminarHabilidad);


export default router;