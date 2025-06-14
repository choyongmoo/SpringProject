import type { ChangeEvent } from 'react';

interface FormTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  minHeight?: string;
}

export default function FormTextarea({
  id,
  label,
  value,
  onChange,
  required = false,
  placeholder = '',
  minHeight = '100px',
}: FormTextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{ minHeight }}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />
    </div>
  );
} 