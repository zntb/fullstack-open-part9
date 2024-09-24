import { TextField } from '@mui/material';

interface TextFieldWithErrorProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldWithError = ({
  label,
  name,
  value,
  error,
  onChange,
}: TextFieldWithErrorProps) => (
  <TextField
    fullWidth
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    error={Boolean(error)}
    helperText={error}
    margin='normal'
  />
);

export default TextFieldWithError;
