import Promise from 'es6-promise';

/**
 * Simple wrapper for ES6 native Promise
 */
export default class Deferred {
    /**
     * Creates a new Deferred
     */
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    /**
     * Creates and immediately resolves a new deferred
     * 
     * @param {any} val the value to resolve the promise with
     */
    static resolve(val) {
        return Promise.resolve(val);
    }
}