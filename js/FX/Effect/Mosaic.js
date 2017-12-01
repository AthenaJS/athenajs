import Effect from './Effect';

/**
 * A Mosaic effect that will apply SNES-[like effects](https://github.com/warpdesign/jquery-mosaic)
 * 
 * Supported on: `Drawable`, `Scene`
 * 
 * @extends Effect
 */
class Mosaic extends Effect {
    /**
     * Creates a new Mosaic effect
     * @param {Number} options.startValue The start value of the effect.
     * @param {Number} options.endValue The end value of the effect.
     * @param {Number} options.duration The duration of the effect (ms).
     * @param {Boolean} options.loop Set to true to make the effect loop.
     * @param {Display} display Reference to the Display in case a buffer is needed.
     */
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

    /**
     * Initializes mosaic effect variables
     */
    start() {
        this.startWidth = this.startValue * this.width;

        return super.start();
    }


    /**
     * simulates the mosaic effect by using Canvas'drawImage API
     * 
     * @param {CanvasRenderingConbtext} ctx The source drawing context, which happens to be the destination context as well.
     */
    process(ctx/*, fxCtx*/) {
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