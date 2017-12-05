import Effect from './Effect';

/**
 * Rotating effect
 * 
 * Supported on: `Drawables`
 * 
 * @extends Effect
 */
class Rotate extends Effect {
    /**
     * Creates the Rotate class
     * 
     * @param {Object} options
    ** @param {Number} options.startValue the start value of the effect.
     * @param {Number} options.endValue the end value of the effect.
     * @param {Boolean} options.loop Set to true to make the effect loop.
     * @param {Display} display Reference to the Display in case a buffer is needed.
     */
    constructor(options, display) {
        super(Object.assign({
            startValue: 0,
            endValue: 2 * Math.PI,
            loop: true
        }, options), display);

        this.startAngle = this.startAngle !== undefined ? options.startValue : 0;
        this.endAngle = this.endAngle !== undefined ? options.endValue : 1;

        this.diff = this.endValue - this.startValue;
    }

    /**
     * Initializes the rotate effect
     */
    start() {
        this.currentAngle = this.startAngle;

        // start timer and get deferred
        return super.start();
    }

    /**
     * Stops the effect from running, setting the angle to specified endValue
     * 
     * @param {Drawable} object The object on which changing the angle.
     * @param {Number} endValue The angle value that will be set when the effect is stopped.
     */
    stop(object, endValue) {
        super.stop();

        object.setAngle(endValue);
    }

    /**
     * Calculates the new angle
     * 
     * @param {RenderingContext} ctx The rendering context (not used in this effect).
     * @param {RenderingContext} fxCtx Tje effect rendering context (not used).
     * @param {Drawable} obj Drawable on which to apply the rotation.
     * 
     * @returns {Boolean} returns true if the animation has ended.
     */
    process(ctx, fxCtx, obj) {
        super.process();

        this.currentAngle = this.startValue + this.animProgress * this.diff;

        obj.setAngle(this.currentAngle);

        return this.ended;
    }
}

export default Rotate;
