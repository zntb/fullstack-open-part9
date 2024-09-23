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

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge?: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

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
export type NewBaseEntry = Omit<BaseEntry, 'id'>;
export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
