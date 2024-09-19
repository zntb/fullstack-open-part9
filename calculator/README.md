# Exercises 9.1-9.3

setup

Exercises 9.1-9.7. will all be made in the same node project. Create the project in an empty directory with `npm init` and install the ts-node and typescript packages. Also, create the file `tsconfig.json` in the directory with the following content:

```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

The compiler option [noImplicitAny](https://www.typescriptlang.org/tsconfig/#noImplicitAny) makes it mandatory to have types for all variables used. This option is currently a default, but it lets us define it explicitly.

## 9.1 Body mass index

Create the code of this exercise in the file `bmiCalculator.ts`.

Write a function calculateBmi that calculates a [BMI](https://en.wikipedia.org/wiki/Body_mass_index) based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print out the result. The code

```ts
console.log(calculateBmi(180, 74));
```

should print the following message:

```bash
Normal range
```

Create an npm script for running the program with the command `npm run calculateBmi`.
