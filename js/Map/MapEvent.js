import RM from '../Resource/ResourceManager';
import Wave from '../Drawable/Wave';

/**
 * MapEvent handles events that are triggered on the map.
 * Such events can be: checkpoint was reached, new wave needs to
 * be generated, etc...
 *
 * For that, the MapEvent class stores a list of items, events, switches
 * that are on the map.
 *
 * This is a default MapEvent class: games should extend MapEvent
 * to handle whatever events they need.
 *
 */
class MapEvent {
    /**
     * Creates a new MapEvent
     *
     * @param {Map} map
     */
    constructor(map) {
        console.log('[MapEvent] constructor()');
        this.map = map || null;
        this.reset();
    }

    /**
     * Resets the MapEvent switches, events and items
     */
    reset() {
        this.switches = {};
        this.events = [];
        this.items = {};
    }

    /**
     * Adds a new [`Drawable`]{#item} onto the map
     *
     * @param {string} id of the item to add
     * @param {Drawable} item to add
     */
    addItem(id, item) {
        this.items[id] = item;
    }

    /**
     * Returns an item
     *
     * @param {string} id of the item to retrieve
     *
     * @returns {Drawable|undefined} The item or undefined if it wasn't handled by the map
     */
    getItem(id) {
        return this.items[id];
    }

    // TODO: ability to trigger an event once a switch has been modified
    setSwitch(id, bool) {
        this.switches[id] = bool;
    }

    toggleSwitch(id) {
        this.setSwitch(id, typeof this.switches[id] !== 'undefined' ? !this.switches[id] : true);
    }

    /**
     * Retrieves a switch from the map using its id
     *
     * @param {String} id The switch to retrieve.
     *
     * @returns {any} returns the switch or false if it could not be found
     */
    getSwitch(id) {
        return this.switches[id] || false;
    }

    /**
     * checks of conditions of specified trigger are valid
     *
     * @param {Object} trigger The trigger to check.
     *
     * @returns {Boolean} true if the trigger is valid
     */
    checkConditions(trigger) {
        var conditions = trigger.conditions,
            cond = null,
            i,
            success = true,
            max;

        if (!conditions) {
            return true;
        } else {
            // test that all conditions are valid
            for (i = 0, max = conditions.length; i < max; i++) {
                cond = conditions[i];
                switch (cond.type) {
                    case 'time':
                        // compare time
                        break;

                    case 'switch':
                        // get switch & status and compare
                        // console.log('getting switch', cond.id, '=>', cond.status);
                        success = this.getSwitch(cond.id) === cond.status;
                        break;
                }

                if (!success) {
                    break;
                }
            }
            return success;
        }
    }

    handleAction(options) {
        var sprite;

        // handle action
        switch (options.type) {
            case 'toggleSwitch':
                sprite = options.sprite;
                // toggle Sprite image
                sprite.toggleSwitch();
                // and set internal state for this sprite id
                this.toggleSwitch(sprite.id);
                break;

            default:
                // super.handleAction(options);
                console.log('[MapEvent] non-handled action type', options.type);
                break;
        }
    }

    handleEvent(options) {
        var type = options.type,
            item = null;

        if (this.checkConditions(options)) {
            switch (type) {
                case 'cp':
                    this.map.setStartXYFromMaster();
                    break;

                case 'message':
                    this.map.notify('game:message', {
                        message: options.message
                    });
                    break;

                case 'wave':
                    return this.handleWave(Object.assign({}, options));

                case 'explosion':
                    // generate explosion
                    this.scheduleSprite(options.spriteId, options.spriteOptions, 0);

                    item = this.getItem(options.targetId);

                    item.destroy();
                    break;

                default:
                    // return super.handleEvent(options);
                    console.log('non-handled Event', options.type);
                    break;
            }
        } else {
            // we need to recheck a non triggered event
            return true;
        }
    }

    /**
     * Schedule adding a new object to the map
     *
     * @param {String} spriteId The id of the new sprite to add.
     * @param {Object} spriteOptions The options that will be passed to the object constructor.
     * @param {number} [delay=0] The delay in milliseconds to wait before adding the object.
     * @returns {Drawable} the new drawable
     *
     */
    scheduleSprite(spriteId, spriteOptions, delay) {
        let drawable = RM.newResourceFromPool(spriteId, spriteOptions);

        // No need to call setTimeout if delay is zero
        if (delay) {
            // FIXME: if the game is paused before the setTimeout is called
            // sprite will be added right after in unpaused, potentially before the delay
            setTimeout(() => {
                this.map.addObject(drawable);
            }, delay);
        } else {
            this.map.addObject(drawable);
        }

        return drawable;
    }


    /**
     * Add a new wave of objects to the map
	 * Used for example when the player triggers apparition of several enemies or bonuses
     *
     * @param {Object} options The options to pass to the wav object
     * @returns {Boolean}
     *
	 * @related {Wave}
     */
    handleWave(options) {
        // console.log('wave');
        var waveSize = options.size,
            wave = new Wave(options),
            i = 0,
            delay = 0;

        options.spriteOptions.wave = wave;

        for (i = 0; i < waveSize; i++) {
            this.scheduleSprite(options.spriteId, options.spriteOptions, delay);
            delay += options.delay || 0;
        }

        return false;
    }

    endWave() {

    }

    triggerEvent(id) {
        this.events.push(id);
    }

    isEventTriggered(id) {
        return this.events.indexOf(id) > -1;
    }

    // handleEvent(options) {
    //     console.warn('[MapEvent] Unhandled event', options.type);
    //     return false;
    // }

    // handleAction(options) {

    // }
}

export default MapEvent;