import {
  validatePositiveNumber,
  validateNonNegativeNumber,
  handleError,
} from './helper';

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
  if (args.length < 4) {
    throw new Error(
      'Invalid number of arguments. Provide target followed by any number of daily exercise hours.',
    );
  }

  const target = validatePositiveNumber(args[2], 'target');

  const dailyHours = args.slice(3).map((arg, index) => {
    return validateNonNegativeNumber(arg, `daily hour ${index + 1}`);
  });

  return { dailyHours, target };
};

const roundAverage = (average: number): number => {
  const fraction = average % 1;
  return fraction > 0.75 ? Math.ceil(average) : average;
};

export const calculateExercises = (
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
  handleError(error);
}
