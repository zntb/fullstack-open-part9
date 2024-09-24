import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField } from '@mui/material';

interface DatePickerFieldProps {
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  error?: boolean;
  helperText?: string;
}

const DatePickerField = ({
  label,
  selectedDate,
  onChange,
  error = false,
  helperText = '',
}: DatePickerFieldProps) => {
  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={date => onChange(date as Date)}
        dateFormat='yyyy-MM-dd'
        customInput={
          <TextField
            fullWidth
            label={label}
            error={error}
            helperText={helperText}
            margin='normal'
          />
        }
      />
    </>
  );
};

export default DatePickerField;
