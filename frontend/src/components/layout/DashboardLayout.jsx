import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Navbar />
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}