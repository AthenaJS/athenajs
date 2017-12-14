/**
 * Base class for behaviors.
 *
 * A behavior is a class that describes how a graphical object moves during the time.
 *
 * Every behavior should implement these two methods:
 *
 * - `onUpdate()`
 * 
 * - `getMapEvent()`
 *
 */
class Behavior {
    /**
     * Base class constructor
     * 
     * @param {Drawable} sprite The sprite to attach the behavior to.
     * @param {Object} options An hash with behavior-specific properties.
     * @param {Number} [options.gravity=0] The object's gravity.
     * @param {Number} [options.vx=0] The object's horizontal velocity.
     * @param {Number} [options.vy=0] The object's vertical velocity.
     * @param {Function} [options.onVXChange=undefined] An optional callback to call when changing vx direction.
     * @param {Function} [options.onVYChange=undefined] An optional callback to call when changing vy direction.
     */
    constructor(sprite, options) {
        this.sprite = sprite;
        sprite.gravity = typeof options.gravity !== 'undefined' ? options.gravity : 0;
        sprite.vx = typeof options.vx !== 'undefined' ? options.vx : 0;
        sprite.vy = typeof options.vy !== 'undefined' ? options.vy : 0;
        this.checkWalls = options.checkWalls || false;
        this.checkFall = options.checkFall || false;

        this.onVXChange = options.onVXChange || null;
        this.onVYChange = options.onVYChange || null;
    }

    /**
     * Called at each update tick
     * 
     * @param {Number} t The current timestamp
     */
    onUpdate(/*t*/) {
        // does nothing
    }

    /**
     * Returns current mapEvent
     * 
     * @returns {MapEvent} the object's current map event
     */
    getMapEvent() {
        return this.sprite.currentMap.mapEvent;
    }
}

export default Behavior;