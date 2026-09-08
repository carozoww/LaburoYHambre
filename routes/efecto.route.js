import express from 'express';
import * as efectoController from '../controllers/efecto.controller.js';

const router = express.Router();

router.post('/crear',efectoController.createEfecto);
router.get('/ver',efectoController.returnEfecto);
router.get('/obtenerEfecto/:idEfecto', efectoController.obtenerEfecto);
router.patch('/modificarEfecto/:idEfecto', efectoController.modificarEfecto);
router.delete('/eliminarEfecto/:idEfecto', efectoController.eliminarEfecto);


export default router;