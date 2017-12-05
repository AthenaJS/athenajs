import Behavior from './Behavior';

function sign(x) {
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

/**
 * A Path is a special behavior that uses a pre-defined (recorded) path to move
 * an object.
 *
 * @see {Behavior}
 * @extends Behavior
 */
class Path extends Behavior {
    /**
     * Creates a new Path behavior
     * 
     * @param {Drawable} sprite The sprite to attach the behavior to.
     * @param {Object} options The options of the behavior.
     * @param {Array} options.nodes The nodes of the path: a simple array with nodes[0] = vx, nodes[1] = vy, nodes[2] = vx, nodes[3] = vy,...
     * @param {Boolean} options.reverse Set to true so that when the end of the path is reached, movement goes backwards.
     */
    constructor(sprite, options) {
        super(sprite, options);

        this.startY = sprite.y;
        this.startX = sprite.x;

        this.currentNode = 0;

        this.offset = 2;

        this.nodes = options.nodes;

        this.reverse = options.reverse || false;

        this.dirX = 0;
        this.dirY = 0;

        this.numNodes = this.nodes.length / 2;
    }

    /**
     * Move handler: gets the next vx/vy from `this.nodes`
     * and makes sure to call onVXChange/onVYChange at each sign change
     * 
     */
    onUpdate(/*t*/) {
        let sprite = this.sprite,
            pos = this.currentNode,
            offsetX = this.nodes[pos],
            offsetY = this.nodes[pos + 1];

        if (this.offset > 0) {
            sprite.x += offsetX;
            sprite.y += offsetY;
        } else {
            sprite.x -= offsetX;
            sprite.y -= offsetY;
        }

        if (offsetX) {
            if (this.dirX && (sign(this.dirX) !== sign(offsetX))) {
                this.onVXChange && this.onVXChange();
            }
            this.dirX = offsetX;
        }

        if (offsetY) {
            if (this.dirY && (sign(this.dirY) !== sign(offsetY))) {
                this.onVYChange && this.onVYChange();
            }
            this.dirY = offsetY;
        }

        this.currentNode += this.offset;

        if (this.currentNode >= this.nodes.length || this.currentNode < 0) {
            if (!this.reverse) {
                sprite.movable = false;
                return;
            } else {
                if (this.onVXChange) {
                    this.dirX = 0;
                    this.onVXChange();
                }

                if (this.onVYChange) {
                    this.dirY = 0;
                    this.onVYChange();
                }
                this.currentNode = this.currentNode < 0 ? 0 : (this.nodes.length - 2);
                this.offset = -this.offset;
            }
        }
    }
}

export default Path;
