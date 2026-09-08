import express from 'express';
import * as estudiosController from '../controllers/estudios.controller.js';

const router = express.Router();

// Endpoint comentado ya que se crearán directamente en la base de datos (datos estáticos)
// router.post('/crear',estudiosController.createEstudios);
router.get('/ver',estudiosController.returnEstudios);
router.get('/obtenerEstudio/:idEstudio', estudiosController.obtenerEstudio);
// Endpoints comentados por ser entidades estáticas
// router.patch('/modificarEstudio/:idEstudio', estudiosController.modificarEstudio);
// router.delete('/eliminarEstudio/:idEstudio', estudiosController.eliminarEstudio);


export default router;