/*eslint-env node*/
const webpack = require('webpack'),
    WebpackNotifierPlugin = require('webpack-notifier'),
    CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    entry: [
        './js/athena-module.js'
    ],
    output: {
        path: __dirname,
        filename: 'dist/athena.js',
        pathinfo: true,
        library: 'AthenaJS',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            { test: /fpscounter/, loader: 'exports-loader?fpscounter' },
            { test: /virtualJoystick/, loader: 'exports-loader?VirtualJoystick' },
            {
                test: /\.js$/, loader: 'babel-loader', options: {
                    presets: ['@babel/preset-env']
                }, exclude: [/node_modules/]
            }
        ]
    },
    resolve: {
        modules: ['node_modules']
    },
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp 
            exclude: /a\.js/,
            // add errors to webpack instead of warnings 
            failOnError: true
        }),
        new webpack.optimize.UglifyJsPlugin({ comments: false }),
        new WebpackNotifierPlugin({
            alwaysNotify: true,
            skipFirstNotification: true,
            title: 'AthenaJS-Gods'
        })
    ]
};