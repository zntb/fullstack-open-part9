interface BmiResult {
  bmi: number;
  category: string;
}

function parseArguments(args: Array<string>): {
  heightCm: number;
  weightKg: number;
} {
  if (args.length !== 4) {
    throw new Error(
      'Invalid number of arguments. Please provide height (cm) and weight (kg).',
    );
  }

  const heightCm = Number(args[2]);
  const weightKg = Number(args[3]);

  if (isNaN(heightCm) || heightCm <= 0) {
    throw new Error(
      'Invalid height. Please provide a positive number for height in cm.',
    );
  }

  if (isNaN(weightKg) || weightKg <= 0) {
    throw new Error(
      'Invalid weight. Please provide a positive number for weight in kg.',
    );
  }

  return { heightCm, weightKg };
}

function calculateBmi(heightCm: number, weightKg: number): BmiResult {
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

try {
  const { heightCm, weightKg } = parseArguments(process.argv);
  const result = calculateBmi(heightCm, weightKg);
  console.log(
    `Your BMI is ${result.bmi}, which falls under: ${result.category}`,
  );
} catch (error) {
  console.error(error.message);
}
