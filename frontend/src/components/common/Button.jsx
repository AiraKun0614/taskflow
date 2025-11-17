import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export const Button = forwardRef(({
  children,
  onClick,
  type = "button",
  variant = "primary",   // ahora sí lo usamos!
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  ...props
}, ref) => {
  const isDisabled = disabled || loading;

  // Variantes de color (fácil de extender)
  const variants = {
    primary: "from-indigo-500 via-purple-500 to-pink-500 shadow-purple-900/50 hover:shadow-purple-600/60",
    success: "from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-900/50 hover:shadow-emerald-600/60",
    danger: "from-red-500 via-rose-500 to-pink-600 shadow-red-900/50 hover:shadow-red-600/60",
    ghost: "from-transparent to-transparent hover:from-white/10",
    outline: "from-transparent to-transparent border border-purple-500/50 hover:border-purple-400"
  };

  const selectedGradient = variants[variant] || variants.primary;

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative group inline-flex items-center justify-center font-medium text-white
        rounded-2xl transition-all duration-300
        ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer'}
        ${sizes[size]} ${className}
      `}
      {...props}
    >
      {/* Gradiente de fondo que aparece en hover */}
      <span className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${selectedGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-px`} />
      
      {/* Fondo oscuro interior */}
      <span className="relative z-10 flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#0f1120]/90 backdrop-blur-sm">
        
        {/* Loading spinner */}
        {loading && <Loader2 className="animate-spin" size={20} />}
        
        {/* Ícono izquierdo */}
        {iconLeft && !loading && (
          <span className="transition-transform duration-500 group-hover:-translate-x-1">
            {iconLeft}
          </span>
        )}
        
        {/* Texto */}
        <span className="transition-all duration-500 group-hover:text-indigo-300">
          {loading ? 'Procesando...' : children}
        </span>
        
        {/* Ícono derecho */}
        {iconRight && !loading && (
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            {iconRight}
          </span>
        )}
      </span>
    </button>
  );
});

Button.displayName = 'Button';