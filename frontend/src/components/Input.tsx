import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
          htmlFor={props.id}
            className="block text-xs font-medium text-gray-700 mb-2 leading-[1.2]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full p-3
            text-sm 
            border border-[#E5E7EB] 
            rounded-lg 
            focus:ring-2 focus:ring-blue-300 
            focus:border-[#006633]
            outline-none
            transition-all
            duration-200
            text-gray-500
            placeholder:text-gray-400
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
