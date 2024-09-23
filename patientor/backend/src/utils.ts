import { z } from 'zod';
import {
  Gender,
  HealthCheckRating,
  EntryType,
  PatientFormValues,
} from './types';

const parseDiagnosisCodes = (object: unknown): Array<string> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [];
  }
  return object.diagnosisCodes as Array<string>;
};

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: z
    .object({
      date: z.string(),
      criteria: z.string(),
    })
    .optional(),
});

const EntryWithoutIdSchema = z.union([
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntryWithoutIdSchema),
});

export type EntryWithoutId = z.infer<typeof EntryWithoutIdSchema>;

export const toNewPatient = (values: PatientFormValues): PatientFormValues => {
  return NewPatientSchema.parse(values);
};

export const parseEntry = (object: unknown): EntryWithoutId => {
  const parsedEntry = EntryWithoutIdSchema.parse(object);
  return {
    ...parsedEntry,
    diagnosisCodes: parseDiagnosisCodes(object),
  };
};
