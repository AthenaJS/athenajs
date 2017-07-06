import Behavior from 'Object/Behavior/Behavior';
import Tile from 'Map/Tile';

    /*jshint devel: true, bitwise: false*/
    /**
     * Simple behavior that makes an object bounce on the ground
     * 
     * @param {Sprite} sprite The sprite to attach the behavior to.
     * @param {InputManager} Input A reference to the InputManager.
     * @param {Object} options The options of the behavior.
     * @param {Number} [options.elasticity=0.80] The elasticity: the closer it is to 1, the higher the bounce.
     * @param {Function} [options.onEnd=undefined] An optional callback to execute when the object stops bouncing.
     * @param {Function} [options.onGround=undefined] An optional callback to execute each time the object touches the ground.
     * 
     * @example
     * 
     *  sprite.setBehavior('simplefall', {
     *    gravity: 0.3,
     *    onEnd: () => {
     *        this.moving = false;
     *    },
     *    onGround: function() {
     *      AM.play('bounce');
     *    }
     * });
     */
    class SimpleFall extends Behavior{
        constructor(sprite, Input, options) {
            super(sprite, Input, options);

            this.elasticity = typeof options.elasticity !== 'undefined' ? options.elasticity : 0.80;

            this.onEnd = options.onEnd || null;
            this.onGround = options.onGround || null;

            console.log('move initiated', sprite.vx, sprite.vy, this.startVy, sprite.gravity);
        }
        
        /**
         * The move handler that gets executed at each move loop.
         * 
         * Simply calculates the next vertical position using current velocity.
         * Each time the object reaches the ground, it bounces a little less, using the elasticity property,
         * until it reaches the ground and stops bouncing.
         * 
         */
        onMove(t) {
            let sprite = this.sprite,
                map = sprite.currentMap,
                nextX = sprite.x + sprite.vx,
                nextY = sprite.y + sprite.vy,
                hitBox = sprite.getHitBox(),
                hitTest = null;

            // reached ground ? revert vy
            hitTest = map.hitObjectTest(nextX + hitBox.x, nextY + hitBox.y2, nextX + hitBox.x2, nextY + hitBox.y2, Tile.TYPE.WALL);
            if (hitTest) {
              if (this.onGround) {
                this.onGround();
              }
                this.resetY();
                if (Math.abs(sprite.vy) <= sprite.gravity) {
                    sprite.moving = false;
                    if (this.onEnd) {
                        this.onEnd();
                    }
                }
            } else {
                sprite.vy += sprite.gravity;

                sprite.y += sprite.vy;
            }
        }
        
        /**
         * Called when the object reaches the ground: simply inverts velocity
         * 
         * @private
         */
        resetY() {
            this.sprite.vy = -this.sprite.vy * this.elasticity;
        }
    };

    export default SimpleFall;
