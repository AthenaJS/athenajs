import ResourceManager from '../Resource/ResourceManager';
import DisplayManager from '../Display/DisplayManager';
import AudioManager from '../Audio/AudioManager';
import NM from '../Notification/NotificationManager';
import Input from '../Input/InputManager';
import fpscounter from '../lib/fpscounter/fpscounter.min';
import Dom from '../Util/Dom';

/**
 * The `Game` class is the central part to AthenaJS.
 *
 * @param {Object} [options={}]
 * @param {Boolean} [options.debug=false] Debug will be enabled if this is true.
 * @param {String} [options.name] The name of the game.
 * @param {String|HTMLElement} [options.target="Dom('div')"] target The DOM target of the game: this is where the game canvas elements will be added.
 * By default the target is a new Div that is appened to the body element.
 * @param {Boolean} [options.showFps=false] A little fps counter will be displayed if this is true.
 * @param {Number} [options.width=1024] The width of the game display.
 * @param {Number} [options.height=768] The height of the game display.
 * @param {Object} [options.resources] An optionnal array of resources of the form:`{ id: 'unique id', type: 'image|script|map|audio', src: 'path_to_resource'}` that the scene needs.
 * @example
 * import { Game } from 'athenajs';
 *
 * const myGame = new Game({
 *    name: 'first-game',
 *    width: 320,
 *    height: 200
 * });
 */
class Game {
    /**
     * Creates a new Game
     *
     * @param {Object} [options={}]
     * @param {Boolean} [options.debug=false] Debug will be enabled if this is true.
     * @param {String} [options.name] The name of the game.
     * @param {String|HTMLElement} [options.target="Dom('div')"] target The DOM target of the game: this is where the game canvas elements will be added.
     * By default the target is a new Div that is appened to the body element.
     * @param {Boolean} [options.showFps=false] A little fps counter will be displayed if this is true.
     * @param {Number} [options.width=1024] The width of the game display.
     * @param {Number} [options.height=768] The height of the game display.
     * @param {Object} [options.resources] An optionnal array of resources of the form:`{ id: 'unique id', type: 'image|script|map|audio', src: 'path_to_resource'}` that the scene needs.
    */
    constructor(options = {}) {
        console.log('[Game] Init()'/*, options*/);

        this.debug = options.debug;
        this.name = options.name;

        const target = options.target && new Dom(options.target);

        // whether to display FPS
        this.showFps = typeof options.showFps !== 'undefined' ? options.showFps : false;

        if (this.showFps) {
            fpscounter({
                width: 50,
                height: 50
            });
        }

        this.width = options.width || 1024;
        this.height = options.height || 768;

        // DOM element to use for the game (it will be cleared)
        this.target = target && target.length && target[0] || Dom('div').css({
            width: `${this.width}px`,
            height: `${this.height}px`
        }).appendTo('body')[0];

        Dom(this.target).addClass('athena-game');

        this.resources = options.resources;

        // current display
        this.display = null;

        // current scene
        this.scene = null;

        this.running = false;

        // get ready for input events
        this._initEvents();

        // creates the main display
        this.createDisplay({
            name: 'main',
            width: options.width,
            height: options.height,
            layers: options.layers || [false, true]
        }, this.target);

        this.toggleSound(typeof options.sound !== 'undefined' ? options.sound : true);

        if (!this.sound) {
            console.warn('sound disabled: skipping audio resources');
            ResourceManager.skipResources.push('audio');
        }

        // eventLoop timeout
        this.timeout = null;

        // rendering loop
        this.animFrame = null;

        // listen for all events
        this.bindEvents('*');

        if (options.scene) {
            this.setScene(options.scene);
        }

        if (this.debug) {
            document.addEventListener('keyup', (event) => {
                if (event.keyCode === 68) {
                    if (this.scene) {
                        this.scene.debug();
                        this.scene.map && this.toggleTileInspector(this.scene.isDebug);
                    }
                } else if (event.keyCode === 70) {
                    this.toggleFullscreen();
                } else if (event.keyCode === 80) {
                    this.togglePause();
                }
                //else if (event.keyCode === 82) {
                //     this.setScene(this.scene);
                // }
            });

            if (navigator.userAgent.match(/Xbox/)) {
                this.target.addEventListener('click', () => {
                    console.log('[Game] Toggling fullscreen.');
                    this.toggleFullscreen();
                });
            }
        }
    }

