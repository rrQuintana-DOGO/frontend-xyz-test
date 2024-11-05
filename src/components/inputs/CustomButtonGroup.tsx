/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ButtonGroup } from '@mui/material';
import { CustomButton } from './CustomButton';

interface CustomButtonGroupProps {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  size?: 'small' | 'medium' | 'large';
}

export const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({
  children,
  variant = 'contained',
  color = 'secondary',
  size = 'medium',
}) => {
  return (
    <ButtonGroup color={color} variant={variant} aria-label="custom button group">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === CustomButton) {
          return React.cloneElement<any>(child, {
            variant,
            color,
            size,
          });
        }
        return child;
      })}
    </ButtonGroup>
  );
};
