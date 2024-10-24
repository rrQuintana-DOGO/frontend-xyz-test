/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { CustomButton } from './CustomButton';
import CustomSelectField from './CustomSelectField';

interface CustomButtonGroupProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export const CustomButtonGroup = ({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
}: CustomButtonGroupProps) => {
  const baseGroupClasses = 'inline-flex items-center';

  return (
    <div className={baseGroupClasses}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && (child.type === CustomButton || child.type === CustomSelectField)) {
          const isFirst = index === 0;
          const isLast = index === React.Children.count(children) - 1;

          const borderRadiusClasses = isFirst
            ? 'rounded-l-md'
            : isLast
            ? 'rounded-r-md'
            : 'border-l-0';

          return React.cloneElement<any>(child, {
            color,
            variant,
            size,
            className: `${borderRadiusClasses} ${index > 0 ? '-ml-px' : ''}`,
          });
        }
        return child;
      })}
    </div>
  );
};
