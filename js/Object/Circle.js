import GfxObject from 'Object/Object';

export default class Circle extends GfxObject{
    constructor(options) {
        super('circle', options);

        this.w = options.w || 0;
        this.h = options.h || 0;
        this.x = options.x || this.w / 2;
        this.y = options.y || this.h / 2;
        this.radius = options.radius || this.w / 2;
        this.color = options.color || "red";
    }

    draw(ctx, debug) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};