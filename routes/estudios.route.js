import express from 'express';
import * as estudiosController from '../controllers/estudios.controller.js';

const router = express.Router();

router.post('/crear',estudiosController.createEstudios);
router.get('/ver',estudiosController.returnEstudios);
router.get('/obtenerEstudio/:idEstudio', estudiosController.obtenerEstudio);
router.patch('/modificarEstudio/:idEstudio', estudiosController.modificarEstudio);
router.delete('/eliminarEstudio/:idEstudio', estudiosController.eliminarEstudio);


export default router;