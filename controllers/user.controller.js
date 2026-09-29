import * as userService from "../services/user.service.js";
import { User } from "../models/user.model.js";


// controller
export async function createUser(req, res, next) {
  try {
    const { username, email, password } = req.body || {};
    if (typeof username !== 'string' || !username.trim() || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email) || typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ message: 'Ingresá un usuario, un correo válido y una contraseña de al menos 8 caracteres' });
    }
    if (await User.exists({ email: email.trim().toLowerCase() })) {
      return res.status(409).json({ message: 'Ya existe un usuario con ese email registrado' });
    }

    const user = await userService.createUser({ username: username.trim(), email: email.trim(), password });
    res.status(201).json({ _id: user._id, username: user.username, email: user.email });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Ya existe un usuario con ese email registrado' });
    next(err);
  }
}

export async function returnUser(req,res,next){
    try{
        const user = await userService.getUserById(req.userId);
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}

export async function obtenerUsuario(req, res, next) {
    try {
        if (req.params.idUsuario !== req.userId) return res.sendStatus(403);
        const user = await userService.getUserById(req.params.idUsuario)
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
}
