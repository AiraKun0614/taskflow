import { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import axios from 'axios';

const priorities = ['baja', 'media', 'alta', 'urgente'];
const statuses = ['pendiente', 'en_progreso', 'completada'];

export function TaskModal({ isOpen, onClose, task, onSuccess }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'pendiente',
    priority: 'media',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pendiente',
        priority: task.priority || 'media',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
    } else {
      setForm({ title: '', description: '', status: 'pendiente', priority: 'media', dueDate: '' });
    }
  }, [task, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = task
      ? `http://localhost:5000/api/tasks/${task.id}`
      : 'http://localhost:5000/api/tasks';
    const method = task ? 'put' : 'post';

    try {
      await axios[method](url, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Falló'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-[#0f1120]/95 to-[#1a0b2e]/95 backdrop-blur-2xl rounded-3xl border border-purple-800/50 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
        >
          <X size={24} className="text-gray-400" />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-8">
            {task ? 'Editar Tarea' : 'Nueva Tarea'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descripción (opcional)</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-5 py-3 bg-[#222630]/80 border border-[#2B3040] rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-gray-500 transition-all"
                placeholder="Detalles de la tarea..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-5 py-3 bg-[#222630]/80 border border-[#2B3040] rounded-xl focus:border-indigo-500 focus:outline-none text-white"
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prioridad</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full px-5 py-3 bg-[#222630]/80 border border-[#2B3040] rounded-xl focus:border-indigo-500 focus:outline-none text-white"
                >
                  {priorities.map(p => (
                    <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar size={18} className="inline mr-2" />
                Fecha límite (opcional)
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full px-5 py-3 bg-[#222630]/80 border border-[#2B3040] rounded-xl focus:border-indigo-500 focus:outline-none text-white"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                loading={loading}
                className="flex-1"
                variant={task ? "primary" : "success"}
              >
                {task ? 'Guardar Cambios' : 'Crear Tarea'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}