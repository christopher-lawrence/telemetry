const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        jquery14ParserBrowserTest: "./test/parsers/inBrowserTests/jquery14Parser.test.ts",
        jquery15ParserBrowserTest: "./test/parsers/inBrowserTests/jquery15Parser.test.ts",
        jquery16ParserBrowserTest: "./test/parsers/inBrowserTests/jquery16Parser.test.ts",
        jquery17ParserBrowserTest: "./test/parsers/inBrowserTests/jquery17Parser.test.ts"
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
