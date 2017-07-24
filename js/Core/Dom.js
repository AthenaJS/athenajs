/* Very small and simple jQuery-like object */

/**
 * Dom is a very simple jQuery-like object that allows to manipulate
 * a collection of DOM elements.
 * 
 * As in jQuery, you may manipulate Dom collections using []
 * 
 * @class
 * @constructor 
 */
function Dom(selector) {
    if (selector.match(/^#|\./)) {
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
        } else {
            this.forEach((node) => {
                node.style[prop] = val;
            })
        }
        return this;
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
     * Add a new Class to a DOM collection
     * 
     * @param {String} name new class to add
     * @returns {Dom} `this`
     * 
     * @memberof Dom#
     */
    addClass: function (name) {
        this.forEach((node) => {
            node.classList.add(name);
        });

        return this;
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