'use strict';

module.exports = (template, modules) => {
    template.mainHTML = 'index.html';

    template.defaultOptions = {
        "title": "",
        "sidebar": true,
        "collapsed": false,
        "outline": "tree",
        "badges": true,
        "symbolMeta": false,
        "search": true,
        "navbar": true,
        "collapseSymbols": true,
        "collapseDefinition": true,
        "propertiesLast": true,
        "navItems": []
    };

    template.ignore = [
        "js/app.js",
        "less/**",
        "*.md",
        "LICENSE"
    ];
}