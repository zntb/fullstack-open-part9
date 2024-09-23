import { v4 as uuid } from 'uuid';
import patients from '../data/patients';
import { Patient, NonSensitivePatientData, PatientFormValues } from '../types';

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

export default { getNonSensitivePatients, addPatient, getPatientById };
