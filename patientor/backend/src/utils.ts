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
      startDate: z.string().refine(value => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Invalid date format. Expected YYYY-MM-DD',
      }),
      endDate: z.string().refine(value => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Invalid date format. Expected YYYY-MM-DD',
      }),
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
  entries: z.array(z.any()).optional(),
});

export type EntryWithoutId = z.infer<typeof EntryWithoutIdSchema>;

export const toNewPatient = (values: PatientFormValues): PatientFormValues => {
  return NewPatientSchema.parse(values);
};

export const parseEntry = (object: unknown): EntryWithoutId => {
  try {
    const parsedEntry = EntryWithoutIdSchema.parse(object);
    if (
      parsedEntry.type === EntryType.OccupationalHealthcare &&
      typeof parsedEntry.employerName !== 'string'
    ) {
      throw new Error('employerName must be a string');
    }
    return {
      ...parsedEntry,
      diagnosisCodes: parseDiagnosisCodes(object),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Invalid input data');
  }
};
