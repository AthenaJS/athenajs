import FX from 'FX/FX';
import Easing from 'FX/Easing/Easing';
import Deferred from 'Core/Deferred';
import Dom from 'Core/Dom';

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

        this.layers = new Array(options.numLayers);

        this.prefix = prefix.lowercase;

        this.target = target || new Dom('div').attr('id', 'display_' + options.name).appendTo('body')[0];
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

    getBuffer(w, h) {
        let ctx = new Dom('canvas').attr({
            width: w + 'px',
            height: h + 'px'
        })[0].getContext('2d');

        ctx['imageSmoothingEnabled'] = false;

        return ctx;
    }

    _addFullscreenEvents() {
        const target = this.target;

        target.addEventListener('webkitfullscreenchange', this._onFullscreenChange.bind(this), false);
        target.addEventListener('mozfullscreenchange', this._onFullscreenChange.bind(this), false);
        target.addEventListener('fullscreenchange', this._onFullscreenChange.bind(this), false);
        target.addEventListener('MSFullscreenChange', this._onFullscreenChange.bind(this), false);
    }

    _onFullscreenChange() {
        var fullscreenElement = document.webkitFullscreenElement || document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

        this.isFullscreen = fullscreenElement === this.target;

        if (!this.isFullscreen) {
            new Dom(this.target).css({
                'transform': 'scale(1.0, 1.0)'
            });
        } else {
            const size = this._getFullScreenSize(this.width, this.height);
            new Dom(this.target).css({
                'transform': `scale(${size.scaleX}, ${size.scaleY})`
            });
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
            screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // use height as base since it's 
        if (ratio > 0) {
            var newHeight = screenHeight,
                newWidth = newHeight * ratio;
        } else {
            var newWidth = screenWidth,
                newHeight = newWidth * ratio;
        }

        return {
            w: newWidth,
            h: newHeight,
            scaleX: newWidth / width,
            scaleY: newHeight / height
        }
    }

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;

        if (this.isFullscreen) {
            this.target.requestFullScreen = this.target.requestFullscreen || this.target.webkitRequestFullscreen || this.target.mozRequestFullScreen || this.target.msRequestFullscreen;
            if (this.target.requestFullScreen) {
                this.target.requestFullScreen();
            } else {
                console.warn('Fullscreen support not detected.');
            }
        }
    }

    _createLayers() {
        let i;

        for (i = 0; i < this.layers.length; ++i) {
            this.layers[i] = new Dom('canvas').addClass('layer_' + i).attr({
                'width': this.width,
                'height': this.height
            }).css({
                'width': this.width + 'px',
                'height': this.height + 'px',
                'position': 'absolute',
                zIndex: i
            }).appendTo(this.target)[0].getContext(this.type);

            this.layers[i]['imageSmoothingEnabled'] = false;
        }

        this.fxCtx = new Dom('canvas').addClass('fx').attr({
            'width': this.width,
            'height': this.height
        }).css({
            'width': this.width + 'px',
            'height': this.height + 'px',
            'position': 'absolute',
            zIndex: i + 1
        }).appendTo(this.target)[0].getContext(this.type);

        this.fxCtx['imageSmoothingEnabled'] = false;
    }

    clearScreen(ctx) {
        if (0) {
            // setting canvas width resets imageSmoothingEnable to true
            ctx.canvas.width = ctx.canvas.width;

            ctx['imageSmoothingEnabled'] = false;
        } else {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
    }

    clearAllScreens() {
        for (let i = 0; i < this.layers.length; ++i) {
            this.clearScreen(this.layers[i]);
        }

        this.clearScreen(this.fxCtx);
    }

    renderScene(scene) {
        this.clearScreen(this.fxCtx);

        // execute pre fx
        // TODO: here we have to make some hack to pre-render all buffers into a single one
        // then aply fx on this one, then render this one onto foremost layer
        this.executeFx(this.layers[0], null, scene, null, 'pre');

        // TODO: all CTX ?
        for (let i = 0; i < this.layers.length; ++i) {
            this.layers[i].canvas.style.opacity = scene.getOpacity();
        }

        this.clearScreen(this.layers[1]);

        scene.render(this.layers);

        if (scene.hudScene) {
            scene.hudScene.render(this.layers);
        }

        // TODO: here we have to make some hack to pre-render all buffers into a single one
        // then apply fx on this one, then render this one onto foremost layer
        /* HACK */
        if (Object.keys(this.fxQueue['post']).length) {
            this.clearScreen(this.fxCtx);
            // merge all canvas into fxCtx one
            for (let i = 0; i < this.layers.length; ++i) {
                this.fxCtx.drawImage(this.layers[i].canvas, 0, 0);
            }
        }
        /* HACK */
        // execute pre fx
        this.executeFx(this.fxCtx, this.fxCtx, scene, null, 'post');
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
            fx,
            that = this;

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

            promise = fx.start().then(function () {
                console.log('effect ended, need to stop it', fxName);
                delete that.fxQueue[when][fxName];
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
            // console.log('processing fx', fxName, fxObject);

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
