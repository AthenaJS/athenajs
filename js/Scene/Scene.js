import ResourceManager from '../Resource/ResourceManager';
import Map from '../Map/Map';
import NM from '../Notification/NotificationManager';
import Input from '../Input/InputManager';
import Dom from '../Core/Dom';
import Deferred from '../Core/Deferred';
/*jshint devel: true, bitwise: false*/
// debug
window.scenes = {};

/**
 * The `Scene` is used to display your objects. In AthenaJS you first add objects onto the scene.
 * When you scene is rendered (at 60fps), your objects appear on the screen.
 *
 * Instead of creating a new scene, it is common to extend the Scene class to create your own scene.
 *
 * @param {Object} options
 * @param {string} [options.name="Scene"+timestamp] The name of your scene.
 * @param {Object} [options.resources] An optional array of resources of the form: ``{ id: 'unique id', type: 'image|script|map|audio', src: 'path_to_resource'}`` that the scene needs.
 * @param {number} [options.layers=2] The number of layers: layers are stacked above the backgrounds.
 * @param {number} [options.opacity=1] The default opacity for the scene: can be usefull to have fadeIn effects when starting the scene.
 * @param {number} [options.hudScene] Scenes can have an option `hud` scene that is automatically rendered on top of it. This allows to easily add score/status elements to games.
 *
 */
class Scene {
    constructor(options) {
        options = options || {};

        console.log('[scene ' + options.name || '' + '] ' + 'Init()', options);

        this.layers = new Array(options.layers || 2);

        this.readyDef = null;

        this.resources = options.resources || [];

        this.pics = {};

        this.map = null;

        this.mapOffsetX = 0;
        this.mapOffsetY = 0;

        this.loaded = false;

        this.running = false;

        this.backgroundImage = null;

        this.name = options.name || `Scene${Scene.count++}`;

        this.opacity = (typeof options.opacity !== 'undefined') ? options.opacity : 1;

        this.hudScene = options.hudScene || null;

        // will hold the time of gameplay
        this.time = null;
        this.playTime = null;

        // debug
        window.scenes[this.name] = this;

        // methods that are called too early are added here
        this._objectsToAdd = [];

        this.isDebug = false;

        //*** this._fillArrays();

    }

    /**
     * Browsers seem to do some conversion the first time drawImage is used from/to canvas
     *
     * @see [Optimising the canvas element](http://www.warpdesign.fr/my-experience-optimising-the-canvas-html5-element/)
     * @private
     *
     */
    _prepareCanvas() {
        if (this.resources) {
            this.display.prepareCanvas(this.resources);
        }
    }

    /**
     * Empty all layers
     * @private
     */
    _emptyLayers() {
        for (let i = 0; i < this.layers.length; ++i) {
            this.layers[i] = [];
        }
    }

    /**
     * Save references of loaded resources for later use
     * @private
     */
    _getResourcesRef() {
        let resources = this.resources;

        if (resources) {
            resources.forEach(function (res) {
                res.elt = ResourceManager.getResourceById(res.id);
            });
        }
    }

    fadeIn(duration = 1000) {
        return this.animate('Fade', {
            startValue: 0,
            endValue: 1,
            duration: duration
        });
    }

    fadeOut(duration) {
        return this.animate('Fade', {
            startValue: 1,
            endValue: 0,
            duration: duration
        })
    }

    fadeInAndOut(inDuration, delay, outDuration) {
        console.log('starting fadeInOut');
        let def = new Deferred();
        this.fadeIn(inDuration).then(() => {
            console.log('fadeIn done');
            setTimeout(() => {
                console.log('calling fade out');
                this.fadeOut(outDuration).then(() => {
                    console.log('fadeOut done!');
                    def.resolve();
                })
            }, delay);
        });

        return def.promise;
    }

    /**
     * Loads resources
     *
     * @param {array} res An array of resources to load.
     * @param {function} [progressCb=undefined] A progress callback function that gets called after each resource has been loaded
     * @returns {Deferred} `this.readyDef`
     * @private
     *
     */
    _loadResources(res, progressCb) {
        console.log('[scene ' + this.name + '] ' + 'loading Resources...');
        if (!this.loaded) {
            console.log('[scene ' + this.name + '] ' + ' seems like the scene needs to be loaded: goooo!');
            this.readyDef = ResourceManager.addResources(res);

            // add the huds resources as well
            // if (this.hudScene && !this.hudScene.loaded) {
            //     this.readyDef = ResourceManager.addResources(this.hudScene.resources);
            // }

            this.readyDef.then(() => {
                this.loaded = true;
                this._onLoad();
            }).catch(err => {
                console.error(err);
            });

            ResourceManager.loadResources('any', progressCb);
        } else {
            console.log('[scene ' + this.name + '] ' + ' seems like the scene has already been loaded: good!');
            // call onLoad to add elements that were added too early
            this._onLoad();
        }

        return this.readyDef;
    }

