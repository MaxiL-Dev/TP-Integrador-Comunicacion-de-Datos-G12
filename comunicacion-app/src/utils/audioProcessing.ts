export const calculatePCMSize = (durationSeconds: number, sampleRate: number, bitDepth: number, channels: number = 1): number => {
  return durationSeconds * sampleRate * (bitDepth / 8) * channels;
};

export const blobToAudioBuffer = async (blob: Blob, audioContext: AudioContext): Promise<AudioBuffer> => {
  const arrayBuffer = await blob.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
};


const encodeWAV = (samples: Float32Array, sampleRate: number): Blob => {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); 
  view.setUint16(22, 1, true); 
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return new Blob([view], { type: 'audio/wav' });
};

export const processAudioBuffer = async (
  originalBuffer: AudioBuffer,
  targetSampleRate: number,
  targetBitDepth: number
): Promise<{ originalData: number[]; processedData: number[]; processedBlob: Blob }> => {
  
  const offlineCtx = new OfflineAudioContext(1, originalBuffer.duration * targetSampleRate, targetSampleRate);
  const source = offlineCtx.createBufferSource();
  source.buffer = originalBuffer;
  source.connect(offlineCtx.destination);
  source.start();
  
  const resampledBuffer = await offlineCtx.startRendering();
  const channelData = resampledBuffer.getChannelData(0);
  const originalChannelData = originalBuffer.getChannelData(0);

  const maxLevel = Math.pow(2, targetBitDepth - 1) - 1;
  for (let i = 0; i < channelData.length; i++) {
    channelData[i] = Math.round(channelData[i] * maxLevel) / maxLevel;
  }

  const energyChunkSize = Math.floor(originalBuffer.sampleRate * 0.05); 
  let maxEnergy = 0;
  let bestChunkIndex = 0;

  for (let i = 0; i < originalChannelData.length; i += energyChunkSize) {
    let currentEnergy = 0;
    const end = Math.min(i + energyChunkSize, originalChannelData.length);
    for (let j = i; j < end; j++) currentEnergy += originalChannelData[j] * originalChannelData[j]; 
    if (currentEnergy > maxEnergy) {
      maxEnergy = currentEnergy;
      bestChunkIndex = i;
    }
  }

  const centerIndex = bestChunkIndex + Math.floor(energyChunkSize / 2);
  const windowTime = 0.04; 
  
  const originalWindowSize = Math.floor(originalBuffer.sampleRate * windowTime);
  const startOriginal = Math.max(0, centerIndex - Math.floor(originalWindowSize / 2));
  const endOriginal = Math.min(originalChannelData.length, startOriginal + originalWindowSize);
  const originalDataSubset = Array.from(originalChannelData.slice(startOriginal, endOriginal));

  const processedWindowSize = Math.floor(targetSampleRate * windowTime);
  const startProcessed = Math.floor(startOriginal * (targetSampleRate / originalBuffer.sampleRate));
  const endProcessed = Math.min(channelData.length, startProcessed + processedWindowSize);
  const processedDataSubset = Array.from(channelData.slice(startProcessed, endProcessed));

  const processedBlob = encodeWAV(channelData, targetSampleRate);

  return { originalData: originalDataSubset, processedData: processedDataSubset, processedBlob };
};