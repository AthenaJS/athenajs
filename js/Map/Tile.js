/**
 * Class that describes a tile
 */
class Tile {
    /**
     * Creates a new Tile
     *
     * @param {Object} options
     * @param {Number} [options.offsetX=0] The horizontal offset of the tile in the tilesheet.
     * @param {Number} [options.offsetY=0] The vertical offset of the tile in the tilesheet.
     * @param {Number} [options.width=16] The tile width in pixels.
     * @param {Number} [options.height=16] The tile height in pixels.
     */
    constructor(options) {
        this.offsetX = options.offsetX || 0;
        this.offsetY = options.offsetY || 0;
        this.width = options.width || 16;
        this.height = options.height || 16;

        // TODO: this is not used yet but could allow to change inertia based on the tile on which the
        // player is moving
        this.inertia = options.inertia || 1;            // this is the inertia factor
        this.upCollide = options.upCollide || true;     // will object collide when dropping over this tile ?
        this.downCollide = options.downCollide || true;
    }

    /**
     * Static tile behaviors
     */
    static get TYPE() {
        return {
            AIR: 1,
            WALL: 2,
            LADDER: 3
        };
    }
}

export default Tile;
