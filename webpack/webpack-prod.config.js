const resolve = require('path').resolve
const webpack = require('webpack')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./base');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
// noinspection WebpackConfigHighlighting
module.exports = {
    entry: resolve('./client/src/index.tsx'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.less'],
        alias: {'@src': resolve(__dirname, '..', 'client', 'src')}
    },
    output: {
        path: resolve('./build/client/public'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            baseConfig.module.rules.tsLoader,
            baseConfig.module.rules.cssLoader,
            baseConfig.module.rules.fileLoader,
            baseConfig.module.rules.lessLoader,
            baseConfig.module.rules.jsonLoader,
            baseConfig.module.rules.urlLoader
        ]
    },
    optimization: {
        namedModules: false,
        noEmitOnErrors: true,
        minimize: true,
        namedChunks: false,
        runtimeChunk: true,
        concatenateModules: true,
        providedExports: true,
        occurrenceOrder: true,
        flagIncludedChunks: true,
        mergeDuplicateChunks: true,
        removeEmptyChunks: true,
        removeAvailableModules: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new ExtractTextPlugin('styles.css'),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            template: '!!html-loader!client/template.html'
        }),
        new CopyWebpackPlugin([
            baseConfig.plugins.copy.publicAssets,
        ])
    ],
    mode: 'production'
};
