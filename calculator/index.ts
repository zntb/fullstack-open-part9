import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { validatePositiveNumber } from './helper';

const app = express();

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
  } catch (error) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
