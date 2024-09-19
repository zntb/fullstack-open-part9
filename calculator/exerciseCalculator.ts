interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInput {
  dailyHours: number[];
  target: number;
}

const parseArgumentsForExercises = (args: string[]): ExerciseInput => {
  if (args.length !== 10) {
    throw new Error(
      'Invalid number of arguments. Expected exactly 8 daily hours and 1 target.',
    );
  }

  const dailyHours = args.slice(2, 9).map(arg => {
    const value = Number(arg);
    if (isNaN(value)) {
      throw new Error('All daily hours should be numbers.');
    }
    return value;
  });

  const target = Number(args[9]);
  if (isNaN(target)) {
    throw new Error('Target value should be a number.');
  }

  return {
    dailyHours,
    target,
  };
};

const roundAverage = (average: number): number => {
  const fraction = average % 1;
  return fraction > 0.75 ? Math.ceil(average) : average;
};

const calculateExercises = (
  dailyHours: number[],
  target: number,
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(day => day > 0).length;
  let average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;

  average = roundAverage(average);

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target * 1.5) {
    rating = 3;
    ratingDescription = 'Excellent, exceeded expectations!';
  } else if (average >= target) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'You need to work harder to meet the target';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyHours, target } = parseArgumentsForExercises(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error) {
  console.error('Error:', (error as Error).message);
}
