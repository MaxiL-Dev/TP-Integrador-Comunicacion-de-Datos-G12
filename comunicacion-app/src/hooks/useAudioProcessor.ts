import { useState, useRef, useCallback } from 'react';

export const useAudioProcessor = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); 
  
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 2048; 
      
      sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceNodeRef.current.connect(analyser);

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        setAudioBlob(blob);
        
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setAnalyserNode(analyser);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accediendo al micrófono:", error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      sourceNodeRef.current?.disconnect();
      audioContextRef.current?.close();
      setAnalyserNode(null);
    }
  }, [isRecording]);

  return {
    isRecording,
    startRecording,
    stopRecording,
    analyserNode,
    audioUrl,
    audioBlob
  };
};