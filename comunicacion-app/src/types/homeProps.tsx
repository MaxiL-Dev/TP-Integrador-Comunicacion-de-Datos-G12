// src/types/homeProps.tsx
export interface ModuleData {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  iconName: string; 
  navigateTo: string;
}

export const homeModulesData: ModuleData[] = [
  {
    id: 'audio-converter',
    title: "Conversor de Audio Analógico-Digital",
    description: "Grabá audio desde tu micrófono y compará en tiempo real cómo la frecuencia de muestreo y la profundidad de bits afectan la calidad y el peso del archivo.",
    buttonText: "Grabar y Analizar",
    iconName: "mic", 
    navigateTo: "/audio"
  },
  {
    id: 'image-digitizer',
    title: "Digitalización de Imágenes",
    description: "Subí una imagen y mirá en tiempo real cómo la resolución y la profundidad de color afectan su calidad visual y el peso final del archivo.",
    buttonText: "Digitalizar Imagen",
    iconName: "image", 
    navigateTo: "/imagen"
  }
];