(function (app) {
    function installSearch() {
        /** search */
        var searchInput = document.getElementById('search-api'),
            docmaMain = document.getElementById('docma-main');

        docsearch({
            apiKey: '410b8fb234ff5ab408196198a7803054',
            indexName: 'athenajs_documentation',
            inputSelector: '#search-api',
            debug: true,
            autocompleteOptions: {
                autoselect: true
            }
        });

        window.showSearch = function () {
            docmaMain.classList.remove('hide-search');
            searchInput.focus();
            return false;
        };

        searchInput.addEventListener('blur', function () {
            docmaMain.classList.add('hide-search');
        });

        searchInput.addEventListener('keyup', function (event) {
            // hide search input on escape press
            if (event.keyCode === 27) {
                searchInput.blur();
            }
        });
    }

    docma.on('render', function () {
        installSearch();
    });
})(window.app || {});