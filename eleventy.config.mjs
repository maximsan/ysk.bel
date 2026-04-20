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

/* For the given `content` string, generate an MD5 hash of `length` chars. */
function getHash(content, length = 8) {
  return createHash('md5').update(content).digest('hex').substr(0, length);
}

export default function (config) {
  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `_site/css/`
  config.addPassthroughCopy({
    'src/assets/public': '/',
    'src/styles/bootstrap.css': '/assets/bootstrap.css',
    'src/styles/main.css': '/assets/main.css',
    'src/assets/videos': '/assets/videos',
    // How to solve it without copying the file?
    'node_modules/photoswipe/dist/photoswipe.css': '/assets/photoswipe.css',
  });
  config.addPassthroughCopy('src/assets/images');
  config.addPassthroughCopy('src/assets/icons');

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
      const { css } = sass.compile(inputPath);
      return {
        /* Exclude .scss files from `collections.all` so they don't show up in sitemaps, RSS feeds, etc. */
        eleventyExcludeFromCollections: true,
        _content: css,
        _hash: getHash(css),
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
        return (data) => `${data.page.filePathStem}.${data._hash}.css`;
      },
    },
    /* Read the processed CSS content from the data object produced with `.getData()`. */
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

  config.addWatchTarget('./src/assets/');
  config.addWatchTarget('./src/data/');
  config.addWatchTarget('./src/includes/');
  config.addWatchTarget('./src/layouts/');
  config.addWatchTarget('./src/pages/');
  config.addWatchTarget('./src/styles/');

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
