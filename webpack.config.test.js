const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        jquery15ParserSpec: "./test/parsers/jquery15Parser.spec.ts",
        jquery16ParserSpec: "./test/parsers/jquery16Parser.spec.ts"
    },
    output: {
        path: __dirname + '/test/dist',
        filename: "[name].js",
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    // Enable source maps
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['*', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
