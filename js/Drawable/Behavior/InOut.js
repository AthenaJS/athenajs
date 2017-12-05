import Behavior from './Behavior';

/*jshint devel: true, bitwise: false*/
/**
 * InOut behavior class: a very simple behavior used for the Gods game
 * 
 * This behavior makes the object move verticaly from a minY to a maxY
 */
class InOut extends Behavior {
    /**
     * Creates a new InOut behavior
     * 
     * @param {Drawable} sprite The drawable to attach the behavior to.
     * @param {Object} options The InOut's options.
     * @param {Number} [options.minY] Object's minimum Y position
     * @param {Number} [options.maxY] Object's maximum Y position
     */
    constructor(sprite, options) {
        super(sprite, options);

        this.startY = sprite.y;
        this.startX = sprite.x;

        this.maxX = options.minX || 0;

        this.maxY = options.minY || 0;
    }

    /**
     * Called when the game wants to update the Drawable's position
     * 
     */
    onUpdate(/*t*/) {
        let sprite = this.sprite,
            diffY = Math.abs(sprite.y - this.startY),
            diffX = Math.abs(sprite.x - this.startX);

        if (diffY > this.maxY) {
            sprite.vy = -sprite.vy;
            if (this.onVYChange) {
                this.onVYChange();
            }
        }

        if (diffX > this.maxX) {
            sprite.vx = -sprite.vx;
            if (this.onVXChange) {
                this.onVXChange();
            }
        }

        sprite.x += sprite.vx;
        sprite.y += sprite.vy;
    }
}

export default InOut;
