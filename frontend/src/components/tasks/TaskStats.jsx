import { Card } from '@/components/common/Card';
import { CheckCircle2, Clock, AlertCircle, Target } from 'lucide-react';

const statConfig = [
  {
    label: 'Total de tareas',
    valueKey: 'total',
    icon: Target,
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
  },
  {
    label: 'Pendientes',
    valueKey: 'pendientes',
    icon: Clock,
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
  },
  {
    label: 'En progreso',
    valueKey: 'en_progreso',
    icon: AlertCircle,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
  },
  {
    label: 'Completadas',
    valueKey: 'completadas',
    icon: CheckCircle2,
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
  },
];

export function TaskStats({ tasks = [] }) {
  const stats = {
    total: tasks.length,
    pendientes: tasks.filter(t => t.status === 'pendiente').length,
    enProgreso: tasks.filter(t => t.status === 'en_progreso').length,
    completadas: tasks.filter(t => t.status === 'completada').length,
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completadas / stats.total) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statConfig.map((stat) => {
        const Icon = stat.icon;
        const value = stats[stat.valueKey];

        return (
          <Card
            key={stat.valueKey}
            hover
            className="relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-4xl font-bold text-white mt-2">
                  {value}
                </p>
              </div>
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-20`}>
                <Icon size={32} className="text-white/80" />
              </div>
            </div>

            {/* Barra de progreso sutil (solo en completadas) */}
            {stat.valueKey === 'completadas' && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progreso</span>
                  <span>{completionRate}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}