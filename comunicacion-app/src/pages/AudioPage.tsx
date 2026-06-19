import { useState, useEffect } from 'react';
import { useAudioProcessor } from '../hooks/useAudioProcessor';
import { RecorderPanel } from '../components/audio/RecorderPanel';
import { SettingsPanel } from '../components/audio/SettingsPanel';
import { AnalysisPanel } from '../components/audio/AnalysisPanel';
import { calculatePCMSize, blobToAudioBuffer, processAudioBuffer } from '../utils/audioProcessing';

export const AudioPage = () => {
  const { isRecording, startRecording, stopRecording, analyserNode, audioBlob } = useAudioProcessor();
  
  const [sampleRate, setSampleRate] = useState<number>(44100);
  const [bitDepth, setBitDepth] = useState<number>(16);
  
  const [originalData, setOriginalData] = useState<number[]>([]);
  const [processedData, setProcessedData] = useState<number[]>([]);
  const [estimatedSize, setEstimatedSize] = useState<string>("0.00");
  
  const [processedBlobUrl, setProcessedBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const runProcessing = async () => {
      if (!audioBlob) return;
      
      try {
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const originalBuffer = await blobToAudioBuffer(audioBlob, audioContext);
        
        const { originalData, processedData, processedBlob } = await processAudioBuffer(originalBuffer, sampleRate, bitDepth);
        
        const bytes = calculatePCMSize(originalBuffer.duration, sampleRate, bitDepth, originalBuffer.numberOfChannels);
        const megabytes = (bytes / (1024 * 1024)).toFixed(2);
        
        setOriginalData(originalData);
        setProcessedData(processedData);
        setEstimatedSize(megabytes);
        
        if (processedBlobUrl) URL.revokeObjectURL(processedBlobUrl);
        setProcessedBlobUrl(URL.createObjectURL(processedBlob));
        
      } catch (error) {
        console.error("Error procesando audio:", error);
      }
    };

    runProcessing();
    
    return () => {
      if (processedBlobUrl) URL.revokeObjectURL(processedBlobUrl);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob, sampleRate, bitDepth]); 

  const handleToggleRecord = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 font-display">
      <RecorderPanel 
        isRecording={isRecording} 
        onToggleRecord={handleToggleRecord} 
        analyserNode={analyserNode}
        audioUrl={processedBlobUrl}
      />
      <SettingsPanel 
        sampleRate={sampleRate}
        setSampleRate={setSampleRate}
        bitDepth={bitDepth}
        setBitDepth={setBitDepth}
      />
      <AnalysisPanel 
        originalData={originalData}
        processedData={processedData}
        estimatedSizeMB={estimatedSize}
        processedBlobUrl={processedBlobUrl}
      />
    </div>
  );
};