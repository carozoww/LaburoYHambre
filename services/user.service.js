import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { User } from '../models/user.model.js';

const deriveKey = promisify(scrypt);

export async function verifyPassword(password, stored) {
  if (typeof stored !== 'string') return false;
  const [salt, hash] = stored.split(':');
  if (!salt || !/^[a-f0-9]{128}$/i.test(hash || '')) return false;
  const actual = await deriveKey(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(hash, 'hex'));
}

export async function createUser(data) {
  const salt = randomBytes(16).toString('hex');
  const hash = await deriveKey(data.password, salt, 64);
  return User.create({
    username: data.username,
    email: data.email,
    password: `${salt}:${hash.toString('hex')}`
  });
}

export async function getUserById(id){
  const user = await User.findById(id);
  return user;
}
