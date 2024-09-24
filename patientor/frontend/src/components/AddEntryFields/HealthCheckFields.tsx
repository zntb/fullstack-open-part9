import SelectField from './SelectField';
import { SelectChangeEvent } from '@mui/material';

interface HealthCheckFieldsProps {
  healthCheckRating: number;
  onHealthCheckRatingChange: (event: SelectChangeEvent<number>) => void;
}

const healthCheckRatings = [
  { value: 0, label: 'Healthy' },
  { value: 1, label: 'Low Risk' },
  { value: 2, label: 'High Risk' },
  { value: 3, label: 'Critical Risk' },
];

const HealthCheckFields = ({
  healthCheckRating,
  onHealthCheckRatingChange,
}: HealthCheckFieldsProps) => {
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const value = Number(event.target.value);

    const newEvent = {
      ...event,
      target: {
        ...event.target,
        value,
      },
    } as SelectChangeEvent<number>;

    onHealthCheckRatingChange(newEvent);
  };

  return (
    <SelectField
      label='Health Check Rating'
      name='healthCheckRating'
      value={healthCheckRating}
      onChange={handleChange}
      options={healthCheckRatings}
      helperText='Select a health check rating'
    />
  );
};

export default HealthCheckFields;
