import homePageDom from '../constants/homePageDom.cjs';

const {
  LAZY_VIDEO_HOST_DATA_ATTR,
  LAZY_VIDEO_HOST_DATASET,
  LAZY_VIDEO_HOST_QUERY,
  STATE_CLASS,
} = homePageDom;

function createVideoTag({ poster = '', preload = 'metadata' }) {
  const video = document.createElement('video');
  video.poster = poster;
  video.controls = true;
  video.muted = false;
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

/**
 * Injects a <video> into a placeholder host (used by the videos showcase carousel).
 * Host: data-video-url, data-video-poster, data-video-extensions;
 * optional data-poster-webp (preferred for video.poster when set),
 * data-video-preload: none | metadata | auto.
 */
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
  const extensionsStr =
    lazyVideoHostElement.getAttribute(
      LAZY_VIDEO_HOST_DATA_ATTR.videoExtensions,
    ) || 'webm,mp4';
  const extensions = extensionsStr
    .split(',')
    .map((extensionToken) => extensionToken.trim());
  const preloadRaw = (
    lazyVideoHostElement.getAttribute(
      LAZY_VIDEO_HOST_DATA_ATTR.videoPreload,
    ) || 'metadata'
  ).toLowerCase();
  const preload = ['none', 'metadata', 'auto'].includes(preloadRaw)
    ? preloadRaw
    : 'metadata';

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

  videoElement.addEventListener('loadeddata', hideSkeleton, { once: true });
  videoElement.addEventListener(
    'error',
    () => {
      hideSkeleton();
    },
    { once: true },
  );
}

export function initVideoSection({
  sectionName,
  className,
  removeWrappers = false,
}) {
  const videoSection = document.querySelector(`.${sectionName}-${className}`);
  const videoWraps = document.querySelectorAll(`.${sectionName}-video-wrapper`);
  const videoStateMap = new Map();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target: wrapperElement, isIntersecting }) => {
      if (isIntersecting && !videoStateMap.get(wrapperElement)) {
        const mediaBaseUrl = wrapperElement.getAttribute(
          LAZY_VIDEO_HOST_DATA_ATTR.videoUrl,
        );
        const posterUrl = wrapperElement.getAttribute(
          LAZY_VIDEO_HOST_DATA_ATTR.videoPoster,
        );
        const extensions = wrapperElement
          .getAttribute(LAZY_VIDEO_HOST_DATA_ATTR.videoExtensions)
          .split(',');

        const videoElement = createVideoTag({ poster: posterUrl });
        setVideoResources({
          url: mediaBaseUrl,
          extensions,
          videoTag: videoElement,
        });
        setNotSupportJS({ parentNode: videoElement });

        videoSection.appendChild(videoElement);

        // remove video wrapper with all data attributes
        if (removeWrappers) {
          videoSection.removeChild(wrapperElement);
        }

        videoStateMap.set(wrapperElement, true);
      }
    });
  });

  videoWraps.forEach((videoWrapper) => {
    videoStateMap.set(videoWrapper, false);
    observer.observe(videoWrapper);
  });
}
