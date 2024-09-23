import { z } from 'zod';
import { NewPatientSchema } from './utils';

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Entry {
  id: string;
  description: string;
  date: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatientSchema = z.infer<typeof NewPatientSchema>;

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
