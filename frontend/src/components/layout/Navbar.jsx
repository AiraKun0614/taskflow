import { Bell, Search } from 'lucide-react';

export function Navbar() {
  const user = { name: "Admin", avatar: null };

  return (
    <header className="bg-[#0f1120]/80 backdrop-blur-2xl border-b border-purple-800/30 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Buscar tareas..."
              className="pl-10 pr-4 py-2 bg-white/10 rounded-xl border border-white/20 focus:border-indigo-500 focus:outline-none transition-colors w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">Administrador</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold">
              {user.name[0]}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}