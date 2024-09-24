import React from 'react';
import DatePickerField from './DatePickerField';
import TextFieldWithError from './TextFieldWithError';

interface HospitalFieldsProps {
  dischargeDate: Date;
  dischargeCriteria: string;
  onDischargeDateChange: (date: Date) => void;
  onDischargeCriteriaChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

const HospitalFields = ({
  dischargeDate,
  dischargeCriteria,
  onDischargeDateChange,
  onDischargeCriteriaChange,
}: HospitalFieldsProps) => (
  <>
    <DatePickerField
      label='Discharge Date'
      selectedDate={dischargeDate}
      onChange={onDischargeDateChange}
    />
    <TextFieldWithError
      label='Discharge Criteria'
      name='dischargeCriteria'
      value={dischargeCriteria}
      onChange={onDischargeCriteriaChange}
    />
  </>
);

export default HospitalFields;
