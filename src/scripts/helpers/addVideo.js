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

function setVideoResources({ url, extensions, videoTag }) {
  extensions.forEach((extension) => {
    const source = document.createElement('source');
    source.src = `${url}.${extension}`;
    source.type = `video/${extension}`;
    videoTag.appendChild(source);
  });
}

function setNotSupportJS({ parentNode }) {
  const noJs = document.createElement('div');
  noJs.innerHTML = 'Your browser does not support the video tag.';
  parentNode.appendChild(noJs);
}

/**
 * Injects a <video> into a placeholder host (used by the videos showcase carousel).
 * Host: data-video-url, data-video-poster, data-video-extensions;
 * optional data-poster-webp (preferred for video.poster when set),
 * data-video-preload: none | metadata | auto.
 */
export function mountLazyVideoHost(hostEl) {
  if (!hostEl || hostEl.dataset.videoMounted === 'true') {
    return;
  }

  const url = hostEl.getAttribute('data-video-url');
  const posterFallback = hostEl.getAttribute('data-video-poster') || '';
  const posterWebp = hostEl.getAttribute('data-poster-webp');
  const posterForVideo = posterWebp || posterFallback;
  const extensionsStr = hostEl.getAttribute('data-video-extensions') || 'webm,mp4';
  const extensions = extensionsStr.split(',').map((s) => s.trim());
  const preloadRaw = (
    hostEl.getAttribute('data-video-preload') || 'metadata'
  ).toLowerCase();
  const preload = ['none', 'metadata', 'auto'].includes(preloadRaw)
    ? preloadRaw
    : 'metadata';

  if (!url) return;

  const videoTag = createVideoTag({ poster: posterForVideo, preload });
  videoTag.style.cssText =
    'position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;background:#000;z-index:1;';
  setVideoResources({ url, extensions, videoTag });
  setNotSupportJS({ parentNode: videoTag });

  hostEl.appendChild(videoTag);
  hostEl.dataset.videoMounted = 'true';

  const skeleton = hostEl.querySelector('[data-video-skeleton]');
  const hideSkeleton = () => {
    skeleton?.remove();
    hostEl.classList.add('is-media-ready');
  };

  videoTag.addEventListener('loadeddata', hideSkeleton, { once: true });
  videoTag.addEventListener(
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
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting && !videoStateMap.get(target)) {
        const url = target.getAttribute('data-video-url');
        const poster = target.getAttribute('data-video-poster');
        const extensions = target
          .getAttribute('data-video-extensions')
          .split(',');

        const videoTag = createVideoTag({ poster });
        setVideoResources({ url, extensions, videoTag });
        setNotSupportJS({ parentNode: videoTag });

        videoSection.appendChild(videoTag);

        // remove video wrapper with all data attributes
        if (removeWrappers) {
          videoSection.removeChild(target);
        }

        videoStateMap.set(target, true);
      }
    });
  });

  videoWraps.forEach((videoWrap) => {
    videoStateMap.set(videoWrap, false);
    observer.observe(videoWrap);
  });
}
