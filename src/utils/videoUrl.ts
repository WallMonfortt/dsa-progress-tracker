export type VideoPlatform = 'youtube' | 'vimeo' | 'dailymotion';

export interface ParsedVideo {
  platform: VideoPlatform;
  videoId: string;
  embedUrl: string;
}

const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
const VIMEO_REGEX = /vimeo\.com\/(?:video\/)?(\d+)/;
const DAILYMOTION_REGEX =
  /(?:dailymotion\.com\/(?:video\/)|dai\.ly\/)([a-zA-Z0-9]+)/;

function getEmbedUrl(platform: VideoPlatform, videoId: string, autoplay: boolean): string {
  const autoplayParam = autoplay ? '1' : '0';
  switch (platform) {
    case 'youtube':
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplayParam}`;
    case 'dailymotion':
      return `https://www.dailymotion.com/embed/video/${videoId}?autoplay=${autoplayParam}`;
    default:
      return '';
  }
}

/**
 * Parsea una URL de video y devuelve la plataforma, el ID y la URL de embed.
 * Soporta: YouTube, Vimeo, Dailymotion.
 */
export function parseVideoUrl(url: string, autoplay = true): ParsedVideo | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  let match = trimmed.match(YOUTUBE_REGEX);
  if (match) {
    return {
      platform: 'youtube',
      videoId: match[1],
      embedUrl: getEmbedUrl('youtube', match[1], autoplay),
    };
  }

  match = trimmed.match(VIMEO_REGEX);
  if (match) {
    return {
      platform: 'vimeo',
      videoId: match[1],
      embedUrl: getEmbedUrl('vimeo', match[1], autoplay),
    };
  }

  match = trimmed.match(DAILYMOTION_REGEX);
  if (match) {
    return {
      platform: 'dailymotion',
      videoId: match[1],
      embedUrl: getEmbedUrl('dailymotion', match[1], autoplay),
    };
  }

  return null;
}
