import {
  LAZY_VIDEO_HOST_DATA_ATTR,
  LAZY_VIDEO_HOST_DATASET,
} from '@constants/dom/lazyVideoHost.js';
import { LAZY_VIDEO_HOST_QUERY } from '@constants/dom/videoShowcase.js';
import { STATE_CLASS } from '@constants/dom/state.js';

/**
 * Hydrates carousel placeholders emitted by `videos.liquid`:
 * reads `data-video-*` attributes and injects `<video>` + `<source>` tags at runtime.
 */
export function normalizeVideoPreload(preloadRaw) {
  const lower = (preloadRaw || 'metadata').toLowerCase();
  return ['none', 'metadata', 'auto'].includes(lower) ? lower : 'metadata';
}

const DEFAULT_VIDEO_EXTENSIONS = 'webm,mp4';

export function parseVideoExtensionTokens(raw) {
  const source =
    raw == null || String(raw).trim() === ''
      ? DEFAULT_VIDEO_EXTENSIONS
      : String(raw);
  const tokens = source.split(',').map((t) => t.trim()).filter(Boolean);
  return tokens.length > 0 ? tokens : ['webm', 'mp4'];
}

function createVideoTag({ poster = '', preload = 'metadata' }) {
  const video = document.createElement('video');
  video.poster = poster;
  video.controls = true;
  /*
   * Starts muted even without user gesture:
   *   • Satisfies autoplay policies (Firefox is strict).
   *   • Allows `preload`/`loadeddata` to resolve so the carousel poster does not shimmer forever.
   */
  video.muted = true;
  video.loop = false;
  video.preload = preload;
  video.playsInline = true;
  return video;
}

function setVideoResources({ url, extensions, videoTag: videoElement }) {
  extensions.forEach((fileExtension) => {
    const sourceElement = document.createElement('source');
    sourceElement.src = `${url}.${fileExtension}`;
    sourceElement.type = `video/${fileExtension}`;
    videoElement.appendChild(sourceElement);
  });
}

function setNotSupportJS({ parentNode: videoParentNode }) {
  const fallbackMessage = document.createElement('div');
  fallbackMessage.innerHTML = 'Your browser does not support the video tag.';
  videoParentNode.appendChild(fallbackMessage);
}

export function mountLazyVideoHost(lazyVideoHostElement) {
  const mountedKey = LAZY_VIDEO_HOST_DATASET.videoMounted;
  if (
    !lazyVideoHostElement ||
    lazyVideoHostElement.dataset[mountedKey] === 'true'
  ) {
    return;
  }

  const baseUrl = lazyVideoHostElement.getAttribute(
    LAZY_VIDEO_HOST_DATA_ATTR.videoUrl,
  );
  const posterFallback =
    lazyVideoHostElement.getAttribute(
      LAZY_VIDEO_HOST_DATA_ATTR.videoPoster,
    ) || '';
  const posterWebp = lazyVideoHostElement.getAttribute(
    LAZY_VIDEO_HOST_DATA_ATTR.posterWebp,
  );
  const posterForVideo = posterWebp || posterFallback;
  const extensions = parseVideoExtensionTokens(
    lazyVideoHostElement.getAttribute(LAZY_VIDEO_HOST_DATA_ATTR.videoExtensions),
  );
  const preload = normalizeVideoPreload(
    lazyVideoHostElement.getAttribute(LAZY_VIDEO_HOST_DATA_ATTR.videoPreload),
  );

  if (!baseUrl) return;

  const videoElement = createVideoTag({ poster: posterForVideo, preload });
  videoElement.style.cssText =
    'position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;background:#000;z-index:1;';
  setVideoResources({ url: baseUrl, extensions, videoTag: videoElement });
  setNotSupportJS({ parentNode: videoElement });

  lazyVideoHostElement.appendChild(videoElement);
  lazyVideoHostElement.dataset[mountedKey] = 'true';

  const skeletonElement = lazyVideoHostElement.querySelector(
    LAZY_VIDEO_HOST_QUERY.skeleton,
  );
  const hideSkeleton = () => {
    skeletonElement?.remove();
    lazyVideoHostElement.classList.add(STATE_CLASS.mediaReady);
  };

  /* `loadedmetadata` fires in all target browsers once dimensions/poster are known; `loadeddata` can hang in Firefox with metadata-only decode. */
  videoElement.addEventListener('loadedmetadata', hideSkeleton, { once: true });
  videoElement.addEventListener(
    'error',
    () => {
      hideSkeleton();
    },
    { once: true },
  );
}
