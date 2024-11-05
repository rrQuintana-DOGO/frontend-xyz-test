import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface CustomSelectFieldProps {
  label?: string;
  name: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  onChange: (value: string | number) => void;
  error?: string;
  touched?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium';
  formVariant?: boolean;
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  label,
  value,
  options,
  onChange,
  error,
  touched,
  variant = 'standard',
  color = 'primary',
  size = 'medium',
  formVariant
}) => {
  const isError = touched && !!error;

  const style = {
    padding: 0,
    backgroundColor: 'transparent',
    '& .MuiInputBase-root': {
      backgroundColor: 'rgb(255, 255, 255)',
      border: '1px solid rgba(0, 0, 0, 0.17)',
      borderRadius: '0.2rem',
      padding: '0px 1px',
      height: '2.1rem',
      '&:hover': {
        borderColor: 'rgba(0, 0, 0, 0.4)',
      },
      '&.Mui-focused': {
        borderColor: 'black',
        boxShadow: `0 0 0 1px black`,
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiFormLabel-root': {
      display: 'none',
    },
  }

  return (
    <div className='w-full'>
      {
        formVariant && (
          <label className={`font-semibold`}>
            {label}
          </label>
        )
      }
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        onChange={(_, newValue) => {
          onChange(newValue ? newValue.value : '');
        }}
        value={options.find((option) => option.value === value) || null}
        renderInput={(params) => (
          <TextField
            {...params}
            error={isError}
            helperText={isError ? error : undefined}
            variant={variant}
            size={size}
            label={label}
            color={color}
            placeholder='Selecciona una opción'
            sx={formVariant ? style : {}}
          />
        )}
      />
    </div>
  );
};

export default CustomSelectField;
