import React from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Moment } from 'moment';

interface CustomDatePickerProps {
  label?: string;
  value: Moment | null;
  onChange: (value: Moment | null) => void;
  error?: string;
  touched?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium';
  format?: string;
  formVariant?: boolean;
  helperText?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  format = 'DD/MM/YYYY',
  helperText,
  formVariant
}) => {
  const isError = !!error;

  const style = {
    p: 0,
    backgroundColor: 'transparent',
    width: '100%',
    '& .MuiInputBase-root': {
      backgroundColor: 'rgb(255, 255, 255)',
      border: isError ? '1px solid red' : '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '0.2rem',
      p: '2px 12px 0px 0px',
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
  };

  return (
    <div className="w-full">
      {formVariant && (
        <label className={`font-semibold ${isError ? 'text-red-500' : 'text-gray-700'}`}>
          {label}
        </label>
      )}
      <DesktopDatePicker
        format={format}
        value={value}
        onChange={onChange}
        sx={style}
      />
      {isError ? (
        <div id={`${name}-error`} className="text-red-600 text-xs mt-1 ms-4">
          {error}
        </div>
      ) : helperText ? (
        <div className={`text-gray-500 text-xs mt-1 ${isError ? 'text-red-500' : ''}`}>
          {helperText}
        </div>
      ) : null}
    </div>
  );
};

export default CustomDatePicker;
