import type { HTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const baseStyle = 'rounded-lg transition-colors';

const variantStyles: Record<Variant, string> = {
  primary: "bg-background p-6",
  secondary: "p-4 bg-background-dark hover:bg-background-light"
};

export default function Card({
  children,
  variant = "primary",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}