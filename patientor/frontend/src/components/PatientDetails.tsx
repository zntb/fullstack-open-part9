import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );
        setPatient(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchPatient();
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
    </Container>
  );
};

export default PatientDetails;
