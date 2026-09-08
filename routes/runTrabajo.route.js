import express from "express";

import * as runTrabajoController from '../controllers/runTrabajo.controller.js'

const router = express.Router();

router.post('/',runTrabajoController.createRunTrabajo);
router.get('/',runTrabajoController.returnRunTrabajo);

export default router;