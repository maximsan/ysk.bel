# Main technologies used in project

### SSG - [Eleventy](https://www.11ty.dev/)

### [esbuild](https://esbuild.github.io/) for bundling

### babel-plugin-syntax-dynamic-import

```
Allow parsing of import()
```

## Optimizations:

#### convert videos with ffmpeg:

```bash
ffmpeg -i src/assets/videos/main-video-compressed.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis src/assets/videos/main-video-compressed.webm
```

#### convert images with cwebp:

```bash
cwebp -q 90 image.png -o image.webp
```
