/**
 * Videos carousel content (`videos.liquid`, `videoShowcaseCarousel.js`).
 *
 *   • Array order in `videos` is slide order; the first entry is the “main” tour.
 *   • If `posterWebp` is set on an item, it replaces `poster` on the `<video poster>` attribute.
 *   • First-slide `preload` is chosen in Liquid; this file only stores metadata and sources.
 */
export default {
  sectionTitle: 'Видео с усадьбы',
  sectionSubtitle:
    'Прогулка по территории, атмосфера пруда и рыбалка. Листайте, чтобы посмотреть все записи.',
  videos: [
    {
      id: 'video-main',
      caption: 'Обзор усадьбы и пруда',
      description: 'Общий план территории, пруд и инфраструктура',
      baseUrl: 'assets/videos/main-video-compressed',
      poster: 'assets/images/video-poster.webp',
      extensions: 'webm,mp4',
    },
    {
      id: 'video-fish-1',
      caption: 'Рыбалка на пруду',
      description: 'Клёв, вода и настроение рыбалки.',
      baseUrl: 'assets/videos/fish-1',
      poster: 'assets/images/video-poster-fish-1.webp',
      extensions: 'webm,mp4',
    },
    {
      id: 'video-fish-2',
      caption: 'Ещё один ракурс пруда',
      description: 'Клёв, выпуск рыбы в воду.',
      baseUrl: 'assets/videos/fish-2',
      poster: 'assets/images/video-poster-fish-2.webp',
      extensions: 'webm,mp4',
    },
  ],
};
