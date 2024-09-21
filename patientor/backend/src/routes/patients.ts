import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { PatientFormValues } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatient: PatientFormValues = req.body as PatientFormValues;

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('Unknown error');
    }
  }
});

export default router;
