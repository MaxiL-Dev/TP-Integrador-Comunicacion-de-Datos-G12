import { useEffect, useRef } from 'react';
import Chart, { type ChartOptions } from 'chart.js/auto';
import { Card } from '../elements/Card';

interface AnalysisPanelProps {
  originalData: number[];
  processedData: number[];
  estimatedSizeMB: string;
  processedBlobUrl: string | null; 
}

export const AnalysisPanel = ({ originalData, processedData, estimatedSizeMB, processedBlobUrl }: AnalysisPanelProps) => {
  const originalChartRef = useRef<HTMLCanvasElement>(null);
  const processedChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstances = useRef<{original: Chart | null, processed: Chart | null}>({ original: null, processed: null });

  useEffect(() => {
    if (!originalChartRef.current || !processedChartRef.current) return;

    if (chartInstances.current.original) chartInstances.current.original.destroy();
    if (chartInstances.current.processed) chartInstances.current.processed.destroy();

   const chartOptions: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      scales: {
        x: { grid: { color: '#27272a' }, ticks: { display: false } },
        y: { 
          grid: { color: '#27272a' },
          min: -1, 
          max: 1,
          ticks: {
            callback: (value) => Number(value).toFixed(2)
          }
        } 
      },
      plugins: { legend: { display: false } },
      elements: { point: { radius: 0 } }
    };

    chartInstances.current.original = new Chart(originalChartRef.current, {
      type: 'line',
      data: {
        labels: originalData.map((_, i) => i),
        datasets: [{
          data: originalData.length > 0 ? originalData : Array(100).fill(0),
          borderColor: '#a8c7fa',
          borderWidth: 2,
          tension: 0.4
        }]
      },
      options: chartOptions
    });

    chartInstances.current.processed = new Chart(processedChartRef.current, {
      type: 'line',
      data: {
        labels: processedData.map((_, i) => i),
        datasets: [{
          data: processedData.length > 0 ? processedData : Array(100).fill(0),
          borderColor: '#ef4444',
          borderWidth: 2,
          stepped: true
        }]
      },
      options: chartOptions
    });

  }, [originalData, processedData]);

  // Función para descargar el archivo
  const handleExport = () => {
    if (!processedBlobUrl) return;
    const a = document.createElement('a');
    a.href = processedBlobUrl;
    a.download = 'audio_procesado.wav';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Original (Alta Res)</span>
          <div className="h-48 bg-[#0d0d0d] rounded-lg border border-zinc-800 p-4 relative">
             <canvas ref={originalChartRef} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Procesado (Cuantizado)</span>
          <div className="h-48 bg-[#0d0d0d] rounded-lg border border-zinc-800 p-4 relative">
             <canvas ref={processedChartRef} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-zinc-800/60 pt-6 mt-2">
        <div className="flex gap-12">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-zinc-500">Tamaño (PCM)</span>
            <span className="text-lg font-bold text-zinc-100">{estimatedSizeMB} MB</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExport}
            disabled={!processedBlobUrl}
            className="cursor-pointer flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#a8c7fa] hover:bg-[#90b6f8] text-zinc-950 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-xl">download</span>
            Exportar
          </button>
        </div>
      </div>
    </Card>
  );
};