const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        })
    ],
});
