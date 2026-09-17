import express from "express";
import * as rankingController from "../controllers/ranking.controller.js";

const router = express.Router();

router.get('/', rankingController.getRanking);

export default router;
