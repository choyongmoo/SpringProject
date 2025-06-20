import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        className={`form-input ${error ? "border-accent-danger" : ""} ${className}`}
        {...props}
      />
      {error && <div className="error">{error}</div>}
      {helperText && !error && (
        <div className="text-text-secondary text-sm mt-1">{helperText}</div>
      )}
    </div>
  );
};
