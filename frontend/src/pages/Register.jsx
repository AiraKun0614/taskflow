import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage('¡Registro exitoso! Ahora inicia sesión.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ width: '100%', padding: 10, margin: '10px 0' }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ width: '100%', padding: 10, margin: '10px 0' }}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ width: '100%', padding: 10, margin: '10px 0' }}
          required
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#28a745', color: 'white', border: 'none' }}>
          Registrarse
        </button>
      </form>
      <p style={{ color: message.includes('exitoso') ? 'green' : 'red', marginTop: 10 }}>{message}</p>
    </div>
  );
}