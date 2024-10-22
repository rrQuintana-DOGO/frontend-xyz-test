/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { InputLabel, MenuItem, Select, FormHelperText, FormControl, SelectChangeEvent } from '@mui/material';

interface CustomSelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: { value: string | number; label: string }[];
  onChange: (e: SelectChangeEvent<string>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  error?: string;
  touched?: boolean;
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const isError = touched && error;

  return (
    <FormControl fullWidth variant='standard' error={!!isError}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {isError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelectField;
