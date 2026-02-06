import { parseVideoUrl } from '../../utils/videoUrl';
import { ExternalLink } from 'lucide-react';

interface VideoEmbedProps {
  /** URL del video (YouTube, Vimeo o Dailymotion) */
  url: string;
  /** Reproducir automáticamente al cargar (por defecto: false) */
  autoplay?: boolean;
  /** Clases adicionales para el contenedor */
  className?: string;
  /** Título para accesibilidad del iframe */
  title?: string;
}

/**
 * Wrapper responsive para incrustar videos de YouTube, Vimeo o Dailymotion.
 * Solo hay que pasar el link; detecta la plataforma y muestra el reproductor.
 */
const VideoEmbed = ({
  url,
  autoplay = false,
  className = '',
  title = 'Reproductor de video',
}: VideoEmbedProps) => {
  const parsed = parseVideoUrl(url, autoplay);

  if (!parsed) {
    return (
      <div
        className={`rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 ${className}`}
      >
        <div className="aspect-video flex flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            No se pudo incrustar el video. Enlaces soportados: YouTube, Vimeo, Dailymotion.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Abrir enlace
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden bg-black ${className}`}
    >
      <div className="relative w-full aspect-video">
        <iframe
          src={parsed.embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoEmbed;
