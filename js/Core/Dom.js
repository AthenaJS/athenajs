/* Very small and simple jQuery-like object, because whatever you do, you'll end up needed jQuery */

/**
 * Dom is a very simple jQuery-like object that allows to manipulate
 * a collection of DOM elements.
 *
 * As in jQuery, you may manipulate individual Dom elements using [] operator
 *
 * @class
 * @constructor
 */
function Dom(selector = null) {
    /* little hack to allow calling Dom without the new keyword */
    if (!(this instanceof Dom)) {
        return new Dom(...arguments);
    }

    /* simply create an empty object */
    if (selector === null) {
        return;
    } else if (selector instanceof HTMLElement) {
        this.push(selector);
    } else if (selector.match(/^#|\./)) {
        this.push(...document.querySelectorAll(selector));
    } else {
        this.push(document.createElement(selector));
    }
}

Dom.prototype = new Array();

Object.assign(Dom.prototype, {
    /**
     * jQuery-like CSS method to easily set multiple styles on a dom collection
     *
     * @param {String|Object} prop or list of properties with their new value
     * @param {String} val value of the property
     * @returns {Dom} `this`
     *
     * @memberof Dom#
     */
    css: function (prop, val) {
        if (typeof prop === 'object') {
            this.forEach((node) => {
                const style = node.style;

                for (const name in prop) {
                    style[name] = prop[name];
                }
            });
        } else if (typeof val === 'undefined') {
            if (this.length) {
                return this[0].style[prop];
            } else {
                return null;
            }
        } else {
            this.forEach((node) => {
                node.style[prop] = val;
            });
        }

        return this;
    },

    /**
     * Returns a new collection with elements matching the selector found inside current collection
     *
     * @param {String} selector the selector to match
     * @returns {Dom} a new Dom collection with found elements
     */
    find: function (selector) {
        let newDom = new Dom();

        this.forEach((el) => {
            const elements = el.querySelectorAll(selector);
            for (let i = 0; i < elements.length; ++i) {
                newDom.push(elements[i]);
            }
        });

        return newDom;
    },

    /**
     * Append current collection to the element with a specific selector
     *
     * @param {String|HTMLElement} selector Target element where to append selected elements.
     * It can either be a CSS selector or a DOM HTMLElement.
     * @returns {Dom} `this`
     *
     * @memberof Dom#
     */
    appendTo: function (selector) {
        const target = typeof selector === 'object' && selector || document.querySelector(selector);

        if (target) {
            this.forEach((node) => {
                target.appendChild(node);
            });
        }

        return this;
    },

    /**
     * Change multiple attributes at once
     *
     * @param {String|Object} att attribute name to modify or list of attributes+values to change
     * @param {String} val value of the attribute to set
     * @returns {Dom} `this`
     *
     * @memberof Dom#
     */
    attr: function (att, val) {
        if (typeof att === 'object') {
            this.forEach((node) => {
                for (const name in att) {
                    node.setAttribute(name, att[name]);
                }
            });
        } else {
            this.forEach((node) => {
                node.setAttribute(att, val);
            });
        }

        return this;
    },

    /**
     * Add one or more CSS classes to a DOM collection
     *
     * @param {String} name space-separated list of classes to add
     * @returns {Dom} `this`
     *
     * @memberof Dom#
     */
    addClass: function (name) {
        const classes = name.split(' ');

        this.forEach((node) => {
            node.classList.add(...classes);
        });

        return this;
    },

    /**
     * Remove one or more CSS classes to a DOM collection
     *
     * @param {String} name space-separated list of classes to remove
     * @param {Dom} `this`
     *
     * @memberof Dom#
     */
    removeClass: function (name) {
        const classes = name.split(" ");

        this.forEach((node) => {
            node.classList.remove(...classes);
        });
    },

    /**
     * Changes innerHTML of a collection
     *
     * @param {String} html to set as innerHTML
     * @returns {Dom} `this`
     *
     * @memberof Dom#
     */
    html: function (html) {
        this.forEach((node) => node.innerHTML = html);

        return this;
    },

    /**
     * Shows specified set of elements
     * @returns {Dom} `this`
     *
     * @memberof Dom#
     */
    show: function () {
        this.forEach(node => {
            node.style.display = 'block';
        });
    },

    /**
     * Hides specified set of elements
     * @returns {Dom} `this`
     *
     * @memberof Dom#
     */
    hide: function () {
        this.forEach(node => {
            node.style.display = 'none';
        });
    }
});

export default Dom;