    /**
     * Creates the tile inspector, adding it onto the DOM and starts listening for events
     * 
     * @private
     */
    addInspector() {
        this.moveHandler = (event) => {
            const map = this.scene.map;
            const offsetX = event.offsetX > 0 ? event.offsetX : 0;
            const offsetY = event.offsetY > 0 ? event.offsetY : 0;
            const mapOffsetX = this.scene.mapOffsetX,
                mapOffsetY = this.scene.mapOffsetY,
                mapWidth = map.viewportW,
                mapHeight = map.viewportH;

            if (event.offsetX < mapOffsetX || event.offsetX > (mapOffsetX + mapWidth) || event.offsetY < mapOffsetY || event.offsetY > (mapOffsetY + mapHeight)) {
                this.tileInspector.hide();
                this.tileHover.hide();
            } else {
                const pos = map.getTileIndexFromPixel(offsetX - mapOffsetX - map.viewportX, offsetY - mapOffsetY - map.viewportY);
                if (pos) {
                    this.tileInspector.html(`${pos.x}, ${pos.y}<br />[${map.map[pos.x + pos.y * map.numCols]}, ${map.tileBehaviors[pos.x + pos.y * map.numCols]}]`).css({
                        left: 0,
                        top: 0
                    });
                    this.tileInspector.show();
                    this.tileHover.css({
                        left: ((pos.x * map.tileWidth) + mapOffsetX + map.viewportX) + 'px',
                        top: ((pos.y * map.tileHeight) + mapOffsetY + map.viewportY) + 'px'
                    }).show();
                } else {
                    this.tileInspector.hide();
                    this.tileHover.hide();
                }
            }
        };

        this.tileInspector = new Dom('div').css({
            border: '1px dotted white',
            'background-color': 'rgba(0,0,0,.7)',
            color: 'white',
            'z-index': 10,
            position: 'absolute',
            'pointer-events': 'none'
        }).appendTo(this.target);

        this.tileHover = new Dom('div').css({
            border: '1px dotted white',
            width: `${this.scene.map.tileWidth}px`,
            height: `${this.scene.map.tileHeight}px`,
            'background-color': 'rgba(255,0,0,.4)',
            position: 'absolute',
            'z-index': 10,
            top: 0,
            left: 0,
            'pointer-events': 'none'
        }).appendTo(this.target);

        // TODO: do not change position if != static
        Dom(this.target).css('position', 'relative');
    }

    /**
     * Toggles the Map tiles inspector
     *
     * @param {Boolean} enable Whether to enable the tileInspector.
     */
    toggleTileInspector(enable) {
        if (enable) {
            if (!this.tileInspector) {
                this.addInspector();
            }
            this.tileInspector.show();
            this.target.addEventListener('mousemove', this.moveHandler, false);
        } else if (this.tileInspector) {
            this.target.removeEventListener('mousemove', this.moveHandler);
            this.tileInspector.hide();
            this.tileHover.hide();
        }
    }

    /**
     * Get ready for events from NotificationManager
     *
     * @see {@link ?api=game#Game#onEvent|Game#onEvent}
     *
     * @param {String} eventList space-separated list of events to listen to
     *
     */
    bindEvents(eventList) {
        NM.listen(eventList, this.onEvent.bind(this));
    }


    /**
     * Method that gets called when receiving an event: by default it does nothing
     * It's up to the developer to override this method on its Game.
     *
     * It will be called with an event parameter with the `type` and `data` properties.
     *
     * @see {@link ?api=game#Game#bindEvents|Game#bindEvents}
     *
     * @param {String} event the event name that got fired.
     *
    * @example
    *
    * onEvent(event) {
    *   if (event.type === 'hello') {
    *       console.log(`hey there ${event.data.name}`);
    *   }
    * }
     */
    onEvent(event) {
        event;
    }


    /**
     * Toggles global sound
     *
     * @param {Boolean} bool Whether to enable or disable sound.
     *
     */
    toggleSound(bool) {
        this.sound = bool;
        AudioManager.toggleSound(bool);
    }

    /**
     * Toggles fullscreen status
     */
    toggleFullscreen() {
        if (this.display) {
            this.display.toggleFullscreen();
        }
    }

    /**
     * Creates a new display, creating necessary display layers (canvas) using specified
     * parameters
     *
     * @param {Object} options
     * @param {Array} [options.layers] An aaray describing which layers should be created on the display and at which position, example: [false, true] will create two layers, one of which will be background.
     * @param {String} options.name The name of the display, eg. `main`.
     * @param {String|HTMLElement} target The target of the display: this is were canvas elements will be appended
     * @private
     *
     */
    createDisplay(options, target) {
        this.display = DisplayManager.addDisplay(options, target);
    }

    /**
     * INTERNAL: initialize input events
     * @private
     */
    _initEvents() {
        Input.init(/*{
            joystick: true
        }*/);

        this._addVisibilityEvents();
    }


    /**
     * Add HTML5 visibility event handlers so that the game may be paused
     * when the tab isn't visible anymore
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API|Page Visibility}
     * @private
     */
    _addVisibilityEvents() {
        let eventName = '',
            property = '';

        console.log('[Game] adding visibility events')
        if (typeof document.hidden !== 'undefined') {
            property = 'hidden';
            eventName = 'visibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
            property = 'msHidden';
            eventName = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
            property = 'webkitHidden';
            eventName = 'webkitvisibilitychange';
        }

        if (!eventName.length) {
            console.warn('[Game] Visibility API not available.');
        } else {
            document.addEventListener(eventName, () => {
                console.log(`[Game] got visibility event ${document[property]}`);
                if (document[property]) {
                    if (this.running) {
                        this.togglePause();
                    }
                }
            }, false);
        }
    }

