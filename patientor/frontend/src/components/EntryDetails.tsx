import {
  Favorite,
  Work,
  LocalHospital,
  MedicalServices,
} from '@mui/icons-material';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from '../types';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  const renderEntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case 'HealthCheck':
        const healthCheckEntry = entry as HealthCheckEntry;
        return (
          <Box display='flex' alignItems='center' marginTop={1}>
            <Favorite
              color={
                healthCheckEntry.healthCheckRating === 0 ? 'success' : 'warning'
              }
            />
          </Box>
        );
      case 'OccupationalHealthcare':
        const occupationalEntry = entry as OccupationalHealthcareEntry;
        return (
          <Box marginTop={1}>
            <Typography variant='body2'>
              <Work /> &nbsp; Employer: {occupationalEntry.employerName}
            </Typography>
            {occupationalEntry.sickLeave && (
              <Typography variant='body2' marginTop={1}>
                Sick Leave: {occupationalEntry.sickLeave.startDate} to{' '}
                {occupationalEntry.sickLeave.endDate}
              </Typography>
            )}
          </Box>
        );
      case 'Hospital':
        const hospitalEntry = entry as HospitalEntry;
        return (
          <Box marginTop={1}>
            <Typography variant='body2'>
              <LocalHospital /> Discharge Date: {hospitalEntry.discharge?.date}
            </Typography>
            <Typography variant='body2'>
              Criteria: {hospitalEntry.discharge?.criteria}
            </Typography>
          </Box>
        );
      default:
        return <Typography>Unknown entry type</Typography>;
    }
  };

  return (
    <Card variant='outlined' style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant='body1' fontStyle='italic' marginBottom={1}>
          {entry.date} &nbsp; <MedicalServices />
        </Typography>
        <Typography>{entry.description}</Typography>
        {renderEntryDetails(entry)}
        <Typography variant='body2' marginTop={1}>
          Diagnosed by: {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EntryDetails;
