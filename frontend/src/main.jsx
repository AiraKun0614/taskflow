import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ← Este div es clave → */}
    <div className="h-screen w-screen">
      <App />
    </div>
  </React.StrictMode>,
)