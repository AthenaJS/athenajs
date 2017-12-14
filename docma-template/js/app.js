/* global docma, dust, hljs, $ */
/* eslint camelcase:0 */

(function () {
    'use strict';

    // ---------------------------
    // HELPER METHODS
    // ---------------------------

    var MDNLinks = {
        GlobalObjects:{
            items: [
                'Object',
                'Number',
                'String',
                'Array',
                'Function',
                'Boolean'],
            baseUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/'
        },
        WebAPIS: {
            items: [
                'HTMLElement',
                'Canvas',
                'RenderingContext',
                'ArrayBufferView',
                'ArrayBuffer'
            ],
            baseUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/'
        }
    };

    function _getTypeMDNLink(str) {
        var types = str.split(/[|<]/),
            html = str.replace('<', '&lt;').replace('>', '&gt;');

        types.forEach((type) => {
            var objectType = type.replace(/[()<>]/g, '');

            Object.keys(MDNLinks).forEach(function(api) {
                var items = MDNLinks[api].items,
                    index = items.indexOf(objectType);

                if (index > -1) {
                    html = html.replace(objectType, '<a href="' + MDNLinks[api].baseUrl + objectType + '">' + objectType + '</a>');
                }
            });
        });

        return html;
    }

    function _getSymbolBadge(symbol) {
        if (!symbol) return '';

        function html(cls, title, str) {
            return '<div class="item-badge" title="' + title + '">'
                + '<div class="badge-label">' + str + '</div>'
                + '<div class="badge-shape ' + cls + '"></div>'
                + '</div>';
        }

        if (docma.utils.isClass(symbol)) return html('diamond bg-green', 'Class', 'C');
        if (docma.utils.isNamespace(symbol)) return html('diamond bg-red', 'Namespace', 'N');
        if (docma.utils.isModule(symbol)) return html('diamond bg-pink', 'Module', 'M');
        if (docma.utils.isEnum(symbol)) return html('square bg-purple', 'Enum', 'E');
        if (docma.utils.isGlobal(symbol)) {
            if (docma.utils.isMethod(symbol)) return html('diamond bg-accent', 'Global Function', 'G');
            return html('diamond bg-red', 'Global Object', 'G');
        }
        if (docma.utils.isInner(symbol)) {
            if (docma.utils.isMethod(symbol)) return html('circle bg-gray-dark', 'Inner Method', 'M');
            return html('circle bg-gray-dark', 'Inner', 'I');
        }
        if (docma.utils.isStaticProperty(symbol)) return html('square bg-orange', 'Static Property', 'P');
        if (docma.utils.isInstanceProperty(symbol)) return html('circle bg-yellow', 'Instance Property', 'P');
        if (docma.utils.isStaticMethod(symbol)) return html('square bg-accent', 'Static Method', 'M');
        if (docma.utils.isInstanceMethod(symbol)) return html('circle bg-cyan', 'Instance Method', 'M');
        return '';
    }

    function _getSymbolType(symbol) {
        if (docma.utils.isClass(symbol) || docma.utils.isGlobal(symbol)) {
            return 'root';
        } else {
            return 'child';
        }
    }

    function _colorOperators(str) {
        return str.replace(/[.#~:]/g, '<span class="color-blue">$&</span>');
    }

    function _indentGetMenuItem(id, badge, symbolName, keywords, type) {
        var ops = /[.#~:]/,
            levels = symbolName.split(ops),
            last = levels[levels.length - 1],
            refSymbol = _getRefSymbol(symbolName),
            marginLeft = (levels.length - 1) * 20;
        last = symbolName.slice(-(last.length + 1)); // with operator
        return '<a href="#' + id + '" class="sidebar-item ' + type + '" data-ref-symbol="' + refSymbol + '" data-keywords="' + keywords + '">'
            + '<span class="inline-block" style="margin-left:' + marginLeft + 'px">'
            + badge + '<span class="item-label">' + _colorOperators(last) + '</span>'
            + '</span>'
            + '</a>';
    }

    function _getRefSymbol(symbolName) {
        var docs = docma.documentation,
            symbol = docma.utils.getSymbolByName(docs, symbolName);
        if (docma.utils.isStatic(symbol) || docma.utils.isProperty(symbol)) {
            return symbolName.split('.')[0];
        } else {
            return symbolName.split('#')[0];
        }
    }

    // ---------------------------
    // CUSTOM DUST FILTERS
    // ---------------------------

    docma
        .addFilter('$color_ops', function (name) {
            return _colorOperators(name);
        })
        .addFilter('$dot_prop', function (name) {
            var re = /(.*)([.#~:]\w+)/g,
                match = re.exec(name);
            // if (!match) {
                return '<b>' + name + '</b>';
            // }
            return '<span class="color-gray">' + _colorOperators(match[1]) + '</span>' + _colorOperators(match[2]);
        })
        .addFilter('$author', function (symbol) {
            var authors = Array.isArray(symbol) ? symbol : (symbol.author || []);
            return authors.join(', ');
        })
        .addFilter('$type', function (symbol) {
            if (docma.utils.isConstructor(symbol)) return '';
            if (symbol.kind === 'function') {
                var returnTypes = docma.utils.getReturnTypes(symbol);
                return returnTypes ? returnTypes : '';
            }
            var types = docma.utils.getTypes(symbol);
            
            return types ? types : '';
        })
        .addFilter('$type_sep', function (symbol) {
            if (docma.utils.isConstructor(symbol)) return '';
            if (symbol.kind === 'function') return '⇒';
            if (symbol.kind === 'class') return ':';
            if (!symbol.type && !symbol.returns) return '';
            return ':';
        })
        .addFilter('$param_desc', function (param) {
            var str = !param.optional
                ? '<span class="boxed bg-red">Required</span>&nbsp;'
                : '';
            if (param.description) {
                str += param.description;
            }

            return docma.utils.parse(str);
        })
        .addFilter('$longname', function (symbol) {
            if (typeof symbol === 'string') return symbol;
            var nw = docma.utils.isConstructor(symbol) ? 'new ' : '';
            return nw + symbol.$longname; // docma.utils.getFullName(symbol);
        })
        .addFilter('$longname_params', function (symbol) {
            var isCon = docma.utils.isConstructor(symbol),
                longName = _colorOperators(symbol.name); // docma.utils.getFullName(symbol);
            if (symbol.kind === 'function' || isCon) {
                var defVal,
                    defValHtml = '',
                    nw = isCon ? 'new ' : '',
                    name = nw + longName + ' <span class="params">(';
                if (Array.isArray(symbol.params)) {
                    var params = symbol.params.reduce(function (memo, param) {
                        // ignore params such as options.<property>
                        if (param.name.indexOf('.') === -1) {
                            defVal = param.hasOwnProperty('defaultvalue') ? String(param.defaultvalue) : 'undefined';
                            defValHtml = param.optional
                                ? '<span class="def-val">=' + defVal + '</span>'
                                : '';
                            memo.push(param.name + defValHtml);
                        }
                        return memo;
                    }, []).join(', ');
                    name += params;
                }
                return name + ')</span>';
            }
            return longName;
        })
        .addFilter('$extends', function (symbol) {
            var ext = Array.isArray(symbol) ? symbol : symbol.augments;
            return docma.utils.listType(ext);
        })
        .addFilter('$returns', function (symbol) {
            var returns = Array.isArray(symbol) ? symbol : symbol.returns;
            return docma.utils.listTypeDesc(returns);
        })
        .addFilter('$exceptions', function (symbol) {
            var exceptions = Array.isArray(symbol) ? symbol : symbol.exceptions;
            return docma.utils.listTypeDesc(exceptions);
        })
        // non-standard JSDoc directives are stored in `.tags` property of a
        // symbol. We also add other properties such as .access (if not public),
        // `.readonly` or `.kind=namespace` as tags.
        .addFilter('$tags', function (symbol) {
            var open = '<span class="boxed vertical-middle bg-ice opacity-full">',
                open2 = '<span class="boxed vertical-middle bg-ice-mid opacity-full">',
                open3 = '<span class="boxed vertical-middle">',
                open4 = '<span class="boxed vertical-middle bg-ice-dark opacity-full">',
                open5 = '<span class="boxed vertical-middle bg-blue opacity-full">',
                open6 = '<span class="boxed vertical-middle bg-warning color-brown opacity-full">',
                close = '</span>',
                tagBoxes = [];

            if (docma.utils.isDeprecated(symbol)) {
                tagBoxes.push(open6 + 'deprecated' + close);
            }
            if (docma.utils.isGlobal(symbol) && !docma.utils.isConstructor(symbol)) {
                tagBoxes.push(open + 'global' + close);
            }
            if (docma.utils.isStatic(symbol)) {
                tagBoxes.push(open5 + 'static' + close);
            }
            if (docma.utils.isPublic(symbol) === false) {
                tagBoxes.push(open4 + symbol.access + close);
            }
            if (docma.utils.isNamespace(symbol)) {
                tagBoxes.push(open + 'namespace' + close);
            }
            if (docma.utils.isReadOnly(symbol)) {
                tagBoxes.push(open3 + 'readonly' + close);
            }

            var tags = Array.isArray(symbol) ? symbol : symbol.tags || [],
                tagTitles = tags.filter((tag) => { return !tag || tag.originalTitle.match(/obsolete/); } )
                .map(function (tag) {
                    return open2 + tag.originalTitle + close;
                });
            tagBoxes = tagBoxes.concat(tagTitles);
            if (tagBoxes.length) return '&nbsp;&nbsp;' + tagBoxes.join('&nbsp;');
            return '';
        })
        .addFilter('$menuitem', function (symbolName) {
            var docs = docma.documentation,
                symbol = docma.utils.getSymbolByName(docs, symbolName);
            if (!symbol) return symbolName;
            var id = dust.filters.$id(symbol),
                keywords = docma.utils.getKeywords(symbol),
                symbolType = _getSymbolType(symbol),
                refSymbol = _getRefSymbol(symbolName),
                badge = docma.template.options.badges
                    ? _getSymbolBadge(symbol)
                    : '• ';

            if (docma.template.options.outline === 'tree') {
                return _indentGetMenuItem(id, badge, symbolName, keywords, symbolType);
            }
            // docma.template.options.outline === 'flat'
            var name = '<span class="item-label">' + dust.filters.$dot_prop(symbolName) + '</span>';
            return '<a href="#' + id + '" data-ref-symbol="' + refSymbol + '" class="sidebar-item ' + symbolType + '" data-keywords="' + keywords + '">' + badge + name + '</a>';

        })
        .addFilter('$get_type', function(symbol) {
            switch(true) {
                case docma.utils.isConstructor(symbol):
                    return 'constructor';

                case docma.utils.isClass(symbol):
                case docma.utils.isGlobal(symbol):
                    return 'class';

                default:
                    return 'unknown';
            }
        })
        .addFilter('$get_last_part', function(symbol) {
            var split = '';
            if (docma.utils.isStatic(symbol)) {
                split = symbol.split('.');
            } else {
                split = symbol.split('#');
            }

            return split.length && split[split.length -1] || symbol;
        })
        .addFilter('$ref', function(symbol) {
            if (docma.utils.isMethod(symbol)) {
                return symbol.$longname.split('#')[0];
            } else {
                return symbol.$longname.split('.')[0];
            }
        })
        .addFilter('$clean_ref', function(symbol) {
            return symbol.$longname.replace(/\./g, '-');
        })
        .addFilter('$get_mdn_link', function(types) {
            if (docma.template.options.typeDefinitionLink) {
                return _getTypeMDNLink(types);
            } else {
                return types;
            }
        });
        // .addFilter('$my_desc', function(symbol) {
        //     debugger;
        //     return docma.utils.parse(symbol.classdesc || symbol.description || '');
        // });

    // ---------------------------
    // INITIALIZATION
    // ---------------------------

    // http://highlightjs.readthedocs.org/en/latest/api.html#configure-options
    hljs.configure({
        tabReplace: '    ',
        useBR: false
    });

    var menuItems, btnClean, txtSearch;

    function filterMenuItems() {
        var search = txtSearch.val().trim().toLowerCase();
        if (search === '') {
            menuItems.show();
            btnClean.hide();
            return;
        }
        btnClean.show();
        var keywords;
        menuItems.each(function () {
            keywords = $(this).attr('data-keywords');
            if (keywords.indexOf(search) < 0) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    }

    // for sidebar items
    var minFontSize = 10,
        maxFontSize = 14;
    function setFontSize($el) {
        var f = maxFontSize;
        while ($el.width() > 215 && f >= minFontSize) {
            f--;
            $el.css('font-size', f + 'px');
        }
    }

    if (!docma.template.options.title) {
        docma.template.options.title = docma.app.title || 'Documentation';
    }

    function sortProperties(members) {
        // get list of properties
        var methods = members.filter((member) => member.kind !== 'member'),
            properties = members.filter((member) => member.kind === 'member');

        return methods.concat(properties);
    }

    // docma.on('route', function() {
    //     de
    //     if (docma.documenation && docma.template.options.propertiesLast) {
    //         for (var i = 0; i < docma.documentation.length; ++i) {
    //             docma.documentation[i].$members = sortProperties(docma.documentation[i].$members);
    //         }
    //     }
    // });

    docma.on('render', function (currentRoute) {
        $('[data-toggle="tooltip"]').tooltip({
            container: 'body',
            placement: 'bottom'
        });

        if (!docma.template.options.navbar) {
            // remove the gap created for navbar
            $('body, html').css('padding', 0);
            // remove sidbar top spacing
            $('#sidebar-wrapper').css('margin-top', 0);
            // since navbar is disabled, also remove the spacing set for
            // preventing navbar overlap with bookmark'ed symbol title.
            $('.symbol-container').css({
                'padding-top': 0,
                'margin-top': 0
            });
        }

        if (docma.currentRoute && docma.currentRoute.type === 'api') {
            if (docma.template.options.search) {
                menuItems = $('ul.sidebar-nav .sidebar-item');
                btnClean = $('.sidebar-search-clean');
                txtSearch = $('#txt-search');

                btnClean.hide();
                txtSearch.on('keyup', filterMenuItems);
                txtSearch.on('change', filterMenuItems);

                btnClean.on('click', function () {
                    txtSearch.val('').focus();
                    menuItems.show();
                    btnClean.hide();
                });
            } else {
                $('.sidebar-nav').css('top', '65px');
            }

            // Adjust font-size of each sidebar item's label so that they are
            // not cropped.
            $('.sidebar-nav .item-label').each(function () {
                setFontSize($(this));
            });
        }

        if (docma.template.options.collapseSymbols) {
            $('.sidebar-nav').addClass('collapse-def');
            // click on a class to expand/collapse
            $('.sidebar-nav-container').on('click', '.sidebar-item', function(event) {
                var selector = '';
                if ($(this).hasClass('root')) {
                    var ref = $(this).data('refSymbol'),
                    selector = '[data-ref-symbol=' + ref + ']';
                    $(this).toggleClass('toggled');
                    $(this).parents('ul').find(selector).not('.root').toggleClass('visible');
                } else {
                    // hashes = hashes.splice(1);
                    // click on a method:need to expand the selected method
                    selector = '.row a[data-ref-symbol=' + this.hash.substr(1).replace(/\./g, '-') + ']';
                    $(selector).trigger('click', true);
                    // console.log('not class');
                    // console.log("$('.row a[href=#" + hashes.join('#') + "]').trigger('click', true);");
                    // $('.row a[href=#' + hashes.join('#') + ']').trigger('click', true);
                    // $('.row a[href=#' + hashes.splice(1).join('#') + ']').trigger('click', true);
                }
            });
        }

        if (docma.template.options.collapseDefinition) {
            $('#page-content-wrapper').addClass('collapse-def');
            $('#page-content-wrapper.collapse-def').on('click', '.symbol-heading', function (event, showOnly) {
                if (showOnly) {
                    $(event.currentTarget).next().show();
                } else {
                    $(event.currentTarget).next().toggle();
                }
            });

            if (document.location.hash) {
                var ref = document.location.hash.substr(1).replace(/\./g, '-');
                // trigger will expand the selected element
                $('.row .symbol > a[data-ref-symbol=' + ref + ']').trigger('click', true);
                // we need to trigger hash change to position the scrolling on this element
                // because triggring a click won't position the scroll on the triggered anchor
                var oldLocation = document.location.hash;
                document.location.hash = '';
                document.location.hash = oldLocation;
            } else {
                document.body.scrollIntoView(true);
            }
        }

        var pageContentRow = $('#page-content-wrapper').find('.row').first();
        if (docma.template.options.sidebar) {
            if (docma.template.options.collapsed) {
                $('#wrapper').addClass('toggled');
            }
            $('.sidebar-toggle').click(function (event) {
                event.preventDefault();
                $('#wrapper').toggleClass('toggled');
                // add some extra spacing if navbar is disabled; to prevent top
                // left toggle button to overlap with content.
                if (!docma.template.options.navbar) {
                    var marginLeft = $('#wrapper').hasClass('toggled')
                        ? '+=30px' : '-=30px';
                    // pageContentRow.css('margin-left', marginLeft);
                    pageContentRow.animate({
                        'margin-left': marginLeft
                    }, 300);
                }
            });
        } else {
            // collapse the sidebar since it's disabled
            $('#wrapper').addClass('toggled');
        }

        var brandMargin = 50,
            brandHPadding = 15;
        // For the JSDoc API documentation, our template partials already have
        // styles. So we'll style only some type of elements in other HTML
        // content.
        if (!docma.currentRoute || docma.currentRoute.type !== 'api') {
            // We'll add the template's modified bootstrap table classes
            $('table').addClass('table table-striped table-bordered');

            // code blocks in markdown files (e.g. ```js) are converted into
            // <code class="lang-js">. we'll add classes for hljs for proper
            // highlighting. e.g. for javascript, hljs requires class="js". So
            // this will be class="lang-js js".

            // this seems unnecessary. somehow, hljs detects it.
            // $("code[class^='lang-']").each(function () {
            //     var cls = $(this).attr('class'),
            //         m = cls.match(/lang\-([^ ]+)/)[1];
            //     if (m) $(this).addClass(m);
            // });

            // also adjust navbar-brand margin
            brandMargin = 0;
            brandHPadding = 0;
        }
        $('.navbar-brand').css({
            'margin-left': brandMargin + 'px',
            'padding-left': brandHPadding + 'px',
            'padding-right': brandHPadding + 'px'
        });

        // Syntax-Highlight code examples
        var examples = $('#docma-main pre > code');
        examples.each(function (i, block) {
            hljs.highlightBlock(block);
        });

    });

})();
