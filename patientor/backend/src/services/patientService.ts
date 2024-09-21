import { v4 as uuid } from 'uuid';
import patients from '../data/patients';
import { Patient, PatientFormValues } from '../types';

const getNonSensitivePatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientData: PatientFormValues): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientData,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitivePatients, addPatient };
