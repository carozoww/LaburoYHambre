import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as authController from '../controllers/auth.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/crear',userController.createUser);
router.get('/ver', authenticate, userController.returnUser);
router.get('/verUsuario/:idUsuario', authenticate, userController.obtenerUsuario);
router.post('/login',authController.login);


export default router;