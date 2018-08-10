const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./base');
const serverConfig = require('../config/server').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

// noinspection WebpackConfigHighlighting
module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.less'],
        alias: {
            '@src': resolve(__dirname, '..', 'client', 'src')
        }
    },
    entry: [
        //activate HMR for React
        'react-hot-loader/patch',
        //bundle the client for webpack dev server
        //and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        //the entry point of our app
        resolve('./client/src/index.tsx')
    ],
    output: {
        path: resolve('./build/client/public'),
        filename: 'bundle.js',
        publicPath: '/',
        pathinfo: true
    },
    devServer: {
        hot: true,
        open: true,
        contentBase: resolve('./build/client/public/'),
        publicPath: '/',
        historyApiFallback: true,
        proxy: [{
            context: ['/auth', '/logout', '/api'],
            target: 'http://localhost:' + serverConfig.port
        }]
    },
    module: {
        rules: [
            baseConfig.module.rules.tsLoader,
            baseConfig.module.rules.fileLoader,
            baseConfig.module.rules.cssLoaderSourceMap,
            baseConfig.module.rules.lessLoaderSourceMap,
            baseConfig.module.rules.jsonLoader,
            baseConfig.module.rules.urlLoader,
            baseConfig.module.rules.sourceMapForce
        ],
    },
    watch: true,
    cache: true,
    watchOptions: {
        aggregateTimeout: 300,
    },
    optimization: {
        namedModules: true,
        noEmitOnErrors: true,
        concatenateModules: false,
        removeAvailableModules: true,
        runtimeChunk: true,
        providedExports: true,
        mergeDuplicateChunks: true,
        removeEmptyChunks: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: '!!html-loader!client/template.html'
        }),
        new CopyWebpackPlugin([
            baseConfig.plugins.copy.publicAssets,
        ])
    ],
    mode: 'development'
};
