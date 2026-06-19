import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'secondary';
}

const variantStyles = {
  primary: 'bg-[#a8c7fa] text-zinc-950 hover:bg-[#96b8ef]',
  secondary: 'bg-zinc-800/80 text-zinc-200 border border-zinc-700/60 hover:bg-zinc-700',
};

export const Button = ({ className = '', variant = 'primary', children, ...props }: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-md font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};