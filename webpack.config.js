var path = require('path'),
    webpack = require('webpack'),
    WebpackNotifierPlugin = require('webpack-notifier'),
    CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    entry: [
        './js/athena-module.js'
    ],
    output: {
        path: __dirname,
        filename: "dist/athenajs.js",
        pathinfo: true,
        library: 'AthenaJS',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',
    /*devtool: 'eval',*/
    module: {
        rules: [
            { test: /fpscounter/, loader: 'exports-loader?fpscounter' },
            { test: /virtualJoystick/, loader: 'exports-loader?VirtualJoystick' },
            { test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/] }
            // { test: /\.css$/, loader: "style!css" },
            // { test: /\.js$/, loader: 'happypack/loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        modules: [path.resolve('./js/'), path.resolve('./js/lib'), 'node_modules'],
        /*root: [path.resolve('./js/'), path.resolve('./js/lib')],*/
        alias: {
            Joystick: 'virtualJoystick/virtualJoystick',
            fpscounter: 'fpscounter/fpscounter.min'
        }
    },
    plugins: [
        /*new webpack.SourceMapDevToolPlugin(),*/
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp 
            exclude: /a\.js/,
            // add errors to webpack instead of warnings 
            failOnError: true
        }),
        new WebpackNotifierPlugin({
            alwaysNotify: true,
            skipFirstNotification: true,
            title: 'AthenaJS'
        })
    ]
};