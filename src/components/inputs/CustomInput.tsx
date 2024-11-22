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
  helperText,
  size = 'md',
}: Props) => {
  const isError = error;

  // Mapping sizes to padding styles
  const sizeClass = {
    sm: 'p-1 text-sm',
    md: 'p-2',
    lg: 'p-3 text-lg',
  };

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className={`font-semibold ${isError ? 'text-red-500' : 'text-gray-700'}`}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`border rounded ${sizeClass[size]} ${
          isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-500'
        }`}
        aria-describedby={isError ? `${name}-error` : undefined}
      />
      {isError ? (
        <div id={`${name}-error`} className="text-red-500 text-xs mt-1">
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

export default CustomInput;
