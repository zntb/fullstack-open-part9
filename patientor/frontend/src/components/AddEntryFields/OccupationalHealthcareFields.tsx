import React from 'react';
import DatePickerField from './DatePickerField';
import TextFieldWithError from './TextFieldWithError';

interface SickLeave {
  startDate: Date;
  endDate: Date;
}

interface OccupationalHealthcareFieldsProps {
  employerName: string;
  sickLeave: SickLeave;
  onEmployerNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSickLeaveDateChange: (key: 'startDate' | 'endDate', date: Date) => void;
}

const OccupationalHealthcareFields = ({
  employerName,
  sickLeave,
  onEmployerNameChange,
  onSickLeaveDateChange,
}: OccupationalHealthcareFieldsProps) => (
  <>
    <TextFieldWithError
      label='Employer Name'
      name='employerName'
      value={employerName}
      onChange={onEmployerNameChange}
    />
    <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
      <DatePickerField
        label='Sick Leave Start Date'
        selectedDate={sickLeave.startDate}
        onChange={date => onSickLeaveDateChange('startDate', date)}
      />
      <DatePickerField
        label='Sick Leave End Date'
        selectedDate={sickLeave.endDate}
        onChange={date => onSickLeaveDateChange('endDate', date)}
      />
    </div>
  </>
);

export default OccupationalHealthcareFields;
