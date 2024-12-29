import express from 'express';
import dotenv from 'dotenv';
import { mailRoutes } from './routes/mailRoutes';

dotenv.config();

const app = express();

app.use(express.json());

//rutas
app.use('/api/mail', mailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
