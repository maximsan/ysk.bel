function createVideoTag({ poster = '' }) {
    const video = document.createElement('video');
    video.poster = poster;
    video.controls = true;
    video.muted = false;
    video.loop = false;
    video.preload = 'auto';
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

export function initVideoSection({
    sectionName,
    className,
    removeWrappers = false,
}) {
    const videoSection = document.querySelector(`.${sectionName}-${className}`);
    const videoWraps = document.querySelectorAll(
        `.${sectionName}-video-wrapper`,
    );
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
