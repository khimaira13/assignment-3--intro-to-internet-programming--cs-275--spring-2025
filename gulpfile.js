const { src, dest, series, watch } = require(`gulp`),
    //dev tasks
    browserSync = require(`browser-sync`),
    reload = browserSync.reload,
    CSSValidator = require(`gulp-stylelint`),
    JSValidator = require(`gulp-eslint`),
    JSTranspiler = require(`gulp-babel`),
    //prod tasks
    htmlCompressor = require(`gulp-htmlmin`),
    CSSCompressor = require(`gulp-clean-css`),
    JSCompressor = require(`gulp-uglify`);

let browserChoice = `default`;

let validateCSS = () => {
    return src(`styles/*.css`)
        .pipe(CSSValidator({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let validateJS = () => {
    return src(`scripts/*.js`)
        .pipe(JSValidator())
        .pipe(JSValidator.formatEach(`compact`));
};

let transpileJS = () => {
    return src(`scripts/*.js`)
        .pipe(JSTranspiler())
        .pipe(dest(`temp/scripts`));
};

let compressHTML = ()=> {
    return src(`index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));

};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `./`
            ]
        }
    });

    watch(`scripts/*.js`, validateJS)
        .on(`change`, () => reload());
    watch(`styles/*.css`, validateCSS)
        .on(`change`, () => reload());
};

let compressCSS = () => {
    return src(`styles/*.css`)
        .pipe(CSSCompressor())
        .pipe(dest(`prod/styles`));
};

let compressJS = () => {
    return src(`scripts/*.js`)
        .pipe(JSTranspiler())
        .pipe(JSCompressor())
        .pipe(dest(`prod/scripts`));
};

exports.validateCSS = validateCSS;
exports.validateJS = validateJS;
exports.transpileJS = transpileJS;

exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.compressJS = compressJS;

exports.default = series(
    validateCSS,
    validateJS,
    transpileJS,
    serve
);
exports.build = series(
    compressHTML,
    compressCSS,
    compressJS
);
