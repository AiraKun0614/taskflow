import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

export function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.email) newErrors.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.password) newErrors.password = 'La contraseña es obligatoria';
    else if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setMessage('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage('¡Cuenta creada con éxito! Redirigiendo al login...');

      if (onSuccess) onSuccess();

      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Error al crear la cuenta';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nombre completo"
        id="name"
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={errors.name}
        placeholder="Juan Pérez"
      />

      <Input
        label="Email"
        id="email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
        placeholder="tucorreo@ejemplo.com"
      />

      <Input
        label="Contraseña"
        id="password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password}
        placeholder="Mínimo 6 caracteres"
      />

      <Button
        type="submit"
        loading={loading}
        iconRight={!loading && <UserPlus size={20} />}
        className="w-full"
        variant="success"
      >
        {loading ? 'Creando cuenta...' : 'Crear mi cuenta gratis'}
      </Button>

      {message && (
        <Alert
          variant={message.includes('éxito') ? 'success' : 'error'}
          onClose={() => setMessage('')}
          closable
        >
          {message}
        </Alert>
      )}
    </form>
  );
}