import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseInputProps {
  label: string;
  error?: string;
  className?: string;
}

interface TextInputProps extends BaseInputProps, InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password";
  multiline?: false;
}

interface TextareaInputProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  multiline: true;
  rows?: number;
}

type InputProps = TextInputProps | TextareaInputProps;

export default function Input({
  label,
  error,
  className = "",
  multiline = false,
  ...props
}: InputProps) {
  const baseInputClasses = "w-full bg-background-dark text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-primary focus:outline-none transition-colors";
  const errorClasses = error ? "border-danger" : "";
  const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-400">
        {label}
      </label>
      {multiline ? (
        <textarea
          className={`${inputClasses} resize-none`}
          rows={(props as TextareaInputProps).rows || 4}
          {...(props as TextareaInputProps)}
        />
      ) : (
        <input
          className={inputClasses}
          {...(props as TextInputProps)}
        />
      )}
      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}
    </div>
  );
} 