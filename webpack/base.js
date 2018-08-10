module.exports = {
    module: {
        rules: {
            tsLoader: {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'ts-loader',
                    // options: {
                    //     configFile:resolve( '../client/tsconfig.json'),
                    // }
                }
            },
            fileLoader: {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: require.resolve('file-loader')
            },
            lessLoaderSourceMap: {
                test: /\.less$/,
                use: [
                    {
                        loader: require.resolve('style-loader')
                    },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: require.resolve('less-loader'),
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            lessLoader: {
                test: /\.less$/,
                use: [
                    {
                        loader: require.resolve('style-loader')
                    },
                    {
                        loader: require.resolve('css-loader')
                    },
                    {
                        loader: require.resolve('less-loader')
                    }
                ]
            },
            cssLoader: {
                test: /\.css$/,
                use: [
                    {
                        loader: require.resolve('style-loader')
                    },
                    {
                        loader: require.resolve('css-loader')
                    }
                ]
            },
            cssLoaderSourceMap: {
                test: /\.css$/,
                use: [
                    {
                        loader: require.resolve('style-loader')
                    },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            jsonLoader: {
                test: /\.json$/,
                use: require.resolve('json-loader')
            },
            urlLoader: {
                test: /\.(png|jpe?g|gif)$/,
                use: 'url-loader?limit=8192'
            },
            sourceMapForce: {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'}
        }
    },
    plugins: {
        copy: {
            publicAssets: {from: './client/public', to: '.'},
        },
    }
};
