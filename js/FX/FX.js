// import Mosaic from 'Mosaic';
import Fade from './Effect/Fade';
import Rotate from './Effect/Rotate';
import Custom from './Effect/Custom';
import Mosaic from './Effect/Mosaic';

/*jshint devel: true, bitwise: false*/
let effects = {},
    easing = {};

class FX {
    constructor() {
        // by default, add linear easing, other easing are defined in Easing.js and may be added at runtime
        this.addEasing('linear', (t) => t);
    }

    addFX(fxName, fxClass) {
        effects[fxName] = fxClass;
    }

    getEffect(fxName) {
        return effects[fxName];
    }

    addEasing(easingName, easingFn) {
        easing[easingName] = easingFn;
    }

    getEasing(easingName) {
        // defaults to linear easing if not specified or doesn't exist
        return easing[easingName] || easing['linear'];
    }
};

const instance = new FX();

instance.addFX('Mosaic', Mosaic);
instance.addFX('Fade', Fade);
instance.addFX('Rotate', Rotate);
instance.addFX('Custom', Custom);

export default instance;

