import { InputHTMLAttributes, forwardRef } from 'react';

interface RadioButtonOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string;
  options: RadioButtonOption[];
  error?: string;
  onChange: (value: string) => void;
  className?: string;
  name: string;
}

const Radio = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ label, options, error, className = '', name, onChange, value, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-medium text-[#1A1A1A] mb-2 leading-[1.2]">
            {label}
          </label>
        )}
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option.value} className="flex border p-3

                    border-[#E5E7EB]
                    rounded-lg items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className={`
                    
                  h-4 w-4
                  accent-[#006633]
                  focus:ring-[#006633]
                  ${error ? 'border-red-500' : ''}
                  ${className}
                `}
                ref={ref}
                {...props}
              />
              <span className="text-sm text-[#1A1A1A]">{option.label}</span>
              {option.description && (
                <span className="text-xs text-[#6B7280]">{option.description}</span>
              )}
            </label>
          ))}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
