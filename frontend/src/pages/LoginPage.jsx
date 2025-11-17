import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
  <div className="min-h-screen w-full">
    <div className="min-h-screen bg-gradient-to-br from-[#0f0720] via-[#1a0b2e] to-[#2d1441] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="text-gray-300 text-xl mt-4">El futuro de la productividad empieza aquí</p>
        </div>

        <div className="bg-[#0f1120]/90 backdrop-blur-2xl rounded-3xl border border-purple-800/40 shadow-2xl p-8">
          <LoginForm onSuccess={() => console.log('Login exitoso')} />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Regístrate gratis
              </a>
            </p>
          </div>
        </div>

        {/* Aquí puedes añadir partículas, ilustraciones, estadísticas, etc. sin tocar el form */}
      </div>
    </div>
  </div>
  );
}