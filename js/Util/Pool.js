/**
 * Pool support for AthenaJS
 *
 * With a Pool objects are defined ahead of time, and any free instance
 * from the pool is used when you want to use a new object.
 */
const Pool = {
    /**
     * Creates a new pool
     *
     * @param {Function} obj the constructor of the object to add a pool for
     * @param {Number} size the size of the pool
     */
    create: function (obj, size) {
        obj._pool = [];
        obj._poolMarker = 0;
        obj._poolSize = 0;

        let pool = obj._pool;

        /*
         * Get a new object from the pool
         *
         * -*Note* This method does not call new but gets a reference to an already created object
         *  and calls its constructor.
         *
         *  @returns {Object} an instance of the object from the pool
         * 
         *
         */
        obj.createFromPool = function () {
            // expand the pool if we run out of objects
            if (obj._poolSize <= obj._poolMarker) {
                obj.expandPool(10);
            }

            // get new object
            let newObj = obj._pool[obj._poolMarker++];

            // save its index
            newObj._poolIndex = obj._poolMarker - 1;

            // apply the constructor
            obj.prototype.constructor.apply(newObj, arguments);

            return newObj;
        };

        /*
         * expands an already created pool
         *
         * @param {number} size the new size of the pool
         */
        obj.expandPool = function (size) {
            var options = {
                pool: true
            };

            for (var i = pool.length, max = pool.length + size; i < max; i++) {
                pool.push(new obj(options));
            }

            obj._poolSize += size;
        };

        // TODO: test me
        // TODO: call the object's destructor, if any (guess we'll need to add it)
        // obj.__proto__.freeFromPool = function() {
        obj.prototype.freeFromPool = function () {
            if (obj._poolMarker > 0) {
                obj._poolMarker--;
            }

            let end = pool[obj._poolMarker],
                endIndex = end._poolIndex;

            pool[obj._poolMarker] = this;
            pool[this._poolIndex] = end;

            end._poolIndex = this._poolIndex;
            this._poolIndex = endIndex;
        };

        // initial expand of the pool
        obj.expandPool(size);
    }
};

export default Pool;