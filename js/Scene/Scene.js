import ResourceManager from 'Resource/ResourceManager';
import Sprite from 'Object/Sprite';
import BitmapText from 'Object/BitmapText';
import Text from 'Object/Text';
import Map from 'Map/Map';
import Tile from 'Map/Tile';
import NM from 'Notification/NotificationManager';
import Dom from 'Core/Dom';

import Deferred from 'Core/Deferred';
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
 * @param {number} [options.backgrounds=1] The number of backgrounds: a scene can have any number of backgrounds.
 * @param {number} [options.layers=2] The number of layers: layers are stacked above the backgrounds.
 * @param {number} [options.foregrounds=1] The number of foreground layers. This would typically be used for parallax scrollings.
 * @param {number} [options.opacity=1] The default opacity for the scene: can be usefull to have fadeIn effects when starting the scene.
 * @param {number} [options.hudScene] Scenes can have an option `hud` scene that is automatically rendered on top of it. This allows to easily add score/status elements to games.
 * 
 */
class Scene {
    constructor(options) {
        options = options || {};

        console.log('[scene ' + options.name || '' + '] ' + 'Init()', options);

        // we may have several backgrounds
        this.backgrounds = new Array(options.backgrounds || 1);

        this.layers = new Array(options.layers || 2);

        // foregrounds will be added later
        this.foregrounds = new Array(options.backgrounds || 1);

        this.readyDef = null;

        this.resources = options.resources || null;

        this.pics = {};

        this.map = null;

        this.mapOffsetX = 0;
        this.mapOffsetY = 0;

        this.loaded = false;

        this.running = false;

        this.backgroundImage = null;

        this.name = options.name || `Scene${new Date().getTime()}`;

        this.opacity = (typeof options.opacity !== 'undefined') ? options.opacity : 1;

        this.hudScene = options.hudScene || null;

        // will hold the time of gameplay
        this.time = null;
        this.playTime = null;

        // debug
        window.scenes[this.name] = this;

        this._startCallbacks = [];

        this._fillArrays();

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
     * Fill layers arrays
     * @private
     */
    _fillArrays() {
        for (let i = 0; i < this.layers.length; ++i) {
            this.layers[i] = [];
        }

        for (let i = 0; i < this.backgrounds.length; ++i) {
            this.backgrounds[i] = [];
        }
        for (let i = 0; i < this.foregrounds.length; ++i) {
            this.foregrounds[i] = [];
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

    /**
     * Loads resources
     * 
     * @param {array} res An array of resources to load.
     * @param {function} [progressCb=undefined] A progress callback function that gets called after each resource has been loaded
     * @returns {Deferred} `this.readyDef`
     * @private
     * 
     */
    loadResources(res, progressCb/*, doneCb, failCb*/) {
        console.log('[scene ' + this.name + '] ' + 'loading Resources...');
        if (!this.loaded) {
            console.log('[scene ' + this.name + '] ' + ' seems like the scene needs to be loaded: goooo!');
            this.readyDef = ResourceManager.addResources(res);

            // add the huds resources as well
            // if (this.hudScene && !this.hudScene.loaded) {
            //     this.readyDef = ResourceManager.addResources(this.hudScene.resources);
            // }

            this.readyDef.then(() => {
                // if (this.hudScene) {
                //     this.hudScene.load();
                // }
                this.loaded = true;
            });

            this.readyDef.then(this.cacheImages.bind(this));
            this.readyDef.then(this.onLoad.bind(this));

            ResourceManager.loadResources('any', progressCb);
        } else {
            console.log('[scene ' + this.name + '] ' + ' seems like the scene has already been loaded: good!');
            // this.onLoad();
        }

        return this.readyDef;
    }

    /**
     * Loads the scene (if needed)
     * @private
     */
    load() {
        console.log('[Scene ' + this.name + '] load()');
        if (this.hudScene && !this.hudScene.loaded) {
            let def = new Deferred();
            this.hudScene.load().then(() => {
                this.loadResources(this.resources).then(() => {
                    def.resolve();
                })
            });

            return def.promise;
        } else {
            return this.loadResources(this.resources);
        }
    }

    /**
     * Simple debug method: only toggles map boxes for now
     */
    debug() {
        // console.log('[scene ' + this.name + '] ' + 'debug() default scene debug does nothing!');
        this.map && this.map.debug(!this.map.isDebug);
    }

    /**
     * This method is called once resources have been loaded and does the following:
     * 1. creates layer arrays
     * 2. get reference resources from the resourceManager
     * 3. prepare canvas elements
     */
    onLoad() {
        this._fillArrays();
        this._getResourcesRef();
        this._prepareCanvas();
    }

    onStart(cb) {
        console.log('onStart');
        if (!this.running) {
            this._startCallbacks.push(cb.bind(this));
        } else {
            cb();
        }
    }

    /**
     * Get a reference of each `image` resource that has been loaded.
     * 
     * @private
     */
    cacheImages() {
        console.log('[scene ' + this.name + '] ' + ' caching Images');
        // var max = this.resources.length,
        //     i,
        //     id;
        if (!this.resources) {
            return;
        }

        try {
            for (let i = 0, max = this.resources.length; i < max; i++) {
                let id = this.resources[i].id;
                if (this.resources[i].type === 'image') {
                    this.pics[id] = ResourceManager.getResourceById(id);
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

        this.mapOffsetX = x;
        this.mapOffsetY = y;

        // debug stuff
        window.currentMap = this.map;
    }

    /**
     * Add one ore more display objects onto the scene
     * 
     * @param {Array|GfxObject} objects The object(s) to add onto the scene.
     * @param {string} [layerType="front"] Defines in which type of layer the object should be added.
     * @param {number} [layerNum=0] Defines the layer number where to add the objects.
     */
    addObject(objects, layerType, layerNum) {
        console.log('addObject');
        // attempt to add an object on a scene not ready, we load it and postpone the add once it's ready
        if (!this.loaded) {
            console.log('addObject: later');
            this.onStart(() => {
                this.addObject(objects, layerType, layerNum);
            });

            return;
        }

        console.log('[scene ' + this.name + '] ' + 'addObject', objects, layerType, layerNum);

        let type = layerType || 'front',
            num = layerNum || 0,
            layer = null;

        switch (type) {
            case 'back':
                layer = this.backgrounds[num];
                break;

            case 'fore':
                layer = this.foregrounds[num];
                break;

            default:
            case 'front':
                layer = this.layers[num];
                break;
        }

        // console.log('[scene ' + this.name + '] ' + layerNum, layerType, layer, this.layers);

        if (Array.isArray(objects)) {
            for (let obj of objects) {
                console.log('[scene ' + this.name + '] ' + 'pushing', obj);
                layer.push(obj);
                if (typeof obj.setImage === 'function') {
                    obj.setImage(this.pics[obj.imageSrc]);
                }
                obj.setScene(this);
            }
        } else {
            layer.push(objects);
            if (typeof objects.setImage === 'function') {
                objects.setImage(this.pics[objects.imageSrc]);
            }
            objects.setScene(this);
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
     * @param {CanvasContext} destCtx The canvas context where the map should be rendered.
     * 
     * @private
     */
    drawMapObjects(destCtx) {
        this.map.drawObjects(destCtx, this.mapOffsetX, this.mapOffsetY);
    }

    /**
     * Draws every object that has been added onto the scene
     * 
     * @param {CanvasContext} destCtx The canvas context where the map should be rendered.
     * 
     * @private
     */
    drawSceneObjects(destCtx) {
        // var i, j,
        //     max, max2,
        //     obj = null,
        //     layer = null;

        // i = j = max = max2 = 0;
        // got through the list of all objects and render them if they are visible ?
        for (let i = 0, max = this.layers.length; i < max; i++) {
            let layer = this.layers[i];
            for (let j = 0, max2 = layer.length; j < max2; j++) {
                let obj = layer[j];
                obj.draw(destCtx);
            }
        }
    }

    /**
     * This method calls the move() callback of each object that has been placed onto the map.
     * 
     * It is automatically called by the run method after each frame.
     * 
     * @private
     */
    moveSceneObjects() {
        // var i, j,
        //     max, max2,
        //     obj = null,
        //     layer = null;

        // i = j = max = max2 = 0;

        // got through the list of all objects and call move method ?
        for (let i = 0, max = this.layers.length; i < max; i++) {
            let layer = this.layers[i];
            for (let j = 0, max2 = layer.length; j < max2; j++) {
                let obj = layer[j];
                if (obj.movable) {
                    obj.move();
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
     * Resume the scene playback
     */
    resume() {
        this.start();
        if (this.map) {
            this.map.resume();
        }
    }

    /**
     * Starts the scene
     * 
     * @param {Boolean=false} resetMap set true to reset the map objects when starting the scene
     * 
     */
    start(resetMap = false) {
        if (!this.loaded) {
            return;
            console.warn('[Scene] start() attempt to start a scene that has not been loaded yet. Start failed.');
        }

        this.running = true;

        // if (this.map) {
        //     if (!doNotResetMap)
        //         this.map.reset();
        //     else
        //         this.map.resume();

        //     // always force the render of the map
        //     this.map.isDirty = true;
        // }

        // reset layers too
        this.backgrounds.length = 0;

        this.layers.forEach((layer) => {
            layer.length = 0;
        });

        // be sure to clear all canvas, inc. secondary, especially
        // if we go from a scene with an hud, to a scene without one
        this.display.clearAllScreens();

        this.foregrounds.length = 0;

        this.time = new Date().getTime();

        this.playTime = null;

        if (this.hudScene) {
            this.hudScene.start(resetMap);
        }

        if (this.map && resetMap) {
            this.map.reset();
        }

        this._startCallbacks.forEach((cb) => {
            cb();
        });
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
     * pause the scene: TODO MERGE
     */
    pause() {
        this.running = false;
        this.playTime = new Date().getTime() - this.time;
        console.log('pausing, playTime = ', this.playTime / 1000);

        if (this.hudScene) {
            this.hudScene.pause();
        }
    }

    /**
     * unpause the scene: TODO MERGE
     */
    unpause() {
        this.running = true;
        this.time = new Date().getTime() - this.playTime;
        console.log('resuming, playTime = ', (this.playTime / 1000));
        this.playTime = null;

        if (this.hudScene) {
            this.hudScene.unpause();
        }
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
     */
    run() {
        this.moveSceneObjects();

        // user-loop: put user interaction here
        // move map, and sprites found onto the map
        if (this.map) {
            this.map.move();
            this.map.checkCollisions();
        }
    }

    /**
     * This method is responsible for drawing the scene and will be called 60 times a second.
     * 
     * @param {Array} layers The layers array to draw.
     * *note* When the scene is not running, this method isn't called at all.
     */
    render(layers) {
        // render-loop: put render-related stuff here
        if (this.map) {
            this.drawMap(layers[0]);
            this.drawMapObjects(layers[1]);
        }

        this.drawSceneObjects(layers[1]);
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
     * @param {GfxObject} gfxObject the object to remove from the scene
     */
    removeObject(gfxObject) {
        let layer = this.layers[0],
            foundIndex = layer.indexOf(gfxObject);

        if (foundIndex > -1) {
            layer.splice(foundIndex, 1);
        }
    }
};

export default Scene;