import GfxObject from 'Object/Object';

export default class Circle extends GfxObject {
    constructor(options) {
        super('circle', options);

        this.w = options.w || 0;
        this.h = options.h || 0;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.radius = options.radius || this.w / 2;
        this.color = options.color || "red";
    }

    draw(ctx, debug) {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._applyMask(ctx, this.x, this.y);

        ctx.beginPath();
        ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

        this._undoMask();
    }
};