    /**
     *
     * loads a resource
     *
     * @memberof Scene
     *
     * // TODO: remove me ?
     */
    load(type, src, id = null) {
        if (this.loaded) {
            console.log('Scene already loaded');
            return;
        }

        this.resources.push({
            type: type,
            src: src,
            id: id || src
        });
    }

    /**
     * loadImage
     *
     * @returns
     * @memberof Scene
     */
    loadImage(src, id = null) {
        this.load('image', src, id || src);
    }

    /**
     * loadAudio
     *
     * @returns
     * @memberof Scene
     */
    loadAudio(src, id = null) {
        this.load('audio', src, id || src);
    }

    /**
     * loadMap
     *
     * @returns
     * @memberof Scene
     */
    loadMap(src, id = null) {
        this.load('map', src, id || src);
    }

    /**
     * Loads resources added on the scene's constructor
     *
     * @returns {Promise} a promise that will be resolved once the scene resources have been loaded
     *
     * @private
     */
    _load() {
        console.log('[Scene ' + this.name + '] load()');
        let def = new Deferred();
        if (this.hudScene && !this.hudScene.loaded) {
            this.hudScene._load().then(() => {
                this._loadResources(this.resources).then(() => {
                    def.resolve(this);
                });
            }).catch(err => {
                console.error(err);
            });
        } else {
            this._loadResources(this.resources).then(() => def.resolve(this));
        }

        return def.promise;
    }

    /**
     * Simple debug method: only toggles map boxes for now
     *
     * @param {Boolean=undefined} isDebug if specified, this will be the new debug status, otherwise toggle current debug status
     */
    debug(isDebug) {
        const newStatus = typeof isDebug !== 'undefined' ? isDebug : !this.isDebug;
        // console.log('[scene ' + this.name + '] ' + 'debug() default scene debug does nothing!');
        this.isDebug = newStatus;
        if (this.hudScene) {
            this.hudScene.debug(newStatus);
        }
        this.map && this.map.debug(newStatus);
    }

    /**
     * This method is called once resources have been loaded and does the following:
     * 1. creates layer arrays
     * 2. get reference resources from the resourceManager
     * 3. prepare canvas elements
     *
     * @private
     */
    _onLoad() {
        console.log('[Scene] _onLoad()');
        this._cacheImages();
        this._getResourcesRef();
        this._prepareCanvas();
        // add objects that the user wanted to add before initialization
        this._objectsToAdd.forEach((params) => this.addObject(...params));
    }

    // onStart(cb) {
    //     console.log('onStart');
    //     if (!this.running) {
    //         this._startCallbacks.push(cb.bind(this));
    //     } else {
    //         cb();
    //     }
    // }

    /**
     * Get a reference of each `image` resource that has been loaded.
     *
     * @private
     */
    _cacheImages() {
        console.log('[scene ' + this.name + '] ' + ' caching Images');
        // var max = this.resources.length,
        //     i,
        //     id;
        if (!this.resources) {
            return;
        }

        try {
            for (let i = 0, max = this.resources.length; i < max; i++) {
                const id = this.resources[i].id,
                    src = this.resources[i].src;
                if (this.resources[i].type === 'image') {
                    this.pics[id] = ResourceManager.getResourceById(id);
                    this.pics[src] = ResourceManager.getResourceById(id);
                }
            }
        } catch (err) {
            debugger;
        }
    }

    /**
     * Associates the specified map with the scene: the map will then be used to render the scene.
     * *note* The map can either be an instance of a Map or a class inheriting from Map, in which case
     *
     * @param {Map|Object} map The `Map` to use: it can be an instance of a Map inheriting class or
     * an options Object that will be used to create a new {Map} instance
     *
     * @param {number=0} x x offset where to start drawing the map onto the scene
     * @param {number=0} y y offset where to start drawing the map onto the scene
     *
     */
    setMap(map, x = 0, y = 0) {
        if (map instanceof Map) {
            this.map = map;
        } else {
            this.map = new Map(map);
        }

        this.map.setScene(this);

        this.mapOffsetX = x;
        this.mapOffsetY = y;

        // debug stuff
        window.currentMap = this.map;
    }


