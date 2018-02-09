const path = require('path');
const webpack = require('webpack');

const config = require('./config.json');

module.exports = {
    entry: {
        telemetry: "./src/telemetry.ts"
    },
    output: {
        path: __dirname + '/dist/telemetry',
        filename: "[name].js",
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    resolve: {
        extensions: ['*', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [
                    path.resolve(__dirname, 'test')
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                '__WEB_SERVER__': JSON.stringify(config.webserver),
            }
        }),
    ]
};
