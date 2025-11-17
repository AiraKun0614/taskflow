import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';
import { Mail, Lock, LogIn } from 'lucide-react';

export function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.password) newErrors.password = 'La contraseña es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setMessage('¡Bienvenido! Redirigiendo...');

      // Notificamos al padre (LoginPage) que fue exitoso
      if (onSuccess) onSuccess();

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1200);
    } catch (err) {
      const errorMsg = err.response?.data?.error ||
                      err.response?.data?.details ||
                      'Credenciales incorrectas';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email"
        id="email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
      />

      <Input
        label="Contraseña"
        id="password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password}
      />

      <Button
        type="submit"
        loading={loading}
        iconRight={!loading && <LogIn size={20} />}
        className="w-full"
      >
        {loading ? 'Validando...' : 'Iniciar Sesión'}
      </Button>

      {message && (
        <Alert
          variant={message.includes('Bienvenido') ? 'success' : 'error'}
          onClose={() => setMessage('')}
          closable
        >
          {message}
        </Alert>
      )}
    </form>
  );
}