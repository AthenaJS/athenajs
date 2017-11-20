import Effect from './Effect';

/*jshint devel: true, bitwise: false*/
class Custom extends Effect {
    constructor(options, display) {
        super(options, display);

        this.callback = options.callback;

        this.diff = this.endValue - this.startValue;
    }
    /*        start: function() {
                this.currentAngle = this.startAngle;

                // start timer and get deferred
                return this._super();
            },*/
    process(ctx, fxCtx, obj) {
        super.process();

        this.callback(this.startValue + this.animProgress * this.diff, ctx, fxCtx);

        return this.ended;
    }
};

export default Custom;
