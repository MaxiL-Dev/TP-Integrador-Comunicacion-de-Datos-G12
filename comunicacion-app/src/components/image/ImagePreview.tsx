interface ImagePreviewProps {
  imageSource: string | null;
  label: string;
  fileSize?: string;
  isLoading?: boolean;
}

export const ImagePreview = ({ imageSource, label, fileSize, isLoading = false }: ImagePreviewProps) => {
  const isProcessed = label.toLowerCase() === 'procesado';
  const footerCaption = isProcessed ? 'Optimizado' : 'Metadata';

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full rounded-xl overflow-hidden border border-zinc-800/60 bg-[#0d0d0d]">
        <span
          className={`absolute top-3 left-3 z-10 text-xs font-semibold px-3 py-1 rounded-full ${
            isProcessed ? 'bg-[#1e2333]/90 text-[#a8c7fa]' : 'bg-zinc-900/80 text-zinc-200'
          }`}
        >
          {label}
        </span>

        {imageSource ? (
          <img src={imageSource} alt={label} className="w-full h-auto block" />
        ) : (
          <div className="w-full min-h-64 flex items-center justify-center text-zinc-600 text-sm text-center px-4">
            {isProcessed ? 'Cargá una imagen para ver el resultado' : 'Sin imagen cargada'}
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <span className="text-zinc-200 text-xs font-medium animate-pulse">Procesando...</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-baseline px-1">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{footerCaption}</span>
        <span className={`text-sm font-bold ${isProcessed ? 'text-[#a8c7fa]' : 'text-zinc-100'}`}>
          {fileSize ?? '—'}
        </span>
      </div>
    </div>
  );
};