import { type ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string;
  variant?: 'record' | 'secondary' | 'default';
  isActive?: boolean;
}

export const IconButton = ({ iconName, variant = 'default', isActive = false, className = '', ...props }: IconButtonProps) => {
  const baseStyles = "flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  

    const variants = {
    record: "group w-16 h-16 rounded-full bg-[#a8c7fa] text-[#6497cd] cursor-pointer hover:bg-[#96b8ef]",
    secondary: "w-12 h-12 rounded-lg bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 cursor-pointer",
    default: "p-2 rounded-md hover:bg-zinc-800 text-zinc-300 cursor-pointer"
    };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {variant === 'record' ? (
        <div className={`transition-all duration-200 ease-in-out bg-[#6497cd] group-hover:bg-[#5483b8] ${isActive ? 'w-5 h-5 rounded-sm' : 'w-6 h-6 rounded-full'}`} />
      ) : (
        <span className="material-symbols-outlined text-[28px]">{iconName}</span>
      )}
    </button>
  );
};