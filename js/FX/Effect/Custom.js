import Effect from './Effect';

/**
 * Custom effect that can be used to do any transformation
 * 
 * Supported on: `Drawable`, `Scene`
 * 
 * @extends Effect
 */
class Custom extends Effect {
    /**
     * Creates a new Custom effect
     * @param {Object} options Effect options.
     * @param {Function} options.callback The callback that will get called at each update tick: this is were the transformation will happen.
     * @param {Number} options.startValue the start value of the effect.
     * @param {Number} options.endValue the end value of the effect.
     * @param {Boolean} options.loop Set to true to make the effect loop.
     * @param {Display} display Reference to the Display in case a buffer is needed.
     */
    constructor(options, display) {
        super(options, display);

        this.callback = options.callback;

        this.diff = this.endValue - this.startValue;
    }

    /**
     * Process the custom effect: this method simply calls the user's callback
     * 
     * @param {CanvasRenderingContext} ctx The `source`rendering context.
     * @param {CanvasRenderingContext} fxCtx The `destination` context.
     * 
     * @returns {Boolean} true when the animation has ended.
     */
    process(ctx, fxCtx/*, obj*/) {
        super.process();

        this.callback(this.startValue + this.animProgress * this.diff, ctx, fxCtx);

        return this.ended;
    }
}

export default Custom;
