import express from 'express';
import userRoutes from "./routes/user.route.js"
import runTrabajoRoutes from "./routes/runTrabajo.route.js"
import habilidadJugadorRoutes from "./routes/habilidadJugador.route.js"
import estudiosRoutes from "./routes/estudios.route.js"
import trabajosRoutes from "./routes/trabajos.route.js"
import empresaRoutes from "./routes/empresa.route.js"
import habilidadRoutes from "./routes/habilidad.route.js"
import opcionRoutes from "./routes/opcion.route.js"
import eventoRoutes from "./routes/evento.route.js"
import efectoRoutes from "./routes/efecto.route.js"
import efectoOpcionRoutes from "./routes/efectoOpcion.route.js"
import authenticate from "./middleware/authenticate.js"

const app = express();

app.use(express.json());

app.use('/usuario', userRoutes);
app.use('/runTrabajo', authenticate, runTrabajoRoutes);
app.use('/habilidadJugador', authenticate, habilidadJugadorRoutes);
app.use('/estudios', authenticate, estudiosRoutes);
app.use('/trabajos', authenticate, trabajosRoutes);
app.use('/empresas', authenticate, empresaRoutes);
app.use('/habilidad', authenticate, habilidadRoutes);
app.use('/opcion', authenticate, opcionRoutes);
app.use('/evento', authenticate, eventoRoutes);
app.use('/efecto', authenticate, efectoRoutes);
app.use('/efectoOpcion', authenticate, efectoOpcionRoutes);

app.get('/test', authenticate, (req, res) => {
  res.json({ message: 'API funcionando protegida', user: req.userId });
});

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

export default app;