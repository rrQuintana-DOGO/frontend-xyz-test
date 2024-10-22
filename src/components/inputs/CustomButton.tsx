export const CustomButton = ({
  color = 'primary',
  variant = 'solid',
  size = 'md',
  icon,
  label,
  onClick,
}: {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  label: string;
  onClick: () => void;
}) => {
  const colorClasses = {
    primary: 'bg-blue-500 border-blue-500 text-blue-500',
    secondary: 'bg-gray-500 border-gray-500 text-gray-500',
    success: 'bg-green-500 border-green-500 text-green-500',
    danger: 'bg-red-500 border-red-500 text-red-500',
    warning: 'bg-yellow-500 border-yellow-500 text-yellow-500',
  }[color];

  const variantClasses = {
    solid: `${colorClasses.replace(/text-\w+-500/, 'text-white')}`,
    outline: `border ${colorClasses} bg-transparent text-${color}-500`,
    ghost: `bg-transparent ${colorClasses}`,
  }[variant];

  const sizeClasses = {
    sm: 'text-sm py-1 px-2',
    md: 'text-md py-2 px-4',
    lg: 'text-lg py-3 px-6',
  }[size];

  const baseClasses = 'rounded flex items-center justify-center space-x-2';

  const buttonClasses = `${baseClasses} ${sizeClasses} ${variantClasses}`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {icon && <i className={icon}></i>}
      <span>{label}</span>
    </button>
  );
};
