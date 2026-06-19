export interface ModuleData {
  id: string; 
  title: string;
  description: string;
  buttonText: string;
  iconClass: string; 
  navigateTo: string;
}

export const homeModulesData: ModuleData[] = [
  {
    id: 'audio-converter',
    title: "Convertidor de Audio",
    description: "Procesamiento de audio multiformato con algoritmos de reducción de ruido y normalización de picos.",
    buttonText: "Iniciar Conversión",
    iconClass: "fa-solid fa-microphone", 
    navigateTo: "/audio"
  },
  {
    id: 'image-digitizer',
    title: "Digitalización de Imágenes",
    description: "Restauración y escalado de imágenes mediante IA. Mejora la claridad y el detalle de archivos antiguos.",
    buttonText: "Digitalizar Archivo",
    iconClass: "fa-regular fa-image",
    navigateTo: "/imagen"
  }
];