export const isNotNumber = (argument: unknown): boolean => {
  return isNaN(Number(argument));
};

export class ArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArgumentError';
  }
}

export const validatePositiveNumber = (
  value: unknown,
  name: string,
): number => {
  const num = Number(value);
  if (isNaN(num) || num <= 0) {
    throw new Error(`Invalid ${name}. Please provide a positive number.`);
  }
  return num;
};

export const validateNonNegativeNumber = (
  value: unknown,
  name: string,
): number => {
  const num = Number(value);
  if (isNaN(num) || num < 0) {
    throw new ArgumentError(
      `Invalid ${name}. Please provide a non-negative number.`,
    );
  }
  return num;
};

export const handleError = (error: unknown): void => {
  if (error instanceof ArgumentError) {
    console.error(`Argument Error: ${error.message}`);
  } else if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  } else {
    console.error('An unknown error occurred.');
  }
};
