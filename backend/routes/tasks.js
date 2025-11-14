const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// Todas las rutas requieren JWT
router.use(verifyToken);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;