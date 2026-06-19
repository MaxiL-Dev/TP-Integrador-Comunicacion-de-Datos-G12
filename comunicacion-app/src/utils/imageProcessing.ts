// src/utils/imageProcessing.ts

export const loadImageFromUrl = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

const getChannelBits = (totalBits: number): [number, number, number] => {
  const bitsPerChannel = Math.max(0, Math.round(totalBits / 3));
  return [bitsPerChannel, bitsPerChannel, bitsPerChannel];
};

const quantizeChannel = (value: number, bits: number): number => {
  if (bits <= 0) return 0;
  const levels = Math.pow(2, bits);
  const step = 255 / (levels - 1);
  return Math.round(Math.round(value / step) * step);
};

export interface ProcessImageResult {
  processedUrl: string;
  processedBlob: Blob;
  width: number;
  height: number;
}

export const processImage = async (
  sourceImage: HTMLImageElement,
  scale: number,
  bitDepth: number
): Promise<ProcessImageResult> => {
  const width = Math.max(1, Math.round(sourceImage.naturalWidth * scale));
  const height = Math.max(1, Math.round(sourceImage.naturalHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No se pudo obtener el contexto 2D del canvas');

  ctx.drawImage(sourceImage, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;

  if (bitDepth <= 1) {
    for (let i = 0; i < data.length; i += 4) {
      const luminance = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      const bw = luminance >= 128 ? 255 : 0;
      data[i] = bw;
      data[i + 1] = bw;
      data[i + 2] = bw;
    }
  } else {
    const [bitsR, bitsG, bitsB] = getChannelBits(bitDepth);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = quantizeChannel(data[i], bitsR);
      data[i + 1] = quantizeChannel(data[i + 1], bitsG);
      data[i + 2] = quantizeChannel(data[i + 2], bitsB);
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const processedBlob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('No se pudo generar el blob'))),
      'image/png'
    );
  });

  return { processedUrl: URL.createObjectURL(processedBlob), processedBlob, width, height };
};

export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};