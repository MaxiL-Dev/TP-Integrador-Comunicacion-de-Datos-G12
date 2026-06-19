import { type SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

export const SelectInput = ({ label, options, className = '', ...props }: SelectInputProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
        {label}
      </label>
      <div className="relative">
        <select 
          className="w-full appearance-none bg-[#101010] border border-zinc-800 rounded-lg py-3 px-4 text-sm text-zinc-200 focus:outline-none focus:border-zinc-600 cursor-pointer"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
          keyboard_arrow_down
        </span>
      </div>
    </div>
  );
};