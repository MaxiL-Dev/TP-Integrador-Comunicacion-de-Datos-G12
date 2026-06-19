import { useEffect, useRef, useState } from 'react';
import { Card } from '../elements/Card';
import { IconButton } from '../elements/IconButton';

interface RecorderPanelProps {
  isRecording: boolean;
  onToggleRecord: () => void;
  analyserNode: AnalyserNode | null;
  audioUrl: string | null;
}

export const RecorderPanel = ({ isRecording, onToggleRecord, analyserNode, audioUrl }: RecorderPanelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  // Estado para el reproductor
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Estado para el cronómetro (centésimas de segundo)
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {

          if (prev >= 1000) {
            onToggleRecord(); 
            return 1000;
          }
          return prev + 1;
        });
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, onToggleRecord]);

  const handleRecordClick = () => {
    if (!isRecording) {
      setRecordingTime(0); 
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
    onToggleRecord();
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };


  useEffect(() => {

    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsPlaying(false);
    }

    if (audioUrl) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => setIsPlaying(false);
    }
}, [audioUrl]);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 100);
    const centiseconds = time % 100;
    return `${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!canvasRef.current || !analyserNode || !isRecording) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserNode.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#101010';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#60a5fa';
      ctx.beginPath();

      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRecording, analyserNode]);

  return (
    <Card className="flex items-center gap-6 p-8">
      <div className="flex flex-col gap-4">
        
        <IconButton 
          iconName="fiber_manual_record" 
          variant="record" 
          onClick={handleRecordClick} 
          isActive={isRecording}
        />
        
        <div className="flex gap-2 justify-center">
          <IconButton 
            iconName={isPlaying ? 'pause' : 'play_arrow'} 
            variant="secondary" 
            onClick={handlePlayPause}
            disabled={isRecording || !audioUrl} 
            className="w-full"
          />
        </div>

      </div>

      <div className="flex-grow h-32 bg-[#101010] rounded-xl border border-zinc-800/40 relative overflow-hidden flex flex-col justify-end p-4">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
          width={800} 
          height={150}
        />
        <span className="relative z-10 text-xs font-mono text-zinc-500">
          {formatTime(recordingTime)} / 10.00
        </span>
      </div>
    </Card>
  );
};