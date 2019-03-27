import FX from '../FX/FX';
import Deferred from '../Util/Deferred';
import Dom from '../Util/Dom';

/**
 * The `Display` class creates and manipulates display buffer for the game
 *
 */
class Display {
    /**
     * Creates a new Display instance
     *
     * @param {Object} options
     * @param {Number} [options.width=1024] The width of the display.
     * @param {Number} [options.height=768] The height of the display.
     * @param {String} [options.type] What type of rendere to use, only '2d' supported for now.
     * @param {Array<Boolean>} [options.layers] An array describing each layer that will be added: [true, true] will create two background layers, set to true for a foreground layer.
     * @param {String} options.name The name of the display.
     * @param {(String|HTMLElement)} target The target where the game DOM element should be appended.
     */
    constructor(options, target) {
        // console.log('[Display] Init()', options.name/*, options, target*/);
        let prefix = (function () {
            let styles = window.getComputedStyle(document.documentElement, ''),
                pre = (Array.prototype.slice
                    .call(styles)
                    .join('')
                    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                )[1],
                dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
            return {
                dom: dom,
                lowercase: pre,
                css: '-' + pre + '-',
                js: pre[0].toUpperCase() + pre.substr(1)
            };
        })();

        // we add an extra layer for the map
        this.layers = new Array(options.layers.length);

        // background status of each layer (so that we don't have to poke into the DOM)
        this.layersIndex = options.layers;

        // keep rendering order of each layer
        this.sortedLayers = this._sortLayers();

        this.prefix = prefix.lowercase;

        this.target = target || Dom('div').attr('id', 'display_' + options.name).appendTo('body')[0];
        this.width = options.width;
        this.height = options.height;

        this.type = options.type || '2d';

        this.fxCtx = null;

        this.isFullscreen = false;

        this._addFullscreenEvents();

        this._createLayers();

        this.fxQueue = {
            'pre': {},
            'post': {}
        };
    }

    /**
     * Creates a new (offscreen) drawing buffer
     *
     * @param {Number} width width of the buffer
     * @param {Number} height height of the buffer
     */
    getBuffer(width, height) {
        let ctx = Dom('canvas').attr({
            width: width + 'px',
            height: height + 'px'
        })[0].getContext('2d');

        ctx['imageSmoothingEnabled'] = false;

        return ctx;
    }

    /**
     * Adds cross-browser event listener for the fullscreenchange event
     */
    _addFullscreenEvents() {
        const target = this.target;

        target.addEventListener('webkitfullscreenchange', this._onFullscreenChange.bind(this), false);
        // Firefox doesn't seem to send this event on current fullscreen element
        document.addEventListener('mozfullscreenchange', this._onFullscreenChange.bind(this), false);
        target.addEventListener('fullscreenchange', this._onFullscreenChange.bind(this), false);
        target.addEventListener('MSFullscreenChange', this._onFullscreenChange.bind(this), false);
    }

    /**
     * Handler called when `fullscreenchange` event is triggered by the browser
     *
     * This in turn toggles fullscreen display scaling
     *
     * @private
     */
    _onFullscreenChange() {
        var fullscreenElement = document.webkitFullscreenElement || document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

        this.isFullscreen = fullscreenElement === this.target;

        if (!this.isFullscreen) {
            // Dom(this.target).css({
            //     'transform': 'scale(1.0, 1.0)'
            // });
            Dom(this.target).css({
                width: `${this.width}px`,
                height: `${this.height}px`
            }).find('canvas').css({
                width: `${this.width}px`,
                height: `${this.height}px`,
                top: 0,
                left: 0
            });
        } else {
            const size = this._getFullScreenSize(this.width, this.height);
            console.log('size', size.scaleX, size.scaleY);
            Dom(this.target).css({
                width: `${size.width}px`,
                height: `${size.height}px`
            }).find('canvas').css({
                width: size.width + 'px',
                height: size.height + 'px',
                top: size.top + 'px',
                left: size.left + 'px'
            });
            // Dom(this.target).css({
            //     'transform': `scale(${size.scaleX}, ${size.scaleY})`
            // });

        }
    }

