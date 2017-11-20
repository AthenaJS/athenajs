import Behavior from './Behavior';
import Tile from '../../Map/Tile';

/*jshint devel: true, bitwise: false*/
// by default
/**
 * GroundMove is a simple behavior that causes an object to move along the horizontal
 * axis until a wall or an hole is reached.
 *
 * @param {Sprite} sprite The sprite to attach the behavior to.
 * @param {Object} options General behavior & GroundMove specific options
 * @param {String} [options.direction="right"] The initial direction of the move, default = `right`.
 *
 * @see {Behavior}
 */
class GroundMove extends Behavior {
    constructor(sprite, options) {
        super(sprite, options);

        this.direction = options.direction || 'right';

        if (this.direction.match('left')) {
            this.sprite.vx = -this.sprite.vx;
        }

        if (this.direction.match('top')) {
            this.sprite.vy = -this.sprite.vy;
        }
    }

    /**
     * Simple onMove handler that checks for a wall or hole
     *
     */
    onUpdate(t) {
        let sprite = this.sprite,
            map = sprite.currentMap,
            nextX = sprite.x + sprite.vx,
            nextY = sprite.y + sprite.vy,
            hitBox = sprite.getHitBox(),
            startX = sprite.vx > 0 ? hitBox.x2 : hitBox.x;

        if (map.hitObjectTest(nextX + startX, nextY + hitBox.y, nextX + startX, nextY + hitBox.y, Tile.TYPE.WALL)) {
            sprite.vx = -sprite.vx;
            if (this.onVXChange) {
                this.onVXChange(sprite.vx);
            }
        } else if (map.hitObjectTest(nextX + hitBox.x, nextY + hitBox.y2 + 2, nextX + hitBox.x2, nextY + hitBox.y2 + 2, Tile.TYPE.AIR)) {
            sprite.vx = -sprite.vx;
            if (this.onVXChange) {
                this.onVXChange(sprite.vx);
            }
        } else if (map.hitObjectTest(nextX + hitBox.x, nextY + hitBox.y2 + 2, nextX + hitBox.x2, nextY + hitBox.y2 + 2, Tile.TYPE.LADDER)) {
            sprite.vx = -sprite.vx;
            if (this.onVXChange) {
                this.onVXChange(sprite.vx);
            }
        }

        sprite.x += sprite.vx;
        sprite.y += sprite.vy;
    }
}

export default GroundMove;

