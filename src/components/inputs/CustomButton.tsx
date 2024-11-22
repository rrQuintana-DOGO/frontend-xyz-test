/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  label: string;
  onClick?: (...args: any[]) => void;
  sx?: any;
  selected?: boolean;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  color = 'primary',
  variant = 'contained',
  size = 'medium',
  icon,
  label,
  onClick,
  sx = {},
  disabled = false,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      sx={sx}
      startIcon={icon}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};
