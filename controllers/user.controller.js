import * as userService from "../services/user.service.js";


// controller
export async function createUser(req, res, next) {
  try {
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