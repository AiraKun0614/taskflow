import { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  id,
  type = "text",
  // eslint-disable-next-line no-unused-vars
  placeholder,
  value,
  onChange,
  error,
  className = "",
  disabled,
  ...props
}, ref) => {
  return (
    <div className={`relative w-full group ${className}`}>
      {/* Borde lateral gradiente que aparece al hacer focus */}
      <span className="absolute -left-1 top-2 bottom-2 w-1.5 rounded-full bg-gradient-to-b from-indigo-400 via-purple-500 to-pink-500 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Input real */}
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder=" " // Importante: espacio en blanco para que funcione el floating label
        className={`
          peer w-full px-5 pt-6 pb-2.5 text-white bg-[#222630]/80 border 
          ${error ? 'border-red-500/80' : 'border-[#2B3040]'} 
          rounded-xl focus:outline-none focus:border-transparent 
          focus:ring-2 focus:ring-indigo-500/50 focus:bg-[#1e2230]/90
          transition-all duration-300 backdrop-blur-sm
          disabled:opacity-50 disabled:cursor-not-allowed
          placeholder-transparent text-base
        `}
        {...props}
      />

      {/* Floating Label */}
      <label
        htmlFor={id}
        className={`
          absolute left-5 top-4 text-gray-500 text-sm 
          transition-all duration-300 transform origin-left pointer-events-none
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
          peer-focus:top-1.5 peer-focus:text-indigo-400 peer-focus:text-xs peer-focus:font-medium
          ${error ? 'text-red-400 peer-focus:text-red-400' : ''}
          ${value ? 'top-1.5 text-xs text-indigo-400 font-medium' : ''}
        `}
      >
        {label}
      </label>

      {/* Mensaje de error */}
      {error && (
        <p className="mt-1.5 ml-1 text-xs text-red-400 font-medium animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';