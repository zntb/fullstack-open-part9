import express, { Response } from 'express';
import patientService from '../services/patientService';
import { PatientFormValues } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient: PatientFormValues = toNewPatient(req.body as unknown);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: 'Unknown error occurred.' });
    }
  }
});

export default router;
