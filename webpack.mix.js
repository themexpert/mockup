const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('build.js', 'build/')
    .sass('src/style.scss', 'build/')
    .webpackConfig({
        output: {
            publicPath: '/',
        },
        plugins: [
            new BundleAnalyzerPlugin(),
        ],
    })
    .options({
        processCssUrls: false
    })
    .sourceMaps(false);
