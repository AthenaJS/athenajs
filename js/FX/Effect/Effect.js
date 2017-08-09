import Deferred from 'Core/Deferred';

/*jshint devel: true, bitwise: false*/
class Effect {
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
        this.loop = !!options.loop || false;

        this.duration = options.duration || 400;
    }

    setEasing(easing) {
        this.easing = easing;
    }

    start() {
        this.def = new Deferred();

        this.startTime = new Date().getTime();

        this.ended = false;
        this.stopped = false;

        return this.def.promise;
    }

    stop(setEndValue) {
        this.stopped = true;
    }

    process(ctx, fxCtx, obj) {
        let currentTime = new Date().getTime(),
            ellapsedTime = currentTime - this.startTime,
            t = ellapsedTime / this.duration;

        if (this.stopped || ellapsedTime >= this.duration) {
            if (this.stopped || this.loop === false) {
                // set progress to 1 to avoid weird side effects (eg. opacity set to a negative number since anim progress may be > 1)
                this.animProgress = 1;

                this.ended = true;
                // since this is called inside the render loop, we must be sure call has ended before resolving
                // FIXES: #BUG: playing the same scene calls twice the renderLoop
                // I'm not sure setTimeout is still needed here
                // setTimeout(() => { this.def.resolve(true); }, 0);
                this.def.resolve(true);
            } else {
                // console.log('looping effect');
                this.start();
            }
        } else {
            this.animProgress = this.easing(t, ellapsedTime, 0, 1, this.duration);
        }

        return this.ended;
    }
};

export default Effect;