    _setObjectImage(object) {
        if (typeof object.setImage === 'function' && !object.image) {
            object.setImage(this.pics[object.imageId || object.imageSrc]);
        }
    }


    /**
     * Add an object into the specified layer
     * 
     * @param {Number} layerIndex the layer index
     * @param {Drawable} object the Drawable to add
     * 
     * @private
     */
    _addObjectToLayer(layerIndex, object) {
        const layer = this.layers[layerIindex];

        layer.push(object);
        this._setObjectImage(object);
        object.setScene(this);
        object.layer = layerIndex;
    }

    /**
     * Add one ore more display objects onto the scene
     *
     * @param {Array|Drawable} objects The object(s) to add onto the scene.
     * @param {number} [layerIndex=0] Defines the layer number where to add the objects.
     */
    addObject(objects, layerIndex) {
        console.log('addObject');
        // attempt to add an object on a scene not ready yet:
        // we load it and postpone the add once the scene ready
        if (!this.loaded) {
            console.log('addObject: later');
            this._objectsToAdd.push(Array.from(arguments));

            return;
        }

        console.log('[scene ' + this.name + '] ' + 'addObject', objects, layerNum);

        const num = layerIndex || 0;

        if (Array.isArray(objects)) {
            for (let obj of objects) {
                console.log('[scene ' + this.name + '] ' + 'pushing', obj);
                this._addObjectToLayer(num, obj);
            }
        } else {
            this._addObjectToLayer(num, objects);
        }
    }

    /**
     * Draws the associated map into the specified canvas context
     *
     * @param {CanvasContext} destCtx The canvas context where the map should be rendered.
     *
     * @private
     */
    drawMap(destCtx) {
        if (!this.map.isDirty) {
            return;
        }

        this.display.clearScreen(destCtx);
        this.map.draw(destCtx, false, this.mapOffsetX, this.mapOffsetY);
    }

    /**
     * Draws every object that is part of the associated map
     *
     * @param {Array} drawContexts An array with all layers context
     *
     * @private
     */
    drawMapObjects(drawContexts) {
        this.map.drawObjects(drawContexts, this.mapOffsetX, this.mapOffsetY);
    }

    /**
     * Draws every object that has been added onto the scene
     *
     * @param {Array} drawContexts An array with all layers context
     *
     * @private
     */
    drawSceneObjects(drawContexts) {
        // go through the list of all objects and render them if they are visible ?
        for (let i = 0, max = this.layers.length; i < max; i++) {
            const layer = this.layers[i],
                drawContext = drawContexts[i];

            for (let j = 0, max2 = layer.length; j < max2; j++) {
                let obj = layer[j];
                obj._draw(drawContext);
                if (this.isDebug) {
                    this.isDebug && obj.showHitBox(drawContext);
                }

                if (obj.children.length) {
                    obj.children.forEach((sprite) => {
                        sprite._draw(drawContext);
                        this.isDebug && sprite.showHitBox(drawContext);
                    });
                }
            }
        }
    }

    /**
     * This method calls the update() callback of each object that has been placed onto the map.
     *
     * It is automatically called by the run method after each frame.
     *
     * @param {Number} timestamp current time
     *
     * @private
     */
    moveSceneObjects(timestamp) {
        // go through the list of all objects and call move method ?
        for (let i = 0, max = this.layers.length; i < max; i++) {
            let layer = this.layers[i];
            for (let j = 0, max2 = layer.length; j < max2; j++) {
                let obj = layer[j];
                if (obj.movable) {
                    obj.update(timestamp);
                }
            }
        }
    }

    /**
     * Changes the opacity of the scene
     *
     * @param {number} opacity The new opacity.
     */
    setOpacity(opacity) {
        this.opacity = opacity;
    }

    /**
     * Returns the current opacity of the scene
     *
     * @returns {number} The current opacity value.
     */
    getOpacity() {
        return this.opacity;
    }

    /**
     * You can set a static background image independently of the layers
     *
     * @param {Image|String} The image to set as background
     * @obsolete
     */
    setBackgroundImage(image) {
        this.backgroundImage = image;
        // todo: hardcoded for now
        if (image instanceof Image) {
            new Dom(this.display.target).css('backgroundImage', 'url(' + image.src + ')');
        } else {
            new Dom(this.display.target).css('backgroundImage', 'url(' + image + ')');
        }
    }

