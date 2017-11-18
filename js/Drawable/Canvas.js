import Drawable from './Drawable';
import Deferred from '../Core/Deferred';

/**
 * Very basic wrapper for canvas drawing methods
 * Incomplete: missing translate, rotates, scale support
 */
export default class Canvas extends Drawable {
    constructor(name, options) {
        super(name, options);

        this.width = options.width || 0;
        this.height = options.height || 0;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.radius = options.radius || this.width / 2;
        this.color = options.color || "red";

    }

    draw(ctx, debug) {
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
     * User should redefine this
     */
    render() {

    }

    fill(color) {
        this.ctx.fillStyle = color || this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    rect(x, y, width, height, color) {
        const ctx = this.ctx;

        ctx.fillStyle = color || this.color;
        ctx.fillRect(this.x + x, this.y + y, width, height);
    }

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

    arc(x, y, radius, startAngle, endAngle, strokeStyle, strokeWidth) {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.arc(this.x + x, this.y + y, radius, startAngle, endAngle, false);
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeStyle || this.color;
        ctx.stroke();
    }

    animate(name, options) {
        if (name !== 'Fade') {
            console.warn('animte() not supported on Canvas objects yet. Effect not applied.');
            return Deferred.resolve();
        } else {
            return super.animate(name, options);
        }
    }
};

window.Canvas = Canvas;