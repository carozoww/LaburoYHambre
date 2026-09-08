import express from 'express';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/',userController.createUser);
router.get('/',userController.returnUser);


export default router;