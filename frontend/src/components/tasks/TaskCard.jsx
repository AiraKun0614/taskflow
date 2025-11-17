import { Card } from '@/components/common/Card';
import { Calendar, Clock, AlertCircle, CheckCircle2, Circle, Edit2, Trash2 } from 'lucide-react';

const statusConfig = {
  pendiente: { icon: Circle, color: 'text-yellow-400' },
  'en progreso': { icon: Clock, color: 'text-blue-400' },
  completada: { icon: CheckCircle2, color: 'text-emerald-400' },
};

const priorityConfig = {
  baja: 'from-emerald-500 to-teal-500',
  media: 'from-yellow-500 to-orange-500',
  alta: 'from-orange-500 to-red-500',
  urgente: 'from-red-500 to-rose-600',
};

export function TaskCard({ task, onEdit, onDelete }) {
  const { title, description, status = 'pendiente', priority = 'media', dueDate } = task;
  const StatusIcon = statusConfig[status]?.icon || Circle;
  const priorityGradient = priorityConfig[priority] || priorityConfig.media;

  return (
    <Card hover pulse={priority === 'urgente'} className="cursor-pointer group">
      <div className="space-y-4">
        {/* Header: título + prioridad */}
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">
            {title}
          </h3>
          <div className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${priorityGradient} text-white text-xs font-bold shadow-lg`}>
            {priority.toUpperCase()}
          </div>
        </div>

        {/* Descripción */}
        {description && (
          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}

        {/* Footer */}
        <div className="flex justify-between items-end pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 ${statusConfig[status]?.color || 'text-gray-400'}`}>
              <StatusIcon size={18} />
              <span className="text-sm capitalize">{status}</span>
            </div>

            {dueDate && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar size={14} />
                {new Date(dueDate).toLocaleDateString('es')}
              </div>
            )}
          </div>

          {/* Acciones al hover */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="p-2 rounded-lg bg-white/10 hover:bg-indigo-500/30 transition-colors"
            >
              <Edit2 size={16} className="text-indigo-400" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-2 rounded-lg bg-white/10 hover:bg-red-500/30 transition-colors"
            >
              <Trash2 size={16} className="text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}