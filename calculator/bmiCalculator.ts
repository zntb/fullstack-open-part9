import { validatePositiveNumber } from './helper';

interface BmiResult {
  bmi: number;
  category: string;
}

export function calculateBmi(heightCm: number, weightKg: number): BmiResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category: string;

  switch (true) {
    case bmi < 16.0:
      category = 'Underweight (Severe thinness)';
      break;
    case bmi >= 16.0 && bmi < 17.0:
      category = 'Underweight (Moderate thinness)';
      break;
    case bmi >= 17.0 && bmi < 18.5:
      category = 'Underweight (Mild thinness)';
      break;
    case bmi >= 18.5 && bmi < 25.0:
      category = 'Normal range';
      break;
    case bmi >= 25.0 && bmi < 30.0:
      category = 'Overweight (Pre-obese)';
      break;
    case bmi >= 30.0 && bmi < 35.0:
      category = 'Obese (Class I)';
      break;
    case bmi >= 35.0 && bmi < 40.0:
      category = 'Obese (Class II)';
      break;
    case bmi >= 40.0:
      category = 'Obese (Class III)';
      break;
    default:
      category = 'Unknown category';
  }

  return { bmi: parseFloat(bmi.toFixed(1)), category };
}

if (require.main === module) {
  try {
    const heightCm = validatePositiveNumber(process.argv[2], 'height');
    const weightKg = validatePositiveNumber(process.argv[3], 'weight');
    const result = calculateBmi(heightCm, weightKg);
    console.log(
      `Your BMI is ${result.bmi}, which falls under: ${result.category}`,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unknown error occurred.');
    }
  }
}
