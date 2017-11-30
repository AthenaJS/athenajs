import FX from '../FX/FX';
import Easing from '../FX/Easing/Easing';
import Deferred from '../Core/Deferred';
import Dom from '../Core/Dom';

/*jshint devel: true*/
/**
 *
 */
class Display {
    constructor(options, target) {
        console.log('[Display] Init()', options.name/*, options, target*/);

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
        this.layers = new Array(options.layers.length + 1);
        this.layersIndex = options.layers;

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

    getBuffer(width, height) {
        let ctx = Dom('canvas').attr({
            width: width + 'px',
            height: height + 'px'
        })[0].getContext('2d');

        ctx['imageSmoothingEnabled'] = false;

        return ctx;
    }

    _addFullscreenEvents() {
        const target = this.target;

        target.addEventListener('webkitfullscreenchange', this._onFullscreenChange.bind(this), false);
        // Firefox doesn't seem to send this event on current fullscreen element
        document.addEventListener('mozfullscreenchange', this._onFullscreenChange.bind(this), false);
        target.addEventListener('fullscreenchange', this._onFullscreenChange.bind(this), false);
        target.addEventListener('MSFullscreenChange', this._onFullscreenChange.bind(this), false);
    }

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
            screenHeight = screen.height;
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
            var newHeight = screenHeight,
                newWidth = newHeight * ratio;
        } else {
            var newWidth = screenWidth,
                newHeight = newWidth * ratio;
        }

        return {
            width: newWidth,
            height: newHeight,
            scaleX: newWidth / width,
            scaleY: newHeight / height,
            top: needMargin ? (screenHeight - newHeight) / 2 : 0,
            left: needMargin ? (screenWidth - newWidth) / 2 : 0
        }
    }

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

    _createLayers() {
        let i;

        for (i = 0; i < this.layers.length; ++i) {
            this.layers[i] = Dom('canvas').addClass('layer_' + i).attr({
                'width': this.width,
                'height': this.height
            }).css({
                'width': this.width + 'px',
                'height': this.height + 'px',
                'position': 'absolute',
                zIndex: this._getLayerZIndex(i)
            }).appendTo(this.target)[0].getContext(this.type);

            this.layers[i]['imageSmoothingEnabled'] = false;
        }

        this.fxCtx = Dom('canvas').addClass('fx').attr({
            'width': this.width,
            'height': this.height
        }).css({
            'width': this.width + 'px',
            'height': this.height + 'px',
            'position': 'absolute',
            zIndex: 3
        }).appendTo(this.target)[0].getContext(this.type);

        this.fxCtx['imageSmoothingEnabled'] = false;
    }

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

    setLayerZIndex(layer, zIndex) {
        if (layer < this.layers.length) {
            Dom(this.layers[layer].canvas).css('zIndex', zIndex);
        }
    }

    clearScreen(ctx) {
        if (0) {
            // setting canvas width resets imageSmoothingEnable to true
            ctx.canvas.width = ctx.canvas.width;

            ctx['imageSmoothingEnabled'] = false;
        } else {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, this.width, this.height);
        }
    }

    clearAllScreens() {
        for (let i = 0; i < this.layers.length; ++i) {
            this.clearScreen(this.layers[i]);
        }

        this.clearScreen(this.fxCtx);
    }

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
        // this.clearScreen(this.layers[1]);

        scene.render(this.layers);

        if (scene.hudScene) {
            scene.hudScene.render(this.layers);
        }

        // TODO: here we have to make some hack to pre-render all buffers into a single one
        // then apply fx on this one, then render this one onto foremost layer
        /* HACK */
        if (Object.keys(this.fxQueue['post']).length) {
            this.clearScreen(this.fxCtx, true);
            this.setCanvasOpacity(this.fxCtx.canvas, 0);
            // merge all canvas into fxCtx one
            for (let i = 0; i < this.layers.length; ++i) {
                this.fxCtx.drawImage(this.layers[i].canvas, 0, 0);
            }
        }
        /* HACK */
        // execute pre fx
        this.executeFx(this.fxCtx, this.fxCtx, scene, null, 'post');
        if (Object.keys(this.fxQueue['post']).length) {
            this.setCanvasOpacity(this.fxCtx.canvas, 1);
        }
    }

    prepareCanvas(resources) {
        let context = null,
            i = 0,
            oldStyle = '';

        for (i = 0; i < this.layers.length; ++i) {
            context = this.layers[i];

            oldStyle = context.canvas.style.display;
            context.canvas.style.display = "none";

            // NOTE: should we hide the canvas before?
            resources.forEach(function (resource) {
                if (resource.type === "image") {
                    // NOTE: maybe drawing only 1px is enough?
                    context.drawImage(resource.elt, 0, 0);
                }
            });

            this.clearScreen(context);

            context.canvas.style.display = oldStyle;
        }
    }

    animate(fxName, options, context) {
        console.log('animate');

        var fxClass = FX.getEffect(fxName),
            promise,
            easing = options.easing || 'linear',
            when = options.when || 'pre',
            fx;

        options.context = context || this;
        // console.log('animate', this.fxQueue);

        if (typeof this.fxQueue[when][fxName] !== 'undefined') {
            console.warn('Fx', fxName, 'already in progress, cannot execute twice');
            let def = new Deferred();
            def.resolve();
            promise = def.promise;

        } else if (!fxClass) {
            console.warn('Fx', fxName, 'unknown: did you spell it correctly ?');
        } else {
            fx = new fxClass(options, this);
            fx.setEasing(new FX.getEasing(easing));

            promise = fx.start().then(() => {
                console.log('effect ended, need to stop it', fxName);
                delete this.fxQueue[when][fxName];
            }).catch(err => {
                console.error(err);
            });

            this.fxQueue[when][fxName] = fx;
        }

        return promise;
    }

    stopAnimate(/*fxName*/) {
        console.log('TODO: need to stop animation');
    }

    executeFx(ctx, fxCtx, obj, time, when) {
        var fxObject;

        when = when || 'pre';

        for (var fxName in this.fxQueue[when]) {
            fxObject = this.fxQueue[when][fxName];
            fxObject.process(ctx, fxCtx, obj, time);
        }
    }

    clearDisplay() {
        console.log('clearFX Queue');
        this.fxQueue.pre = {};
        this.fxQueue.post = {};

        this.clearAllScreens();
    }
};

export default Display;
