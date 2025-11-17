import { useState, useEffect } from 'react';
import axios from 'axios';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskModal } from '@/components/tasks/TaskModal';
import { TaskStats } from '../components/tasks/TaskStats';
import { Plus } from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('todas');
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
    else window.location.href = '/login';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const filteredTasks = filter === 'todas'
    ? tasks
    : tasks.filter(t => t.status === filter);

  const stats = {
    total: tasks.length,
    completadas: tasks.filter(t => t.status === 'completada').length,
    pendientes: tasks.filter(t => t.status === 'pendiente').length,
  };

  return (
    <div className="min-h-screen w-full">
        <DashboardLayout>
        {/* Header con stats */}
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Mis Tareas
                </h1>
                <p className="text-gray-400 mt-2">Tienes {stats.pendientes} tareas pendientes hoy</p>
            </div>

            <Button
                onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
                }}
                iconLeft={<Plus size={20} />}
            >
                Nueva Tarea
            </Button>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
                { label: 'Total', value: stats.total, color: 'from-indigo-500 to-purple-500' },
                { label: 'Pendientes', value: stats.pendientes, color: 'from-yellow-500 to-orange-500' },
                { label: 'Completadas', value: stats.completadas, color: 'from-emerald-500 to-teal-500' },
            ].map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                </p>
                </div>
            ))}
            </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-6">
            {['todas', 'pendiente', 'en progreso', 'completada'].map(f => (
            <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                filter === f
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
            >
                {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
            ))}
        </div>

        {/* Grid de tareas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTasks.length === 0 ? (
            <div className="col-span-full text-center py-20">
                <p className="text-2xl text-gray-500">No hay tareas {filter !== 'todas' ? filter : ''}</p>
                <Button onClick={() => setIsModalOpen(true)} className="mt-6">
                Crear tu primera tarea
                </Button>
            </div>
            ) : (
            filteredTasks.map(task => (
                <TaskCard
                key={task.id}
                task={task}
                onEdit={() => {
                    setEditingTask(task);
                    setIsModalOpen(true);
                }}
                onDelete={() => {
                    if (confirm('¿Eliminar tarea?')) {
                    axios.delete(`http://localhost:5000/api/tasks/${task.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }).then(() => fetchTasks());
                    }
                }}
                />
            ))
            )}
        </div>

        {/* Modal */}
        <TaskModal
            isOpen={isModalOpen}
            onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
            }}
            task={editingTask}
            onSuccess={fetchTasks}
        />

        {/* Estadísticas épicas */}
            <div className="mb-10">
            <TaskStats tasks={tasks} />
            </div>
        </DashboardLayout>
    </div>
  );
}