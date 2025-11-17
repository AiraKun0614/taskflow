import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn'; // opcional, te lo paso al final si no lo tienes

const variantConfig = {
  error: {
    border: 'border-red-500/50',
    bg: 'bg-red-500/10',
    title: 'text-red-400',
    text: 'text-red-300',
    icon: AlertCircle,
    iconColor: 'text-red-400',
  },
  success: {
    border: 'border-emerald-500/50',
    bg: 'bg-emerald-500/10',
    title: 'text-emerald-400',
    text: 'text-emerald-300',
    icon: CheckCircle2,
    iconColor: 'text-emerald-400',
  },
  warning: {
    border: 'border-yellow-500/50',
    bg: 'bg-yellow-500/10',
    title: 'text-yellow-400',
    text: 'text-yellow-300',
    icon: AlertTriangle,
    iconColor: 'text-yellow-400',
  },
  info: {
    border: 'border-indigo-500/50',
    bg: 'bg-indigo-500/10',
    title: 'text-indigo-400',
    text: 'text-indigo-300',
    icon: Info,
    iconColor: 'text-indigo-400',
  },
};

export function Alert({
  children,
  variant = 'error',   // error | success | warning | info
  title,
  onClose,
  className = "",
  showIcon = true,
  closable = true,
}) {
  const config = variantConfig[variant] || variantConfig.error;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative w-full max-w-2xl overflow-hidden rounded-xl border p-4 pr-12 transition-all duration-500",
        "backdrop-blur-sm",
        config.border,
        config.bg,
        "animate-in slide-in-from-top-2 fade-in",
        className
      )}
    >
      {/* Botón cerrar */}
      {closable && (
        <button
          onClick={onClose}
          className={cn(
            "absolute right-3 top-3.5 rounded-lg p-1.5 opacity-60 transition-all",
            "hover:opacity-100 hover:bg-white/10",
            config.title
          )}
          aria-label="Cerrar alerta"
        >
          <X size={18} />
        </button>
      )}

      <div className="flex items-start gap-3">
        {/* Ícono */}
        {showIcon && (
          <div className={cn("flex-shrink-0 mt-0.5", config.iconColor)}>
            <Icon size={24} />
          </div>
        )}

        {/* Contenido */}
        <div className="flex-1 space-y-1">
          {title && (
            <p className={cn("font-semibold", config.title)}>
              {title}
            </p>
          )}
          <p className={cn("text-sm leading-relaxed", config.text)}>
            {children}
          </p>
        </div>
      </div>

      {/* Brillo sutil al fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className={cn("absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent", config.title)} />
      </div>
    </div>
  );
}