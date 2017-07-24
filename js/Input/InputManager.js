// import VirtualJoystick from 'Joystick';

/*jshint devel: true*/
/**
 * Handles keyboard input (joystick input doesn't work correctly yet).
 * 
 * Key presses are stored in a simple hash this.keyPressed with keyCode as key, and attached handlers are stored in
 * another hash this.keyCb.
 * 
 * The InputManager can also be used to record keystrokes which can then be played back to produce game demos for example.
 * 
 * @example
 * 
 * // example state of InputManager.keyPressed where `up` key is down and `down` key has just been released:
 * { 32: true, 40: false}
 * 
 */
const InputManager = {
    /**
     * A list of common keyCodes
     */
    keys: {
        'UP': 38,
        'DOWN': 40,
        'LEFT': 37,
        'RIGHT': 39,
        'SPACE': 32,
        'ENTER': 13,
        'ESCAPE': 27,
        'CTRL': 17
    },
    /**
     * List of common pad buttons
     */
    PAD_BUTTONS: {
        32: 1, // Face (main) buttons
        FACE_0: 1,
        FACE_3: 2,
        FACE_4: 3,
        LEFT_SHOULDER: 4, // Top shoulder buttons
        RIGHT_SHOULDER: 5,
        LEFT_SHOULDER_BOTTOM: 6, // Bottom shoulder buttons
        RIGHT_SHOULDER_BOTTOM: 7,
        SELECT: 8,
        START: 9,
        LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
        RIGHT_ANALOGUE_STICK: 11,
        38: 12, // Directional (discrete) pad
        40: 13,
        37: 14,
        39: 15
    },
    axes: {

    },
    // gamepadSupport: (!!navigator.webkitGetGamepads !!navigator.webkitGetGamepads || !!navigator.webkitGamepads) && navigator.webkitGetGamepads().length && navigator.webkitGetGamepads()[0],
    gamepadSupport: false,
    recording: false,
    playingEvents: false,
    playingPos: 0,
    recordedEvents: [],
    pad: null,
    keyPressed: {},
    padPressed: {},
    keyCb: {},
    gameRef: null,
    inputMode: 'keyboard',
    // virtual joystick instance
    dPadJoystick: null,
    jPollInterval: 0,
    /**
     * Initializes the InputManager with a reference to the game.
     * 
     * This method prepares the InputManager by reseting keyboard states/handlers and
     * set current inputMode
     * 
     * @param {Game} gameRef A reference to the game being used.
     * 
     * @private
     */
    _init: function (gameRef) {
        this.gameRef = gameRef;

        this._generateKeyCodes();

        this._installInputModeSwitchHandler();

        this._installKBEventHandlers();

        // this._initVirtualJoystick();

        this.setInputMode(this.inputMode);
    },
    /**
     * generates key char from key codes
     * 
     * @private
     */
    _generateKeyCodes: function () {
        for (let i = 65; i < 91; ++i) {
            this.keys[String.fromCharCode(i)] = i;
        }
    },
    /**
     * Private handler that is supposed to detect touchEvent and automatically switch between keyboard & touch
     * inputs. Unfortunately it tourned out to not be so easy.
     * 
     * @private
     */
    _installInputModeSwitchHandler: function () {
        // we cannot have several input devices (ie: keyboard, joystick,...) running at the same time
        // since they will interfer with each other (pressing a key will stop touch from working correctly)
        // we don't want the user to have to choose input mode using a menu or shortcut
        // instead, we want to have an automatic detection/switch of input mode which works like this:
        // by default, input mode if set to keyboard
        // if a touch is detected, input is set to joystick and kb detection is disabled
        // if a keydown is detected, joystick mode is disabled and kb detection is enabled
        document.addEventListener('touchstart', () => {
            this.setInputMode('joystick');
        });

        document.addEventListener('keydown', () => {
            this.setInputMode('keyboard');
        });
    },
    /**
     * Starts recording input events. They are stored into `InputManager.recordedEvents`
     */
    startRecordingEvents: function () {
        if (!this.recording) {
            this.recordedEvents.length = 0;
            this.recording = true;
            console.log('[InputManager] Starting record of input events!');
        }
    },
    /**
     * Stops recording events.
     */
    stopRecordingEvents: function () {
        this.recording = false;
        console.log('[InputManager] Stoping record of input events, recorded', this.recordedEvents.length, 'events');
    },
    /**
     * After events have been reccorded they can be played back using this method.
     */
    playRecordedEvents: function () {
        if (!this.playingEvents) {
            console.log('[InputManager] Starting to play an existing record of input events!');
            this.playingEvents = true;
            this.playPos = 0;
        }
    },
    /**
     * Sets next key states using recorded events
     * 
     * TODO: add an optional callback to be called at the end of the playback
     * so that demo can be looped.
     */
    nextRecordedEvents: function () {
        if (this.playingPos >= this.recordedEvents.length) {
            this.playingEvents = false;
            // TODO: reset keys so that movement does not continue
            this.keyPressed = {
                38: false,
                40: false,
                37: false,
                39: false,
                32: false,
                13: false,
                27: false,
                17: false
            };
            console.log('[InputManager] Reached the end of recorded events, resetting keys status to default!');
        } else {
            this.keyPressed = this.recordedEvents[this.playingPos++];
            // TODO: we should call any callback as well
            // for (keyCode in this.keyPressed) {
            //  if (this.keyPressed[keyCode] === true && this.keyCb[keyCode]) {
            //      this.keyCb[keyCode].down.fire();
            //  }
            // }
            //
        }
    },
    /**
     * Saves current event state onto the recordedEvents stack
     * 
     * @private
     */
    recordEvents: function () {
        /*            'UP': 38,
                    'DOWN': 40,
                    'LEFT': 37,
                    'RIGHT': 39,
                    'SPACE': 32,
                    'ENTER': 13,
                    'ESCAPE': 27,
                    'CTRL': 17*/
        this.recordedEvents.push(JSON.parse(JSON.stringify(this.keyPressed)));
    },
    /**
     * Changes input mode
     * 
     * @param {String} mode Changes current input mode, can be `virtual_joystick`, `keyboard`, `gamepad`
     */
    setInputMode: function (mode) {
        if (this.inputMode === mode) {
            return;
        }

        switch (mode) {
            case 'virtual_joystick':
                if (this.dPadJoystick) {
                    this.jPollInterval = setInterval(this._pollJoystick.bind(this), 1 / 30 * 1000);
                }
                break;

            case 'keyboard':
                this._clearJoystickPoll();
                break;

            case 'gamepad':
                this._clearJoystickPoll();
                this.jPollInterval = setInterval(this._pollGamepad.bind(this), 1 / 30 * 1000);
                break;
        }

        this._resetKeys();
        this.inputMode = mode;
    },
    /**
     * Resets keys that have been pressed.
     * 
     * @private
     */
    _resetKeys: function () {
        for (let key in this.keyPressed) {
            this.keyPressed[key] = false;
        }
    },
    /**
     * Checks for a new joystick to be connected onto the machine and changes the inputMode to `gamepad`
     * when a new joypad is detected.
     */
    _pollNewGamepad: function () {
        let gamepads = (navigator.getGamepads && navigator.getGamepads()) || (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;
        if (!this.pad && gamepads && gamepads.item() !== null) {
            this.pad = gamepads.item();

            if (!this.gamepadSupport) {
                console.log('[Event] Oh oh! Looks like we have a new challenger: ', this.pad.id);
                this.gamepadSupport = true;
                this.setInputMode('gamepad');
            }
        }
    },
    /**
     * 
     */
    _pollGamepad: function (key) {
        // normal buttons
        // if (key === this.keys.space) {
        //     if (this.pad.buttons[this.PAD_BUTTONS[key]].pressed === true) {
        //         this.padPressed[key] = true;
        //     } else {
        //         this.padPressed[key] = false;
        //     }
        // }

        // special case for dpad on Linux, cannot test on Windows since my pad does not support XInput...
        // d-pad
        if (this.pad.buttons[12].pressed) {
            this.keyPressed[this.keys['UP']] = true;
            this.keyPressed[this.keys['DOWN']] = false;
        } else if (this.pad.buttons[13].pressed) {
            this.keyPressed[this.keys['DOWN']] = true;
            this.keyPressed[this.keys['UP']] = false;
        } else {
            this.keyPressed[this.keys['DOWN']] = false;
            this.keyPressed[this.keys['UP']] = false;
        }

        if (this.pad.buttons[15].pressed) {
            this.keyPressed[this.keys['RIGHT']] = true;
            this.keyPressed[this.keys['LEFT']] = false;
        } else if (this.pad.buttons[14].pressed) {
            this.keyPressed[this.keys['LEFT']] = true;
            this.keyPressed[this.keys['RIGHT']] = false;
        } else {
            this.keyPressed[this.keys['LEFT']] = false;
            this.keyPressed[this.keys['RIGHT']] = false;
        }
        // stick 1
        /*
        if (this.pad.axes[1] === -1) {
            this.keyPressed[this.keys['UP']] = true;
            this.keyPressed[this.keys['DOWN']] = false;
        } else if (this.pad.axes[1] === 1) {
            this.keyPressed[this.keys['DOWN']] = true;
            this.keyPressed[this.keys['UP']] = false;
        } else {
            this.keyPressed[this.keys['DOWN']] = false;
            this.keyPressed[this.keys['UP']] = false;
        }

        if (this.pad.axes[0] === 1) {
            this.keyPressed[this.keys['RIGHT']] = true;
            this.keyPressed[this.keys['LEFT']] = false;
        } else if (this.pad.axes[0] === -1) {
            this.keyPressed[this.keys['LEFT']] = true;
            this.keyPressed[this.keys['RIGHT']] = false;
        } else {
            this.keyPressed[this.keys['LEFT']] = false;
            this.keyPressed[this.keys['RIGHT']] = false;
        }
        */
    },
    _getModifiers: function (event) {
        return {
            'ALT': true,
            'SHIFT': true,
            'CTRL': true,
            'META': true
        };
    },
    _initVirtualJoystick: function () {
        let dPadJoystick,
            fireJoystick;

        console.log('[InputManager] _initVirtualJoystick');

        // left joystick = view
        dPadJoystick = this.dPadJoystick = new VirtualJoystick({
            container: document.body,
            strokeStyle: 'cyan',
            limitStickTravel: true,
            mouseSupport: true,
            stickRadius: 60
        });

        dPadJoystick.addEventListener('touchStartValidation', function (event) {
            let touch = event.changedTouches[0];
            if (touch.pageX >= window.innerWidth / 2) {
                return false;
            }
            return true;
        });

        // right joystick = fire button
        fireJoystick = this.fireJoystick = new VirtualJoystick({
            container: document.body,
            strokeStyle: 'orange',
            limitStickTravel: true,
            mouseSupport: true,
            stickRadius: 0
        });

        fireJoystick.addEventListener('touchStartValidation', function (event) {
            let touch = event.changedTouches[0];
            if (touch.pageX < window.innerWidth / 2) {
                return false;
            }
            return true;
        });

        /* fire button */
        fireJoystick.addEventListener('touchStart', () => {
            if (this.inputMode === 'virtual_joystick') {
                this.keyPressed[this.keys['CTRL']] = true;
            }
        });

        fireJoystick.addEventListener('touchEnd', () => {
            if (this.inputMode === 'virtual_joystick') {
                this.keyPressed[this.keys['CTRL']] = false;
            }
        });
    },
    _clearJoystickPoll: function () {
        if (this.jPollInterval) {
            clearInterval(this.jPollInterval);
            this.jPollInterval = 0;
        }
    },
    _pollJoystick: function () {
        let down = [],
            up = [],
            joystick = this.dPadJoystick,
            fire = this.fireJoystick;

        /* directions */
        if (Math.abs(joystick.deltaX()) >= 10) {
            if (joystick.left()) {
                down.push('LEFT');
                up.push('RIGHT');
            } else {
                down.push('RIGHT');
                up.push('LEFT');
            }
        } else {
            up.push('LEFT');
            up.push('RIGHT');
        }

        if (Math.abs(joystick.deltaY()) >= 10) {
            if (joystick.up()) {
                down.push('UP');
                up.push('DOWN');
            } else {
                down.push('DOWN');
                up.push('UP');
            }
        } else {
            up.push('UP');
            up.push('DOWN');
        }

        if (down.length) {
            down.forEach((key) => {
                this.keyPressed[this.keys[key]] = true;
            });
        }

        if (up.length) {
            up.forEach((key) => {
                this.keyPressed[this.keys[key]] = false;
            });
        }

        // TODO: what happens for up event ? should be set to up only when going from down to up and called here
    },
    _installKBEventHandlers: function () {
        let gameRef = this.gameRef;

        // TODO: move me somewhere else!
        document.addEventListener('keydown', (event) => {

            if (this.inputMode !== 'keyboard' || this.playingEvents) {
                return;
            }

            switch (event.keyCode) {
                case 32:
                case 37:
                case 38:
                case 39:
                case 40:
                    event.preventDefault();
                    break;
            }

            if (event.keyCode) {
                this.keyPressed[event.keyCode] = true;
            }

            // console.log('keydown', event.keyCode, '<-', this.keyPressed[37], '->', this.keyPressed[39]);

            this.metas = this._getModifiers();

            if (this.keyCb[event.keyCode] && gameRef && gameRef.running) {
                this.keyCb[event.keyCode].down.forEach((callback) => { callback(); });
            }
        });

        document.addEventListener('keyup', (event) => {
            if (this.inputMode !== 'keyboard' || this.playingEvents) {
                return;
            }

            if (event.keyCode) {
                this.keyPressed[event.keyCode] = false;
            }

            // console.log('keyup', event.keyCode, '<-', this.keyPressed[37], '->', this.keyPressed[39]);

            this.metas = this._getModifiers();

            if (this.keyCb[event.keyCode] && gameRef && gameRef.running) {
                this.keyCb[event.keyCode].up.forEach((callback) => { callback(); });
            }
        });
    },
    getAllKeysStatus: function () {
        const keys = Object.keys(this.keys),
            result = {};

        for (let i = 0; i < keys.length; ++i) {
            result[array[i]] = this.getKeyStatus(array[i]);
        }

        return result;
    },
    getKeyStatus: function (key, reset) {
        let keyPressed;

        try {
            // GamePad insertion polling disabled
            // seems like Chrome & FF have different methods
            // current one only works with Chrome and I don't
            // want to waste time adding configuration for both
            // until spec if fully defined and not experimental
            // this._pollNewGamepad();

            /*
            if (this.pad) {
                this._pollGamepad(key);
            }
            */

            keyPressed = this.keyPressed[key] || this.padPressed[key];

            if (keyPressed && reset === true) {
                this.keyPressed[key] = '';
            }

            return keyPressed;

        } catch (err) {
            debugger;
            return false;
        }
    },

    isKeyDown: function (key) {
        var keyCode = typeof key === 'string' && this.keys[key] || key;

        return this.getKeyStatus(keyCode);
    },

    installKeyCallback: function (key, event, callback) {
        let keyCode = this.keys[key];

        if (!this.keyCb[keyCode]) {
            this.keyCb[keyCode] = {
                up: [],
                down: []
            };
        }

        this.keyCb[keyCode][event].push(callback);
    },

    removeKeyCallback: function (key, event, callback) {
        const index = this.keyCb[key][event].indexOf(callback);
        if (index > -1) {
            this.keyCb[key][event].splice(index, 1);
        }

    },
    clearEvents: function () {
        this.keyPressed = {};
        this.keyCb = {};
    }
};

window.InputManager = InputManager;

export default InputManager;