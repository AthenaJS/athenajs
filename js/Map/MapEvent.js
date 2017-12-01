/*jshint devel: true*/
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
 * @param {Map} map The [`Map`](#Map) to use
 */
export default class MapEvent {
    constructor(map) {
        console.log('[MapEvent] init with map');
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

    getSwitch(id) {
        return this.switches[id] || false;
    }

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
                    return this.map.handleWave(Object.assign({}, options));
                    break;

                case 'explosion':
                    // generate explosion
                    this.map.scheduleSprite(options.spriteId, options.spriteOptions, 0);

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