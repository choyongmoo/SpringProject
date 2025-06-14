import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-green-600 hover:bg-green-700 text-white',
  secondary: 'bg-gray-800 hover:bg-gray-700 text-white',
  outline: 'border border-green-600 text-green-400 hover:bg-green-600 hover:text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4',
  lg: 'py-3 px-6 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 