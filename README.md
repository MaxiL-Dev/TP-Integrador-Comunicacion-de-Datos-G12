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
Permite grabar audio en tiempo real (con un límite de 10 segundos) y procesarlo para analizar cómo afectan distintos parámetros en la digitalización de la señal.
* **Captura:** Grabación mediante el micrófono del dispositivo (`MediaRecorder API`), con cronómetro y visualización en vivo de la forma de onda mientras se grava.
* **Muestreo:** Conversión a distintas tasas de muestreo (8 kHz, 22.05 kHz y 44.1 kHz).
* **Cuantización:** Variación de la profundidad de bits (4, 8 y 16 bits).
* **Reproducción:** Reproductor integrado con play/pause del audio grabado.
* **Análisis Visual:** Comparación gráfica (`Chart.js`) de la forma de onda original vs. la procesada/cuantizada.
* **Exportación:** Cálculo del tamaño estimado (PCM) y descarga del audio procesado en formato WAV.

#### Módulo 2: Digitalización de Imágenes
Demuestra el impacto del submuestreo espacial y la reducción de profundidad de color en archivos de imagen.
* **Carga:** Importación de imágenes JPG/PNG por clic o arrastrando y soltando el archivo (drag & drop).
* **Muestreo Espacial:** Reducción de la resolución manipulando píxeles directamente con `Canvas API`. Las opciones se calculan dinámicamente según el tamaño real de la imagen cargada (Original, 1/2, 1/4 y 1/8), preservando su relación de aspecto.
* **Profundidad de Bits:** Reducción de la profundidad de color (1, 4, 8 y 24 bits), repartida en partes iguales entre los canales R, G y B.
* **Procesamiento Automático:** La imagen se reprocesa sola al cambiar la resolución o la profundidad de bits, sin necesidad de un botón manual.
* **Análisis Visual:** Vista comparativa "lado a lado" (Original vs. Procesada), sin recortes, manteniendo la relación de aspecto real de la imagen.
* **Exportación:** Estimación del peso final (KB/MB) y exportación en formato PNG, preservando transparencia.