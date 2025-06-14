import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Button from './Button';

type AddButtonVariant = 'default' | 'dark';

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  fullWidth?: boolean;
  variant?: AddButtonVariant;
}

const variantStyles: Record<AddButtonVariant, string> = {
  default: 'bg-gray-800',
  dark: 'bg-gray-900',
};

export default function AddButton({
  children,
  icon,
  className = '',
  fullWidth = false,
  variant = 'default',
  ...props
}: AddButtonProps) {
  return (
    <Button
      variant="secondary"
      className={`group border border-gray-700 hover:border-green-500 transition-all duration-200 ${variantStyles[variant]} ${className}`}
      fullWidth={fullWidth}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {icon || (
          <svg
            className="w-4 h-4 group-hover:text-green-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
        <span className="text-base font-medium group-hover:text-green-400 transition-colors">
          {children}
        </span>
      </div>
    </Button>
  );
} 