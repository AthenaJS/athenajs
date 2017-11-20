import Effect from './Effect';

/*jshint devel: true, bitwise: false*/
class Mosaic extends Effect {
    constructor(options, display) {
        super(Object.assign({
            startValue: 0.002,
            endValue: 1
        }, options), display);

        // TODO: use displayManager to get a buffer
        this.buffer = display.getBuffer(this.width, this.height);

        this.startWidth = null;

        // get ratio of the picture since we want to keep it during animation
        this.ratio = this.width / this.height;
        this.diff = (this.endValue * this.width) - (this.startValue * this.width);

        console.log('got ratio=', this.ratio, 'for', this.width, this.height, 'diff', this.diff);
    }

    start() {
        this.startWidth = this.startValue * this.width;
        console.log('***', this.startWidth);

        return super.start();
    }

    process(ctx, fxCtx) {
        super.process();

        var newWidth = this.startWidth + this.animProgress * this.diff,
            newHeight = newWidth / this.ratio;

        // first draw image onto canvas
        this.buffer.drawImage(ctx.canvas, 0, 0, newWidth | 0, newHeight | 0);
        // test-fix
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(this.buffer.canvas, 0, 0, newWidth | 0, newHeight | 0, 0, 0, this.width, this.height);

        return this.ended;
    }
}

export default Mosaic;