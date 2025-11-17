import { forwardRef } from 'react';
import { Input } from './Input';

export const InputWithIcon = forwardRef(({
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  label,
  id,
  error,
  ...props
}, ref) => {
  return (
    <div className="relative">
      <Input
        ref={ref}
        id={id}
        label={label}
        error={error}
        {...props}
      />
      <div className="absolute left-6 top-4 text-gray-500 peer-focus:text-indigo-400 transition-colors">
        <Icon size={18} />
      </div>
    </div>
  );
});

InputWithIcon.displayName = 'InputWithIcon';