import express from 'express';
import * as empresasController from '../controllers/empresa.controller.js';

const router = express.Router();

// Endpoint comentado ya que se crearán directamente en la base de datos (datos estáticos)
// router.post('/crear',empresasController.createEmpresas);
router.get('/ver',empresasController.returnEmpresas);
router.get('/obtenerEmpresa/:idEmpresa', empresasController.obtenerEmpresa);
router.get('/obtenerDetalle/:idEmpresa', empresasController.obtenerDetalleEmpresa);
// Endpoints comentados por ser entidades estáticas
// router.patch('/modificarEmpresa/:idEmpresa', empresasController.modificarEmpresa);
// router.delete('/eliminarEmpresa/:idEmpresa', empresasController.eliminarEmpresa);

export default router;