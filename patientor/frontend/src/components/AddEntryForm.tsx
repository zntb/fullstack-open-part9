import { useState } from 'react';
import { Box, Button, Alert, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Entry } from '../types';
import { apiBaseUrl } from '../constants';
import DatePickerField from './AddEntryFields/DatePickerField';
import TextFieldWithError from './AddEntryFields/TextFieldWithError';
import HealthCheckFields from './AddEntryFields/HealthCheckFields';
import HospitalFields from './AddEntryFields/HospitalFields';
import OccupationalHealthcareFields from './AddEntryFields/OccupationalHealthcareFields';
import SelectField from './AddEntryFields/SelectField';
import { format } from 'date-fns';

interface AddEntryFormProps {
  patientId: string;
  onEntryAdded: (entry: Entry) => void;
  onCancel: () => void;
}

const typeOptions = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
];

const AddEntryForm = ({
  patientId,
  onEntryAdded,
  onCancel,
}: AddEntryFormProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      type: 'HealthCheck',
      description: '',
      date: new Date(),
      specialist: '',
      healthCheckRating: 0,
      dischargeDate: new Date(),
      dischargeCriteria: '',
      employerName: '',
      sickLeave: { startDate: new Date(), endDate: new Date() },
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
      date: Yup.date().required('Date is required'),
      specialist: Yup.string().required('Specialist is required'),
    }),
    onSubmit: async values => {
      try {
        const formattedDate = format(values.date, 'yyyy-MM-dd');
        const formattedDischargeDate = format(
          values.dischargeDate,
          'yyyy-MM-dd',
        );
        const formattedSickLeaveStart = format(
          values.sickLeave.startDate,
          'yyyy-MM-dd',
        );
        const formattedSickLeaveEnd = format(
          values.sickLeave.endDate,
          'yyyy-MM-dd',
        );

        const newEntry = {
          type: values.type,
          description: values.description,
          date: formattedDate,
          specialist: values.specialist,
          healthCheckRating:
            values.type === 'HealthCheck'
              ? values.healthCheckRating
              : undefined,
          discharge:
            values.type === 'Hospital'
              ? {
                  date: formattedDischargeDate,
                  criteria: values.dischargeCriteria,
                }
              : undefined,
          employerName:
            values.type === 'OccupationalHealthcare'
              ? values.employerName
              : undefined,
          sickLeave:
            values.type === 'OccupationalHealthcare'
              ? {
                  startDate: formattedSickLeaveStart,
                  endDate: formattedSickLeaveEnd,
                }
              : undefined,
        };

        const { data: addedEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patientId}/entries`,
          newEntry,
        );
        onEntryAdded(addedEntry);
        setSuccessMessage('Entry added successfully');
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage('Failed to add entry');
        setSuccessMessage(null);
      }
    },
  });

  const renderFieldsForType = () => {
    switch (formik.values.type) {
      case 'HealthCheck':
        return (
          <HealthCheckFields
            healthCheckRating={formik.values.healthCheckRating}
            onHealthCheckRatingChange={formik.handleChange}
          />
        );
      case 'Hospital':
        return (
          <HospitalFields
            dischargeDate={formik.values.dischargeDate}
            dischargeCriteria={formik.values.dischargeCriteria}
            onDischargeDateChange={date =>
              formik.setFieldValue('dischargeDate', date)
            }
            onDischargeCriteriaChange={formik.handleChange}
          />
        );
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcareFields
            employerName={formik.values.employerName}
            sickLeave={formik.values.sickLeave}
            onEmployerNameChange={formik.handleChange}
            onSickLeaveDateChange={(key, date) =>
              formik.setFieldValue(`sickLeave.${key}`, date)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box component='form' onSubmit={formik.handleSubmit} noValidate>
      {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}

      <TextFieldWithError
        label='Description'
        name='description'
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
      />

      <DatePickerField
        label='Date'
        selectedDate={formik.values.date}
        onChange={date => formik.setFieldValue('date', date)}
      />

      <TextFieldWithError
        label='Specialist'
        name='specialist'
        value={formik.values.specialist}
        onChange={formik.handleChange}
        error={formik.errors.specialist}
      />

      <SelectField
        label='Type'
        name='type'
        value={formik.values.type}
        onChange={formik.handleChange}
        options={typeOptions}
      />

      {renderFieldsForType()}

      <Grid sx={{ mt: 2 }}>
        <Grid item>
          <Button
            color='secondary'
            variant='contained'
            style={{ float: 'left' }}
            type='button'
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: 'right',
            }}
            type='submit'
            variant='contained'
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddEntryForm;
