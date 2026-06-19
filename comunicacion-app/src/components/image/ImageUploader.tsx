import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { IconBox } from '../elements/IconBox';

interface ImageUploaderProps {
  onImageSelected?: (file: File) => void;
  className?: string;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];

export const ImageUploader = ({ onImageSelected, className = '' }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      console.warn('Formato no soportado, usá JPG o PNG.');
      return;
    }
    onImageSelected?.(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
    e.target.value = ''; // permite volver a subir el mismo archivo más adelante
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // necesario para que el navegador permita soltar el archivo
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`group cursor-pointer h-full min-h-[300px] flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed transition-colors duration-200 bg-[#101010] ${
        isDragging ? 'border-[#a8c7fa] bg-[#151a28]' : 'border-zinc-700/60 hover:border-zinc-600'
      } ${className}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />

      <IconBox className="group-hover:scale-105 transition-transform duration-200">
        <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
      </IconBox>

      <div className="text-center">
        <p className="text-zinc-100 font-medium text-sm">Cargar Imagen</p>
        <p className="text-zinc-500 text-xs mt-1">Arrastra o haz clic aquí</p>
      </div>

      <div className="flex gap-2">
        <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-800/80 px-2 py-1 rounded-md">JPG</span>
        <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-800/80 px-2 py-1 rounded-md">PNG</span>
      </div>
    </div>
  );
};