    /**
     * Computes the fullscreen size: depending on the browser/device,
     * there are different ways to get correct fullscreen pixel size
     *
     * @param {Number} width initial width of the screen
     * @param {Number} height initial height of the screen
     *
     * @returns {Object} with new width, height, and x/y scale ratios
     */
    _getFullScreenSize(width, height) {
        var ratio = width / height,
            needMargin = navigator.userAgent.match(/Edge|Firefox/),
            isXbox = navigator.userAgent.match(/Edge/),
            screenWidth = screen.width,
            screenHeight = screen.height,
            newWidth,
            newHeight;
        // both Firefox & Edge force fullscreen element to full screen size
        // since our canvas element do not necessarilty take the whole screen
        // we have to center them


        if (isXbox) {
            screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        }

        console.log('screen', screen.width, screen.height);

        // use height as base since it's
        if (ratio > 0) {
            newHeight = screenHeight;
            newWidth = newHeight * ratio;
        } else {
            newWidth = screenWidth;
            newHeight = newWidth * ratio;
        }

        return {
            width: newWidth,
            height: newHeight,
            scaleX: newWidth / width,
            scaleY: newHeight / height,
            top: needMargin ? (screenHeight - newHeight) / 2 : 0,
            left: needMargin ? (screenWidth - newWidth) / 2 : 0
        };
    }

    /**
     * Toggles fullscreen display scaling
     */
    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;

