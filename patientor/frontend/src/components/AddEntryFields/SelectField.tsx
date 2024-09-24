import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  onChange: (event: SelectChangeEvent<string | number>) => void;
  helperText?: string;
}

const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
  helperText,
}: SelectFieldProps) => (
  <FormControl fullWidth margin='normal'>
    <InputLabel>{label}</InputLabel>
    <Select name={name} value={value} onChange={onChange}>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default SelectField;
