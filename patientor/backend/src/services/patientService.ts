import { v4 as uuid } from 'uuid';
import patients from '../data/patients';
import {
  Patient,
  NonSensitivePatientData,
  PatientFormValues,
  Entry,
} from '../types';
import { EntryWithoutId } from '../utils';

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (patient: PatientFormValues): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (
  patientId: string,
  entryWithoutId: EntryWithoutId,
): Entry | undefined => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    return undefined;
  }

  const newEntry: Entry = { ...entryWithoutId, id: uuid() };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
};
