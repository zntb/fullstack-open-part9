import { useState } from 'react';
import { Button, TextField, MenuItem, Alert, Box } from '@mui/material';
import axios from 'axios';
import { Entry } from '../types';
import { apiBaseUrl } from '../constants';

interface AddEntryFormProps {
  patientId: string;
  onEntryAdded: (entry: Entry) => void;
}

const AddEntryForm = ({ patientId, onEntryAdded }: AddEntryFormProps) => {
  const [type, setType] = useState('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number | string>(
    0,
  );
  const [employerName, setEmployerName] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newEntry;

    switch (type) {
      case 'HealthCheck':
        newEntry = {
          type,
          description,
          date,
          specialist,
          healthCheckRating: Number(healthCheckRating),
        };
        break;
      case 'Hospital':
        newEntry = {
          type,
          description,
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case 'OccupationalHealthcare':
        newEntry = {
          type,
          description,
          date,
          specialist,
          employerName,
        };
        break;
      default:
        return;
    }

    try {
      const { data: addedEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        newEntry,
      );
      onEntryAdded(addedEntry);
      setSuccessMessage('Entry added successfully!');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Failed to add entry. Please check your input.');
      setSuccessMessage(null);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
      <TextField
        fullWidth
        label='Description'
        value={description}
        onChange={e => setDescription(e.target.value)}
        margin='normal'
      />
      <TextField
        fullWidth
        label='Date'
        type='date'
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={e => setDate(e.target.value)}
        margin='normal'
      />
      <TextField
        fullWidth
        label='Specialist'
        value={specialist}
        onChange={e => setSpecialist(e.target.value)}
        margin='normal'
      />
      <TextField
        select
        label='Type'
        fullWidth
        value={type}
        onChange={e => setType(e.target.value)}
        margin='normal'
      >
        <MenuItem value='HealthCheck'>Health Check</MenuItem>
        <MenuItem value='Hospital'>Hospital</MenuItem>
        <MenuItem value='OccupationalHealthcare'>
          Occupational Healthcare
        </MenuItem>
      </TextField>

      {type === 'HealthCheck' && (
        <TextField
          fullWidth
          label='Health Check Rating'
          value={healthCheckRating}
          onChange={e => setHealthCheckRating(e.target.value)}
          type='number'
          margin='normal'
        />
      )}

      {type === 'Hospital' && (
        <>
          <TextField
            fullWidth
            label='Discharge Date'
            type='date'
            InputLabelProps={{ shrink: true }}
            value={dischargeDate}
            onChange={e => setDischargeDate(e.target.value)}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Discharge Criteria'
            value={dischargeCriteria}
            onChange={e => setDischargeCriteria(e.target.value)}
            margin='normal'
          />
        </>
      )}

      {type === 'OccupationalHealthcare' && (
        <TextField
          fullWidth
          label='Employer Name'
          value={employerName}
          onChange={e => setEmployerName(e.target.value)}
          margin='normal'
        />
      )}

      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Entry
      </Button>
    </Box>
  );
};

export default AddEntryForm;
