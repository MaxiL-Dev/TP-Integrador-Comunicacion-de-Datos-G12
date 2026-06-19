import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Menú Principal' },
    { path: '/audio', label: 'Conversor de Audio' },
    { path: '/imagen', label: 'Digitalización de Imágenes' },
  ];

  return (
    <nav className="w-full border-b border-zinc-800/40 bg-[#0d0d0d] px-8 pt-8">
      <div className="max-w-5xl mx-auto flex gap-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `pb-3 text-sm transition-colors duration-200 ${
                isActive
                  ? 'text-[#a8c7fa] border-b-2 border-[#a8c7fa] font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};