const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var fs = require('fs');
var MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");


var configFiles = [];
if (fs.existsSync('./config.common.json')) {
    configFiles.push('./config.common.json');
}
if (fs.existsSync('./config.prod.json')) {
    configFiles.push('./config.prod.json');
}

var plugins = [];
if (configFiles.length > 0) {
    plugins.push(new MergeJsonWebpackPlugin({
        'files': configFiles,
        'output': {
            'fileName': './config.json'
        }
    }));
}

module.exports = merge(common, {
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { 
                test: /\.tsx?$/, 
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.release.json'
                } 
            },
            { 
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|json)$/, 
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
      },
      plugins: plugins
});