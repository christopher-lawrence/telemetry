const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        jquery1_3ParserBrowserTest: "./test/parsers/inBrowserTests/jquery1_3Parser.test.ts",
        jquery1_4ParserBrowserTest: "./test/parsers/inBrowserTests/jquery1_4Parser.test.ts",
        jquery1_5ParserBrowserTest: "./test/parsers/inBrowserTests/jquery1_5Parser.test.ts",
        jquery1_6ParserBrowserTest: "./test/parsers/inBrowserTests/jquery1_6Parser.test.ts",
        jquery1_7ParserBrowserTest: "./test/parsers/inBrowserTests/jquery1_7Parser.test.ts",
        jquery1_8ParserBrowserTest: "./test/parsers/inBrowserTests/jquery1_8Parser.test.ts",
        jquery1_9ParserBrowserTest: "./test/parsers/inBrowserTests/jquery1_9Parser.test.ts",
        jquery1_12ParserBrowserTest: "./test/parsers/inBrowserTests/jquery1_12Parser.test.ts",
        jquery2ParserBrowserTest: "./test/parsers/inBrowserTests/jquery2Parser.test.ts",
        jquery3ParserBrowserTest: "./test/parsers/inBrowserTests/jquery3Parser.test.ts",
        listenerServiceBrowserTest: "./test/parsers/inBrowserTests/listenerService.test.ts"
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
        port: 8081
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
