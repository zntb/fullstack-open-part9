import { z } from 'zod';
import {
  Gender,
  HealthCheckRating,
  EntryType,
  PatientFormValues,
} from './types';

const BaseEntrySchema = z.object({
  id: z.string(),
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

const EntrySchema = z.union([
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
  entries: z.array(EntrySchema),
});

export const toNewPatient = (values: PatientFormValues): PatientFormValues => {
  return NewPatientSchema.parse(values);
};
