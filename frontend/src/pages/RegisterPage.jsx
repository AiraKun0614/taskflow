import { RegisterForm } from '@/components/auth/RegisterForm';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  return (
  <div className="min-h-screen w-full"> 
    <div className="min-h-screen bg-gradient-to-br from-[#0f0720] via-[#1a0b2e] to-[#2d1441] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/10 via-transparent to-purple-600/10 animate-pulse" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-7xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Únete a TaskFlow
          </h1>
          <p className="text-gray-300 text-xl mt-4">Empieza a organizar tu vida en segundos</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-[#0f1120]/90 backdrop-blur-2xl rounded-3xl border border-emerald-800/40 shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <a
              href="/login"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft size={22} />
            </a>
            <h2 className="text-2xl font-bold text-white">Crear cuenta</h2>
          </div>

          <RegisterForm />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tienes cuenta?{' '}
              <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>

        {/* Bonus: estadísticas o trust badges */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>✓ Más de 50.000 tareas completadas</p>
          <p>✓ Usado por equipos en más de 20 países</p>
        </div>
      </div>
    </div>
  </div>
  );
}