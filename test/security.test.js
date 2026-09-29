import test from 'node:test';
import assert from 'node:assert/strict';
import { User } from '../models/user.model.js';
import { RunTrabajo } from '../models/runTrabajo.model.js';
import { createUser, verifyPassword } from '../services/user.service.js';
import { authorizeRun } from '../middleware/authorizeRun.js';
import { login } from '../controllers/auth.controller.js';

test('passwords are hashed and runs belong to the signed-in user', async () => {
  const create = User.create;
  const exists = RunTrabajo.exists;
  let saved;
  User.create = async data => { saved = data; return data; };
  RunTrabajo.exists = async filter => filter.user === '507f1f77bcf86cd799439011';

  try {
    await createUser({ username: 'ana', email: 'ana@example.com', password: 'secreto123' });
    assert.notEqual(saved.password, 'secreto123');
    assert.equal(await verifyPassword('secreto123', saved.password), true);
    assert.equal(await verifyPassword('incorrecta', saved.password), false);

    let status;
    let allowed = false;
    const res = { status(code) { status = code; return this; }, json() {}, sendStatus(code) { status = code; } };
    await login({ body: { email: 'ana@example.com' } }, res, error => { throw error; });
    assert.equal(status, 400);

    await authorizeRun({ userId: 'otro' }, res, () => { allowed = true; }, '507f1f77bcf86cd799439012');
    assert.equal(status, 404);
    assert.equal(allowed, false);
  } finally {
    User.create = create;
    RunTrabajo.exists = exists;
  }
});
