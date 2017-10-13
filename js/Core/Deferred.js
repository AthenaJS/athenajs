import Promise from "es6-promise";

/**
 * Simple wrapper for ES6 native Promise
 */
export default class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  static resolve(val) {
    return Promise.resolve(val);
  }
}