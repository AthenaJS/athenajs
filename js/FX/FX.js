// import Mosaic from 'Mosaic';
import Fade from './Effect/Fade';
import Rotate from './Effect/Rotate';
import Custom from './Effect/Custom';
import Mosaic from './Effect/Mosaic';

const effects = {},
    easing = {};

/**
 * The FX class is the entry point for accessing Drawing effects like Mosaic
 * and easing functions.
 * 
 * Effects can be applied to Drawable and/or Scene instances.
 * 
 * @see {@link #Effect|Effect}
 */
class FX {
    /**
     * Creates the FX class, adding the linear easing
     */
    constructor() {
        // by default, add linear easing, other easing are defined in Easing.js and may be added at runtime
        this.addEasing('linear', (t) => t);
    }

    /**
     * Add a new Effect
     * @param {String} fxName The name of the effect to add.
     * @param {Effect} FxClass The Effect Class to add.
     */
    addFX(fxName, FxClass) {
        effects[fxName] = FxClass;
    }

    /**
     * Retrieve an effect Class by its name
     * 
     * @param {String} fxName The name of the Effect to retrive.
     * @returns {Effect} the effect Class or undefined
     */
    getEffect(fxName) {
        return effects[fxName];
    }

    /**
     * Add a new easing function for other objects to use
     * 
     * @param {String} easingName The name of the easing.
     * @param {Function} easingFn The function to be used for easing. This function may use these parameters: `x , t, b, c, d`
    */
    addEasing(easingName, easingFn) {
        easing[easingName] = easingFn;
    }

    /**
     * Retrieves an easing function
     * 
     * @param {String} easingName The name of the easing function to retrive.
     * @returns {Function} The easing function, or linear function if it didn't exist.
     */
    getEasing(easingName) {
        // defaults to linear easing if not specified or doesn't exist
        return easing[easingName] || easing['linear'];
    }
}

const instance = new FX();

// Add built-in effects
instance.addFX('Mosaic', Mosaic);
instance.addFX('Fade', Fade);
instance.addFX('Rotate', Rotate);
instance.addFX('Custom', Custom);

// the FX module exports the `instance` of FX
export default instance;