// ESM version of Eleventy config
import * as sass from 'sass';
import path from 'node:path';
import { createHash } from 'node:crypto';
import esbuild from 'esbuild';

import banner from './src/data/banner.js';
import history from './src/data/estate-history.js';
import footer from './src/data/footer.js';
import meta from './src/data/meta.js';
import packages from './src/data/packages.js';
import contacts from './src/data/contacts.js';
import sidebar from './src/data/sidebar.js';
import services from './src/data/services.js';

function getHash(content, length = 8) {
    return createHash('md5').update(content).digest('hex').substr(0, length);
}

export default function (config) {
    config.addPassthroughCopy({
        'src/assets/public': '/',
        'src/styles/bootstrap.css': '/assets/bootstrap.css',
        'src/styles/main.css': '/assets/main.css',
        'src/assets/videos': '/assets/videos',
        'node_modules/photoswipe/dist/photoswipe.css': '/assets/photoswipe.css',
    });
    config.addPassthroughCopy('src/assets/images');
    config.addPassthroughCopy('src/assets/icons');

    // css
    config.addTemplateFormats('scss');
    config.addExtension('scss', {
        outputFileExtension: 'css',
        read: false,
        getData: async function (inputPath) {
            if (path.basename(inputPath).startsWith('_')) {
                return false;
            }
            const { css, loadedUrls, sourceMap } = sass.compile(inputPath);
            return {
                eleventyExcludeFromCollections: true,
                _content: css,
                _hash: getHash(css),
            };
        },
        compileOptions: {
            cache: false,
            permalink: function (permalink, inputPath) {
                if (path.basename(inputPath).startsWith('_')) {
                    return false;
                }
                return (data) => `${data.page.filePathStem}.${data._hash}.css`;
            },
        },
        compile: () => (data) => {
            return data._content;
        },
    });

    const outputMap = {};
    config.addTransform('outputMap', function (content) {
        const filepath = path.relative('src', this.page.inputPath);
        outputMap[filepath] = this.page.url;
        return content;
    });

    config.addFilter('hashed', function (filepath) {
        if (!outputMap[filepath]) {
            throw new Error(`hashed: ${filepath} not found in map.`);
        }
        return outputMap[filepath];
    });

    // JavaScript
    config.addTemplateFormats('js');
    config.addExtension('js', {
        outputFileExtension: 'js',
        compile: async (content, path) => {
            if (path !== './src/scripts/index.js') {
                return;
            }
            console.log('js path', path);
            console.log('js content', content);
            return async () => {
                let output = await esbuild.build({
                    target: 'es2020',
                    entryPoints: [path],
                    minify: true,
                    bundle: true,
                    write: false,
                    sourcemap: true,
                });
                return output.outputFiles[0].text;
            };
        },
    });

    config.setLiquidOptions({
        extname: '.liquid',
        strict_filters: true,
        globals: {
            banner,
            history,
            footer,
            meta,
            packages,
            contacts,
            sidebar,
            services,
        },
    });

    // config.setServerOptions({
    //     watch: ['data/**/*']
    // });

    // config.addWatchTarget('./src/data/');
    config.addWatchTarget('./src/includes/');

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data',
        },
        templateFormats: ['html', 'md', 'njk', 'liquid'],
        htmlTemplateEngine: 'liquid',
        markdownTemplateEngine: 'liquid',
    };
}
