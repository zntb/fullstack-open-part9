import { z } from 'zod';
import { Gender, PatientFormValues } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatient = (values: PatientFormValues): PatientFormValues => {
  return NewPatientSchema.parse(values);
};