    /**
     * Public setup method: can be overriden.
     *
     * This method is called right after internal Scene._setup()
     */
    setup() {
        if (this.hudScene) {
            this.hudScene.setup();
        }
    }

    /**
     * Setup scene
     *
     * @private
     */
    _setup() {
        this._emptyLayers();

        if (this.map) {
            this.map.reset();
        }

        Input.clearEvents();

        if (this.hudScene) {
            this.hudScene._setup();
        }
    }

    _start() {
        this.running = true;
        this.time = new Date().getTime();
        this.playTime = null;

        if (this.hudScene) {
            this.hudScene._start();
        }
    }

    stop() {

    }

    _stop() {
        this._reset();
        this.stop();
    }

    /**
     *
     *
     * @memberof Scene
     */
    _reset() {
        this.debug(false);
        this._objectsToAdd = [];
    }

    /**
     * Starts the scene
     *
     */
    start() {
    }

    /***
     * Stops the current scene
     *
     */
    stop() {
        this.running = false;

        if (this.hudScene) {
            this.hudScene.stop();
        }
    }

    /**
     * Called when the scene is paused. This may happen for several reasons:
     * - browser tab is hidden
     * - debug is enabled and user pressed the p key
     *
     * @param {Boolean} isRunning
     */
    pause(isRunning) {

    }

    /**
     * Get the total playtime
     *
     * @returns {number} the total playtime in milliseconds
     */
    getPlayTime() {
        let playTime = null;

        if (this.playTime) {
            playTime = this.playTime;
        } else {
            playTime = new Date().getTime() - this.time;
        }

        return playTime / 1000;
    }

    /**
     * The run loop is where scene elements are moved and collisions are checked.
     *
     * The map, if there is one, is also updated here (viewport, new objects, etc)
     *
     * @param {Number} timestamp current times
     */
    update(timestamp) {
        this.moveSceneObjects(timestamp);

        // user-loop: put user interaction here
        // move map, and sprites found onto the map
        if (this.map) {
            this.map.update(timestamp);
            this.map.checkCollisions(timestamp);
        }
    }

    /**
     * This method is responsible for drawing the scene and will be called 60 times a second.
     *
     * @param {Array} drawContexts The layers array to draw over
     * *note* When the scene is not running, this method isn't called at all.
     */
    render(drawContexts) {
        const mapIndex = drawContexts.length - 1;
        // render-loop: put render-related stuff here
        if (this.map) {
            this.drawMap(drawContexts[mapIndex]);
            this.drawMapObjects(drawContexts);
        }

        this.drawSceneObjects(drawContexts);
    }

    /**
     * 
     * @param {Number} layer layer number
     * @param {Boolean} background set to true to put layer in background, false for foreground
     */
    setLayerPriority(layer, background) {
        this.display.setLayerZIndex(layer, background ? 0 : 2);
    }

    /**
     * Notify the scene of an event
     *
     * @param {string} eventType The type of event to trigger.
     * @param {any} data The data (if any) associated with the event.
     */
    notify(eventType, data) {
        NM.notify(eventType, data);
    }

    /**
     * Subscribe to a list of events
     *
     * @param {String} eventList The list of events to subscribe to as a space separated string.
     */
    bindEvents(eventList) {
        NM.listen(eventList, this.onEvent.bind(this));
    }

    /**
     * onEvent is called once one of the registered events has been triggered
     */
    onEvent() {

    }

    /**
     * Attach the specified display to the scene
     *
     * @param {Display} display The display to attach the scene to.
     */
    setDisplay(display) {
        this.display = display;

        if (this.hudScene) {
            this.hudScene.setDisplay(display);
        }
    }

    /**
     * Apply the specified effect to the scene
     *
     * @param {String} fxName The name of the effect to apply.
     * @param {Object} options The options of the effect.
     */
    animate(fxName, options) {
        return this.display.animate(fxName, options, this);
    }

    /**
     * Remove the specified object from the scene
     *
     * @param {Drawable} drawable the object to remove from the scene
     */
    removeObject(drawable) {
        let layer = this.layers[drawable].layer,
            foundIndex = layer.indexOf(drawable);

        if (foundIndex > -1) {
            layer.splice(foundIndex, 1);
        }
    }
};

Scene.count = 1;

export default Scene;