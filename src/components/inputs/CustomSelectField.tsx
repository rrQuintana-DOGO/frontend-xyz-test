import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface CustomSelectFieldProps {
  label?: string;
  name: string;
  value: string | number | (string | number)[]; // Ajuste para manejar valores múltiples
  options: { value: string | number; label: string }[];
  onChange: (value: string | number | (string | number)[] | null) => void; // Ajuste para manejar valores múltiples
  error?: string;
  touched?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium';
  formVariant?: boolean;
  multiple?: boolean;
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  label,
  value,
  options,
  onChange,
  error,
  variant = 'standard',
  color = 'primary',
  size = 'medium',
  formVariant,
  multiple = false,
}) => {
  const isError = !!error;

  const style = {
    padding: 0,
    backgroundColor: 'transparent',
    '& .MuiInputBase-root': {
      backgroundColor: 'rgb(255, 255, 255)',
      border: isError ? '1px solid red' : '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '0.2rem',
      padding: '0px 1px',
      height: multiple ? 'auto' : '2.25rem',
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
  };

  return (
    <div className='w-full'>
      {formVariant && (
        <label className={`font-semibold ${isError ? 'text-red-500' : 'text-gray-700'}`}>
          {label}
        </label>
      )}
      <Autocomplete
        multiple={multiple}
        options={options}
        getOptionLabel={(option) => option.label}
        limitTags={1}
        onChange={(_, newValue) => {
          const selectedValue = multiple
            ? (newValue as { value: string | number; label: string }[])?.map((option) => option.value)
            : !Array.isArray(newValue) ? newValue?.value ?? null : null;
          onChange(selectedValue);
        }}
        value={
          (multiple)
            ? options?.filter((option) => (value as (string | number)[]).includes(option.value))
            : options?.find((option) => option.value === value) || null
        }
        renderInput={(params) => (
          <TextField
            {...params}
            error={isError}
            helperText={isError && error}
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
