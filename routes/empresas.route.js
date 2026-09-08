import express from 'express';
import * as empresasController from '../controllers/empresas.controller.js';

const router = express.Router();

router.post('/crear',empresasController.createEmpresas);
router.get('/ver',empresasController.returnEmpresas);
router.get('/obtenerEmpresa/:idEmpresa', empresasController.obtenerEmpresa);
router.get('/obtenerDetalle/:idEmpresa', empresasController.obtenerDetalleEmpresa);
router.patch('/modificarEmpresa/:idEmpresa', empresasController.modificarEmpresa);
router.delete('/eliminarEmpresa/:idEmpresa', empresasController.eliminarEmpresa);

export default router;