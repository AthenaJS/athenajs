import Behavior from './Behavior';

/*jshint devel: true, bitwise: false*/
// by default
class InOut extends Behavior {
    constructor(sprite, options) {
        super(sprite, options);

        this.startY = sprite.y;
        this.startX = sprite.x;

        this.maxX = options.minX || 0;

        this.maxY = options.minY || 0;
    }

    onUpdate(t) {
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
};

export default InOut;
