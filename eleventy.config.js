
module.exports = function (eleventyConfig) {
    // Copy the contents of the `public` folder to the output folder
    // For example, `./public/css/` ends up in `_site/css/`
    eleventyConfig.addPassthroughCopy({
        "./public/": "/",
        "./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
    });

    // let ejs = require("ejs");
    // eleventyConfig.setLibrary("ejs", ejs);

    return {
        templateFormats: [
            "md",
            "html",
            "ejs"
        ],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: "ejs",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "ejs",

        // These are all optional:
        dir: {
            input: "src",          // default: "."
            output: 'dist',
            // includes: 'includes',
            layouts: 'layouts',
            // data: 'data'
        }
    }
}
