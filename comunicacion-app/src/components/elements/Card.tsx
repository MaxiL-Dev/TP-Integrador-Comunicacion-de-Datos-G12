import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-[#151515] border border-zinc-800/60 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
};