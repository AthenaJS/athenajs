import Effect from './Effect';

/*jshint devel: true, bitwise: false*/
class Rotate extends Effect {
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

    start() {
        this.currentAngle = this.startAngle;

        // start timer and get deferred
        return super.start();
    }

    stop(object, endValue) {
        super.stop();

        object.setAngle(endValue);
    }

    process(ctx, fxCtx, obj) {
        super.process();

        this.currentAngle = this.startValue + this.animProgress * this.diff;

        obj.setAngle(this.currentAngle);

        return this.ended;
    }
};

export default Rotate;