        if (this.isFullscreen) {
            console.log('request fullscreen');
            this.target.requestFullScreen = this.target.requestFullscreen || this.target.webkitRequestFullscreen || this.target.mozRequestFullScreen || this.target.msRequestFullscreen;
            if (this.target.requestFullScreen) {
                this.target.requestFullScreen();
            } else {
                console.warn('Request fullscreen support not detected.');
            }
        } else {
            console.log('exit fullscreen');
            document.exitFullScreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozExitFullScreen || document.msExitFullscreen;
            if (document.exitFullScreen) {
                document.exitFullScreen();
            } else {
                console.log('Exit fullscreen support not detected.');
            }
        }
    }

    _createLayer(width, height, zIndex, className = '') {
        const layer = Dom('canvas').addClass(className).attr({
            'width': width,
            'height': height
        }).css({
            'width': width + 'px',
            'height': height + 'px',
            'position': 'absolute',
            zIndex
        }).appendTo(this.target)[0].getContext(this.type);

        layer['imageSmoothingEnabled'] = false;

        return layer;
    }

    /**
     * Create game layers.
     *
     * This method will create this.layers.length layers plus one more
     * used for post-rendering effects
     *
     * @private
     */
    _createLayers() {
        let i;

        for (i = 0; i < this.layers.length; ++i) {
            const zIndex = this._getLayerZIndex(i);
            const layerName = 'layer_' + zIndex;
            this.layers[i] = this._createLayer(this.width, this.height, zIndex, layerName);
        }

        this.fxCtx = this._createLayer(this.width, this.height, 3, 'fx');
        // Dom('canvas').addClass('fx').attr({
        //     'width': this.width,
        //     'height': this.height
        // }).css({
        //     'width': this.width + 'px',
        //     'height': this.height + 'px',
        //     'position': 'absolute',
        //     zIndex: 3
        // }).appendTo(this.target)[0].getContext(this.type);

        this.fxCtx['imageSmoothingEnabled'] = false;
    }

    /**
     * Adds map sprite layers if needed
     * 
     * @param {*} map 
     */
    addMapLayers(map) {
        // first create map sprite layers
        for (let i = 0; i <= map.layers; ++i) {
            // add the layer to the list of sprite layers,
            // last one is the map layer
            if (i < map.layers) {
                this.layersIndex.push(false);
            }
            const zIndex = this._getLayerZIndex(this.layers.length);
            const layerName = 'layer_' + zIndex;
            if (i === map.layers) {
                layerName += ' map';
            }
            const layer = this._createLayer(map.width, map.height, zIndex, layerName);
            this.layers.push(layer);
        }
        this.sortedLayers = this._sortLayers();
    }

    updateMapLayers(map, x, y) {
        const start = this.layers.length - 1 - map.layers;
        for (let i = start; i < this.layers.length; ++i) {
            let canvas = Dom(this.layers[i].canvas);
            canvas.attr({
                'width': map.viewportW,
                'height': map.viewportH
            }).css({
                'width': map.viewportW + 'px',
                'height': map.viewportH + 'px',
                'left': x + 'px',
                'top': y + 'px'
            });
        }
    }

    /**
     * Returns the zIndex property of the specified layer canvas
     *
     * @param {Number} layer The layer number.
     *
     * @private
     */
    _getLayerZIndex(layer) {
        // normal layer
        if (layer < this.layersIndex.length) {
            const isBackground = this.layersIndex[layer];
            return isBackground ? 0 : 2;
        } else {
            // map is always set to 1 for now
            return 1;
        }
    }

    /**
     * Sorts the layers by zIndex + DOM position
     *
     * <blockquote><strong>Note:</strong>We need to keep track of the rendering order of the layers
     * because the 'post' effects need the composited layer</blockquote>
     */
    _sortLayers() {
        // first we need to render background layers
        let sortedLayers = [];

        this.layersIndex.forEach((isBackground, index) => {
            if (isBackground) {
                sortedLayers.push(index);
            }
        });

        // then map layer if available
        if (this.layersIndex.length < this.layers.length) {
            sortedLayers.push(this.layers.length - 1);
        }

        // then forground layers
        this.layersIndex.forEach((isBackground, index) => {
            if (!isBackground) {
                sortedLayers.push(index);
            }
        });

        return sortedLayers;
    }

    /**
     * Changes the zIndex property of the specified layer canvas
     *
     * @param {Number} layer The layer number.
     * @param {Number} zIndex The new zIndex value for this layer
     */
    setLayerZIndex(layer, zIndex) {
        if (layer < this.layers.length) {
            Dom(this.layers[layer].canvas).css('zIndex', zIndex);
            this.layersIndex[layer] = zIndex === 0;
            // resort layers
            this.sortedLayers = this._sortLayers();
        }
    }

    /**
     * Clears a canvas display buffer
     *
     * @param {RenderingContext} ctx The context to clear
     */
    clearScreen(ctx) {
        // if (0) {
        //     // setting canvas width resets imageSmoothingEnable to true
        //     ctx.canvas.width = ctx.canvas.width;

        //     ctx['imageSmoothingEnabled'] = false;
        // } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.width, this.height);
    }

    /**
     * Clears every rendering buffer, including the special fxCtx one
     */
    clearAllScreens() {
        for (let i = 0; i < this.layers.length; ++i) {
            this.clearScreen(this.layers[i]);
        }

        this.clearScreen(this.fxCtx);
    }

    /**
     * Changes the (CSS) opacity of a canvas
     *
     * @param {Canvas} canvas The Canvas HTML element.
     * @param {Number} opacity The new opacity value for this canvas.
     */
    setCanvasOpacity(canvas, opacity) {
        canvas.style.opacity = opacity;
    }

    /**
     * Renders the specified scene
     *
     * @param {Scene} scene the scene to render
     */
    renderScene(scene) {
        this.clearScreen(this.fxCtx);

        // execute pre fx
        // TODO: here we have to make some hack to pre-render all buffers into a single one
        // then aply fx on this one, then render this one onto foremost layer
        this.executeFx(null, null, scene, null, 'pre');

        // TODO: all CTX ?
        for (let i = 0; i < this.layers.length; ++i) {
            this.setCanvasOpacity(this.layers[i].canvas, Object.keys(this.fxQueue['post']).length ? 0 : scene.getOpacity());
            // this.layers[i].canvas.style.opacity = ;
        }

        for (let i = 0; i < this.layers.length - 1; i++) {
            this.clearScreen(this.layers[i]);
        }

        scene.render(this.layers);

        if (scene.hudScene) {
            scene.hudScene.render(this.layers);
        }

        // TODO: here we have to make some hack to pre-render all buffers into a single one
        // then apply fx on this one, then render this one onto foremost layer
        /* HACK */
        if (Object.keys(this.fxQueue['post']).length) {
            this.clearScreen(this.fxCtx);
            this.setCanvasOpacity(this.fxCtx.canvas, 0);
            const sceneLayers = scene.layers.length;
            // merge all canvas into fxCtx one
            for (let i = 0; i < this.layers.length; ++i) {
                const index = this.sortedLayers[i];
                // map layers may be smaller than the game's canvas
                if (index >= sceneLayers) {
                    if (scene.map) {
                        this.fxCtx.drawImage(this.layers[index].canvas, scene.mapOffsetX, scene.mapOffsetY, scene.map.viewportW, scene.map.viewportH, scene.mapOffsetX, scene.mapOffsetY, scene.map.viewportW, scene.map.viewportH);
                    }
                } else {
                    this.fxCtx.drawImage(this.layers[index].canvas, 0, 0);
                }
            }
        }
        /* HACK */
        // execute pre fx
        this.executeFx(this.fxCtx, this.fxCtx, scene, null, 'post');
        if (Object.keys(this.fxQueue['post']).length) {
            this.setCanvasOpacity(this.fxCtx.canvas, 1);
        }
    }

    /**
     * Prepares the canvas before rendering images.
     *
     * @param {Array} resources Array of resources to use.
     *
     * Explanation: during development, I noticed that the very first time
     * the ctx.drawImage() was used to draw onto a canvas, it took a very long time,
     * like at least 10ms for a very small 32x32 pixels drawImage.
     *
     * Subsequent calls do not have this problem and are instant.
     * Maybe some ColorFormat conversion happens.
     *
     * This method makes sure that when the game starts rendering, we don't have
     * any of these delays that can impact gameplay and alter the gameplay experience
     * in a negative way.
     */
    prepareCanvas(resources) {
        let context = null,
            i = 0,
            oldStyle = '';

        for (i = 0; i < this.layers.length; ++i) {
            context = this.layers[i];

            oldStyle = context.canvas.style.display;
            context.canvas.style.display = 'none';

            // NOTE: should we hide the canvas before?
            resources.forEach(function (resource) {
                if (resource.type === 'image') {
                    // NOTE: maybe drawing only 1px is enough?
                    context.drawImage(resource.elt, 0, 0);
                }
            });

            this.clearScreen(context);

            context.canvas.style.display = oldStyle;
        }
    }

    /**
     * Starts an animation on the display
     *
     * @param {String} fxName Name of the effect to apply.
     * @param {Object} options
     * @param {String} [options.easing='linear'] The easing method to use
     * @param {String} [options.when='pre'] When is the effect applied: can be before the game frame rendering ('pre') or after ('post')
     * @param {any} [options.context=this] The context (this) to apply to the animation.
     * @param {any} context The context to bind the Effect to
     */
    animate(fxName, options, context) {
        var fxClass = FX.getEffect(fxName),
            promise,
            easing = options.easing || 'linear',
            when = options.when || 'pre',
            fx;

        options.context = context || this;

        if (typeof this.fxQueue[when][fxName] !== 'undefined') {
            console.warn(`[Display] animate() - ${fxName} already in progress, cannot execute twice.`);
            let def = new Deferred();
            def.resolve();
            promise = def.promise;

        } else if (!fxClass) {
            console.warn(`[Display] animate() - ${fxName} unknown: did you spell it correctly ?`);
        } else {
            fx = new fxClass(options, this);
            fx.setEasing(new FX.getEasing(easing));

            promise = fx.start().then(() => {
                delete this.fxQueue[when][fxName];
            }).catch(err => {
                console.error(err);
            });

            this.fxQueue[when][fxName] = fx;
        }

        return promise;
    }

    /**
     * stops current animation
     *
     * TODO
     * @private
     */
    stopAnimate(/*fxName*/) {
        console.log('TODO: need to stop animation');
    }

    /**
     * Executes an effect on a frame at a given time
     *
     * @param {RenderingContext} ctx Context that contains current frame rendering.
     * @param {RenderingContext} fxCtx The context in which to render the transformed frame.
     * @param {any} obj The object on which animation is applied: should be a `Drawable`.
     * @param {any} time Unused.
     * @param {String} when is this effect executed: 'pre' means before rendering, 'post' means after frame render.
     */
    executeFx(ctx, fxCtx, obj, time, when) {
        var fxObject;

        when = when || 'pre';

        for (var fxName in this.fxQueue[when]) {
            fxObject = this.fxQueue[when][fxName];
            fxObject.process(ctx, fxCtx, obj, time);
        }
    }

    /**
     * Clears every display layer and clears fx queues
     */
    clearDisplay() {
        // console.log('[Display] clearDisplay()');
        this.fxQueue.pre = {};
        this.fxQueue.post = {};

        this.clearAllScreens();
    }
}

export default Display;
