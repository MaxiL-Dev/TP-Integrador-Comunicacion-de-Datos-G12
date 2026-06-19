// src/components/ui/IconBox.tsx
import { type ReactNode } from 'react';

interface IconBoxProps {
  children: ReactNode;
  className?: string; 
}

export const IconBox = ({ children, className = '' }: IconBoxProps) => {
  return (
    <div className={`w-14 h-14 rounded-full bg-[#1e2333] flex items-center justify-center text-[#a8c7fa] mb-4 ${className}`}>
      {children}
    </div>
  );
};