export const addVideo = () => {
    console.log('*** init video ***');

    const match = window.matchMedia('(min-width: 768px)');
    const videoSection = document.querySelector('.video-section');

    if(!match.matches) {
        videoSection.style.display = 'none';
        return;
    }

    const video = document.createElement('video');
    const source = document.createElement('source');
    const noJs = document.createElement('div');

    video.poster = 'assets/images/video-poster.jpg';
    video.controls = true;
    video.muted = false;
    video.loop = true
    video.preload = 'auto';
    source.src = 'assets/videos/main-video.mp4';
    source.type = 'video/mp4'
    noJs.innerHTML = 'Your browser does not support the video tag.'

    video.appendChild(source);
    video.appendChild(noJs);

    videoSection.appendChild(video);
}
