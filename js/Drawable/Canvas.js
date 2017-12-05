import Drawable from './Drawable';
import Deferred from '../Core/Deferred';

/**
 * Very basic wrapper for canvas drawing methods
 * Incomplete: missing translate, rotates, scale support
 * 
 * @extends Drawable
 */
export default class Canvas extends Drawable {
    /**
     * Creates a new Canvas instance
     * 
     * @param {String} name The name of the Canvas element.
     * @param {Object} options 
     * @param {Number} [options.width] The width of the Canvas element.
     * @param {Number} [options.height] The height of the Canvas element.
     * @param {Number} [options.x] The horizontal position of the element.
     * @param {Number} [options.y] The vertical position of the element.
     * @param {String} [options.color] The color of the element. Can be changed by subsequent drawing method calls.
     * 
     */
    constructor(name, options) {
        super(name, options);

        this.width = options.width || 0;
        this.height = options.height || 0;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.color = options.color || 'red';

    }

    /**
     * Canvas's draw method that's called on every frame
     * 
     * @param {RenderingContext} ctx The rendering context to use for drawing.
     */
    draw(ctx/*, debug*/) {
        this.ctx = ctx;

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        this._applyMask(ctx, this.x, this.y);

        if (!this.isFxQueueEmpty()) {
            this.executeFx(ctx);
        }

        this.render();

        this._undoMask();
    }

    /**
     * Renders the Canvas.
     * 
     * User should redefine this and put there needed drawing calls
     */
    render() {

    }

    /**
     * Fills the Canvas with specified color
     * 
     * @param {String} [color=this.color] The color to used for filling the canvas.
     */
    fill(color) {
        this.ctx.fillStyle = color || this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a rectangle
     * 
     * @param {Number} x The rect's x related to the Canvas'x position.
     * @param {Number} y The rect's y related to the Canvas'x position.
     * @param {Number} width The width of the rectangle.
     * @param {Number} height The height of the rectangle.
     * @param {String} [color=this.color] The color of the rectangle.
     */
    rect(x, y, width, height, color) {
        const ctx = this.ctx;

        ctx.fillStyle = color || this.color;
        ctx.fillRect(this.x + x, this.y + y, width, height);
    }

    /**
     * Draws a circle
     * 
     * @param {Number} x The circle's center x related to the Canvas'position.
     * @param {Number} y The circle's center y related to the Canvas'position. 
     * @param {Number} radius The circle's radius in radian.
     * @param {String} color The circle's color.
     * @param {Number} strokeWidth The circle's line width.
     * @param {String} strokeStyle The circle's strokeStyle.
     */
    circle(x, y, radius, color, strokeWidth, strokeStyle) {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.arc(this.x + x + radius, this.y + y + radius, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color || this.color;
        ctx.fill();

        if (arguments.length > 4) {
            ctx.strokeStyle = strokeStyle || this.color;
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
        }
    }

    /**
     * Draws an arc
     * 
     * @param {Number} x The arc's center x position, related to the canvas'position.
     * @param {Number} y The arc's center y position, related to the canvas'position.
     * @param {Number} radius The arc's radius, in radian.
     * @param {Number} startAngle The arc's start angle, in radian.
     * @param {Number} endAngle The arc's send angle, in radian.
     * @param {String} strokeStyle The arc's stroke style.
     * @param {Number} strokeWidth The arc's line width.
     */
    arc(x, y, radius, startAngle, endAngle, strokeStyle, strokeWidth) {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.arc(this.x + x, this.y + y, radius, startAngle, endAngle, false);
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeStyle || this.color;
        ctx.stroke();
    }

    /**
     * Since the Canvas Drawable only supports the Fade effect, we override
     * the Drawable's animate method and print a warning in case the user
     * attempts to run an unsupported animation.
     * 
     * @param {String} name The name of the animation to run.
     * @param {Object} options
     */
    animate(name, options) {
        if (name !== 'Fade') {
            console.warn('animte() not supported on Canvas objects yet. Effect not applied.');
            return Deferred.resolve(true);
        } else {
            return super.animate(name, options);
        }
    }
}

window.Canvas = Canvas;