/**
 * Unified video block: order in `videos` = carousel order (left / first = main tour).
 * - baseUrl: path without extension
 * - poster: fallback poster URL (e.g. JPEG for older engines)
 * - posterWebp: optional; if set, used for <video poster> (smaller WebP). If omitted, `poster` is used as-is.
 * - description: optional short line under the caption
 * Preload strategy: first slide uses preload auto via template (not stored here).
 */
module.exports = {
  sectionTitle: 'Видео с усадьбы',
  sectionSubtitle:
    'Прогулка по территории, атмосфера пруда и рыбалка — включите ролик и загляните к нам в гости. Листайте, чтобы посмотреть все записи.',
  videos: [
    {
      id: 'video-main',
      caption: 'Обзор усадьбы и пруда',
      description:
        'Общий план территории, пруд и инфраструктура — удобно показать гостям до визита.',
      baseUrl: 'assets/videos/main-video-compressed',
      poster: 'assets/images/video-poster.webp',
      extensions: 'webm,mp4',
    },
    {
      id: 'video-fish-1',
      caption: 'Рыбалка на пруду',
      description: 'Ракурс с пирса: клёв, вода и настроение рыбалки.',
      baseUrl: 'assets/videos/fish-1',
      poster: 'assets/images/video-poster-fish-1.webp',
      extensions: 'webm,mp4',
    },
    {
      id: 'video-fish-2',
      caption: 'Ещё один ракурс пруда',
      description: 'Дополнительный вид на водоём и береговую линию.',
      baseUrl: 'assets/videos/fish-2',
      poster: 'assets/images/video-poster-fish-2.webp',
      extensions: 'webm,mp4',
    },
  ],
};
