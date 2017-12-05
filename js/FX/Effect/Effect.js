import Deferred from '../../Core/Deferred';

/**
 * The Effect class allows to apply transformations to Scene & Drawable instances.
 * 
 * An effect can modifiy a properties and/or alter the rendering of a scene.
 * 
 * Effects can use a custom easing function to allow elastic like animations.
 */
class Effect {
    /**
     * This the class constructor. Default options are:
     * 
     * @param {Object} options
     * @param {Number} options.startValue The start value of the effect.
     * @param {Number} options.endValue The end value of the effect.
     * @param {Number} options.duration The duration of the effect (ms).*
     * @param {Boolean} options.loop Set to true to make the effect loop.
     * @param {Display} display Reference to the Display in case a buffer is needed.
     */
    constructor(options, display) {
        this.easing = null;
        this.context = options.context || this;

        // TODO: we may need width/height for sprites as well
        // => pass the currentWidth/Height to fake display size
        if (typeof display !== 'undefined') {
            this.width = display.width;
            this.height = display.height;
        }

        this.startValue = typeof options.startValue !== 'undefined' ? options.startValue : 0;
        this.endValue = typeof options.endValue !== 'undefined' ? options.endValue : 1;
        this.loop = typeof options.loop === 'undefined' ? 0 : options.loop;
        this.loops = 0;

        this.duration = options.duration || 400;
    }

    /**
     * Changes the easing function used for the ffect
     * 
     * @param {Function} easing The new easing function.
     */
    setEasing(easing) {
        this.easing = easing;
    }

    /**
     * Called when the ffect is started.
     * 
     * This method can be overriden but the super should always be called
     */
    start() {
        // if we are looping the object already got our promise
        if (!this.loops) {
            this.def = new Deferred();
        }

        this.startTime = new Date().getTime();

        this.ended = false;
        this.stopped = false;

        return this.def.promise;
    }

    /**
     * called when the effect is stopped
     */
    stop(object, setEndValue) {
        this.stopped = true;
    }

    /**
     * Calculates current animation process
     * 
     * This method can be overridden but the super should always be calle dfirst
     */
    process(ctx, fxCtx, obj) {
        let currentTime = new Date().getTime(),
            ellapsedTime = currentTime - this.startTime,
            t = ellapsedTime / this.duration;

        if (this.stopped || ellapsedTime >= this.duration) {
            this.loops++;
            if (this.stopped || this.loops >= this.loop) {
                // set progress to 1 to avoid weird side effects (eg. opacity set to a negative number since anim progress may be > 1)
                this.animProgress = 1;

                this.ended = true;
                // since this is called inside the render loop, we must be sure call has ended before resolving
                // FIXES: #BUG: playing the same scene calls twice the renderLoop
                // I'm not sure setTimeout is still needed here
                // setTimeout(() => { this.def.resolve(true); }, 0);
                this.def.resolve(true);
            } else {
                this.start();
            }
        } else {
            this.animProgress = this.easing(t, ellapsedTime, 0, 1, this.duration);
        }

        return this.ended;
    }
}

export default Effect;
