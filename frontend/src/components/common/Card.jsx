import { forwardRef } from 'react';
import { cn } from '@/utils/cn'; // opcional, te lo paso al final si quieres

export const Card = forwardRef(({
  children,
  title,
  className = "",
  hover = true,
  pulse = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative group overflow-hidden rounded-2xl transition-all duration-500",
        hover && "hover:scale-[1.02] hover:shadow-2xl",
        className
      )}
      {...props}
    >
      {/* Borde pulsante externo (solo aparece si pulse=true o en hover) */}
      <div className={cn(
        "absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-700",
        (pulse || hover) && "group-hover:opacity-70",
        pulse && "animate-pulse opacity-40"
      )} />

      {/* Fondo principal con glassmorphism */}
      <div className="relative bg-[#0f1120]/90 backdrop-blur-xl border border-purple-800/30 rounded-2xl p-6 min-h-[140px]">
        
        {/* Título con efecto neon sutil */}
        {title && (
          <h3 className="text-xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </h3>
        )}

        {/* Contenido */}
        <div className="text-gray-300">
          {children}
        </div>

        {/* Efecto de brillo interno al hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/10 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent blur-xl" />
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';