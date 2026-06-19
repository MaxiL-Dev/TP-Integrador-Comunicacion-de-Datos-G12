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
    title: "Convertidor de Audio",
    description: "Procesamiento de audio multiformato con algoritmos de reducción de ruido y normalización de picos.",
    buttonText: "Iniciar Conversión",
    iconName: "mic", 
    navigateTo: "/audio"
  },
  {
    id: 'image-digitizer',
    title: "Digitalización de Imágenes",
    description: "Restauración y escalado de imágenes mediante IA. Mejora la claridad y el detalle de archivos antiguos.",
    buttonText: "Digitalizar Archivo",
    iconName: "image", 
    navigateTo: "/imagen"
  }
];