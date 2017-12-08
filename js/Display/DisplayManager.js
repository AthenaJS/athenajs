import Display from './Display';

/**
 * The DisplayManager handles displays
 *
 * @related {Display}
 */
class DisplayManager {
    /**
     * Creates a new DisplayManager
     *
     */
    constructor(/*options*/) {
        // console.log('[DisplayManager] Init()'/*, options*/);
        this.displays = {};
    }

    /**
     * Adds a new display to the display manager
     *
     * @param {Object} options
     * @param {String} [options.name] The name of the display.
     * @param {(HtmlElement|String)} target The DOM element where to create the new display.
     * @returns {Display}
     */
    addDisplay(options, target) {
        console.log('[Display Manager] adding display', options.name/*, 'with options', options*/);

        this.displays[options.name] = new Display(options, target);

        return this.displays[options.name];
    }

    /**
     *
     * @param {String} name The name of the new display.
     */
    getDisplay(name) {
        return this.displays[name];
    }
}

export default new DisplayManager();
