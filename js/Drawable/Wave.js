import RM from '../Resource/ResourceManager';

/**
 * This class allows to handle wave of Drawables
 *
 * In AthenaJS, waves of enemies can be triggered by certain action onto the map.
 *
 * Once every enemies of a wave have been destroyed, an action can be triggered,
 * for eg. to drop rewards onto the map.
 */
export default class Wave {
    /**
     * Creates a new Wave
     *
     * @param {Object} options
     * @param {Number} options.size The size of the Wave.
     * @param {String} options.type The type of wave, ie. what will happen after the wave have been destroyed.
     * @param {Object} options.afterDestroyData The data needed for the `type` trigger.
     */
    constructor(options) {
        this.counter = options.size;
        this.type = options.afterDestroy;
        this.data = options.afterDestroyData;
        // this.delay = options.afterDestroyDelay || 0;
    }

    /**
     * Removes an element from the wave.
     *
     * This method gets called once the drawable's `destroy` method is called
     *
     * @param {Drawable} element The element that was removed.
     */
    remove(element) {
        this.counter--;

        if (!this.counter) {
            this.destroy(element);
        }
    }

    /**
     * Generates the sprite's drawable options, because some parameters, like position
     * may depend on the wave element's positions
     *
     * @param {Drawable} element The element to use as a base
     *
     * @returns {Object} The options to pass to the drawable constructor
     */
    getSpriteOptions(element) {
        const options = Object.assign({}, this.data.spriteOptions);

        if (typeof options.x === 'string') {
            options.x = element.x + Number(options.x);
        }

        if (typeof options.y === 'string') {
            options.y = element.y + Number(options.y);
        }

        return options;
    }

    /**
     * Called when the last element of a wave have been destroyed.
     *
     * This destroys the wave itself, triggering an option event
     *
     * @param {Drawable} element The last Drawable that was destroyed and triggered the wave destroy.
     */
    destroy(element) {
        switch (this.type) {
            case 'reward':
                if (this.data) {
                    const spriteOptions = this.getSpriteOptions(element, this.data),
                        reward = new (RM.getResourceById(this.data.spriteId))(spriteOptions);

                    element.currentMap.addObject(reward);
                }
                break;

            default:
                throw ('reward not implemented', this.type);
        }
    }
};
