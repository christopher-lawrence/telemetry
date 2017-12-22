const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        jquery13ParserBrowserTest: "./test/parsers/inBrowserTests/jquery13Parser.test.ts",
        jquery14ParserBrowserTest: "./test/parsers/inBrowserTests/jquery14Parser.test.ts",
        jquery15ParserBrowserTest: "./test/parsers/inBrowserTests/jquery15Parser.test.ts",
        jquery16ParserBrowserTest: "./test/parsers/inBrowserTests/jquery16Parser.test.ts",
        jquery17ParserBrowserTest: "./test/parsers/inBrowserTests/jquery17Parser.test.ts",
        jquery18ParserBrowserTest: "./test/parsers/inBrowserTests/jquery18Parser.test.ts"
    },
    output: {
        path: path.join(__dirname, 'test', 'dist'),
        filename: "[name].js",
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    // Enable source maps
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'test', 'dist'),
        port: 8080
    },
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
