import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  List,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import axios from 'axios';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import EntryDetails from './EntryDetails';
import AddEntryForm from './AddEntryForm';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

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
    void fetchPatient();
  }, [id]);

  const handleEntryAdded = (newEntry: Entry) => {
    if (patient && patient.entries) {
      setPatient({
        ...patient,
        entries: patient.entries.concat(newEntry),
      });
      setDialogOpen(false);
    }
  };

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

      {patient.entries && patient.entries.length > 0 ? (
        <List>
          {patient.entries.map(entry => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </List>
      ) : (
        <Typography>No entries available.</Typography>
      )}

      <Button
        variant='contained'
        color='primary'
        style={{ marginTop: '16px' }}
        onClick={() => setDialogOpen(true)}
      >
        ADD NEW ENTRY
      </Button>

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add a New Entry</DialogTitle>
        <DialogContent>
          <AddEntryForm
            patientId={id!}
            onEntryAdded={handleEntryAdded}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PatientDetails;
