## Trabajo Integrador - Comunicación de Datos 

Proyecto desarrollado para la materia **Comunicación de Datos** en la **Universidad Tecnológica Nacional - Facultad Regional La Plata (UTN FRLP)**.

Se trata de una Single Page Application (SPA) interactiva diseñada para demostrar y aplicar los conceptos teóricos de conversión analógico-digital, abordando tanto el procesamiento de señales de audio como la digitalización de imágenes.

### Integrantes del Equipo

* Baez, Ramiro
* López, Máximo
* Marini, Santiago
* Olivera, Milagros

### Características Principales

La aplicación se divide en dos módulos principales:

#### Módulo 1: Conversor de Audio Analógico a Digital
Permite la grabación de audio en tiempo real y su posterior procesamiento para analizar cómo afectan distintos parámetros en la digitalización de la señal.
* **Captura:** Grabación mediante el micrófono del dispositivo (`MediaRecorder API`).
* **Muestreo:** Conversión a distintas tasas (8 kHz, 16 kHz, 44.1 kHz, 96 kHz).
* **Cuantización:** Variación de la profundidad de bits (8, 16 y 24 bits).
* **Análisis Visual:** Visualización de la forma de onda en un `Canvas` y comparación del espectro de frecuencias mediante la Transformada Rápida de Fourier (FFT) usando `Chart.js`.
* **Exportación:** Cálculo del tamaño estimado y descarga de los audios en formato WAV y MP3 (`lamejs`).

#### Módulo 2: Digitalización de Imágenes
Demuestra el impacto del submuestreo espacial y la reducción de profundidad de color en archivos de imagen.
* **Carga:** Importación de imágenes en alta resolución desde el dispositivo.
* **Muestreo Espacial:** Reducción de la resolución de la imagen (ej. 100x100px, 500x500px, 1000x1000px) manipulando píxeles directamente con `Canvas API`.
* **Profundidad de Bits:** Reducción de canales de color (1 bit, 4 bits, 8 bits, 24 bits).
* **Análisis Visual:** Vista comparativa "lado a lado" (Original vs. Digitalizada).
* **Exportación:** Aplicación de compresión, estimación de peso final y exportación en formato PNG.

