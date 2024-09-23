import { z } from 'zod';
import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { NewPatientSchema, parseEntry } from '../utils';
import { Patient, NonSensitivePatientData, PatientFormValues } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientData[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get(
  '/:id',
  (
    req: Request<{ id: string }>,
    res: Response<Patient | { error: string }>,
  ) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  },
);

router.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, PatientFormValues>,
    res: Response<Patient>,
  ) => {
    const patient = patientService.addPatient(req.body);
    res.json(patient);
  },
);

router.post(
  '/:id/entries',
  (
    req: Request<{ id: string }, unknown, unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const entry = parseEntry(req.body);
      const newEntry = patientService.addEntry(req.params.id, entry);

      if (newEntry) {
        res.json(newEntry);
      } else {
        res.status(404).send({ error: 'Patient not found' });
      }
    } catch (error: unknown) {
      next(error);
    }
  },
);

router.use(errorMiddleware);

export default router;
