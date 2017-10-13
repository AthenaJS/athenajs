import GfxObject from './Object';

/**
 * Very basic wrapper for canvas drawing methods
 * Incomplete: missing translate, rotates, scale support
 */
export default class Canvas extends GfxObject {
    constructor(name, options) {
        super(name, options);

        this.w = options.w || 0;
        this.h = options.h || 0;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.radius = options.radius || this.w / 2;
        this.color = options.color || "red";

    }

    draw(ctx, debug) {
        this.ctx = ctx;

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
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    rect(x, y, w, h, color) {
        const ctx = this.ctx;

        ctx.fillStyle = color || this.color;
        ctx.fillRect(this.x + x, this.y + y, w, h);
    }

    circle(x, y, w, h, radius, color) {
        ctx.beginPath();
        ctx.arc(this.x + x + w / 2, this.y + y + h / 2, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color || this.color;
        ctx.fill();
    }

    ellipse() {

    }
};