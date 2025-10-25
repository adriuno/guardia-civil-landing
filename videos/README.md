# Instrucciones para Videos de Testimonios

## 📹 Cómo añadir tus videos

1. **Guarda tus videos** en esta carpeta con los siguientes nombres:
   - `testimonio1.mp4`
   - `testimonio2.mp4`
   - `testimonio3.mp4`
   - `testimonio4.mp4`

2. **Formato recomendado:**
   - Formato: MP4 (H.264)
   - Resolución: 1280x720 (HD) o 1920x1080 (Full HD)
   - Orientación: Horizontal (landscape)
   - Duración recomendada: 30-90 segundos

3. **Para añadir más videos:**
   - Añade el video en esta carpeta (ejemplo: `testimonio5.mp4`)
   - Edita `index.html` y copia/pega uno de los bloques de video
   - Cambia el número en `src="videos/testimonioX.mp4"`
   - Actualiza el nombre y descripción
   - Añade un nuevo indicador en la sección de indicadores

4. **Personalizar información:**
   - Edita el archivo `index.html`
   - Busca la sección "Testimonios en Video"
   - Cambia los nombres y descripciones dentro de las etiquetas `<h4>` y `<p>`

## 🎬 Ejemplo de estructura actual:

```
videos/
├── testimonio1.mp4  ← Carlos M. - Guardia Civil 2024
├── testimonio2.mp4  ← Laura S. - Guardia Civil 2024
├── testimonio3.mp4  ← Miguel A. - Guardia Civil 2023
└── testimonio4.mp4  ← Patricia R. - Guardia Civil 2024
```

## ⚙️ Consejos técnicos:

- **Comprime los videos** para web (usa HandBrake o similar)
- **Tamaño máximo recomendado:** 10-20 MB por video
- Si los videos son muy grandes, considera usar YouTube y embedirlos en vez de subirlos directamente
