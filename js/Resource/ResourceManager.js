import Binary from '../Binary/Binary';
import AM from '../Audio/AudioManager';
import Pool from '../Core/Pool';
import Wad from 'web-audio-daw';
import Deferred from '../Core/Deferred';
import Dom from '../Core/Dom';

// build a new object instance without using new
function newObject(Obj) {
    return new (Obj.bind.apply(Obj, arguments))();
}

// little shim for browsers not supporting createImageBitmap yet
// in case browser doesn't support createImageBitmap we simply resolve with the original image
const createImageBitmap = window.createImageBitmap || function createImageBitmap(img) { return Deferred.resolve(img); };

/**
 * Handles resource loading at runtime
 *
 * Resources are loaded and retrieved using this manager.
 *
 * The ResourceManager can load at runtime the following types of resources:
 *  - Images
 *  - Sounds
 *  - Maps (JSON-based)
 *
 */
export default {
    isLocal: !!document.location.href.match(/^file:\/\//),
    scriptMaxTime: 3000,
    groupMaxTime: 5000,
    /**
     * This property holds all ressources that have been added to the ResourceManager,
     * grouped by string identifier. By default, a new `any` group is added: any resource
     * that is added with no group gets added this group.
     */
    resources: {
        // by default all resources belong to any
        'any': {
            def: new Deferred(),
            loadedRes: 0,
            numRes: 0,
            res: {},
            progressCb: null,
            errorCb: null
        }
    },
    dynamicScripts: {},
    iOS: !!navigator.userAgent.match(/iPhone|iPad/),
    skipResources: ['script'],
    async: true,
    loading: false,
    /**
     * Retrieve a resource using its id with optionnal group
     *
     * @param {String} id The id of the resource to get
     * @param {String} [group="any"] the group to get the resource from
     * @param {Boolean} [fullObject=false] returns the resource object if true. Otherwise return the resource only.
     */
    getResourceById: function (id, group = 'any', fullObject = false) {
        // console.log('[RM] getting resource', id);

        let rsGroup = this.resources[group].res,
            rs = rsGroup[id];

        if (rs && rs.loaded) {
            return fullObject === true ? rs : rs.elt;
        } else {
            if (this.dynamicScripts[id]) {
                return this.dynamicScripts[id];
            } else {
                console.error('[RM] unknwon resource id', id);
                return;
            }
            // if (resource) {
            //     return resource.default;
            // } else {
            //     debugger;
            //     console.warn('[RM] WARN: could not find resource', id);
            // }
        }
    },
    /**
     * Allocates a new resource from the pool
     *
     * This method creates a new instance of the JavaScript object, retrieving it from
     * the pool if the object supports it. If it does not it simply uses new to generate a new instance
     *
     * @param {String} id The id of the resource for which to create a new instance.
     *
     * @returns {Object} a new instance of the specified object.
     */
    newResourceFromPool: function (id) {
        let resource = this.getResourceById(id);

        if (typeof resource.createFromPool === 'function') {
            console.log('getting resource from pool!');
            return resource.createFromPool.apply(resource, Array.prototype.slice.call(arguments, 1));
        } else {
            console.log('no pool for this one: using new instead');
            return newObject.apply(undefined, [resource].concat(Array.prototype.slice.call(arguments, 1)));
        }
    },
    /**
     * Creates a new group of resources.
     *
     * This allows to load a group of resources of any type
     * with a single load call.
     *
     * This is usefull for loading every resource of a single
     * game's level for example
     *
     * @private
     */
    _createGroup: function (groupName) {
        if (!this._groupExists(groupName)) {
            this.resources[groupName] = {
                def: new Deferred(),
                loadedRes: 0,
                numRes: 0,
                res: {},
                progressCb: null,
                errorCb: null
            };
        } else {
            this.resources[groupName].def = new Deferred();
        }
        //					console.log('[RM] cannot add resource group', groupName, 'because it already exists');
        //				}
    },
    /**
     * Checks if a group already exists
     *
     * @param {String} groupName The name of the group to check.
     *
     * @returns {Boolean} true if the group already exists.
     *
     * @private
     */
    _groupExists: function (groupName) {
        return typeof this.resources[groupName] !== 'undefined';
    },
    /**
     * Add new resource(s) into the specified group
     *
     * @param {Object|Array} resource a single or a group of resources to load
     * @param {String} group the name of the group to add the resources into
     *
     * @returns {Deferred} a new Deferred that will be resolved once the
     * resources have been loaded.
     *
     * *Note* This method only adds the resources to the group
     * but do not load them.
     *
     * @example
     *
     * ResourceManager.addResources({
     *  id: 'sprites',
     *  type: 'image',
     *  src: './sprites/gem.png'
     * }, "sprites");
     *
     * // resource type can be image|map|audio
     */
    addResources: function (resource, group) {
        group = group || 'any';

        this._createGroup(group);

        let i,
            resGroup = this.resources[group];

        if (resource !== null) {
            if (typeof resource === 'object' && resource.constructor === Array) {
                for (i in resource) {
                    if (typeof resGroup.res[resource[i].id] === 'undefined' && this.skipResources.indexOf(resource[i].type) === -1) {
                        // we could use jQuery.extend but this seems to be a little faster
                        // and we can easily remove jQuery if needed then
                        resGroup.res[resource[i].id] = JSON.parse(JSON.stringify(resource[i]));
                        resGroup.numRes++;
                    }
                }
            } else if (typeof resGroup.res[resource.id] === 'undefined' && this.skipResources.indexOf(resource.type) === -1) {
                resGroup.res[resource.id] = JSON.parse(JSON.stringify(resource));
                resGroup.numRes++;
            }
        }

        if (resource === null || resGroup.numRes === resGroup.loadedRes) {
            resGroup.def.resolve(true);
        }
        // console.log('[RM] added resources', resGroup, 'group', group);

        return resGroup.def.promise;
    },
    /**
     * Attempts to load the next resource in the specified group
     *
     * @param {String} groupName the name of the group to use.
     */
    loadNextResource: function (groupName) {
        let group = this.resources[groupName],
            i;

        for (i in group.res) {
            if (!group.res[i].loaded && this.skipResources.indexOf(group.res[i].type) === -1) {
                this._loadResource(group.res[i], groupName);
                break;
            }
        }
    },
    // load ressources, either unique resources with id, or group id
    /**
     * Loads all resources found in the specified group, optionnaly
     * calling a callback after each file has been loaded.
     *
     * @param {String} group The name of the group to load.
     * @param {Function} [progressCb=undefined] an optionnal progress callback.
     * @param {Function} [errorCb=undefined] an optionnal error callback.
     *
     */
    loadResources: function (group, progressCb = undefined, errorCb = undefined) {
        group = group || 'any';

        if (this.loading === true) {
            console.warn('[ResourceManager] loadResources() -> already loading');
            return;
        } else {
            this.loading = true;
        }

        let resGroup = this.resources[group],
            nextRes = null,
            i,
            size = 0;

        resGroup.progressCb = progressCb || null;
        resGroup.errorCb = errorCb || null;

        // FIXME: simply count the num of resources and get a ref to the first one
        // guess it could be cleaner
        for (i in resGroup.res) {
            if (!resGroup.res[i].loaded && this.skipResources.indexOf(resGroup.res[i].type) === -1) {
                size++;
                if (this.async) {
                    this._loadResource(resGroup.res[i], group);
                } else if (nextRes === null) {
                    nextRes = resGroup.res[i];
                }
            }
        }

        // load the first one
        if (!this.async) {
            this._loadResource(nextRes, group);
        }

        if (size === 0) {
            console.warn('[ResourceManager] no ressource to load');
            // force back loading to false: this happens when scene elements has already
            // been loaded
            this.loading = false;
            return;
        }

        resGroup.gpTimeout = setTimeout(() => {
            var notLoaded = [],
                resId;

            // ES6 promise spec doesn't have such function: this was there in older code
            // to be sure network wasn't just slow but an error really occured
            if (resGroup.gpTimeout /*&& resGroup.def.state() === 'rejected'*/) {
                resGroup.gpTimeout = null;

                console.error('[RM] Unable to load the following resources after', this.groupMaxTime / 1000, 'sec');
                for (resId in resGroup.res) {
                    if (!resGroup.res[resId].loaded) {
                        notLoaded.push('[' + resGroup.res[resId].type + '] ' + resId);
                        console.warn('[' + resGroup.res[resId].type + '] ' + resId + ': ' + resGroup.res[resId].src);
                    }
                }

                // TODO: pass what was loaded, and what was not to the error callback...
                if (resGroup.errorCb) {
                    resGroup.errorCb('Unable to get all resources after', this.groupMaxTime, notLoaded);
                }
            }
        }, this.groupMaxTime);
    },
    /**
     * Converts an image into a canvas element
     *
     * @param {Image} image The image to convert
     *
     * @returns {Canvas} a new canvas element containing the image
     *
     * @private
     */
    getCanvasFromImage: function (image) {
        let canvas = document.createElement('canvas');

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        canvas.getContext('2d').drawImage(image, 0, 0);

        return canvas;
    },
    /**
     * starts loading an image
     *
     * @param {Object} res an Object describing the resource to load
     * @param {String} [gpName=undefined] the name of the group that the resource came from, set to undefined to load a single resource
     *
     * @returns {Deferred} a new promise that will be resolved when the file has been loaded.
     */
    loadImage: function (res, gpName = undefined) {
        let img = new Image(),
            that = this,
            def = new Deferred();

        // attempt to retrive image first, load it if not already loaded

        // console.log('[RM] loading image', res.src);

        img.onload = function () {
            // on Chrome/Win calling drawImage to draw from canvas to canvas is abnormally slow (20-30ms to draw a 20x20px sprite on a core2quad + ati card)
            // so it's disabled for now
            // res.elt = that.getCanvasFromImage(this);
            createImageBitmap(this).then((bitmap) => {
                res.elt = bitmap; // img
                res.img = img;// this;
                res.loaded = true;
                gpName && that._resLoaded(gpName);
                def.resolve(gpName && true || bitmap);
            });

            // console.log('[RM] loaded image', res.src);
        };

        img.src = res.src;

        return def.promise;
    },
    /**
     * Creates a pool for a specified object
     *
     * This method pre-allocates objects for later use.
     *
     * @param {Function} Obj a new object to create
     * @param {Number} size the size of the pool
     *
     */
    createObjectPool: function (Obj, size) {
        Pool.create(Obj, size);
    },
    /**
     * Register a script as resource: this allows to retrieve it using the resourceManager
     * at runtime.
     *
     * `notes`
     * During athenajs development, systemjs loader was used instead of Webpack
     * systemjs allows to load any script during *runtime*
     *
     * This allowed to load script (sprite) resources at runtime, on-demand.
     *
     * Unfortunately, this is not possible at all with ES6/Webpack which needs to
     * know during build-process which scripts will be needed at runtime to build
     * dependency graphs.
     *
     */
    registerScript: function (id, elt, poolSize) {
        let existing = this.dynamicScripts[id];

        if (poolSize) {
            this.createObjectPool(elt, poolSize);
        }

        if (existing) {
            console.error('existing script with the id', id, 'should I replace it?');
        } else {
            this.dynamicScripts[id] = elt;
        }
    },
    /**
     * loads a new external script: this is not supported anymore
     * since webpack cannot load random script file
     *
     * @obsolete
     * @private
     */
    loadScript: function (res, gpName, callback) {
        let loaded = new Deferred();
        /*
        script = null,
        timeout = 0;
        */

        console.error('loadScript not supported');
        // require.ensure([], function() {
        //     debugger;
        //     var res = require(res.src);
        // })
        console.log('[RM] loading script', res.src);

        // remove ending .js since it shouldn't be there for require js
        /*
                    res.src = res.src.replace(/\.js$/, '');

                    System.import(res.src).then((scriptEval) => {
                        console.log('[RM] loaded AJAX script', res.src, scriptEval);
                        res.elt = scriptEval.default ? scriptEval.default : scriptEval;
                        res.loaded = true;

                        if (res.poolSize) {
                            this.createObjectPool(res.elt, res.poolSize);
                        }

                        if (!callback) {
                            this._resLoaded(gpName);
                            loaded.resolve(true);
                        } else {
                            var newDef = callback.call(this, res, gpName);
                            newDef.done(function() {
                                loaded.resolve(true);
                            });
                        }

                    }).catch(function(err) {
                        console.log('resource not loaded', err);
                        gp.def.reject('Unable to load resource "' + res.src + '" [' + res.id + ']');
                    });
        */
        return loaded.promise;
    },

    /**
     * Loads a new Audio file using standard HTML5 Audio
     *
     * @param {Object} res a descriptor for the sound to load
     * @param {String} gpName the name of the group to load the audio file from
     *
     * @returns {Deferred} a new promise that will be resolved once the file has been loaded
     */
    loadAudio: function (res, gpName) {
        // console.log('[RM] loading sound', res.src);

        let that = this,
            audio = new Audio(),
            def = new Deferred();

        function onLoad() {
            // canplaythrough event is sent not only on first load, but after the song has been played (and has been rewinded)
            // so we remove it to prevent from triggering again
            this.removeEventListener('canplaythrough', onLoad);
            // console.log('[RM] audioLoaded', res.src);
            res.elt = this;
            res.loaded = true;
            AM.addSound(res.id, this);
            that._resLoaded(gpName);
            def.resolve(true);
        }

        audio.preload = 'auto';
        audio.addEventListener('canplaythrough', onLoad);

        audio.addEventListener('loadstart', function () {
            console.log('loadStarted', audio.src);
        });

        audio.src = res.src;

        return def.promise;
    },

    /**
     * Loads a new Audio file using the WAD library
     *
     * @param {Object} res a descriptor for the sound to load
     * @param {String} gpName the name of the group to load the audio file from
     *
     * @returns {Deferred} a new promise that will be resolved once the file has been loaded
     */
    loadWadAudio: function (res, gpName) {
        let def = new Deferred(),
            sound = new Wad({
                source: res.src,
                callback: () => {
                    res.elt = sound;
                    res.loaded = true;
                    AM.addSound(res.id, sound);
                    this._resLoaded(gpName);
                    def.resolve(true);
                }
            });

        return def.promise;
    },

    /**
     * Loads a JSON file
     *
     * @param {Object} res The JSON file descriptor
     * @param {String} gpName The name of the group to load the file from
     * @param {Function} callback An optionnal callback to execute once the file has been loaded
     *
     * @returns {Deferred} a promise that will be resolved once the file has been loaded.
     */
    loadJSON: function (res, gpName, callback) {
        let def = new Deferred();

        fetch(res.src).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw 'Error getting photo list';
            }
        })
            .then(json => {
                res.elt = json;
                res.loaded = true;
                if (!callback) {
                    this._resLoaded(gpName);
                    def.resolve(true);
                    // loaded.resolve(true)
                } else {
                    var newDef = callback.call(this, res, gpName);
                    newDef.then(() => {
                        def.resolve(true);
                    });
                }
            });
    },
    /**
     * Loads binary data into an ArrayBuffer
     *
     * @param {Object} res The JSON file descriptor
     * @param {String} gpName The name of the group to load the file from
     *
     * @returns {Deferred} a promise that will be resolved once the file has been loaded.
     *
     * @private
     */
    loadMapData: function (res, gpName) {
        let def = new Deferred(),
            gp = this.resources[gpName];

        Binary.getArrayBuffer((document.location.href.match('warpdesign.fr') ? '/gods/' : '') + res.elt.dataUrl).then((arrayBuffer) => {
            res.elt.buffer = arrayBuffer;
            res.loaded = true;
            this._resLoaded(gpName);
            def.resolve(true);

        }, () => {
            gp.def.reject('Unable to load map resource "' + res.src + '" [' + res.id + ']');
        });

        return def.promise;
    },
    /**
     * Internal method that gets called once a resource has been loaded
     *
     * If there is resource remaining to be loaded, this method will load the next resource.
     * Otherwise it will resolve the group's loading promise.
     *
     * @private
     */
    _resLoaded: function (groupName) {
        let group = this.resources[groupName];

        group.loadedRes++;

        /*
            Debug stuff
        */
        new Dom('span.loaded').html(group.loadedRes);

        if (group.progressCb) {
            group.progressCb.call(this, Math.floor((group.loadedRes * 100) / group.numRes));
        }

        if (group.loadedRes === group.numRes) {
            // console.log('[RM] need to resolve stuff :)) ' + group.loadedRes + '/' + group.numRes);
            this.loading = false;
            if (group.gpTimeout !== null) {
                clearTimeout(group.gpTimeout);
            }
            group.def.resolve(true);
        } else if (!this.async) {
            // console.log('[RM] more stuff to load !', group.loadedRes + '/' + group.numRes);
            this.loadNextResource(groupName);
        } else {
            // console.log('[RM] more stuff to load !', group.loadedRes + '/' + group.numRes);
        }
    },
    /**
     * Loads the specificied resource from specified group
     *
     * @param {Object} res The JSON file descriptor
     * @param {String} gpName The name of the group to load the file from
     *
     * @private
     */
    _loadResource: function (res, groupName) {
        // console.log('[RM] loading', res);
        switch (res.type) {
            case 'image':
                return this.loadImage(res, groupName);

            case 'audio':
                return this.loadWadAudio(res, groupName);

            case 'script':
                return this.loadScript(res, groupName);

            // case 'map'
            default:
                // load Map JSON + Binary data
                return this.loadJSON(res, groupName, this.loadMapData);
        }
    }
};
