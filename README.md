# DSA Progress Tracker 🚀

Un panel personalizado para potenciar tu práctica de Estructuras de Datos y Algoritmos para entrevistas técnicas.

---

## 🔥 Acerca del Proyecto

Esta es mi versión personal de una herramienta diseñada para rastrear el progreso en plataformas de programación como NeetCode y LeetCode. Aunque comenzó como un fork, ahora está evolucionando para incluir características específicas adaptadas a mi rutina de estudio y objetivos de preparación para entrevistas.

El objetivo es crear una herramienta todo-en-uno que no solo registre problemas resueltos, sino que también facilite el recuerdo activo y ayude a identificar áreas de mejora.

### 🛠️ Construido Con

* [Vite](https://vitejs.dev/) - Herramienta de construcción y servidor de desarrollo
* [React](https://reactjs.org/) - Biblioteca de UI
* [React Router](https://reactrouter.com/) - Enrutamiento
* [Tailwind CSS](https://tailwindcss.com/) - Estilos
* [Lucide React](https://lucide.dev/) - Iconos

---

## ✨ Características Principales

* ✅ **Seguimiento Visual:** Registra problemas completados en varias categorías (Arrays, Graphs, DP, etc.).
* ✅ **Sistema de Repetición Espaciada:** Programación automática de fechas de revisión (3, 5, 9, 17, 33, 65 días) para optimizar la retención a largo plazo.
* ✅ **Sincronización Automática:** El progreso se guarda automáticamente en el almacenamiento local del navegador.
* ✅ **Problemas Personalizados:** Agrega tus propios problemas para rastrear más allá de la lista NeetCode 150.
* ✅ **Exportar/Importar:** Respalda y restaura tus datos de progreso.
* ✅ **Modo Oscuro:** Soporte completo de modo oscuro para sesiones de programación nocturnas cómodas.
* ✅ **Estadísticas de Progreso:** Rastrea tu progreso con estadísticas detalladas (total resueltos, por dificultad, pendientes hoy).
* ✅ **Filtrado y Búsqueda:** Filtra por categoría, dificultad o busca por nombre/ID.
* ✅ **Múltiples Rutas de Aprendizaje:** Acceso a diferentes caminos de aprendizaje (Fundamentos, Patterns, Interview Roadmap).
* ✏️ **Sistema de Notas (Planeado):** Una sección dedicada para cada problema para agregar notas personales, complejidad de tiempo/espacio (Big O), y enfoques de solución.
* ⏱️ **Temporizador de Práctica (Planeado):** Una característica para cronometrar sesiones de resolución de problemas, simulando condiciones reales de entrevista.
* 🏷️ **Etiquetas Personalizadas (Planeado):** Un sistema para etiquetar problemas con etiquetas como "Revisar en 7 días", "Complicado", o "Favorito".

---

## 🚀 Comenzando

Sigue estos pasos para obtener una copia local funcionando.

### Prerrequisitos

Asegúrate de tener Node.js (v16 o superior) instalado en tu máquina.

### Instalación

1.  Clona el repositorio
    ```sh
    git clone https://github.com/WallMonfortt/dsa-progress-tracker.git
    ```
2.  Navega al directorio del proyecto
    ```sh
    cd dsa-progress-tracker
    ```
3.  Instala las dependencias
    ```sh
    # Usando npm
    npm install

    # O usando pnpm (recomendado - más rápido y eficiente)
    pnpm install
    ```
4.  Inicia el servidor de desarrollo
    ```sh
    # Con npm
    npm run dev

    # O con pnpm
    pnpm dev
    ```
5.  Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver el resultado!

### Scripts Disponibles

* `npm run dev` - Inicia el servidor de desarrollo
* `npm run build` - Construye para producción
* `npm run preview` - Previsualiza la construcción de producción
* `npm run lint` - Ejecuta ESLint

---

## 🗺️ Hoja de Ruta

* [x] Migrar a guía completa de SDE
* [x] Agregar sección de herramientas
* [x] Implementar sistema de repetición espaciada
* [x] Agregar funcionalidad de problemas personalizados
* [x] Funcionalidad de Exportar/Importar datos
* [x] Traducir toda la aplicación al español
* [ ] Completar contenido de la página Fundamentos
* [ ] Crear guías para cada tema
* [ ] Implementar sistema de notas para problemas
* [ ] Agregar funcionalidad de temporizador de práctica
* [ ] Agregar sistema de etiquetas personalizadas
* [ ] Refactorizar estructura del proyecto
* [ ] Agregar pruebas unitarias para componentes
* [ ] Extraer componentes reutilizables a biblioteca compartida
* [ ] Extraer paleta de colores y tema a biblioteca compartida
* [ ] Implementar internacionalización (i18n)
* [ ] Ver o agregar [Issues](https://github.com/WallMonfortt/dsa-progress-tracker/issues) para una lista completa de características propuestas (y problemas conocidos).

## 📁 Estructura del Proyecto

```
src/
├── components/       # Componentes React reutilizables
│   ├── buttons/     # Componentes de botones
│   ├── sections/    # Componentes de secciones
│   └── table/       # Componentes relacionados con tablas
├── contexts/        # Contextos de React (Theme)
├── data/            # Archivos JSON de datos (problemas, temas, etc.)
├── hooks/           # Hooks personalizados de React
├── pages/           # Componentes de página (rutas)
├── utils/           # Funciones de utilidad
└── assets/          # Recursos estáticos (iconos, imágenes)
```

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE.txt` para más información.

---

## 🙏 Agradecimientos (¡Importante!)

Quiero extender un agradecimiento especial a **Javlonbek Kosimov ([javydevx](https://github.com/javydevx))** por su increíble trabajo al crear el proyecto original, [neetcode-tracker](https://github.com/javydevx/neetcode-tracker).

Este proyecto no sería posible sin su código base fundamental, que sirvió como la inspiración principal y punto de partida para esta nueva versión. Si encuentras útil esta herramienta, por favor considera visitar el repositorio original para darle una estrella. ⭐