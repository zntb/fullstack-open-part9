import express, { Response } from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';

const app = express();
app.use(express.json());

app.use(cors());

app.get('/api/ping', (_req, res: Response) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
