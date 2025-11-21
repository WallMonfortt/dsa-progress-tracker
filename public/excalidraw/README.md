# Archivos Excalidraw

Coloca aquí tus archivos de Excalidraw (`.excalidraw`).

## Estructura

Los archivos deben tener la extensión `.excalidraw` y ser archivos JSON válidos exportados desde Excalidraw.

## Ejemplo

Si tienes un archivo llamado `que-es-programar.excalidraw`, colócalo aquí y luego referencia su ruta en `src/data/topics.json`:

```json
{
  "id": "what-is-programming",
  "type": "video",
  "title": "¿Qué es programar?",
  "excalidrawPath": "/excalidraw/que-es-programar.excalidraw"
}
```

## Nota

La ruta debe comenzar con `/excalidraw/` ya que los archivos en `public/` se sirven desde la raíz del sitio.

