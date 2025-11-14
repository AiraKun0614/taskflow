const db = require('../config/db');

const getTasks = async (req, res) => {
  try {
    let query = '';
    let params = [];

    if (req.user.role === 'admin') {
      query = 'SELECT t.*, u.name as user_name FROM tasks t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC';
    } else {
      query = 'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC';
      params = [req.user.id];
    }

    const [tasks] = await db.query(query, params);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
      [title, description || null, status || 'pendiente', userId]
    );

    res.status(201).json({
      message: 'Tarea creada',
      taskId: result.insertId
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    // Verificar que la tarea pertenece al usuario (o es admin)
    const [tasks] = await db.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const task = tasks[0];

    if (req.user.role !== 'admin' && task.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    await db.query(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [title || task.title, description !== undefined ? description : task.description, status || task.status, id]
    );

    res.json({ message: 'Tarea actualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const task = tasks[0];
    if (req.user.role !== 'admin' && task.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };