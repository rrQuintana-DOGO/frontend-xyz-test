import React, { useState } from 'react';

interface CustomSelectFieldProps {
  label?: string;
  name: string;
  value: string;
  options: { value: string | number; label: string }[];
  onChange: (value: string | number) => void;
  error?: string;
  touched?: boolean;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  borderRadius?: {
    left?: 'none' | 'sm' | 'md' | 'lg';
    right?: 'none' | 'sm' | 'md' | 'lg';
  };
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  error,
  touched,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  borderRadius = { left: 'md', right: 'md' },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isError = touched && error;

  const colorClasses = {
    primary: 'bg-blue-500 border-blue-500 text-blue-500',
    secondary: 'bg-gray-500 border-gray-500 text-gray-500',
    success: 'bg-green-500 border-green-500 text-green-500',
    danger: 'bg-red-500 border-red-500 text-red-500',
    warning: 'bg-yellow-500 border-yellow-500 text-yellow-500',
  }[color];

  // Clases para el borde redondeado
  const borderRadiusClasses = {
    left: {
      none: 'rounded-l-none border border-r-0',
      sm: 'rounded-l-sm',
      md: 'rounded-l-md',
      lg: 'rounded-l-lg border',
    }[borderRadius.left || 'md'],
      right: {
        none: 'rounded-r-none border border-l-0',
        sm: 'rounded-r-sm border',
        md: 'rounded-r-md',
        lg: 'rounded-r-lg border',
      }[borderRadius.right || 'md'],
  };

  // Clases para el botón
  const buttonClasses = `
    ${colorClasses}
    ${variant === 'outline' ? 'bg-transparent' : ''}
    ${variant === 'ghost' ? 'bg-transparent' : ''}
    ${size === 'sm' ? 'text-sm py-1 px-2' : size === 'md' ? 'text-md py-2 px-4' : 'text-lg py-3 px-6'}
    border ${borderRadiusClasses.left} ${borderRadiusClasses.right}
    ${isError ? 'border-red-500' : ''}
  `;

  const labelClasses = 'block mb-1 text-gray-700 font-medium';
  const errorClasses = 'text-red-500 text-xs mt-1';

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className={labelClasses}>
          {label}
        </label>
      )}
      <button onClick={handleButtonClick} className={buttonClasses}>
        {options.find(option => option.value === value)?.label || 'Selecciona una opción'}
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {isError && <span className={errorClasses}>{error}</span>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ display: 'none' }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelectField;
