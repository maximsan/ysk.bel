export function addVideo({ src, className, itemClassName, poster }) {
    console.log('*** init video ***');

    const videoSection = document.querySelector(`.${className}`);

    const video = document.createElement('video');
    video.className = itemClassName;
    const source = document.createElement('source');
    const noJs = document.createElement('div');

    video.poster = poster;
    video.controls = true;
    video.muted = false;
    video.loop = true;
    video.preload = 'auto';
    source.src = src;
    source.type = 'video/mp4';
    noJs.innerHTML = 'Your browser does not support the video tag.';

    video.appendChild(source);
    video.appendChild(noJs);

    videoSection.appendChild(video);
}
