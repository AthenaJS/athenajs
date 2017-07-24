/*jshint devel: true, bitwise: false*/
import ResourceManager from 'Resource/ResourceManager';
import Binary from 'Binary/Binary';
import DisplayManager from 'Display/DisplayManager';
import AudioManager from 'Audio/AudioManager';
import NM from 'Notification/NotificationManager';
import Input from 'Input/InputManager';
import fpscounter from 'fpscounter';
import Dom from 'Core/Dom';

/**
 * The `Game` class is the central part to AthenaJS
 * 
 * @param {Object} options
 * @param {boolean} [options.debug=false] Debug will be enabled if this is true.
 * @param {string} [options.name] The name of the game.
 * @param {string|HTMLElement} [options.target="new Dom('div')"] target The DOM target of the game: this is where the game canvas elements will be added.
 * By default the target is a new Div that is appened to the body element.
 * @param {boolean} [options.showFps=false] A little fps counter will be displayed if this is true.
 * @param {number} [options.width=1024] The width of the game display.
 * @param {number} [options.height=768] The height of the game display.
 * @param {Object} [options.resources] An optionnal array of resources of the form:``{ id: 'unique id', type: 'image|script|map|audio', src: 'path_to_resource'}`` that the scene needs.
 * 
 */
class Game {
    constructor(options = {}) {
        console.log('[Game] Init()'/*, options*/);

        this.debug = options.debug;
        this.name = options.name;

        const target = options.target && new Dom(options.target);

        // DOM element to use for the game (it will be cleared)
        this.target = target && target.length && target[0] || new Dom('div').appendTo('body')[0];

        // weather to display FPS
        this.showFps = typeof options.showFps !== 'undefined' ? options.showFps : false;

        if (this.showFps) {
            fpscounter({
                width: 50,
                height: 50
            });
        }

        this.width = options.width || 1024;
        this.height = options.height || 768;

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
            numLayers: options.numLayers || 2
        }, this.target);

        this.toggleSound(typeof options.sound !== 'undefined' ? options.sound : true);

        if (!!options.sound === false) {
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
                        this.scene.map && this.toggleTileInspector(this.scene.map);
                    }
                }
            });
        }
    }

    toggleTileInspector(map) {
        if (map.isDebug) {
            if (!this.tileInspector) {
                this.moveHandler = (event) => {
                    console.log(event.offsetX, event.offsetY);
                    const map = this.scene.map;
                    const offsetX = event.offsetX > 0 ? event.offsetX : 0;
                    const offsetY = event.offsetY > 0 ? event.offsetY : 0;
                    const pos = map.getTilePos(offsetX, offsetY);
                    this.tileInspector.html(`${pos.x}, ${pos.y}<br />Type: ${map.tileTypes[pos.x + pos.y * map.numCols]}`).css({
                        left: (pos.x * map.tileWidth) + 'px',
                        top: (pos.y * map.tileHeight) + 'px'
                    });
                };

                this.tileInspector = new Dom('div').css({
                    border: '1px dotted white',
                    'background-color': 'rgba(0,0,0,.7)',
                    color: 'white',
                    width: `${map.tileWidth}px`,
                    height: `${map.tileHeight}px`,
                    'z-index': 10,
                    position: 'absolute',
                    'pointer-events': 'none'
                }).appendTo(this.target);
            }
            this.tileInspector.show();
            this.target.addEventListener('mousemove', this.moveHandler, false);
        } else {
            debugger;
            this.target.removeEventListener('mousemove', this.moveHandler);
            this.tileInspector.hide();
        }
    }

    /**
     * Get ready for events from NotificationManager
     * 
     * @param {String} eventList space-separated list of events to listen to
     * 
     */
    bindEvents(eventList) {
        NM.listen(eventList, this.onEvent.bind(this));
    }


    /**
     * Method that gets called when receiving an event: by default it does nothing
     * It's up to the developer to overwrite this method on its Game
     * 
     * @param {string} event the event name that got fired.
     * 
     */
    onEvent(event) {

    }


    /**
     * Toggles global sound
     * 
     * @param {boolean} bool Weather to enable or disable sound.
     * 
     */
    toggleSound(bool) {
        this.sound = bool;
        AudioManager.toggleSound(bool);
    }


    /**
     * Creates a new display
     * 
     * TODO: DESCRIBE
     * @param {Object}
     * @param {String|HTMLElement} The target of the display: this is were canvas elements will be added
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
        Input._init(this, {
            joystick: true
        });
    }


    /**
     * Calls when game is ready: DESCRIBE
     * 
     * @param {any} cb 
     * 
     */
    onReady(cb) {
        console.log('**this', this);
        cb.apply(this);
    }


    /**
     * Sets a new scene as the current scene
     * 
     * @param {Scene} scene instance to set as current Scene
     * @param {Boolean=false} resetMap set to true to reset the map
     * 
     */
    setScene(scene, resetMap = false) {
        if (this.scene) {
            console.log('need to stop scene');
            this.stopScene();
            this.scene.stop();
        }

        if (scene) {
            this.scene = scene;

            this.scene.setDisplay(this.display);

            this.display.clearDisplay();

            console.log('**resetMap', resetMap);
            this.startScene(resetMap);
        } else {
            console.warn('attempt to set non-existing scene:', scene);
        }
    }


    /**
     * This is the render scene loop that's get called at up to 60 times per second
     * 
     * @param {any} time since last frame was rendered
     * 
     * @private
     */
    _renderSceneLoop(time) {
        var scene = this.scene;

        if (this.running) {
            // if we are playing events, set on each frame
            // TODO: maybe we could throttle it for 1/2 frame
            if (Input.playingEvents) {
                Input.nextRecordedEvents();
            }

            this.animFrame = window.requestAnimationFrame(this._renderSceneLoop.bind(this));

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

        scene.run();

        if (this.running) {
            this.timeout = setTimeout(this._runSceneLoop.bind(this), 16);
        }
    }

    /**
     * Pauses the game: both loops are stopped so almost no cpu/gpu is used when calling it
     * 
     */
    togglePauseGame() {
        if (this.running) {
            console.log('pausing game');
            this.running = false;
            this.scene.pause();

            // be sure to render any changes from the scene before stopping refresh
            this.display.renderScene(this.scene);

            // then stop render/event loop
            this.stopScene();
        } else {
            console.log('un-pausing game');
            this.running = true;
            this.scene.unpause();
            this._runSceneLoop();
            this._renderSceneLoop();
        }
    }


    /**
     * Starts the current scene
     * 
     * @param {Boolean=false} resetMap resets the map associated to the map
     * 
     * - loads the scene if not already loaded
     * - once it's loaded calls scene.start() and start both event & render loops
     * 
     */
    startScene(resetMap = false) {
        console.log('[Game] startScene');

        if (this.scene) {
            console.log('[Game] loading scene');
            this.scene.load().then(() => {
                console.log('[Game] Scene', this.scene.name, 'loaded: starting run & render loops');
                debugger;
                this.scene.start(resetMap);
                this._runSceneLoop();
                this._renderSceneLoop();
            });
        } else {
            console.log('[Game] nothing to start: no scene selected!!');
        }
    }

    /**
     * Stops current scene from running: this will both halt render & event loops
     * 
     * Use Game.togglePauseGame() to temporarly pause a game
     * 
     */
    stopScene() {
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
