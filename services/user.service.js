import {User} from '../models/user.model.js';

export async function createUser(data) {
  return User.create({
    username: data.username,
    email: data.email,
    password: data.password
  });
}

export async function getUser(){
    const user = User.find();
    return user;
}