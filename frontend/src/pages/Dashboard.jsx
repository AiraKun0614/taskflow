import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'pendiente' });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('todas');
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Sesión expirada'));
    }
  };

useEffect(() => {
  const loadTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        alert('Error: ' + (err.response?.data?.error || 'Falló'));
      }
    }
  };

  if (token) {
    loadTasks();
  } else {
    window.location.href = '/login';
  }
}, [token]); // ← ahora depende de token

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:5000/api/tasks/${editingId}`
      : 'http://localhost:5000/api/tasks';
    const method = editingId ? 'put' : 'post';

    try {
      await axios[method](url, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: '', description: '', status: 'pendiente' });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Falló'));
    }
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description || '', status: task.status });
    setEditingId(task.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar tarea?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  const filteredTasks = filter === 'todas'
    ? tasks
    : tasks.filter(t => t.status === filter);

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h1>Dashboard de Tareas</h1>
      <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}
        style={{ float: 'right', padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none' }}>
        Cerrar Sesión
      </button>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: 8 }}>
        <h3>{editingId ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
            required
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
          <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none' }}>
            {editingId ? 'Actualizar' : 'Crear'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', status: 'pendiente' }); }}
              style={{ marginLeft: 8, padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none' }}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Filtrar: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <div>
        {filteredTasks.length === 0 ? (
          <p>No hay tareas.</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} style={{ border: '1px solid #ccc', padding: 16, margin: '8px 0', borderRadius: 8 }}>
              <h4>{task.title}</h4>
              {task.description && <p>{task.description}</p>}
              <p><strong>Estado:</strong> {task.status}</p>
              {task.user_name && <p><strong>Usuario:</strong> {task.user_name}</p>}
              <button onClick={() => handleEdit(task)} style={{ marginRight: 8 }}>Editar</button>
              <button onClick={() => handleDelete(task.id)} style={{ background: '#dc3545', color: 'white' }}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
