import Effect from './Effect';

/**
 * Fading effect
 * 
 * Supported on: `Drawable`, `Scene`
 * 
 * @extends Effect
 */
class Fade extends Effect {
    /**
     * Creates a Fade Effect
     * 
     * @param {Object} options
     * @param {Number} options.startValue the start value of the effect.
     * @param {Number} options.endValue the end value of the effect.
     * @param {Boolean} options.loop Set to true to make the effect loop.
     * @param {Display} display Reference to the Display in case a buffer is needed.
     */
    constructor(options, display) {
        super(Object.assign({
            startValue: 0,
            endValue: 1
        }, options), display);

        this.startOpacity = this.startValue !== undefined ? options.startValue : 0;
        this.endOpacity = this.endValue !== undefined ? options.endValue : 1;

        this.diff = this.endValue - this.startValue;
    }

    /**
     * Initializes the effect
     */
    start() {
        this.currentOpacity = 1;

        // start timer and get deferred
        return super.start();
    }

    /**
     * 
     * @param {enderingContext} ctx The `source`rendering context.
     * @param {RenderingContext} fxCtx The `destination` context.
     * @param {Drawable} obj The Drawable on which to execute the ffect.
     */
    process(ctx, fxCtx, obj) {
        super.process();

        this.currentOpacity = this.startValue + this.animProgress * this.diff;

        obj.setOpacity(this.currentOpacity);

        return this.ended;
    }
}

export default Fade;
