import express from 'express';
import * as efectoController from '../controllers/efecto.controller.js';

const router = express.Router();

// Endpoint comentado ya que se crearán directamente en la base de datos (datos estáticos)
// router.post('/crear',efectoController.createEfecto);
router.get('/ver',efectoController.returnEfecto);
router.get('/obtenerEfecto/:idEfecto', efectoController.obtenerEfecto);
// Endpoints comentados por ser entidades estáticas
// router.patch('/modificarEfecto/:idEfecto', efectoController.modificarEfecto);
// router.delete('/eliminarEfecto/:idEfecto', efectoController.eliminarEfecto);


export default router;