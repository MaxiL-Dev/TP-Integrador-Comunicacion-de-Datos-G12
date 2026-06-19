import { useState, useEffect, useMemo } from 'react';
import { ControlBar } from '../components/image/ControlBar';
import { ImageUploader } from '../components/image/ImageUploader';
import { ImagePreview } from '../components/image/ImagePreview';
import { loadImageFromUrl, processImage, formatBytes } from '../utils/imageProcessing';

export const ImagePage = () => {
  const [scale, setScale] = useState('1'); // '1' = original, '0.5', '0.25'
  const [bitDepth, setBitDepth] = useState('24');

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<string | null>(null);
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);

  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [processedSize, setProcessedSize] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Opciones reales: tamaño nativo de la imagen cargada: /2 /4 y /8
  const resolutionOptions = useMemo(() => {
  if (!sourceImage) {
    return [{ label: 'Subí una imagen primero', value: '1' }];
  }
  const { naturalWidth: w, naturalHeight: h } = sourceImage;
  return [
    { label: `${w} x ${h} (Original)`, value: '1' },
    { label: `${Math.round(w / 2)} x ${Math.round(h / 2)}`, value: '0.5' },
    { label: `${Math.round(w / 4)} x ${Math.round(h / 4)}`, value: '0.25' },
    { label: `${Math.round(w / 8)} x ${Math.round(h / 8)}`, value: '0.125' }

  ];
}, [sourceImage]);

  const handleImageSelected = async (file: File) => {
    if (originalImage) URL.revokeObjectURL(originalImage);

    const previewUrl = URL.createObjectURL(file);
    setOriginalImage(previewUrl);
    setOriginalSize(formatBytes(file.size));

    const img = await loadImageFromUrl(previewUrl);
    setScale('1'); 
    setSourceImage(img);
  };

  useEffect(() => {
    if (!sourceImage) return;

    const runProcessing = async () => {
      setIsProcessing(true);
      try {
        const { processedUrl, processedBlob } = await processImage(sourceImage, Number(scale), Number(bitDepth));

        setProcessedImage((prevUrl) => {
          if (prevUrl) URL.revokeObjectURL(prevUrl);
          return processedUrl;
        });
        setProcessedSize(formatBytes(processedBlob.size));
      } catch (error) {
        console.error('Error procesando la imagen:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    runProcessing();
  }, [sourceImage, scale, bitDepth]);

  const handleExport = () => {
    if (!processedImage || !sourceImage) return;
    const width = Math.round(sourceImage.naturalWidth * Number(scale));
    const height = Math.round(sourceImage.naturalHeight * Number(scale));

    const a = document.createElement('a');
    a.href = processedImage;
    a.download = `imagen_${width}x${height}_${bitDepth}bits.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 font-display">
      <ControlBar
        resolution={scale}
        onResolutionChange={setScale}
        resolutionOptions={resolutionOptions}
        bitDepth={bitDepth}
        onBitDepthChange={setBitDepth}
        onExport={handleExport}
        isExportDisabled={!processedImage || isProcessing}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <ImageUploader onImageSelected={handleImageSelected} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImagePreview imageSource={originalImage} label="Original" fileSize={originalSize ?? undefined} />
          <ImagePreview
            imageSource={processedImage}
            label="Procesado"
            fileSize={processedSize ?? undefined}
            isLoading={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};