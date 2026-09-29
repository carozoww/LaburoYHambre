import * as userService from "../services/user.service.js";
import { User } from "../models/user.model.js";


// controller
export async function createUser(req, res, next) {
  try {
    const { username, email, password } = req.body;
    let user1 = await User.findOne({ email });
    if(user1){
        return res.status(401).json({ message: "Ya existe un usuario con ese email registrado" });
    }


    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function returnUser(req,res,next){
    try{
        const user = await userService.getUser();
        res.status(201).json(user);
    }catch(err){
        next(err);
    }
}

export async function obtenerUsuario(req, res, next) {
    try {
        const user = await userService.getUserById(req.params.idUsuario)
        res.status(201).json(user);
    } catch(err) {
        next(err);
    }
}