import Effect from 'FX/Effect/Effect';


/*jshint devel: true, bitwise: false*/
class Fade extends Effect {
    constructor(options, display) {
        super(Object.assign({
            startValue: 0,
            endValue: 1
        }, options), display);

        this.startOpacity = this.startValue !== undefined ? options.startValue : 0;
        this.endOpacity = this.endValue !== undefined ? options.endValue : 1;

        this.diff = this.endValue - this.startValue;
    }

    start() {
        this.currentOpacity = 1;

        // start timer and get deferred
        return super.start();
    }

    process(ctx, fxCtx, obj) {
        super.process();

        this.currentOpacity = this.startValue + this.animProgress * this.diff;

        obj.setOpacity(this.currentOpacity);

        return this.ended;
    }
};

export default Fade;
