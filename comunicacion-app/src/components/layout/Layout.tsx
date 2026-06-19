import { Outlet } from 'react-router-dom';
import { Navbar } from './NavBar.tsx';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] font-sans text-zinc-100 selection:bg-[#a8c7fa] selection:text-zinc-900">
      <Navbar />
      <main className="px-8 py-16">
        <Outlet />
      </main>
    </div>
  );
};