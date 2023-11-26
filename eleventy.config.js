const sass = require("sass");
const path = require("node:path");
const { createHash } = require('node:crypto');
const esbuild = require('esbuild');

/* For the given `content` string, generate an MD5 hash of `length` chars. */
function getHash(content, length = 8) {
    return createHash('md5')
        .update(content)
        .digest('hex')
        .substr(0, length);
}

module.exports = function (config) {
    // Copy the contents of the `public` folder to the output folder
    // For example, `./public/css/` ends up in `_site/css/`
    config.addPassthroughCopy({
        "src/assets/public": "/",
        // "./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
    });
    config.addPassthroughCopy("src/assets/images")
    config.addPassthroughCopy("src/assets/icons")

    // css
    /* Watch for changes in .scss files. */
    config.addTemplateFormats('scss');

    /* Define how to process .scss files. */
    config.addExtension('scss', {
        outputFileExtension: 'css',
        /* We're feeding the `inputPath` to sass directly, so we don't need Eleventy to read the content of `.scss` files. */
        read: false,
        /* Produce the data for each `.scss` file, including its processed CSS content and its MD5 content hash. */
        getData: async function (inputPath) {
            /* Don't process .scss files that start with an underscore as standalone. */
            if (path.basename(inputPath).startsWith('_')) {
                return false;
            }
            const { css, loadedUrls, sourceMap } = sass.compile(inputPath);
            return {
                /* Exclude .scss files from `collections.all` so they don't show up in sitemaps, RSS feeds, etc. */
                eleventyExcludeFromCollections: true,
                _content: css,
                _hash: getHash(css)
            };
        },
        compileOptions: {
            /* Disable caching of `.scss` files, for good measure. */
            cache: false,
            permalink: function (permalink, inputPath) {
                /* Don't output .scss files that start with an underscore, as per Sass conventions… */
                if (path.basename(inputPath).startsWith('_')) {
                    return false;
                }
                /* …and for other .scss files include the MD5 content hash produced in the `.getData()` method in the output file path. */
                return data => `${data.page.filePathStem}.${data._hash}.css`;
            }
        },
        /* Read the processed CSS content from the data object produced with `.getData()`. */
        compile: () => data => {
            return data._content
        }
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

            return async () => {
                let output = await esbuild.build({
                    target: 'es2020',
                    entryPoints: [path],
                    minify: true,
                    bundle: true,
                    write: false,
                });

                return output.outputFiles[0].text;
            }
        }
    });

    return {
        templateFormats: [
            "md",
            "html",
            "ejs",
            "njk"
        ],
        dir: {
            input: "src",
            output: 'dist',
        }
    }
}
