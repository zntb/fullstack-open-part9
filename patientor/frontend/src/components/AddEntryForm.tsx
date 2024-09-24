import { useState } from 'react';
import { Box, Button, TextField, Alert } from '@mui/material';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry } from '../types';

interface AddEntryFormProps {
  patientId: string;
  onAddEntry: (newEntry: Entry) => void;
}

const AddEntryForm = ({ patientId, onAddEntry }: AddEntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const [year, month, day] = date.split('-');

    const formattedDate = `${parseInt(year, 10)}-${parseInt(
      month,
      10,
    )}-${parseInt(day, 10)}`;

    const newEntry = {
      description,
      date: formattedDate,
      specialist,
      type: 'Hospital',
    };

    try {
      const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        newEntry,
      );
      onAddEntry(data);
      setDescription('');
      setDate('');
      setSpecialist('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          typeof error.response.data?.error === 'string'
            ? error.response.data.error
            : 'Failed to add entry. Please check your input.',
        );
      } else {
        setError('Failed to add entry. Please try again later.');
      }
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit} marginTop={2}>
      {error && (
        <Alert severity='error' style={{ marginBottom: '16px' }}>
          {typeof error === 'string'
            ? error
            : 'An error occurred. Please try again.'}
        </Alert>
      )}
      <TextField
        fullWidth
        label='Description'
        value={description}
        onChange={e => setDescription(e.target.value)}
        margin='normal'
        required
      />
      <TextField
        fullWidth
        label='Date'
        type='text'
        value={date}
        onChange={e => setDate(e.target.value)}
        margin='normal'
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        fullWidth
        label='Specialist'
        value={specialist}
        onChange={e => setSpecialist(e.target.value)}
        margin='normal'
        required
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        style={{ marginTop: '16px' }}
      >
        Add Entry
      </Button>
    </Box>
  );
};

export default AddEntryForm;
