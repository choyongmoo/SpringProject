import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <textarea
        className={`form-input form-textarea ${error ? "border-accent-danger" : ""} ${className}`}
        {...props}
      />
      {error && <div className="error">{error}</div>}
      {helperText && !error && (
        <div className="text-text-secondary text-sm mt-1">{helperText}</div>
      )}
    </div>
  );
};
