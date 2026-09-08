import express from 'express';
import userRoutes from "./routes/user.route.js"
import runTrabajoRoutes from "./routes/runTrabajo.route.js"

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/runs', runTrabajoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

export default app;