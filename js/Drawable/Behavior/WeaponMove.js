import Behavior from './Behavior';
import Tile from '../../Map/Tile';

/*jshint devel: true, bitwise: false*/
/**
 * Simple behavior that moves horizontally until a wall is reached.
 *
 * @param {Drawable} sprite The sprite to attach the behavior to.
 * @param {Object} options The options of the behavior
 * @param {String} [options.direction="left"] The initial direction of the move, default is `right`.
 *
 */
class WeaponMove extends Behavior {
    constructor(sprite, options) {
        super(sprite, options);

        this.direction = options.direction || 'right';

        if (this.direction.match('left')) {
            sprite.vx = -sprite.vx;
        }

        if (this.direction.match('top')) {
            sprite.vy = -sprite.vy;
        }
    }

    /**
     * The onMove event handler, simply moves updates the object's x using vx and calls VXChange
     * when it reaches a wall
     */
    onUpdate(/*t*/) {
        let sprite = this.sprite,
            map = sprite.currentMap,
            nextX = sprite.x + sprite.vx,
            nextY = sprite.y + sprite.vy,
            hitBox = sprite.getHitBox(),
            startX = sprite.vx > 0 ? hitBox.x2 : hitBox.x;

        if (map.hitObjectTest(nextX + startX, nextY + hitBox.y, nextX + startX, nextY + hitBox.y2, Tile.TYPE.WALL)) {
            sprite.vx = -sprite.vx;
            if (this.onVXChange) {
                this.onVXChange(sprite.vx);
            }
        }

        sprite.x += sprite.vx;
        sprite.y += sprite.vy;
    }
}

export default WeaponMove;