    /**
     * Sets a new scene as the current scene.
     *
     * If a scene is currently running it will be stopped,
     * the new scene will be loaded and then started.
     *
     * @param {Scene} scene instance to set as current Scene.
     *
     */
    setScene(scene) {
        console.log(`[Game] setScene: ${scene.name}`);
        if (this.scene !== scene) {
            if (this.scene) {
                // stops render + input loops
                this._stopSceneLoops();

                // stops the scene from running
                this.scene._stop();

                this.toggleTileInspector(false);
            }

            // TODO: handle case where user attempt to set the scene that's currently running
            if (scene) {
                // this.scene = scene;

                // // debug
                // window.currentScene = scene;

                // console.log('**resetMap', resetMap);
                //*** this.startScene(resetMap);
                this._setupScene(scene);
            } else {
                console.warn('[Game] Attempt to set non-existing scene:', scene);
            }
        }
    }

    _startScene() {
        // console.log('[Game] _startScene()');
        const hudScene = this.scene.hudScene;
        this.display.clearAllScreens();
        this.scene._start();
        this.scene.start();

        if (hudScene) {
            hudScene.start();
        }

        this._runSceneLoop();
        this._renderSceneLoop();
    }

    _setupScene(scene) {
        // console.log('[Game] _setupScene()');
        this.scene = scene;

        const hudScene = scene.hudScene;

        // Debug
        window.currentScene = scene;

        // first do internal stuff
        this.scene.setDisplay(this.display);
        this.display.clearDisplay();

        // call the scene's internal setup method: we don't want to
        // rely on the user calling the parent scene's method so we call
        // it ourselves
        this.scene._setup();
        // then the public one
        this.scene.setup();
        if (hudScene) {
            hudScene.setup();
        }

        // finally load the scene, and call startScene once the scene has been loaded
        this.scene._load().then((scene) => {
            if (this.scene === scene) {
                this._startScene();
            } else {
                console.warn('[Game] scene', scene, 'has finished loading but is not the current scene anymore so it won\'t be started.');
            }
        }).catch(err => {
            console.error(err);
        });
    }

    /**
     * This is the render scene loop that's get called at up to 60 times per second
     *
     *
     * @private
     */
    _renderSceneLoop(/*time*/) {
        var scene = this.scene;

        if (this.running) {
            // if we are playing events, set on each frame
            // TODO: maybe we could throttle it for 1/2 frame
            if (Input.playingEvents) {
                Input.nextRecordedEvents();
            }

            // schedule a call for next frame
            this.animFrame = window.requestAnimationFrame(this._renderSceneLoop.bind(this));

            // render the scone onto the current display
            this.display.renderScene(scene);

            // TODO: hudScene drawing is hardcoded into display
            // this should be moved back here
            if (scene.hudScene) {
                // use another display (canvas) for the hud: we could use the same one
                // this.display.renderSecondary(scene.hudScene);
                //
                // this.display.renderScene(scene.hudScene);
            }

            // if we are recording events, we do it on each frame
            // TODO: maybe we could only record once key has been received ?
            if (Input.recording) {
                Input.recordEvents();
            }
        }
    }


    /**
     * Main event loop: handles scene based-events
     *
     * @private
     */
    _runSceneLoop() {
        let scene = this.scene;

        if (!this.running) {
            this.running = true;
        }

        scene.update(new Date().getTime());

        if (this.running) {
            this.timeout = setTimeout(this._runSceneLoop.bind(this), 16);
        }
    }

    /**
     * Pauses the game: both loops are stopped so almost no cpu/gpu is used when calling it
     *
     */
    togglePause() {
        if (this.running) {
            this.running = false;
            // let the scene have a chance to update display, like showing
            // a pause logo, etc...
            this.scene.pause(this.running);
            // and display changes
            this.display.renderScene(this.scene);
            // then immediately stop the scene
            this._stopSceneLoops();
        } else {
            this.running = true;
            this.scene.pause(this.running);

            this._runSceneLoop();
            this._renderSceneLoop();
        }
    }

    /**
     * Stops current scene from running: this will both halt render & event loops
     *
     * Use Game.togglePauseGame() to temporarly pause a game
     *
     * @private
     *
     */
    _stopSceneLoops() {
        this.running = false;

        console.log('[Game] Scene stopped, stopping run & render loops');

        if (this.animFrame) {
            window.cancelAnimationFrame(this.animFrame);
            this.animFrame = null;
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

}

export default Game;
