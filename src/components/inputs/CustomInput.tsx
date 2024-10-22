import React from 'react';

type Props = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
};

const CustomInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  helperText,
  size = 'md',
}: Props) => {
  const isError = touched && error;

  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={name} className={ `${isError && 'text-red-500'} ${size === 'sm' && 'font-medium'}`}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${size === 'sm' && 'p-1'} ${size === 'md' && 'p-2'} ${size === 'lg' && 'p-3'} border rounded ${isError ? 'border-red-500' : 'border-gray-300'}`}
      />
      {helperText && (
        <div className="text-gray-500 text-xs mt-1">{helperText}</div>
      )}
      {isError && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};

export default CustomInput;
