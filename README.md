# TaskFlow - Sistema de Gestión de Tareas

> Aplicación **full-stack** para gestionar tareas con autenticación, roles y CRUD completo.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://taskflow-demo.vercel.app)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev)

---

## Funcionalidades

- **Registro e inicio de sesión** (JWT)
- **Roles**: Admin (ve todas) / Usuario (solo suyas)
- **CRUD completo** de tareas
- **Filtros** por estado
- **UI moderna** con Tailwind CSS

---

## Tecnologías

| Parte | Tecnologías |
|------|-------------|
| **Backend** | Node.js, Express, MySQL, JWT, bcrypt |
| **Frontend** | React, Vite, Axios, Tailwind CSS |
| **Base de datos** | MySQL |

---

## Estructura

taskflow/
├── backend/          # API REST
├── frontend/         # React + Tailwind
└── README.md


---

## Instalación

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend
cd frontend
npm install
npm run dev

