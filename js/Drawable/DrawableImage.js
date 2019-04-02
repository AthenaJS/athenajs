import Drawable from './Drawable';
import Display from '../Display/Display';

/**
 * Allows to draw any drawable
 * Incomplete: missing translate, rotates, scale support
 *
 * @extends Drawable
 */
class DrawableImage extends Drawable {
    /**
     * Creates a new Paint instance
     *
     * @param {String} name The name of the Paint element.
     * @param {Object} options
     * @param {Number} [options.width=0] The width of the Paint element.
     * @param {Number} [options.height=0] The height of the Paint element.
     * @param {Number} [options.x=0] The horizontal position of the element.
     * @param {Number} [options.y=0] The vertical position of the element.
     *
     */
    constructor(name, options = {}) {
        super(name, options);

        this.width = options.width || 0;
        this.height = options.height || 0;
        this.x = options.x || 0;
        this.y = options.y || 0;

        this.ctx = Display.getBuffer(this.width, this.height);
        this.tmpCtx = Display.getBuffer(this.width, this.height);
        this.tmpCanvas = this.tmpCtx.canvas;
        this.canvas = this.ctx.canvas;
    }

    /**
     * 
     * Clears part of the image
     * 
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [width=this.width]
     * @param {number} [height=this.height]
     * 
     * **/
    clearRect(x = 0, y = 0, width = undefined, height = undefined) {
        const w = typeof width === 'undefined' && this.width || width;
        const h = typeof height === 'undefined' && this.height || height;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(x, y, w, h);
    }

    moveRect(x, y, width, height, destX, destY) {
        // clear tmp ctx
        this.tmpCtx.setTransform(1, 0, 0, 1, 0, 0);
        this.tmpCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // save part to move to tmp
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.tmpCtx.drawImage(this.canvas, x, y, width, height, 0, 0, width, height);
        // improvment: we may attempt to merge both areas and make a single call to clearRect
        // clear
        this.clearRect(x, y, width, height);
        this.clearRect(destX, destY, width, height);
        // copy from tmp to new destination
        this.ctx.drawImage(this.tmpCanvas, x, y, width, height, destX, destY, width, height);
    }

    putDrawable(drawable, x = 0, y = 0) {
        // clear map prop so that it's not drawn using mapOffset
        // and save the drawable original's position
        const map = drawable.map;

        const oldX = drawable.x;
        const oldY = drawable.y;

        drawable.map = null;
        drawable.x = x;
        drawable.y = y;

        drawable._draw(this.ctx, { advanceFrame: false });

        // restore map and drawable position
        drawable.map = map;
        drawable.x = oldX;
        drawable.y = oldY;
    }

    /**
     * Paint's draw method that's called on every frame:
     * that's where the magic happens, it simply calls user-defined
     * render method and translate calls into native canvas calls
     *
     * @param {RenderingContext} ctx The rendering context to use for drawing.
     * 
     * @private
     */
    draw(destCtx) {
        if (!this.visible) {
            return;
        }

        let w = this.width,
            scaledW = this.width * this.scale,
            h = this.height,
            scaledH = h * this.scale,
            subScaledW = Math.floor(scaledW / 2),
            subScaledH = Math.floor(scaledH / 2),
            sheetX = 0,
            sheetY = 0,
            drawX = this.x,
            drawY = this.y,
            mapOffsetX = this.currentMap && this.currentMap.viewportX || 0,
            mapOffsetY = this.currentMap && this.currentMap.viewportY || 0;

        // if width or height equals to 0 we may skip drawing
        // this fixes IndexSizeError in Firefox
        if (!w || !h) {
            return;
        }

        this.executeFx(destCtx);

        if (this.mask && !this.mask.exclude) {
            this._applyMask(destCtx, Math.floor(drawX + mapOffsetX), Math.floor(drawY + mapOffsetY));
        }

        destCtx.setTransform(this.scale, 0, 0, this.scale, drawX + mapOffsetX + subScaledW, drawY + mapOffsetY + subScaledH);
        destCtx.rotate(this.angle);

        destCtx.drawImage(this.canvas, Math.floor(sheetX), Math.floor(sheetY), Math.floor(w), Math.floor(h), Math.floor(-subScaledW), Math.floor(-subScaledH), Math.floor(scaledW), Math.floor(scaledH));
        // destCtx.restore();

        // in exclude mode, we need to write the mask after having rendered the object
        if (this.mask && this.mask.exclude) {
            destCtx.setTransform(1, 0, 0, 1, 0, 0);
            this._applyMask(destCtx, Math.floor(drawX + mapOffsetX), Math.floor(drawY + mapOffsetY));
        }

        // undo clipping as it's specitic to the object
        this._undoMask(destCtx);
    }
}

export default DrawableImage;