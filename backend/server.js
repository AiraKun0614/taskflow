require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());


// Rutas
app.get('/api', (req, res) => {
    res.json({ message: 'Backend TaskFlow funcionando!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});