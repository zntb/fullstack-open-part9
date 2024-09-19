import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { validatePositiveNumber } from './helper';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  try {
    if (!height || !weight) {
      throw new Error('malformatted parameters');
    }

    const heightCm = validatePositiveNumber(height, 'height');
    const weightKg = validatePositiveNumber(weight, 'weight');

    const result = calculateBmi(heightCm, weightKg);

    res.json({
      weight: weightKg,
      height: heightCm,
      bmi: result.category,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'malformatted parameters' });
    } else {
      res.status(500).json({ error: 'an unknown error occurred' });
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every(n => typeof n === 'number') ||
    typeof target !== 'number'
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const result = calculateExercises(daily_exercises, target);
    return res.json(result);
  } catch (error: unknown) {
    return res.status(400).json({ error: (error as Error).message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
