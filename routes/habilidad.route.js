import express from 'express';
import * as habilidadController from '../controllers/habilidad.controller.js';

const router = express.Router();

// Endpoint comentado ya que se crearán directamente en la base de datos (datos estáticos)
// router.post('/crear',habilidadController.createHabilidad);
router.get('/ver',habilidadController.returnHabilidad);
router.get('/obtenerHabilidad/:idHabilidad', habilidadController.obtenerHabilidad);
// Endpoints comentados por ser entidades estáticas
// router.patch('/modificarHabilidad/:idHabilidad', habilidadController.modificarHabilidad);
// router.delete('/eliminarHabilidad/:idHabilidad', habilidadController.eliminarHabilidad);


export default router;