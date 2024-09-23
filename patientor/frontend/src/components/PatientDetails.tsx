import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import axios from 'axios';
import { Patient, Diagnosis, Entry } from '../types';
import { apiBaseUrl } from '../constants';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );
        setPatient(patientData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesData } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`,
        );
        setDiagnoses(diagnosesData);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);

  if (!patient) {
    return <CircularProgress />;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case 'male':
        return <Male />;
      case 'female':
        return <Female />;
      case 'other':
        return <Transgender />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Typography variant='h4' marginTop={2}>
        {patient.name}
        <span> {genderIcon()}</span>
      </Typography>
      <Typography variant='h6'>Date of Birth: {patient.dateOfBirth}</Typography>
      <Typography variant='h6'>Occupation: {patient.occupation}</Typography>
      <Typography variant='h6'>SSN: {patient.ssn}</Typography>

      <Typography variant='h5' marginTop={2}>
        Entries:
      </Typography>

      {patient.entries.length > 0 ? (
        <List>
          {patient.entries.map((entry: Entry) => (
            <ListItem key={entry.id} alignItems='flex-start'>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                    fontStyle: 'italic',
                  }}
                >
                  <Typography variant='body1'>Date: {entry.date}</Typography>
                  <Typography variant='body1'>{entry.description}</Typography>
                </div>

                <Typography variant='body2'>Diagnose Codes:</Typography>
                {entry.diagnosisCodes ? (
                  <ul>
                    {entry.diagnosisCodes.map(code => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant='body2'>
                    No diagnosis codes available.
                  </Typography>
                )}
              </div>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No entries available.</Typography>
      )}
    </Container>
  );
};

export default PatientDetails;
