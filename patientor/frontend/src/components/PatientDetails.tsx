import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  List,
  Button,
  Box,
} from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import axios from 'axios';
import { Patient, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import EntryDetails from './EntryDetails';

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
      <Box display='flex' alignItems='center' marginTop={2}>
        <Typography variant='h4' marginRight={1}>
          {patient.name}
        </Typography>
        {genderIcon()}
      </Box>
      <Typography variant='body1' marginBottom={2}>
        ssh: {patient.ssn}
      </Typography>
      <Typography variant='body1' marginBottom={2}>
        occupation: {patient.occupation}
      </Typography>

      <Typography variant='h5' marginTop={2} marginBottom={2}>
        entries
      </Typography>

      {patient.entries.length > 0 ? (
        <List>
          {patient.entries.map(entry => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </List>
      ) : (
        <Typography>No entries available.</Typography>
      )}

      <Button variant='contained' color='primary' style={{ marginTop: '16px' }}>
        ADD NEW ENTRY
      </Button>
    </Container>
  );
};

export default PatientDetails;
