import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setMessage('¡Login exitoso!');
      setTimeout(() => window.location.href = '/dashboard', 1000);
    } catch (err) {
        const errorMsg = err.response?.data?.error || err.response?.data?.details || 'Error desconocido';
        setMessage(errorMsg);
        console.error('Login error:', err.response?.data);
}
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          class="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ width: '100%', padding: 10, margin: '10px 0' }}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          class="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ width: '100%', padding: 10, margin: '10px 0' }}
          required
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#007bff', color: 'white', border: 'none' }}>
          Entrar
        </button>
      </form>
      <p style={{ color: 'green', marginTop: 10 }}>{message}</p>
      <p>Prueba: admin@taskflow.com / admin123</p>
    </div>
  );
}