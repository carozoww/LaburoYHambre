import mongoose from 'mongoose';
import { RunTrabajo } from '../models/runTrabajo.model.js';

export function authorizeUser(req, res, next, id) {
  if (id !== req.userId) return res.sendStatus(403);
  next();
}

export async function authorizeRun(req, res, next, id) {
  if (!mongoose.isValidObjectId(id)) return res.sendStatus(400);
  try {
    if (!await RunTrabajo.exists({ _id: id, user: req.userId })) return res.sendStatus(404);
    next();
  } catch (error) {
    next(error);
  }
}

export function authorizeBodyRun(req, res, next) {
  return authorizeRun(req, res, next, req.body?.idRunTrabajo);
}
