// import Mosaic from 'Mosaic';
import Fade from 'FX/Effect/Fade';
import Rotate from 'FX/Effect/Rotate';
import Custom from 'FX/Effect/Custom';
import Mosaic from 'FX/Effect/Mosaic';

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
            return easing[easingName];
        }
    };

    const instance = new FX();

    instance.addFX('Mosaic', Mosaic);
    instance.addFX('Fade', Fade);
    instance.addFX('Rotate', Rotate);
    instance.addFX('Custom', Custom);

    export default instance;

    