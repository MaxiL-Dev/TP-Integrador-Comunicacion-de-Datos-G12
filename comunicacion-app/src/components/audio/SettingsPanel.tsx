import { Card } from '../elements/Card';
import { SelectInput } from '../elements/SelectInput';

interface SettingsPanelProps {
  sampleRate: number;
  setSampleRate: (val: number) => void;
  bitDepth: number;
  setBitDepth: (val: number) => void;
}

export const SettingsPanel = ({ sampleRate, setSampleRate, bitDepth, setBitDepth }: SettingsPanelProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <SelectInput 
          label="Frecuencia de Muestreo"
          options={[
            { label: '44.1 kHz (CD)', value: '44100' },
            { label: '22.0 kHz (Radio)', value: '22050' },
            { label: '8.0 kHz (Teléfono)', value: '8000' }
          ]}
          value={sampleRate.toString()}
          onChange={(e) => setSampleRate(Number(e.target.value))}
        />
      </Card>
      <Card>
        <SelectInput 
          label="Profundidad de Bits"
          options={[
            { label: '16 bits (Alta Fidelidad)', value: '16' },
            { label: '8 bits (Retro/Consola)', value: '8' },
            { label: '4 bits (Voz muy comprimida)', value: '4' }
          ]}
          value={bitDepth.toString()}
          onChange={(e) => setBitDepth(Number(e.target.value))}
        />
      </Card>
    </div>
  );
};