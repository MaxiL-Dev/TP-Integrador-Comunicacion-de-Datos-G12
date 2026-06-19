import { Card } from '../elements/Card';
import { Button } from '../elements/Button';
import { SelectInput } from '../elements/SelectInput';

interface SelectOption {
  label: string;
  value: string;
}

interface ControlBarProps {
  resolution: string;
  onResolutionChange: (value: string) => void;
  resolutionOptions: SelectOption[];
  bitDepth: string;
  onBitDepthChange: (value: string) => void;
  onExport: () => void;
  isExportDisabled?: boolean;
}

export const ControlBar = ({
  resolution,
  onResolutionChange,
  resolutionOptions,
  bitDepth,
  onBitDepthChange,
  onExport,
  isExportDisabled = true,
}: ControlBarProps) => {
  return (
    <Card className="flex flex-col md:flex-row md:items-end gap-4">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectInput
          icon="aspect_ratio"
          label="Resolución"
          options={resolutionOptions}
          value={resolution}
          onChange={(e) => onResolutionChange(e.target.value)}
        />
        <SelectInput
          icon="tonality"
          label="Profundidad"
          options={[
            { label: '1 bit', value: '1' },
            { label: '4 bits', value: '4' },
            { label: '8 bits', value: '8' },
            { label: '24 bits', value: '24' },
          ]}
          value={bitDepth}
          onChange={(e) => onBitDepthChange(e.target.value)}
        />
      </div>

      <Button variant="primary" className="w-auto px-6" onClick={onExport} disabled={isExportDisabled}>
        <span className="material-symbols-outlined text-lg">download</span>
        Exportar
      </Button>
    </Card>
  );
};