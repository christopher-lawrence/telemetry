const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        telemetry: "./src/telemetry.ts"
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js",
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    // Enable source maps
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080
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
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
