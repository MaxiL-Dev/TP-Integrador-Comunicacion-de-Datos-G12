import {type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = ({ className = '', children, ...props }: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer w-full py-2.5 px-4 rounded-md bg-[#a8c7fa] text-zinc-950 font-medium text-sm hover:bg-[#96b8ef] transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};