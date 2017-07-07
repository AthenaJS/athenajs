(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AthenaJS"] = factory();
	else
		root["AthenaJS"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* exports provided: default */
/* exports used: default */
/*!*****************************!*\
  !*** ./js/Core/Deferred.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es6_promise__ = __webpack_require__(/*! es6-promise */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es6_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_es6_promise__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * Simple wrapper for ES6 native Promise
 */

var Deferred = function Deferred() {
    var _this = this;

    _classCallCheck(this, Deferred);

    this.promise = new __WEBPACK_IMPORTED_MODULE_0_es6_promise___default.a(function (resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
    });
};

/* harmony default export */ __webpack_exports__["a"] = (Deferred);

/***/ }),
/* 1 */
/* exports provided: default */
/* exports used: default */
/*!*********************!*\
  !*** ./js/FX/FX.js ***!
  \*********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_FX_Effect_Fade__ = __webpack_require__(/*! FX/Effect/Fade */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_FX_Effect_Rotate__ = __webpack_require__(/*! FX/Effect/Rotate */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_FX_Effect_Custom__ = __webpack_require__(/*! FX/Effect/Custom */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_FX_Effect_Mosaic__ = __webpack_require__(/*! FX/Effect/Mosaic */ 27);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Mosaic from 'Mosaic';





/*jshint devel: true, bitwise: false*/
var effects = {},
    easing = {};

var FX = function () {
    function FX() {
        _classCallCheck(this, FX);

        // by default, add linear easing, other easing are defined in Easing.js and may be added at runtime
        this.addEasing('linear', function (t) {
            return t;
        });
    }

    _createClass(FX, [{
        key: 'addFX',
        value: function addFX(fxName, fxClass) {
            effects[fxName] = fxClass;
        }
    }, {
        key: 'getEffect',
        value: function getEffect(fxName) {
            return effects[fxName];
        }
    }, {
        key: 'addEasing',
        value: function addEasing(easingName, easingFn) {
            easing[easingName] = easingFn;
        }
    }, {
        key: 'getEasing',
        value: function getEasing(easingName) {
            return easing[easingName];
        }
    }]);

    return FX;
}();

;

var instance = new FX();

instance.addFX('Mosaic', __WEBPACK_IMPORTED_MODULE_3_FX_Effect_Mosaic__["a" /* default */]);
instance.addFX('Fade', __WEBPACK_IMPORTED_MODULE_0_FX_Effect_Fade__["a" /* default */]);
instance.addFX('Rotate', __WEBPACK_IMPORTED_MODULE_1_FX_Effect_Rotate__["a" /* default */]);
instance.addFX('Custom', __WEBPACK_IMPORTED_MODULE_2_FX_Effect_Custom__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (instance);

/***/ }),
/* 2 */
/* exports provided: default */
/* exports used: default */
/*!************************!*\
  !*** ./js/Map/Tile.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint devel: true, bitwise: false*/
var Tile = function () {
	function Tile(options) {
		_classCallCheck(this, Tile);

		this.offsetX = options.offsetX || 0;
		this.offsetY = options.offsetY || 0;
		this.width = options.width || 0;
		this.height = options.height || 0;

		// move
		this.inertia = options.inertia || 1; // this is the inertia factor
		this.upCollide = options.upCollide || true; // will object collide when dropping over this tile ?
		this.downCollide = options.downCollide || true;
	}

	_createClass(Tile, null, [{
		key: "TYPE",
		get: function get() {
			return {
				AIR: 1,
				WALL: 2,
				LADDER: 3
			};
		}
	}]);

	return Tile;
}();

;

/* harmony default export */ __webpack_exports__["a"] = (Tile);

/***/ }),
/* 3 */
/* exports provided: default */
/* exports used: default */
/*!****************************************!*\
  !*** ./js/Object/Behavior/Behavior.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint devel: true, bitwise: false*/
/**
 * Base class for behaviors.
 * 
 * A behavior is a class that describes how a graphical object moves during the time.
 * 
 * Every behavior should implement these two methods:
 * 
 * - onMove()
 * - getMapEvent()
 * 
 * @param {Sprite} sprite The sprite to attach the behavior to.
 * @param {InputManager} Input A reference to the InputManager.
 * @param {Object} options An hash with behavior-specific properties.
 * @param {Number} [options.gravity=0] The object's gravity.
 * @param {Number} [options.vx=0] The object's horizontal velocity.
 * @param {Number} [options.vy=0] The object's vertical velocity.
 * @param {Function} [options.onVXChange=undefined] An optional callback to call when changing vx direction
 * @param {Function} [options.onVYChange=undefined] An optional callback to call when changing vy direction
 *
 */
var Behavior = function () {
    function Behavior(sprite, Input, options) {
        _classCallCheck(this, Behavior);

        this.sprite = sprite;
        this.Input = Input;
        sprite.gravity = typeof options.gravity !== 'undefined' ? options.gravity : 0;
        sprite.vx = typeof options.vx !== 'undefined' ? options.vx : 0;
        sprite.vy = typeof options.vy !== 'undefined' ? options.vy : 0;
        this.checkWalls = options.checkWalls || false;
        this.checkFall = options.checkFall || false;

        this.onVXChange = options.onVXChange || null;
        this.onVYChange = options.onVYChange || null;
    }

    _createClass(Behavior, [{
        key: 'onMove',
        value: function onMove(t) {
            // does nothing
        }
    }, {
        key: 'getMapEvent',
        value: function getMapEvent() {
            return this.sprite.currentMap.mapEvent;
        }
    }]);

    return Behavior;
}();

;

/* harmony default export */ __webpack_exports__["a"] = (Behavior);

/***/ }),
/* 4 */
/* exports provided: default */
/* exports used: default */
/*!*****************************!*\
  !*** ./js/Object/Object.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_FX_FX__ = __webpack_require__(/*! FX/FX */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Object_Behavior_Behaviors__ = __webpack_require__(/*! Object/Behavior/Behaviors */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Input_InputManager__ = __webpack_require__(/*! Input/InputManager */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Audio_AudioManager__ = __webpack_require__(/*! Audio/AudioManager */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__ = __webpack_require__(/*! Core/Deferred */ 0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







/*jshint devel: true, bitwise: false*/
/*globals Class*/
/**
 * `GfxObject` is the base class for objects that can be rendered on the screen.
 * 
 * A `GfxObject` has properties like x, y, vx, vy, speed.
 * In order to be rendered, an object must be added onto the active scene/map.
 * It can also have an optional behavior which tells Athena how
 * to move an object at each frame.
 * 
 * @param {string} type The type of object: this describes the type of object
 * @param {Object} options
 * @param {string} [options.objectId] The id of the object. The defaults is type + random timestamp.
 * @param {number} [options.collideGroup=0] The type of collision to use for the object.
 * @param {boolean} [options.master=false] Set to true if the object should be the master.
 * @param {boolean} [options.visible=true] An invisible object isn't rendered onto the screen.
 */

var GfxObject = function () {
  function GfxObject(type, options) {
    _classCallCheck(this, GfxObject);

    this.type = type;
    this.id = options.objectId || this.type + new Date().getTime();

    this.currentMap = null;
    this.currentScene = null;

    // can be used to delay object destroy
    this._destroyed = false;

    this.children = [];

    this.wave = options.wave || null;

    this.behavior = null;

    // is player on a platform ?
    this.platform = null;

    // 0 == master (player)
    // 1 == enemies (inc. enemy bullets, gems, bonuses,...)
    // 2 == friend bullets
    this.collideGroup = options.collideGroup || 0;
    this.canCollideFriendBullet = options.canCollideFriendBullet || false;

    this.master = options.master || false;

    if (options.behavior) {
      console.log('need to set move to', options.behavior);
      this.setBehavior(options.behavior, options.behaviorOptions);
    }

    // save settings for re-use
    this._settings = Object.assign({
      speed: 1,
      visible: true,
      canCollide: false,
      plane: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      scale: 1.0,
      angle: 0,
      moving: true,
      gravity: 0,
      data: {},
      path: null,
      target: null,
      targetOffsetX: 0,
      targetOffsetY: 0,
      wave: options.wave || null
    }, options);
    /*            {
            speed: options.speed || 1,
            visible: options.visible || true,
            canCollide: options.canCollide || false,
            plane: options.plane || 0,
            x: options.x || 0,
            y: options.y || 0,
            scale: options.scale || 1.0,
            angle: 0,
            moving: typeof options.moving !== 'undefined' ? options.moving : true,
            gravity: typeof options.gravity !== 'undefined' ? options.gravity : 0,
            data: options.data || {},
            path: null,
                    target: options.target || null,
                    targetOffsetX: options.targetOffsetX || 0,
                    targetOffsetY: options.targetOffsetY || 0
          };*/

    // this._data = options.data || {};
    // console.log('settings set', this._settings);

    this.target = null;

    this.spline = null;

    this.currentMovement = '';

    this.fxQueue = {};

    if (!options.pool) {
      // only set option if not from pool since pool elements are intantiated with
      // fake data: we don't want to reset them yet
      this.reset();

      if (options.animate) {
        this.animate(options.animate.name, options.animate.options);
      }
    }

    if (options.scene) {
      debugger;
      options.scene.addObject(this);
      return;
    } else if (options.map) {
      debugger;
      return;
      options.map.addObject(this);
    }
  }

  /**
   * Resets the map, used when player lost for example.
   * 
   * `speed`,  `visible`, `canCollide`, `plane`, `x`, `y`, `scale`, `angle`, `moving`,
   * `vx` , `vy`, `gravity`, `wave`
   * 
   */


  _createClass(GfxObject, [{
    key: 'reset',
    value: function reset() {
      this.speed = this._settings.speed;
      this.visible = this._settings.visible;
      this.canCollide = this._settings.canCollide;
      this.plane = this._settings.plane;
      this.x = this._settings.x;
      this.y = this._settings.y;
      this.scale = this._settings.scale;
      this.angle = this._settings.angle;
      this.moving = this._settings.moving;

      this.data = this._settings.data;

      this.path = null;

      this.vx = this._settings.vx || 0;
      this.vy = this._settings.vy || 0;

      this.gravity = this._settings.gravity;

      // handlers
      this.moveHandlers = [];

      this.targetOffsetX = this._settings.targetOffsetX || 0;
      this.targetOffsetY = this._settings.targetOffsetY || 0;
      this.target = this._settings.target || null;

      this.savedX = this.x;
      this.savedY = this.y;

      this.wave = this._settings.wave;
    }

    /**
     * Sets the map of the object.
     * 
     * @param {Map} map The map of the object.
     * 
     * @note you don't usually need to call this method as it's called automatically when adding an object
     * onto a map.
     * 
     */

  }, {
    key: 'setMap',
    value: function setMap(map) {
      this.currentMap = map;

      this.children.forEach(function (child) {
        child.setMap(map);
      });
    }

    /**
     * Sets the scene of the object.
     * 
     * @param {Scene} scene The scene of the object.
     * 
     * @note you don't usually need to call this method as it's called when adding an object onto a scene.
     */

  }, {
    key: 'setScene',
    value: function setScene(scene) {
      this.currentScene = scene;

      this.children.forEach(function (child) {
        child.setScene(scene);
      });
    }

    /**
     * WIP Sets the platform of the object. This will be used when platforms will be fully implemented.
     * 
     * @param {GfxObject} platform The platform the object is attached to.
     */

  }, {
    key: 'setPlatform',
    value: function setPlatform(platform) {
      this.platform = platform;
    }

    /**
     * Moves the object to a new destination.
     * 
     * @param {number} The new horizontal position.
     * @param {number} The new vertical position.
     * 
     * @returns {GfxObject} this
     */

  }, {
    key: 'moveTo',
    value: function moveTo(x, y) {
      this.x = x;
      this.y = y;
      this._onMove();

      return this;
    }

    /**
     * Centers the object into the scene.
     * 
     * @returns {GfxObject} this
     */

  }, {
    key: 'center',
    value: function center() {
      var display = this.currentScene.display;

      this.x = (display.width - this.w) / 2;
      this.y = (display.height - this.h) / 2;
      return this;
    }

    /**
     * Sets a new behavior to the object: this will be called in the move loop
     * 
     * @param {String} name The name of the behavior to use.
     * @param {Object} options The options of the behavior (may depend on the behavior type)
     * 
     * @related {Behavior}
     */

  }, {
    key: 'setBehavior',
    value: function setBehavior(name, options) {
      this.behavior = new (__WEBPACK_IMPORTED_MODULE_1_Object_Behavior_Behaviors__["a" /* default */].getBehavior(name))(this, __WEBPACK_IMPORTED_MODULE_2_Input_InputManager__["a" /* default */], options);
    }

    /**
     * You can call clearBehavior if you want to stop using a particular behavior.
     * 
     * The vx and vy properties of the object will be set to zero.
     */

  }, {
    key: 'clearBehavior',
    value: function clearBehavior() {
      this.vx = this.vy = 0;
      this.behavior = null;
    }

    /**
     * Called on each move loop and used to move the object using its (optional) behavior or its
     * vx and vy properties.
     * 
     * @private
     */

  }, {
    key: 'move',
    value: function move() {
      if (this.moving) {
        if (!this.behavior) {
          // TODO: check map to see if we can move
          this.x += this.vx;
          this.y += this.vy;

          // gravity impacts velocity
          this.vy -= this.gravity;
        } else {
          this.behavior.onMove();
        }

        if (this.children.length) {
          this.children.forEach(function (child) {
            child.move();
          });
        }

        // TODO: check map to see if we can move
        /*                this.x += this.vx;
                    this.y += this.vy;                */
      }
    }

    /**
     * Saves current object position into `savedX` and `savedY` properties
     */

  }, {
    key: 'savePosition',
    value: function savePosition() {
      this.savedX = this.x;
      this.savedY = this.y;
    }

    /**
     * Returns previously seved position
     * 
     * @returns {Object} The saved position
     */

  }, {
    key: 'getSavedPosition',
    value: function getSavedPosition() {
      return {
        x: this.savedX,
        y: this.savedY
      };
    }

    /**
     * NOT IMPLEMENTED
     * 
     * @private
     */

  }, {
    key: 'moveWithSpline',
    value: function moveWithSpline() /*speed*/{}

    /**
     * Sets a new path for the object
     * 
     * @param {Path} path The new path that the object will use when moving.
     * 
     * @related {Path}
     */

  }, {
    key: 'setPath',
    value: function setPath(path) {
      this.path = path;
    }

    /**
     * Change the scale of the object
     * 
     * @param {number} scale The new scale of the object.
     * 
     * @note: it's only used when rendering, collision detection is not using the scale yet.
     */

  }, {
    key: 'setScale',
    value: function setScale(scale) {
      this.scale = scale;
    }

    /**
     * Change the angle of an object
     * 
     * @param {number} angle The new angle of the object. 0 < angle < 360
     * 
     * @note This property is only used for the rendering and it's ignored for collisions.
     */

  }, {
    key: 'setAngle',
    value: function setAngle(angle) {
      // this.angle = angle * Math.PI / 180;
      this.angle = angle;
    }

    /**
     * Returns the angle property of the object.
     */

  }, {
    key: 'getAngle',
    value: function getAngle() {
      return this.angle;
      // return 180 * this.angle / Math.PI;
    }

    /**
     * WIP Performs a transformation on the object
     * 
     * @private
     */

  }, {
    key: 'transform',
    value: function transform(type, value) {
      switch (type) {
        case 'scale':
          this.scale = value;
          break;
      }
    }

    /**
     * Hides the object
     * 
     * @returns {GfxObject} this
     */

  }, {
    key: 'hide',
    value: function hide() {
      this.visible = false;

      return this;
    }

    /**
     * Show the object
     * 
     * @returns {GfxObject} this
     */

  }, {
    key: 'show',
    value: function show() {
      this.visible = true;

      return this;
    }

    /**
     * Returns the current width of the object: with some types of GfxObjects ({Sprite}),
     * width can vary
     * 
     * @returns {number} The current width of the object
     * 
     * @related {Sprite}
     */

  }, {
    key: 'getCurrentWidth',
    value: function getCurrentWidth() {
      return this.width;
    }

    /**
     * Returns the current height of the object: with some types of GfxObjects ({Sprite}),
     * height can vary
     * 
     * @returns {number} The current height of the object
     * 
     * @related {Sprite}
     */

  }, {
    key: 'getCurrentHeight',
    value: function getCurrentHeight() {
      return this.height;
    }

    // TODO: should return the type of sprite ?
    // TODO: should check map ?
    // TODO: handle scale/rotation here !!
    /**
     * Performs collision tests on the specifed object.
     * 
     * @param {GfxObject} obj The object to perform test on
     * 
     * @returns {Boolean} Returns true if this and obj collide
     */

  }, {
    key: 'hitTest',
    value: function hitTest(obj) {
      var hitBox = obj.getHitBox(),
          found = false;

      if (this.canCollide && obj.canCollide && this !== obj && this.visible) {
        var spriteHitBox = this.getHitBox(),
            box = {
          x: this.x + spriteHitBox.x,
          y: this.y + spriteHitBox.y,
          x2: this.x + spriteHitBox.x + spriteHitBox.x2,
          y2: this.y + spriteHitBox.y2 + spriteHitBox.y
        };

        if (box.y < obj.y + hitBox.y && box.y2 > obj.y + hitBox.y || box.y > obj.y + hitBox.y && box.y < obj.y + hitBox.y + hitBox.y2) {
          if (box.x < obj.x + hitBox.x && box.x2 > obj.x + hitBox.x || box.x > obj.x + hitBox.x && box.x < obj.x + hitBox.x + hitBox.x2) {
            // console.log('collision detected with', sprite.id);
            obj.onCollision(this);
            this.onCollision(obj);

            found = true;
          }
        }
      }

      if (!found) {
        var max = this.children.length,
            i = 0;

        while (!found && i < max) {
          found = this.children[i].hitTest(obj);
          i++;
        }
      }
      return found;
    }

    /**
     * WIP: Set a new target for the object
     * 
     * It's planned to have the ability for objects to follow other objects, for example:
     * homing missiles, etc...
     * 
     * @private
     */

  }, {
    key: 'setTarget',
    value: function setTarget(obj) {
      this.target = obj;
    }

    /**
     * Add a new handler to be called after each move of the object
     * 
     * @param {Function} cb The callback to add
     */

  }, {
    key: 'addMoveHandler',
    value: function addMoveHandler(cb) {
      this.moveHandlers.push(cb);
    }

    /**
     * onHit is called when the object collides with another object
     * 
     * @param {GfxObject} obj The object that collided.
     * 
     * This function does nothing interesting: this should be extended if needed.
     */

  }, {
    key: 'onHit',
    value: function onHit(obj) {
      console.log('[GfxObject] oops, ', this.type, ' [', this.id, '] ', 'was hit by', obj.name, ' [', obj.id, ']');
    }

    /**
     * INTERNAL: calls move handles
     * 
     * @private
     */

  }, {
    key: '_onMove',
    value: function _onMove() {
      var args = [this.x, this.y];
      this.moveHandlers.forEach(function (callback) {
        return callback.apply(undefined, args);
      });
    }

    /**
     * INTERNAL: checks if object fx queue is empty
     * 
     * @returns {Boolean} True if the queue is empty, false otherwise.
     * 
     * @private
     */

  }, {
    key: 'isFxQueueEmpty',
    value: function isFxQueueEmpty() {
      for (var i in this.fxQueue) {
        return false;
      }

      return true;
    }

    /**
     * Performs an animation on the object using one of the defined {FX} effects
     * 
     * Effects change the object size/position using an interpolation function.
     * 
     * Athena has the following effects:
     * - {Fade} performs a fade
     * - {Mosaic} performs a SNES-like mosaic effect
     * - {Rotate} performs a rotation on the object
     *
     * @param {String} fxName the name of the effect to use.
     * @param {Object} options the options of the effect.
     * @param {String} [options.easing="linear"] The easing functions to use, can be: 'linear', 'swing', 'easeInQuad', 'easeOutBounce'.
     * 
     * @returns {Promise} a promise that will be fullfilled when the effect has been completed
     */

  }, {
    key: 'animate',
    value: function animate(fxName, options) {
      var _this = this;

      // console.log('animate');
      var fxClass = __WEBPACK_IMPORTED_MODULE_0_FX_FX__["a" /* default */].getEffect(fxName),
          promise = new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */]().resolve(),
          easing = options.easing || 'linear',
          fx = void 0;

      if (typeof this.fxQueue[fxName] !== 'undefined') {
        console.warn('Fx', fxName, 'already in progress, cannot execute twice');
      } else if (!fxClass) {
        console.warn('Fx', fxName, 'unknown: did you spell it correctly ?');
      } else {
        fx = new fxClass(options);
        fx.setEasing(new __WEBPACK_IMPORTED_MODULE_0_FX_FX__["a" /* default */].getEasing(easing));

        promise = fx.start().then(function () {
          // console.log('effect ended, need to stop it', fxName);
          delete _this.fxQueue[fxName];
        });

        this.fxQueue[fxName] = fx;
      }

      return promise;
    }

    /**
     * Stop current running animation
     * 
     * In some cases, the game may need to stop effects from running before
     * they are completed. This method proves a way to do so and set an end value.
     * 
     * @param {any} The end value of the animation
     */

  }, {
    key: 'stopAnimate',
    value: function stopAnimate(setEndValue) {
      var _this2 = this;

      var fxObject = null;

      // console.log('need to stop animation');
      Object.keys(this.fxQueue).forEach(function (fxName) {
        fxObject = _this2.fxQueue[fxName];

        fxObject.stop(setEndValue);
      });
      // for (let fxName in this.fxQueue) {

      // }
    }

    /**
     * Perform each fx remaining in the fxQueue
     * 
     * @param {CanvasContext} ctx Where to perform the rendering.
     * @param {number} time The current time ellapsed since fx queue was started.
     * 
     * @private
     */

  }, {
    key: 'executeFx',
    value: function executeFx(ctx, time) {
      var _this3 = this;

      var fxObject = null;

      Object.keys(this.fxQueue).forEach(function (fxName) {
        fxObject = _this3.fxQueue[fxName];

        fxObject.process(ctx, null, _this3, time);
      });
      // for (var fxName in this.fxQueue) {
      //     fxObject = this.fxQueue[fxName];

      //     fxObject.process(ctx, null, this, time);
      // }
    }

    /**
     * onCollision is called on each collision with the object.
     * 
     * This method does nothing and should be extended if needed.
     * 
     */

  }, {
    key: 'onCollision',
    value: function onCollision() {}
    //console.log('onCollision does nothing by default');


    /**
     * Add a new Child to the object.
     * 
     * Childs are automatically rendered and moved when the parent object is.
     * 
     * @param {GfxObject} child The child to add.
     * 
     * @note children are automatically added to the scene/map of the parent object.
     */

  }, {
    key: 'addChild',
    value: function addChild(child) {
      child.setMap(this.currentMap);
      child.setScene(this.currentScene);

      this.children.push(child);
    }

    /**
     * Remove a child from the object
     * 
     * @param {GfxObject} child The child to remove from the object.
     * 
     * @note: removing a child object will call its `destroy` method
     */

  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      var idx = this.children.indexOf(child);

      if (idx > -1) {
        this.children[idx].destroy();
        this.children.splice(idx, 1);
      }
    }

    /**
     * Remove every children from the object
     */

  }, {
    key: 'removeAllChildren',
    value: function removeAllChildren() {
      for (var i = 0; i < this.children.length; ++i) {
        this.children[i].destroy();
      }
      this.children.length = 0;
    }

    /**
     * This method is called when drawing an object
     * 
     * GfxObject is a virtual object so its drawing method does nothing
     * 
     * Every Object inheriting from GfxObject should implement its own draw method.
     * 
     * @param {CanvasContext} destCtx the target canvas rendering context.
     * @param {Boolean} debug Debug is set to true if the game is being debugged.
     */

  }, {
    key: 'draw',
    value: function draw(destCtx, debug) {
      console.error('[GfxObject] you need to define a draw method for your object, GfxObjects do not have a draw method');
    }

    /**
     * Plays the spcified sound
     * 
     * @param {String} id The id of the sound to play
     * @param {Object} options
     * @param {Boolean} [options.pan=true] Set pan to true if you want to use panning.
     * @param {Boolean} [options.loop=false] Set to true to loop the sound.
     */

  }, {
    key: 'playSound',
    value: function playSound(id, options) {
      var panning = 0,
          map = this.currentMap,
          volume = 1.0,
          opt = options || {
        pan: true,
        loop: false
      };

      // volume: outside of screen = volume down
      if (map && (this.x < -map.viewportX || this.x > -map.viewportX + map.viewportW) || this.y < -map.viewportY || this.y > -map.viewportY + map.viewportH) {
        volume = 0.2;
      }

      // panning depends on player position
      if (map && opt.pan) {
        panning = this.x < map.masterObject.x ? -5 : 5;
      }

      this.sound = __WEBPACK_IMPORTED_MODULE_3_Audio_AudioManager__["a" /* default */].play(id, opt.loop || false, volume, panning);
    }

    /**
     * WIP
     * 
     * @private
     */
    // does nothing by default, must be redefined if needed

  }, {
    key: 'setImage',
    value: function setImage(image) {}

    /**
     * Draws a box around objects. This method is called when debugging is enabled.
     * 
     * @param {CanvasContext} ctx The context where to draw the box
     */

  }, {
    key: 'showObjectBox',
    value: function showObjectBox(ctx) {
      ctx.strokeStyle = 'rgb(0,230,0)';
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.w + this.x, this.y);
      ctx.lineTo(this.w + this.x, this.y + this.h);
      ctx.lineTo(this.x, this.y + this.h);
      ctx.lineTo(this.x, this.y);
      ctx.closePath();
      ctx.stroke();
    }

    // 1. remove from pool, if pooled object
    // 2. remove from map or scene
    /**
     * Destroy is called when an object is removed from a scene or object
     * 
     * @note calling destroy on a parent will automatically call the destroy method of each child.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this._destroyed = true;

      if (typeof this.freeFromPool === 'function') {
        this.freeFromPool();
      }

      if (this.currentMap) {
        this.currentMap.removeObject(this);
      } else if (this.currentScene) {
        this.currentScene.removeObject(this);
      }

      this.children.forEach(function (child) {
        child.destroy();
      });
    }
  }]);

  return GfxObject;
}();

;

/* harmony default export */ __webpack_exports__["a"] = (GfxObject);

/***/ }),
/* 5 */
/* exports provided: default */
/* exports used: default */
/*!**********************************!*\
  !*** ./js/Audio/AudioManager.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*jshint devel: true*/
/**
 * `AudioManager` handles playback of audio files loaded using the `ResourceManager`
 * 
 * @property {Object} audioCache An hash that stores in-use sounds.
 * The key is the id of the sound.
 * @property {boolean} enabled This is set to false when sound playback is disabled.
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    audioCache: {},
    enabled: true,
    /**
     * Adds a new sound element to the audio cache.
     * *Note* if a sound with the same id has already been added, it will be replaced
     * by the new one.
     * 
     * @param {String} id
     * @param {HTMLAudioElement} element
     */
    addSound: function addSound(id, element) {
        this.audioCache[id] = element;
    },
    /**
     * Toggles global sound playback
     * 
     * @param {Boolean} bool whether to enabled or disable sound playback.
     */
    toggleSound: function toggleSound(bool) {
        this.enabled = bool;
    },
    /**
     * Plays the specified sound with `id`.
     * 
     * @param {String} id
     * @param {Boolean} loop
     * @param {Float} volume
     * @param {Float} panning
     * @returns the created sound instance
     */
    play: function play(id, loop, volume, panning) {
        var instance = null,
            sound = null;

        if (!this.enabled) {
            return;
        }

        try {
            sound = this.audioCache[id];
        } catch (err) {
            console.warn('[AM] WARN: unable to play sound', id);
            return;
        }

        if (typeof sound === 'undefined') {
            return;
        }

        if (typeof sound.loop === 'function') {
            sound.loop(loop || false);
        } else {
            sound.loop = loop || false;
        }

        instance = sound.play({
            panning: [panning || 0, 0, 5],
            volume: volume || 1,
            loop: loop || false
        });

        return instance;
    },
    /**
     * Stops playing the sound id
     * 
     * @param {any} id
     * @param {any} instanceId
     * @returns
     */
    stop: function stop(id, instanceId) {
        var sound = null;

        if (!this.enabled) {
            return;
        }

        try {
            sound = this.audioCache[id];
        } catch (err) {
            console.warn('[AM] WARN: unable to stop sound', id);
            return;
        }

        if (sound && typeof sound.stop === 'function') {
            sound.stop(instanceId || undefined);
        }
    }
});

/***/ }),
/* 6 */
/* exports provided: default */
/* exports used: default */
/*!****************************************!*\
  !*** ./js/Resource/ResourceManager.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Binary_Binary__ = __webpack_require__(/*! Binary/Binary */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Audio_AudioManager__ = __webpack_require__(/*! Audio/AudioManager */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Core_Pool__ = __webpack_require__(/*! Core/Pool */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_web_audio_daw__ = __webpack_require__(/*! web-audio-daw */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_web_audio_daw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_web_audio_daw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__ = __webpack_require__(/*! Core/Deferred */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_Core_Dom__ = __webpack_require__(/*! Core/Dom */ 7);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };








// build a new object instance without using new
function newObject(Obj) {
    return new (Obj.bind.apply(Obj, arguments))();
}

/*jshint devel: true, bitwise: false*/
"use strict";
/**
 * Handles resource loading at runtime
 * 
 * Resources are loaded and retrieved using this manager.
 * 
 * The ResourceManager can load at runtime the folowing types of resources:
 *  - Images
 *  - Sounds
 *  - Maps (JSON-based)
 * 
 */
/* harmony default export */ __webpack_exports__["a"] = ({
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
            def: new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */](),
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
     * @param {String="any"} group the group to get the resource from
     * @param {Boolean=false} fullObject returns the resource object if true. Otherwise return the resource only.
     */
    getResourceById: function getResourceById(id, group, fullObject) {
        // console.log('[RM] getting resource', id);
        group = group || 'any';

        var rsGroup = this.resources[group].res,
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

            if (resource) {
                return resource.default;
            } else {
                debugger;
                console.warn('[RM] WARN: could not find resource', id);
            }
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
    newResourceFromPool: function newResourceFromPool(id) {
        var resource = this.getResourceById(id);

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
    _createGroup: function _createGroup(groupName) {
        if (!this._groupExists(groupName)) {
            this.resources[groupName] = {
                def: new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */](),
                loadedRes: 0,
                numRes: 0,
                res: {},
                progressCb: null,
                errorCb: null
            };
        } else {
            this.resources[groupName].def = new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */]();
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
    _groupExists: function _groupExists(groupName) {
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
    addResources: function addResources(resource, group) {
        group = group || 'any';

        this._createGroup(group);

        var i = void 0,
            resGroup = this.resources[group];

        if (resource !== null) {
            if ((typeof resource === 'undefined' ? 'undefined' : _typeof(resource)) === 'object' && resource.constructor === Array) {
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
    loadNextResource: function loadNextResource(groupName) {
        var group = this.resources[groupName],
            i = void 0;

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
     * @param {String} group The name of the group to load
     * @param {Function=undefined} progressCb an optionnal progress callback
     * @param {Function=undefined} errorCb an optionnal error callback
     * 
     */
    loadResources: function loadResources(group, progressCb, errorCb) {
        var _this = this;

        group = group || 'any';

        if (this.loading === true) {
            console.warn('[ResourceManager] loadResources() -> already loading');
            return;
        } else {
            this.loading = true;
        }

        var resGroup = this.resources[group],
            nextRes = null,
            i = void 0,
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

        resGroup.gpTimeout = setTimeout(function () {
            var notLoaded = [],
                resId;

            if (resGroup.gpTimeout && resGroup.def.state() === 'rejected') {
                resGroup.gpTimeout = null;

                console.error('[RM] Unable to load the following resources after', _this.groupMaxTime / 1000, 'sec');
                for (resId in resGroup.res) {
                    if (!resGroup.res[resId].loaded) {
                        notLoaded.push('[' + resGroup.res[resId].type + '] ' + resId);
                        console.warn('[' + resGroup.res[resId].type + '] ' + resId + ': ' + resGroup.res[resId].src);
                    }
                }

                // TODO: pass what was loaded, and what was not to the error callback...
                if (resGroup.errorCb) {
                    resGroup.errorCb('Unable to get all resources after', _this.groupMaxTime, notLoaded);
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
    getCanvasFromImage: function getCanvasFromImage(image) {
        var canvas = document.createElement('canvas');

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        canvas.getContext('2d').drawImage(image, 0, 0);

        return canvas;
    },
    /**
     * starts loading an image
     * 
     * @param {Object} res an Object describing the resource to load
     * @param {String} gpName the name of the group that the resource came from
     * 
     * @returns {Deferred} a new promise that will be resolved when the file has been loaded.
     * @private
     */
    loadImage: function loadImage(res, gpName) {
        var img = new Image(),
            that = this,
            def = new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */](),
            gp = that.resources[gpName];

        // console.log('[RM] loading image', res.src);

        img.onload = function () {
            // on Chrome/Win calling drawImage to draw from canvas to canvas is abnormally slow (20-30ms to draw a 20x20px sprite on a core2quad + ati card)
            // so it's disabled for now
            // res.elt = that.getCanvasFromImage(this);                
            res.elt = img;
            res.img = this;
            res.loaded = true;
            that._resLoaded(gpName);
            def.resolve(true);

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
    createObjectPool: function createObjectPool(Obj, size) {
        __WEBPACK_IMPORTED_MODULE_2_Core_Pool__["a" /* default */].create(Obj, size);
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
    registerScript: function registerScript(id, elt, poolSize) {
        var existing = this.dynamicScripts[id];

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
    loadScript: function loadScript(res, gpName, callback) {
        var loaded = new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */](),
            gp = this.resources[gpName];
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
    loadAudio: function loadAudio(res, gpName) {
        console.log('[RM] loading sound', res.src);

        var that = this,
            audio = new Audio(),
            def = new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */](),
            gp = that.resources[gpName];

        function onLoad() {
            // canplaythrough event is sent not only on first load, but after the song has been played (and has been rewinded)
            // so we remove it to prevent from triggering again
            this.removeEventListener('canplaythrough', onLoad);
            console.log('[RM] audioLoaded', res.src);
            res.elt = this;
            res.loaded = true;
            __WEBPACK_IMPORTED_MODULE_1_Audio_AudioManager__["a" /* default */].addSound(res.id, this);
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
    loadWadAudio: function loadWadAudio(res, gpName) {
        var that = this,
            gp = that.resources[gpName],
            def = new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */](),
            sound = new __WEBPACK_IMPORTED_MODULE_3_web_audio_daw___default.a({
            source: res.src,
            callback: function callback() {
                res.elt = sound;
                res.loaded = true;
                __WEBPACK_IMPORTED_MODULE_1_Audio_AudioManager__["a" /* default */].addSound(res.id, sound);
                that._resLoaded(gpName);
                def.resolve(true);
            }
        });

        return def.promise;
    },

    /**
     * Loads a new Audio file using the Howler library
     * 
     * @param {Object} res a descriptor for the sound to load
     * @param {String} gpName the name of the group to load the audio file from
     * 
     * @returns {Deferred} a new promise that will be resolved once the file has been loaded
     */
    loadHowlerAudio: function loadHowlerAudio(res, gpName) {
        var that = this,
            gp = that.resources[gpName],
            def = new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */](),
            sound = new Howl.Howl({
            urls: [res.src],
            onload: function onload() {
                res.elt = sound;
                res.loaded = true;
                __WEBPACK_IMPORTED_MODULE_1_Audio_AudioManager__["a" /* default */].addSound(res.id, sound);
                that._resLoaded(gpName);
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
    loadJSON: function loadJSON(res, gpName, callback) {
        var _this2 = this;

        var def = new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */]();

        fetch(res.src).then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                throw 'Error getting photo list';
            }
        }).then(function (json) {
            res.elt = json;
            res.loaded = true;
            if (!callback) {
                _this2._resLoaded(gpName);
                loaded.resolve(true);
            } else {
                var newDef = callback.call(_this2, res, gpName);
                newDef.then(function () {
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
    loadMapData: function loadMapData(res, gpName) {
        var _this3 = this;

        var def = new __WEBPACK_IMPORTED_MODULE_4_Core_Deferred__["a" /* default */](),
            gp = this.resources[gpName];

        __WEBPACK_IMPORTED_MODULE_0_Binary_Binary__["a" /* default */].getArrayBuffer((document.location.href.match('warpdesign.fr') ? '/gods/' : '') + res.elt.dataUrl).then(function (arrayBuffer) {
            res.elt.buffer = arrayBuffer;
            res.loaded = true;
            _this3._resLoaded(gpName);
            def.resolve(true);
        }, function () {
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
    _resLoaded: function _resLoaded(groupName) {
        var group = this.resources[groupName];

        group.loadedRes++;

        /*
            Debug stuff
        */
        new __WEBPACK_IMPORTED_MODULE_5_Core_Dom__["a" /* default */]('span.loaded').html(group.loadedRes);

        if (group.progressCb) {
            group.progressCb.call(this, Math.floor(group.loadedRes * 100 / group.numRes));
        }

        if (group.loadedRes === group.numRes) {
            // console.log('[RM] need to resolve stuff :)) ' + group.loadedRes + '/' + group.numRes);
            this.loading = false;
            if (group.gpTimeout !== null) {
                clearTimeout(group.gpTimeout);
            }
            group.def.resolve(true);
        } else if (!this.async) {
            //  console.log('[RM] more stuff to load !', group.loadedRes + '/' + group.numRes);
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
    _loadResource: function _loadResource(res, groupName) {
        // console.log('[RM] loading', res);
        switch (res.type) {
            case 'image':
                return this.loadImage(res, groupName);

            case 'audio':
                // return this.loadHowlerAudio(res, groupName);
                // return this.loadAudio(res, groupName);
                // return this.loadAudio(res, groupName);
                return this.loadWadAudio(res, groupName);
            /*
            if (this.useWad) {
                return this.loadWadAudio(res, groupName);
            } else {
                return this.loadHowlerAudio(res, groupName);
            }*/

            case 'script':
                return this.loadScript(res, groupName);

            // case 'map'
            default:
                // return this.loadScript(res, groupName, this.loadMapData);
                return this.loadJSON(res, groupName, this.loadMapData);
        }
    }
});

/***/ }),
/* 7 */
/* exports provided: default */
/* exports used: default */
/*!************************!*\
  !*** ./js/Core/Dom.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* Very small and simple jQuery-like object */

/**
 * Dom is a very simple jQuery-like object that allows to manipulate
 * a collection of DOM elements.
 * 
 * As in jQuery, you may manipulate Dom collections using []
 * 
 * @class
 * @constructor 
 */
function Dom(selector) {
    if (selector.match(/^#|\./)) {
        this.push.apply(this, _toConsumableArray(document.querySelectorAll(selector)));
    } else {
        this.push(document.createElement(selector));
    }
}

Dom.prototype = new Array();

Object.assign(Dom.prototype, {
    /**
     * jQuery-like CSS method to easily set multiple styles on a dom collection
     * 
     * @param {String|Object} prop or list of properties with their new value
     * @param {String} val value of the property
     * @returns {Dom} `this`
     * 
     * @memberof Dom#
     */
    css: function css(prop, val) {
        if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
            this.forEach(function (node) {
                var style = node.style;

                for (var name in prop) {
                    style[name] = prop[name];
                }
            });
        } else {
            this.forEach(function (node) {
                node.style[prop] = val;
            });
        }
        return this;
    },

    /**
     * Append current collection to the element with a specific selector 
     * 
     * @param {String|HTMLElement} selector Target element where to append selected elements.
     * It can either be a CSS selector or a DOM HTMLElement.
     * @returns {Dom} `this`
     * 
     * @memberof Dom#
     */
    appendTo: function appendTo(selector) {
        var target = (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' && selector || document.querySelector(selector);

        if (target) {
            this.forEach(function (node) {
                target.appendChild(node);
            });
        }

        return this;
    },

    /**
     * Change multiple attributes at once
     * 
     * @param {String|Object} att attribute name to modify or list of attributes+values to change
     * @param {String} val value of the attribute to set
     * @returns {Dom} `this`
     * 
     * @memberof Dom#
     */
    attr: function attr(att, val) {
        if ((typeof att === 'undefined' ? 'undefined' : _typeof(att)) === 'object') {
            this.forEach(function (node) {
                for (var name in att) {
                    node.setAttribute(name, att[name]);
                }
            });
        } else {
            this.forEach(function (node) {
                node.setAttribute(att, val);
            });
        }

        return this;
    },

    /**
     * Add a new Class to a DOM collection
     * 
     * @param {String} name new class to add
     * @returns {Dom} `this`
     * 
     * @memberof Dom#
     */
    addClass: function addClass(name) {
        this.forEach(function (node) {
            node.classList.add(name);
        });

        return this;
    },

    /**
     * Changes innerHTML of a collection
     * 
     * @param {String} html to set as innerHTML
     * @returns {Dom} `this`
     * 
     * @memberof Dom#
     */
    html: function html(_html) {
        this.forEach(function (node) {
            return node.innerHTML = _html;
        });

        return this;
    },

    /**
     * Shows specified set of elements
     * @returns {Dom} `this`
     * 
     * @memberof Dom#
     */
    show: function show() {
        this.forEach(function (node) {
            node.style.display = 'block';
        });
    },

    /**
     * Hides specified set of elements
     * @returns {Dom} `this`
     * 
     * @memberof Dom#
     */
    hide: function hide() {
        this.forEach(function (node) {
            node.style.display = 'node';
        });
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Dom);

/***/ }),
/* 8 */
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./js/FX/Effect/Effect.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Core_Deferred__ = __webpack_require__(/*! Core/Deferred */ 0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/*jshint devel: true, bitwise: false*/

var Effect = function () {
    function Effect(options, display) {
        _classCallCheck(this, Effect);

        this.easing = null;
        this.context = options.context || this;

        // TODO: we may need width/height for sprites as well
        // => pass the currentWidth/Height to fake display size
        if (typeof display !== 'undefined') {
            this.width = display.width;
            this.height = display.height;
        }

        this.startValue = typeof options.startValue !== 'undefined' ? options.startValue : 0;
        this.endValue = typeof options.endValue !== 'undefined' ? options.endValue : 1;
        this.loop = !!options.loop || false;

        this.duration = options.duration || 400;
    }

    _createClass(Effect, [{
        key: 'setEasing',
        value: function setEasing(easing) {
            this.easing = easing;
        }
    }, {
        key: 'start',
        value: function start() {
            this.def = new __WEBPACK_IMPORTED_MODULE_0_Core_Deferred__["a" /* default */]();

            this.startTime = new Date().getTime();

            this.ended = false;
            this.stopped = false;

            return this.def.promise;
        }
    }, {
        key: 'stop',
        value: function stop(setEndValue) {
            this.stopped = true;
        }
    }, {
        key: 'process',
        value: function process(ctx, fxCtx, obj) {
            var _this = this;

            var currentTime = new Date().getTime(),
                ellapsedTime = currentTime - this.startTime,
                t = ellapsedTime / this.duration;

            if (this.stopped || ellapsedTime >= this.duration) {
                if (this.stopped || this.loop === false) {
                    // set progress to 1 to avoid weird side effects (eg. opacity set to a negative number since anim progress may be > 1)
                    this.animProgress = 1;

                    this.ended = true;
                    // since this is called inside the render loop, we must be sure call has ended before resolving
                    // FIXES: #BUG: playing the same scene calls twice the renderLoop
                    setTimeout(function () {
                        _this.def.resolve(true);
                    }, 0);
                } else {
                    // console.log('looping effect');
                    this.start();
                }
            } else {
                this.animProgress = this.easing(t, ellapsedTime, 0, 1, this.duration);
            }

            return this.ended;
        }
    }]);

    return Effect;
}();

;

/* harmony default export */ __webpack_exports__["a"] = (Effect);

/***/ }),
/* 9 */
/* exports provided: default */
/* exports used: default */
/*!**********************************!*\
  !*** ./js/Input/InputManager.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = ({
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
    axes: {},
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
    _init: function _init(gameRef) {
        this.gameRef = gameRef;

        this._installInputModeSwitchHandler();

        this._installKBEventHandlers();

        // this._initVirtualJoystick();

        this.setInputMode(this.inputMode);
    },
    /**
     * Private handler that is supposed to detect touchEvent and automatically switch between keyboard & touch
     * inputs. Unfortunately it tourned out to not be so easy.
     * 
     * @private
     */
    _installInputModeSwitchHandler: function _installInputModeSwitchHandler() {
        var _this = this;

        // we cannot have several input devices (ie: keyboard, joystick,...) running at the same time
        // since they will interfer with each other (pressing a key will stop touch from working correctly)
        // we don't want the user to have to choose input mode using a menu or shortcut
        // instead, we want to have an automatic detection/switch of input mode which works like this:
        // by default, input mode if set to keyboard
        // if a touch is detected, input is set to joystick and kb detection is disabled
        // if a keydown is detected, joystick mode is disabled and kb detection is enabled
        document.addEventListener('touchstart', function () {
            _this.setInputMode('joystick');
        });

        document.addEventListener('keydown', function () {
            _this.setInputMode('keyboard');
        });
    },
    /**
     * Starts recording input events. They are stored into `InputManager.recordedEvents`
     */
    startRecordingEvents: function startRecordingEvents() {
        if (!this.recording) {
            this.recordedEvents.length = 0;
            this.recording = true;
            console.log('[InputManager] Starting record of input events!');
        }
    },
    /**
     * Stops recording events.
     */
    stopRecordingEvents: function stopRecordingEvents() {
        this.recording = false;
        console.log('[InputManager] Stoping record of input events, recorded', this.recordedEvents.length, 'events');
    },
    /**
     * After events have been reccorded they can be played back using this method.
     */
    playRecordedEvents: function playRecordedEvents() {
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
    nextRecordedEvents: function nextRecordedEvents() {
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
    recordEvents: function recordEvents() {
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
    setInputMode: function setInputMode(mode) {
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
    _resetKeys: function _resetKeys() {
        for (var key in this.keyPressed) {
            this.keyPressed[key] = false;
        }
    },
    /**
     * Checks for a new joystick to be connected onto the machine and changes the inputMode to `gamepad`
     * when a new joypad is detected.
     */
    _pollNewGamepad: function _pollNewGamepad() {
        var gamepads = navigator.getGamepads && navigator.getGamepads() || navigator.webkitGetGamepads && navigator.webkitGetGamepads() || navigator.webkitGamepads;
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
    _pollGamepad: function _pollGamepad(key) {
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
    _getModifiers: function _getModifiers(event) {
        return {
            'ALT': true,
            'SHIFT': true,
            'CTRL': true,
            'META': true
        };
    },
    _initVirtualJoystick: function _initVirtualJoystick() {
        var _this2 = this;

        var dPadJoystick = void 0,
            fireJoystick = void 0;

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
            var touch = event.changedTouches[0];
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
            var touch = event.changedTouches[0];
            if (touch.pageX < window.innerWidth / 2) {
                return false;
            }
            return true;
        });

        /* fire button */
        fireJoystick.addEventListener('touchStart', function () {
            if (_this2.inputMode === 'virtual_joystick') {
                _this2.keyPressed[_this2.keys['CTRL']] = true;
            }
        });

        fireJoystick.addEventListener('touchEnd', function () {
            if (_this2.inputMode === 'virtual_joystick') {
                _this2.keyPressed[_this2.keys['CTRL']] = false;
            }
        });
    },
    _clearJoystickPoll: function _clearJoystickPoll() {
        if (this.jPollInterval) {
            clearInterval(this.jPollInterval);
            this.jPollInterval = 0;
        }
    },
    _pollJoystick: function _pollJoystick() {
        var _this3 = this;

        var down = [],
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
            down.forEach(function (key) {
                _this3.keyPressed[_this3.keys[key]] = true;
            });
        }

        if (up.length) {
            up.forEach(function (key) {
                _this3.keyPressed[_this3.keys[key]] = false;
            });
        }

        // TODO: what happens for up event ? should be set to up only when going from down to up and called here
    },
    _installKBEventHandlers: function _installKBEventHandlers() {
        var _this4 = this;

        var gameRef = this.gameRef;

        // TODO: move me somewhere else!
        document.addEventListener('keydown', function (event) {

            if (_this4.inputMode !== 'keyboard' || _this4.playingEvents) {
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
                _this4.keyPressed[event.keyCode] = true;
            }

            // console.log('keydown', event.keyCode, '<-', this.keyPressed[37], '->', this.keyPressed[39]);

            _this4.metas = _this4._getModifiers();

            if (_this4.keyCb[event.keyCode] && gameRef && gameRef.running) {
                _this4.keyCb[event.keyCode].down.forEach(function (callback) {
                    callback();
                });
            }
        });

        document.addEventListener('keyup', function (event) {
            if (_this4.inputMode !== 'keyboard' || _this4.playingEvents) {
                return;
            }

            if (event.keyCode) {
                _this4.keyPressed[event.keyCode] = false;
            }

            // console.log('keyup', event.keyCode, '<-', this.keyPressed[37], '->', this.keyPressed[39]);

            _this4.metas = _this4._getModifiers();

            if (_this4.keyCb[event.keyCode] && gameRef && gameRef.running) {
                _this4.keyCb[event.keyCode].up.forEach(function (callback) {
                    callback();
                });
            }
        });
    },
    getAllKeysStatus: function getAllKeysStatus() {
        var keys = Object.keys(this.keys),
            result = {};

        for (var i = 0; i < keys.length; ++i) {
            result[array[i]] = this.getKeyStatus(array[i]);
        }

        return result;
    },
    getKeyStatus: function getKeyStatus(key, reset) {
        var keyPressed = void 0;

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

    installKeyCallback: function installKeyCallback(key, event, callback) {
        var keyCode = this.keys[key];

        if (!this.keyCb[keyCode]) {
            this.keyCb[keyCode] = {
                up: [],
                down: []
            };
        }

        this.keyCb[keyCode][event].push(callback);
    },

    removeKeyCallback: function removeKeyCallback(key, event, callback) {
        var index = this.keyCb[key][event].indexOf(callback);
        if (index > -1) {
            this.keyCb[key][event].splice(index, 1);
        }
    },
    clearEvents: function clearEvents() {
        this.keyPressed = {};
        this.keyCb = {};
    }
});

/***/ }),
/* 10 */
/* exports provided: default */
/* exports used: default */
/*!************************************************!*\
  !*** ./js/Notification/NotificationManager.js ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/*jshint devel: true, bitwise: false*/
var eventCallbacks = {};

/* harmony default export */ __webpack_exports__["a"] = ({
    notify: function notify(eventType, data) {
        // console.log('[NM] got event', eventType, 'with data', data);
        var params = { type: eventType, data: data };

        if (eventCallbacks[eventType]) {
            eventCallbacks[eventType].forEach(function (callback) {
                return callback(params);
            });
        } else if (eventCallbacks['*']) {
            eventCallbacks['*'].forEach(function (callback) {
                return callback(params);
            });
        }
    },
    listen: function listen(eventType, method) {
        console.log('[NM] listening to event', eventType);
        var eventList = eventType.replace(/\s+/g, ' ').split(' ');

        eventList.forEach(function (eventType) {
            if (!eventCallbacks[eventType]) {
                eventCallbacks[eventType] = [];
            }

            eventCallbacks[eventType].push(method);
        });
    }
});

/***/ }),
/* 11 */
/* exports provided: default */
/* exports used: default */
/*!*****************************!*\
  !*** ./js/Binary/Binary.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es6_promise__ = __webpack_require__(/*! es6-promise */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es6_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_es6_promise__);
/* @flow */


/*jshint devel: true, bitwise: false*/
/**
 * Object that allows sending & receving binary data
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    /**
     * Sends binary as POST
     * 
     * @param {ArrayBufferView} view
     * @param {String} url to post binary data to
     */
    sendArrayBufferView: function sendArrayBufferView(view, url) {
        var req = new XMLHttpRequest();

        req.open('POST', url, true);

        req.send(view);
    },

    /**
     * Retrieves binary data from the server
     * 
     * @param {String} url to get binary data from
     * @returns promise that is fullfilled with ArrayBuffer or false if get failed
     */
    getArrayBuffer: function getArrayBuffer(url) {
        return new __WEBPACK_IMPORTED_MODULE_0_es6_promise___default.a(function (resolve, reject) {
            var req = new XMLHttpRequest();

            req.open('GET', url, true);
            req.responseType = 'arraybuffer';

            req.onload = function (event) {
                var arrayBuffer = req.response;

                if (arrayBuffer) {
                    resolve(arrayBuffer);
                } else {
                    reject(false);
                }
            };

            req.send(null);
        });
    }
});

/***/ }),
/* 12 */
/* exports provided: default */
/* exports used: default */
/*!*****************************!*\
  !*** ./js/Object/Sprite.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Object__ = __webpack_require__(/*! Object/Object */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Input_InputManager__ = __webpack_require__(/*! Input/InputManager */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Core_Deferred__ = __webpack_require__(/*! Core/Deferred */ 0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/*jshint devel: true, bitwise: false*/
/**
 * This class extends {GfxObject} to implement 2D sprites using an image sprite sheet.
 * 
 * A sprite can have an infinite number of animations.
 * Each animation can have a different frameDuration and any number of frames.
 * Each frame may have a different size and a different hitbox
 * 
 * @param {String} type An identifier for this sprite, can be for example `enemy1`,...
 * @param {Object} options An options hash for the object
 * @param {String} options.imageSrc The path to the spritesheet image
 * @param {Object} options.animations An hash with a key for each animation of the sprite.
 * 
 * @note Since games usually have multiple sprites of the same type, it's common to extend the Sprite class
 * to generate each sprite type with its own properties and then use these sprites instead of instanciating
 * the Sprite class but it's possible to do so.
 * 
 * @example
 * 
 * let mySprite = new Sprite('gem', {
*  imageSrc: 'objects',
*  x: options.x,
*  y: options.y,
*  pool: options.pool,
*  canCollide: true,
*  collideGroup: 1,
*  animations: {
*      mainLoop: {
*          frameDuration: 4,
*          frames:[{
*              offsetX: 136,
*              offsetY: 189,
*              w: 31,
*              h: 31,
*              hitBox: {
*                  x: 0,
*                  y: 0,
*                  x2: 31,
*                  y2: 31
*              },
*              plane: 0
*          },
 *               {
*              offsetX: 170,
*              offsetY: 189,
*              w: 31,
*              h: 31,
*              hitBox: {
*                  x: 0,
*                  y: 0,
*                  x2: 31,
*                  y2: 31
*              },
*              plane: 0
*          }],
 *           loop: 1
*       }
 *    }
 * });
 * 
 * @related {GfxObject}
 */

var Sprite = function (_GfxObject) {
    _inherits(Sprite, _GfxObject);

    function Sprite(type, options) {
        _classCallCheck(this, Sprite);

        var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, type || 'Sprite', options || {}));

        _this.imageSrc = options && options.imageSrc || '';

        // NOTE: sometimes it is done by gfxobject.reset(), sometimes not
        // animations can now be added later
        if (options && options.animations) {
            _this.load(options.animations);
        }
        return _this;
    }

    /**
     * Init default sprite properties
     */


    _createClass(Sprite, [{
        key: 'initProperties',
        value: function initProperties() {
            this.animations = {};
            // frames
            this.currentAnim = null;
            this.currentFrame = null;
            this.currentFrameNum = this.previousFrameNum = 0;
            this.loaded = false;

            this.currentAnimName = '';

            this.storedAnimName = '';
            this.storedFrameNum = 0;

            this.numFrames = 0;
            this.rewindOnEnd = false;
            this.direction = 1;

            this.frameCounter = 0;

            // end animation defered
            this.animEndDef = null;
            this.animChangeDef = null;

            // holds a reference to the dom image object from which sprite will be blitted
            // this.image = null;

            this.rewinded = false;

            this.isDebug = false;
        }

        /**
         * Toggles debugging
         * 
         * @param {Boolean} isDebug wether to enable or disable debug
         * 
         * TODO: should use a global setting instead
         * 
         * @private
         */

    }, {
        key: 'debug',
        value: function debug(isDebug) {
            this.isDebug = isDebug;
        }

        /**
         * Resets the sprite to its default settings
         */

    }, {
        key: 'reset',
        value: function reset() {
            _get(Sprite.prototype.__proto__ || Object.getPrototypeOf(Sprite.prototype), 'reset', this).call(this);
        }

        /**
         * Adds a new animation to the sprite
         * 
         * @param {String} name The name of the new animation
         * @param {String} source The source of the image
         * @param {Object} options The animation to add, see:
         * @param {number=0} options.offsetX The x offset of the sprite frames inside the image
         * @param {number=0} options.offsetY The y offset of the sprite frames inside the image*
         * @param {number} options.frameWidth The width of a frame
         * @param {number=imageHeight} options.frameHeight The height of a frame. By default frameHeight is taken from image.naturalHeight
         * @param {number=1} options.frameDuration The duration of a frame (1 = 16ms)
         * @param {number=0} options.frameSpacing The space between each frame
         * @param {number=1} options.loop 0=anim play once and stops at the end, 1=anim loops to frame 1 at the end, 2=anim will play in reverse when reaching the end, then plays again, etc
         * @returns {Deferred} a deferred object that's resolved once the animation is ready
         * @example
         * // creates a new animation from the image run.png
         * mySprite.addAnimation ('running', 'run.png', {
         *    frameWidth: 32
         * })
         */

    }, {
        key: 'addAnimation',
        value: function addAnimation(name, source) {
            var _this2 = this;

            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var animations = {},
                def = new __WEBPACK_IMPORTED_MODULE_2_Core_Deferred__["a" /* default */](),
                img = new Image();

            animations[name] = Object.assign({
                frameDuration: 1,
                loop: 1,
                frames: []
            }, options);

            this.imageSrc = img.src = source;
            this.setImage(img);

            img.onload = function () {
                var x = options.offsetX || 0,
                    y = options.offsetY || 0,
                    frames = animations[name].frames,
                    frameHeight = options.frameHeight || this.naturalHeight,
                    frameSpace = options.frameWidth + (options.frameSpacing || 0);

                while (x < this.naturalWidth) {
                    frames.push({
                        offsetX: x,
                        offsetY: y,
                        w: options.frameWidth,
                        h: frameHeight,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: options.frameWidth - 1,
                            y2: frameHeight - 1
                        }
                    });
                    x += frameSpace;
                }

                def.resolve();
            }.bind(img);

            def.promise.then(function () {
                _this2.load(animations);
            });

            return def.promise;
        }

        /**
         * Loads animations from settings, flipping sprites if needed
         * and sets the last animation of the array as current animation
         * 
         * 
         */

    }, {
        key: 'load',
        value: function load(anims) {
            var _this3 = this;

            if (!this._settings) debugger;

            var animations = anims || this._settings.animations,
                lastName = void 0;

            if (!this.loaded) {
                this.initProperties();

                this.loaded = true;

                Object.keys(animations).forEach(function (name) {
                    var animation = animations[name];
                    _this3.animations[name] = animation;
                    lastName = name;
                    // handle flip of sprites
                    if (animation.flipFrom) {
                        _this3.updateFlipAnimation(animation, animation.flipFrom, animation.flipType);
                    }
                });

                // by default, the last animation becames the current one
                this.setAnimation(lastName);
            } else {
                // debugger;
                // console.warn('attempt to load already loaded animations');
            }
        }

        /**
         * WIP: updateFlipAnimation
         * 
         * It's possible to define a new animation that is simply the flip of another one
         * This method copies the frames of the source animation and flips them
         * 
         * @param {Object} animation The animation to create frames for
         * @param {String} flipFrom The name of the animation to use as reference
         * @param {Number} flipType The direction of the flip: set to 1 for left/right flip, 2 for top/bottom flip
         * 
         */

    }, {
        key: 'updateFlipAnimation',
        value: function updateFlipAnimation(anim, flipFrom, flipType) {
            var animFromFrames = this.animations[flipFrom].frames;

            // copy frames from source animation (keeping references)
            anim.frames = new Array(animFromFrames.length);

            // right now, flip animations only contain the flipType: 1 = horiz, 2 = vert, 3 = both
            // we only need to define hitBoxes
            for (var i = 0; i < animFromFrames.length; ++i) {
                anim.frames[i] = {};
                // $.extend(true, anim.frames[i], animFromFrames[i]);
                Object.assign(anim.frames[i], animFromFrames[i]);
                if (flipType & 1) {
                    anim.frames[i].hitBox.x = animFromFrames[i].w - animFromFrames[i].hitBox.x2;
                    anim.frames[i].hitBox.x2 = animFromFrames[i].w - animFromFrames[i].hitBox.x;
                }
                if (flipType & 2) {
                    anim.frames[i].hitBox.y = animFromFrames[i].h - animFromFrames[i].hitBox.y2;
                    anim.frames[i].hitBox.y2 = animFromFrames[i].h - animFromFrames[i].hitBox.y;
                }
            }
        }

        /**
         * Changes the source image for this sprite
         * 
         * @param {Image} image the new Image to use as spritesheet
         */

    }, {
        key: 'setImage',
        value: function setImage(image) {
            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (this.image && !force) {
                return;
            }

            this.image = image;

            // set image for children as well, this means
            // we assume children are using same image as parent
            // and this is BAD! ;)
            this.children.forEach(function (child) {
                child.setImage(image);
            });
        }

        /**
         * Plays the animation from the end up to the first frame
         */

    }, {
        key: 'rewind',
        value: function rewind() {
            this.direction = -this.direction;
            this.running = true;
            this.rewinded = true;
            this.nextFrame();
            console.log('[Sprite] rewind', this.currentFrameNum, this.running, this.rewinded, this.direction);
        }

        /**
         * Goes to the next animation frame
         * 
         * When reaching the last frame, the next frame will depend on animation.loop property:
         * 
         * - if loop == 2 then animation will play back in reverse mode, up to the first frame
         * - if loop == 1 then animation will play back from the begining so nextFrame = 0
         * - if loop == 0/undefined then animation will stop and sprite._onAnimateEnd is called
         */

    }, {
        key: 'nextFrame',
        value: function nextFrame() {
            if (!this.running) {
                return;
            }

            this.currentFrameNum += this.direction;

            if (this.currentFrameNum < 0 || this.currentFrameNum >= this.numFrames) {
                switch (this.currentAnim.loop) {
                    // reverse loop
                    case 2:
                        this.direction = -this.direction;
                        this.currentFrameNum = this.currentFrameNum < 0 ? 0 : this.numFrames - 1;
                        this.currentFrame = this.currentAnim.frames[this.currentFrameNum];
                        break;

                    case 1:
                        this.currentFrameNum = this.currentAnim.loopFrom ? this.currentAnim.loopFrom : 0;
                        this.currentFrame = this.currentAnim.frames[this.currentFrameNum];
                        break;

                    // no loop: end of animation
                    default:
                        // console.log('stop running animation', this.type);
                        if (!this.currentAnim.rewindOnEnd || this.rewinded) {
                            // since we stoped, it means currentFrameNum is out of bounds
                            // so we need to get it to the last inbound value to avoid crash
                            // if store/restore is used
                            this.currentFrameNum -= this.direction;

                            this.running = false;
                            // console.log('call on Animation ended, rewinded or did not need to');
                            this._animationEnded();
                        } else if (this.currentAnim.rewindOnEnd) {
                            this.rewind();
                        }
                        break;
                }
            } else {
                this.currentFrame = this.currentAnim.frames[this.currentFrameNum];
            }
        }

        /**
         * Save current animation name and frame for later use
         */

    }, {
        key: 'storeCurrentAnim',
        value: function storeCurrentAnim() {
            this.storedAnimName = this.currentAnimName;
            this.storedFrameNum = this.currentFrameNum;
        }

        /**
         * Restore animation to a previous saved state
         * 
         * @related {restorePreviousAnim}
         */

    }, {
        key: 'restorePreviousAnim',
        value: function restorePreviousAnim() {
            this.setAnimation(this.storedAnimName, null, this.storedFrameNum);
        }

        /**
         * advanceFrame is called at each render loop and waits for currentAnim.frameDuration
         * before advancing to the next animation frame.
         * 
         * If animName != than currentAnimName then switches to the new animation
         */

    }, {
        key: 'advanceFrame',
        value: function advanceFrame(animName) {
            this.previousFrameNum = this.currentFrameNum;

            if (this.currentAnim !== this.animations[animName]) {
                this.frameCounter = 0;
                this.setAnimation(animName);
            } else {
                if (++this.frameCounter > this.currentAnim.frameDuration) {
                    this.nextFrame();
                    this.frameCounter = 0;
                }
            }
        }

        /**
         * Returns the width of the current animation frame
         */

    }, {
        key: 'getCurrentWidth',
        value: function getCurrentWidth() {
            // TODO: handle scale/rotate ?
            return this.currentFrame.w;
        }

        /**
         * Returns the height of the current animation frame
         */

    }, {
        key: 'getCurrentHeight',
        value: function getCurrentHeight() {
            // TODO: handle scale/rotate ?
            return this.currentFrame.h;
        }

        /**
         * Returns the x offset in the spritesheet of current animation frame
         * 
         * @returns {number} current frame horizontal offset in the spritesheet
         */

    }, {
        key: 'getCurrentOffsetX',
        value: function getCurrentOffsetX() {
            return this.currentFrame.offsetX;
        }

        /**
         * Returns the y offset in the spritesheet of current animation frame
         * 
         * @returns {number} current frame vertical offset in the spritesheet
         */

    }, {
        key: 'getCurrentOffsetY',
        value: function getCurrentOffsetY() {
            return this.currentFrame.offsetY;
        }

        /**
         * Returns the optional horizontal shift of the sprite: can be used
         * if sprite image's width is less than actual frame width and sprite is flipped
         * 
         * @returns {number} current frame horizontal shift value or 0 if not defined
         * 
         * @private
         */

    }, {
        key: 'getCurrentShiftX',
        value: function getCurrentShiftX() {
            return this.currentFrame.shiftX || 0;
        }

        /**
         * Returns the optional horizontal shift of the sprite: can be used
         * if sprite image's height is less than actual frame height and sprite is flipped
         * 
         * @returns {number} current frame vertical shift value or 0 if not defined
         * 
         * @private
         */

    }, {
        key: 'getCurrentShiftY',
        value: function getCurrentShiftY() {
            return this.currentFrame.shiftY || 0;
        }

        /**
         * Returns the hitBox of current animation frame
         * 
         * @returns {Object} the hitbox
         * 
         * @example
         * 
         * { x: 0, y: 0, x2: 10, y2: 10 }
         */

    }, {
        key: 'getHitBox',
        value: function getHitBox() {
            return this.currentFrame.hitBox;
        }

        /**
         * Centers the sprite horizontaly around a tile
         * 
         * @param {Object} tilePos The tile to center the sprite on
         */

    }, {
        key: 'centerXOverTile',
        value: function centerXOverTile(tilePos) {
            var tileWidth = this.currentMap.tileWidth,
                currentWidth = this.getCurrentWidth(),

            // currentWidth = this.getHitBox().x2 - this.getHitBox().x,
            shift = Math.floor((tileWidth - currentWidth) / 2);

            if (currentWidth <= tileWidth) {
                this.x = tilePos.x * tileWidth + shift;
            }
        }

        /**
         * Stops current animation from running
         * 
         * TODO: rename this method
         */

    }, {
        key: 'clearMove',
        value: function clearMove() {
            this.running = false;
            // super.clearMove();
        }

        /**
         * Changes the sprite's current animation
         * 
         * @param {String} anim The new animation to play.
         * @param {Function=undefined} fn An optionnal callback to run when the animation will have ended.
         * @param {number=0} frameNum The first frame to play, defaults to zero.
         * @param {Boolean=false} rever Wether to start playing the animation from the last frame
         */

    }, {
        key: 'setAnimation',
        value: function setAnimation(anim, fn, frameNum, revert) {
            // console.log('[Sprite] setting animation of', this.type, 'to', anim);
            // load animations if not loaded
            if (!this.loaded) {
                this.load();
            }

            try {
                if (this.currentAnim) {
                    this._animationEnded();
                }

                this.animEndDef = new __WEBPACK_IMPORTED_MODULE_2_Core_Deferred__["a" /* default */]();

                if (this.currentAnim) {
                    this._animationChanged(this.currentAnimName, anim);
                }

                this.animChangeDef = new __WEBPACK_IMPORTED_MODULE_2_Core_Deferred__["a" /* default */]();

                this.currentAnim = this.animations[anim];
                this.currentAnimName = anim;
                this.numFrames = this.currentAnim.frames.length;

                this.currentFrameNum = this.previousFrameNum = !revert ? frameNum || 0 : this.numFrames - 1;
                this.currentFrame = this.currentAnim.frames[this.currentFrameNum];

                // animation running
                this.running = true;

                this.rewinded = false;

                // we need to reset direction in case we were rewinding
                this.direction = revert ? -1 : 1;

                // add end animation callback if specified
                if (typeof fn === 'function') {
                    this.onAnimationEnd(fn);
                }
            } catch (err) {
                debugger;
                console.error('[Sprite] setAnimation() - unable to set animation ', anim, '(' + err.message + ')', 'for sprite', this.id);
            }
        }

        /**
         * Stops playing current animation
         * 
         * @param {Boolean} runPreviousEndMethod Set to false if you don't want to run the end callback functions
         */

    }, {
        key: 'stopAnimation',
        value: function stopAnimation(runPreviousEndMethod) {
            this.running = false;

            // do not run end callbacks if animation has been interrupted before
            // reaching the end
            if (this.animEndDef && !runPreviousEndMethod) {
                this.animEndDef.reject();
            }
        }

        /**
         * Starts/resumes animation playback
         * 
         * This method only sets `this.running` to true.
         */

    }, {
        key: 'startAnimation',
        value: function startAnimation() {
            this.running = true;
        }

        /**
         * Adds a new function that will be called when current animation ends
         * 
         * @param {Function} fn The callback to run
         */

    }, {
        key: 'onAnimationEnd',
        value: function onAnimationEnd(func) {
            // console.log(this.currentAnimName, 'animationEnd');
            this.animEndDef.promise.then(func.bind(this));
        }

        /**
         * Adds a new function that will be called when a new animation is ran
         * 
         * @param {Function} func The callback function to add.
         */

    }, {
        key: 'onAnimationChange',
        value: function onAnimationChange(func) {
            this.animChangeDef.promise.then(func.bind(this));
        }

        /**
         * Runs every registered end callback function
         * 
         * @private
         */

    }, {
        key: '_animationEnded',
        value: function _animationEnded() {
            // console.log('animationEnd', this.currentAnimName);
            this.animEndDef.resolve(this.currentAnimName, this.currentFrameNum);
        }

        /**
         * Runs every registered change callback function
         * 
         * @private
         */

    }, {
        key: '_animationChanged',
        value: function _animationChanged(oldAnim) {
            this.animChangeDef.resolve(oldAnim, this.currentAnimName);
        }

        /**
         * onHit is called when a collision has been detect between the sprite and another graphical object
         * 
         * @param {GfxObject} obj The graphical object that collided
         */

    }, {
        key: 'onHit',
        value: function onHit(obj) {
            _get(Sprite.prototype.__proto__ || Object.getPrototypeOf(Sprite.prototype), 'onHit', this).call(this, obj);
            console.log('[Sprite] oops, ', this.type, ' [', this.id, '] ', 'was hit by', obj.name, ' [', obj.id, ']');
        }

        /**
         * Draws the sprite onto the canvas context passed
         * 
         * @param {CanvasContext} destCtx The context where to render the sprite.
         * @param {Boolean=false} debug wether to show the sprite hit box
         * 
         * @private
         */

    }, {
        key: 'draw',
        value: function draw(destCtx, debug) {
            if (!this.visible) {
                return;
            }

            // auto goto next frame
            if (this.currentAnimName.length) {
                this.advanceFrame(this.currentAnimName);
            }

            var w = this.getCurrentWidth(),
                scaledW = w * this.scale,
                h = this.getCurrentHeight(),
                scaledH = h * this.scale,
                subScaledW = scaledW / 2 | 0,
                subScaledH = scaledH / 2 | 0,
                x = this.getCurrentOffsetX(),
                y = this.getCurrentOffsetY(),
                drawX = this.currentAnim.flipFrom ? this.x + this.getCurrentShiftX() - scaledW : this.x + this.getCurrentShiftX(),
                drawY = this.currentAnim.flipFrom ? this.y + this.getCurrentShiftY() - scaledH : this.y + this.getCurrentShiftY(),
                mapOffsetX = this.currentMap && this.currentMap.viewportX || 0,
                mapOffsetY = this.currentMap && this.currentMap.viewportY || 0;

            // if width or height equals to 0 we may skip drawing
            // this fixes IndexSizeError in Firefox
            if (!w || !h) {
                return;
            }

            // TODO: fix map position when rotate is used
            if (this.isFxQueueEmpty()) {
                if (this.currentAnim.flipFrom) {
                    destCtx.save();
                    destCtx.scale(this.currentAnim.flipType & 1 ? -1 : 1, this.currentAnim.flipType & 2 ? -1 : 1);
                    // console.log('drawing to', drawX + mapOffsetX, drawY + mapOffsetY);
                }

                try {
                    destCtx.drawImage(this.image, Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h), Math.floor(drawX + mapOffsetX), Math.floor(drawY + mapOffsetY), Math.floor(scaledW), Math.floor(scaledH));
                } catch (e) {
                    debugger;
                }

                if (this.currentAnim.flipFrom) {
                    destCtx.restore();
                }

                if (this.isDebug === true || debug === true) {
                    this.showHitBox(destCtx);
                }
            } else {
                this.executeFx(destCtx);

                // translate to keep the object as its position
                destCtx.save();
                // flip
                if (this.currentAnim.flipFrom) {
                    destCtx.scale(this.currentAnim.flipType & 1 ? -1 : 1, this.currentAnim.flipType & 2 ? -1 : 1);
                }
                destCtx.translate(drawX + mapOffsetX + subScaledW, drawY + mapOffsetY + subScaledH);
                destCtx.rotate(this.angle);
                destCtx.drawImage(this.image, x, y, w, h, -subScaledW, -subScaledH, scaledW, scaledH);
                destCtx.restore();
                if (this.isDebug === true || debug === true) {
                    this.showHitBox(destCtx);
                }
            }

            if (this.children.length) {
                this.children.forEach(function (sprite) {
                    sprite.draw(destCtx, debug);
                });
            }
        }

        /**
         * Draws the sprite hit box
         * 
         * @param {CanvasContext} The canvas context where to render the hitbox
         */

    }, {
        key: 'showHitBox',
        value: function showHitBox(ctx) {
            // TODO: add scale (rotation ?)
            var hitBox = this.getHitBox(),
                mapOffsetX = this.currentMap && this.currentMap.viewportX || 0,
                mapOffsetY = this.currentMap && this.currentMap.viewportY || 0;

            if (!hitBox) {
                return;
            }

            ctx.strokeStyle = 'rgb(0,230,0)';
            ctx.beginPath();
            ctx.moveTo(hitBox.x + this.x + mapOffsetX, hitBox.y + this.y + mapOffsetY);
            ctx.lineTo(hitBox.x2 + this.x + mapOffsetX, hitBox.y + this.y + mapOffsetY);
            ctx.lineTo(hitBox.x2 + this.x + mapOffsetX, hitBox.y2 + this.y + mapOffsetY);
            ctx.lineTo(hitBox.x + this.x + mapOffsetX, hitBox.y2 + this.y + mapOffsetY);
            ctx.lineTo(hitBox.x + this.x + mapOffsetX, hitBox.y + this.y + mapOffsetY);
            ctx.closePath();
            ctx.stroke();
        }

        /**
         * Draws all sprite animation frames onto a temporary canvas that is added to the body tag
         * 
         * This is used for debugging sprites
         *
         * @private
         */

    }, {
        key: 'describeAllAnimations',
        value: function describeAllAnimations() {
            var _this4 = this;

            var animation = null,
                that = this,
                destX = 1,
                destY = 1,
                animationName = '',
                width = 0,
                height = 0,
                totalWidth = 0,
                totalHeight = 0,
                canvas = void 0,
                ctx = null;

            Object.keys(this.animations).forEach(function (animationName) {
                animation = _this4.animations[animationName];
                width = animation.frames[0].w;
                height = animation.frames[0].h;

                if ((width + 5) * animation.frames.length > totalWidth) {
                    totalWidth = (width + 5) * animation.frames.length;
                }

                totalHeight += height + 5;
            });

            canvas = document.getElementById('describe');

            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.id = 'describe';
                canvas.setAttribute('width', totalWidth);
                canvas.setAttribute('height', totalHeight);
                canvas;
            }
            debugger;
            ctx = new Dom('#describe')[0] && new Dom('#describe')[0].getContext('2d') || new Dom('canvas').attr('id', 'describe').attr('width', totalWidth).attr('height', totalHeight).css('zIndex', '100').appendTo('body')[0].getContext('2d');

            ctx.webkitImageSmoothingEnabled = false;

            Object.keys(this.animations).forEach(function (animationName) {
                destX = 1;

                animation = _this4.animations[animationName];
                console.log(animationName, 'got', animation.frames.length);
                console.log('frameDuration=', animation.frameDuration);
                console.log('loop=', animation.loop);
                console.log('loopFrom=', animation.loopFrom);
                console.log('rewindOnEnd', animation.rewindOnEnd);

                animation.frames.forEach(function (frame, i) {
                    var w = frame.w,
                        h = frame.h,
                        x = frame.offsetX,
                        y = frame.offsetY,
                        hitBox = frame.hitBox;

                    // Draw sprite image
                    ctx.drawImage(that.image, x, y, w, h, destX, destY, w, h);

                    /* Draw frame around sprite */
                    ctx.strokeStyle = 'rgb(240,240,240)';
                    ctx.beginPath();
                    ctx.moveTo(destX - 1, destY - 1);
                    ctx.lineTo(destX + w, destY - 1);
                    ctx.lineTo(destX + w, destY + h + 1);
                    ctx.lineTo(destX - 1, destY + h + 1);
                    ctx.lineTo(destX - 1, destY - 1);
                    ctx.closePath();
                    ctx.lineCap = 'butt';
                    ctx.stroke();

                    // draw hitBox
                    if (hitBox) {
                        ctx.strokeStyle = 'rgb(0,230,0)';
                        ctx.beginPath();
                        ctx.moveTo(destX + hitBox.x, destY + hitBox.y);
                        ctx.lineTo(destX + hitBox.x2, destY + hitBox.y);
                        ctx.lineTo(destX + hitBox.x2, destY + hitBox.y2);
                        ctx.lineTo(destX + hitBox.x, destY + hitBox.y2);
                        ctx.lineTo(destX + hitBox.x, destY + hitBox.y);
                        ctx.closePath();
                        ctx.stroke();
                    }

                    destX += width + 5;
                });

                destY += height + 5;
            });
        }

        /**
         * Returns the sprite's animation hash
         * 
         * Used for debugging
         * 
         * @private
         */

    }, {
        key: 'listAnimations',
        value: function listAnimations() {
            return this.animations;
        }
    }]);

    return Sprite;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Object__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (Sprite);

/***/ }),
/* 13 */
/* exports provided: default */
/* exports used: default */
/*!***************************!*\
  !*** ./js/Object/Text.js ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Object__ = __webpack_require__(/*! Object/Object */ 4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/*jshint devel: true, bitwise: false*/
/**
 * Basic class for displaying text using Canvas
 * 
 * @param {String} type The type of the graphic object
 * @param {Object} options
 * @param {String} [options.text=undefined] The initial text. Can be changed later using Text.setText().
 * @param {Number} [options.w=0] The width of the text.
 * @param {Number} [options.h=0] The height of the text.
 * @param {String} [options.fontFace="Arial"] The font to use to draw the text.
 * @param {String} [options.fontStyle="normal"] The style of the font.
 * @param {String} [options.fontSize="18px"] The size of the font.
 * @param {String} [options.fontWeight="normal"] The weight of the font.
 * @param {String} [options.align="center"] How to align the text when rendered.
 * @param {String} [options.color="white"] The color to use when rendering the text.
 * 
 * @example
 * 
 * let myText = new Text({
 *  text: 'hello',
 *  fontFace: 'Verdana',
 *  fontStyle: 'bold',
 *  fontSize: '24px'
 * })
 */

var Text = function (_GfxObject) {
    _inherits(Text, _GfxObject);

    function Text() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Text' + new Date().getTime();
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Text);

        var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, type, options));
        // type = type || 'Text' + new Date().getTime();
        // options = options || {};

        _this.fontFace = options.fontFace || 'Arial';
        _this.fontStyle = options.fontStyle || 'normal';
        _this.fontSize = options.fontSize || '18px';
        _this.fontWeight = options.fontWeight || 'normal';
        _this.align = options.align || 'center';
        _this.color = options.color || 'white';

        _this._setFont();

        if (options.text) {
            _this.setText(options.text);
        }

        _this.w = options.w || 0;
        _this.h = options.h || 0;
        return _this;
    }

    /**
     * TODO
     * 
     * @private
     */


    _createClass(Text, [{
        key: 'moveWithSpline',
        value: function moveWithSpline() {}

        /**
         * Change the size of the object
         * 
         * @param {Number} w The width of the object.
         * @param {Number} h The height of the object.
         */

    }, {
        key: 'setSize',
        value: function setSize(w, h) {
            if (w !== null) {
                this.w = w;
            }

            if (h !== null) {
                this.h = h;
            }
        }

        /**
         * Change the text of the object
         * 
         * @param {String} text The new text.
         * @param {String} [text='center'] Optional new alignment for the text.
         */

    }, {
        key: 'setText',
        value: function setText(text, align) {
            this.text = text;
            this.align = align || 'center';
        }

        /**
         * Change the color of the object
         * 
         * @param {String} color Thew new color to use, can be anything that is valid for the `color` *CSS* property.
         */

    }, {
        key: 'setColor',
        value: function setColor(color) {
            this.color = color;
        }

        /**
         * Returns the hitbox of the text object
         * 
         * @returns {Object} The new hitbox
         */

    }, {
        key: 'getHitBox',
        value: function getHitBox() {
            return {
                x: 0,
                y: 0,
                x2: this.w,
                y2: this.y
            };
        }

        /**
         * Returns the width of the text object
         * 
         * @returns [Number] The object's width
         */

    }, {
        key: 'getCurrentWidth',
        value: function getCurrentWidth() {
            return this.w;
        }

        /**
         * Returns the height of the text object
         * 
         * @returns [Number] The object's height
         */

    }, {
        key: 'getCurrentHeight',
        value: function getCurrentHeight() {
            return this.h;
        }

        /**
         * Returns the horizontal offset of the text object
         * 
         * @returns [Number] The object's horizontal offset
         */

    }, {
        key: 'getCurrentOffsetX',
        value: function getCurrentOffsetX() {
            return this.offsetX;
        }

        /**
         * Returns the vertical offset of the text object
         * 
         * @returns [Number] The object's vertical offset
         */

    }, {
        key: 'getCurrentOffsetY',
        value: function getCurrentOffsetY() {
            return this.offsetY;
        }

        /**
         * Called when an object collides with the text Object
         * 
         * @param {GfxObject} obj The graphical object that collided.
         */

    }, {
        key: 'onHit',
        value: function onHit(obj) {
            _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'onHit', this).call(this, obj);
            console.log('oops, ', this.type, ' [', this.id, '] ', 'was hit by', obj.name, ' [', obj.id, ']');
        }

        /**
         * Called on each render loop: renders the object on the destination canvas context
         * 
         * @param {CanvasContext} destCtx Where to render the object.
         * 
         * @private
         */

    }, {
        key: 'draw',
        value: function draw(destCtx) {
            if (!this.visible) {
                return;
            }

            destCtx.fillStyle = this.color;
            destCtx.font = this.font;
            destCtx.textBaseline = 'top';

            if (this.angle !== 0) {
                destCtx.save();
                destCtx.rotate(this.angle);
            }

            destCtx.fillText(this.text, this.x, this.y);

            if (this.angle !== 0) {
                destCtx.restore();
            }

            //                var w = this.getCurrentWidth(),
            //					scaledW = w * this.scale,
            //					h = this.getCurrentHeight(),
            //					scaledH = h * this.scale,
            //					x = this.getCurrentOffsetX(),
            //					y = this.getCurrentOffsetY();
            //
            //				destCtx.drawImage(image, x, y, w, h, this.x, this.y, scaledW, scaledH);
        }

        /**
         * Generates the font css property using current this.fontSize and this.fontFace
         */

    }, {
        key: '_setFont',
        value: function _setFont() {
            this.font = this.fontSize + ' ' + this.fontFace;
        }
    }]);

    return Text;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Object__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Text);
;

/***/ }),
/* 14 */
/* exports provided: default */
/* exports used: default */
/*!*************************!*\
  !*** ./js/Core/Pool.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Pool support for AthenaJS
 * 
 * This objects allows to defined and use pools for any type of object
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    /**
     * Creates a new pool
     * 
     * @param {Function} obj the constructor of the object to add a pool for
     * @param {Number} suze the size of the pool
     */
    create: function create(obj, size) {
        obj._pool = [];
        obj._poolMarker = 0;
        obj._poolSize = 0;

        var pool = obj._pool;

        /*
         * Get a new object from the pool
         * 
         * -*Note* This method does not call new but gets a reference to an already created object
         *  and calls its constructor.
         * 
         *  @returns {Object} an instance of the object from the pool
         * 
         */
        obj.createFromPool = function () {
            // expand the pool if we run out of objects
            if (obj._poolSize <= obj._poolMarker) {
                obj.expandPool(10);
            }

            // get new object
            var newObj = obj._pool[obj._poolMarker++];

            // save its index
            newObj._poolIndex = obj._poolMarker - 1;

            // apply the constructor
            obj.prototype.constructor.apply(newObj, arguments);

            return newObj;
        };

        /*
         * expands an already created pool
         * 
         * ]@param {number} size the new size of the pool
         */
        obj.expandPool = function (size) {
            var options = {
                pool: true
            };

            for (var i = pool.length, max = pool.length + size; i < max; i++) {
                pool.push(new obj(options));
            };

            obj._poolSize += size;
        };

        // TODO: test me
        // TODO: call the object's destructor, if any (guess we'll need to add it)
        // obj.__proto__.freeFromPool = function() {
        obj.prototype.freeFromPool = function () {
            if (obj._poolMarker > 0) {
                obj._poolMarker--;
            }

            var end = pool[obj._poolMarker],
                endIndex = end._poolIndex;

            pool[obj._poolMarker] = this;
            pool[this._poolIndex] = end;

            end._poolIndex = this._poolIndex;
            this._poolIndex = endIndex;
        };

        // initial expand of the pool
        obj.expandPool(size);
    }
});

/***/ }),
/* 15 */
/* exports provided: default */
/* exports used: default */
/*!*******************************!*\
  !*** ./js/Display/Display.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_FX_FX__ = __webpack_require__(/*! FX/FX */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_FX_Easing_Easing__ = __webpack_require__(/*! FX/Easing/Easing */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Core_Deferred__ = __webpack_require__(/*! Core/Deferred */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Core_Dom__ = __webpack_require__(/*! Core/Dom */ 7);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






/*jshint devel: true*/
/**
 * 
 */

var Display = function () {
    function Display(options, target) {
        _classCallCheck(this, Display);

        console.log('[Display] Init()', options.name /*, options, target*/);

        var prefix = function () {
            var styles = window.getComputedStyle(document.documentElement, ''),
                pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1],
                dom = 'WebKit|Moz|MS|O'.match(new RegExp('(' + pre + ')', 'i'))[1];
            return {
                dom: dom,
                lowercase: pre,
                css: '-' + pre + '-',
                js: pre[0].toUpperCase() + pre.substr(1)
            };
        }();

        this.layers = new Array(options.numLayers);

        this.prefix = prefix.lowercase;

        this.target = target || new __WEBPACK_IMPORTED_MODULE_3_Core_Dom__["a" /* default */]('div').attr('id', 'display_' + options.name).appendTo('body');
        this.width = options.width;
        this.height = options.height;

        this.type = options.type || '2d';

        this.fxCtx = null;

        this._createLayers();

        this.fxQueue = {
            'pre': {},
            'post': {}
        };
    }

    _createClass(Display, [{
        key: 'getBuffer',
        value: function getBuffer(w, h) {
            var ctx = new __WEBPACK_IMPORTED_MODULE_3_Core_Dom__["a" /* default */]('canvas').attr({
                width: w + 'px',
                height: h + 'px'
            })[0].getContext('2d');

            ctx['imageSmoothingEnabled'] = false;

            return ctx;
        }
    }, {
        key: '_createLayers',
        value: function _createLayers() {
            var i = void 0;

            for (i = 0; i < this.layers.length; ++i) {
                this.layers[i] = new __WEBPACK_IMPORTED_MODULE_3_Core_Dom__["a" /* default */]('canvas').addClass('layer_' + i).attr({
                    'width': this.width,
                    'height': this.height
                }).css({
                    'width': this.width + 'px',
                    'height': this.height + 'px',
                    zIndex: i
                }).appendTo(this.target)[0].getContext(this.type);

                this.layers[i]['imageSmoothingEnabled'] = false;
            }

            this.fxCtx = new __WEBPACK_IMPORTED_MODULE_3_Core_Dom__["a" /* default */]('canvas').addClass('fx').attr({
                'width': this.width,
                'height': this.height
            }).css({
                'width': this.width + 'px',
                'height': this.height + 'px',
                zIndex: i + 1
            }).appendTo(this.target)[0].getContext(this.type);

            this.fxCtx['imageSmoothingEnabled'] = false;
        }
    }, {
        key: 'clearScreen',
        value: function clearScreen(ctx) {
            if (0) {
                // setting canvas width resets imageSmoothingEnable to true
                ctx.canvas.width = ctx.canvas.width;

                ctx['imageSmoothingEnabled'] = false;
            } else {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        }
    }, {
        key: 'clearAllScreens',
        value: function clearAllScreens() {
            for (var i = 0; i < this.layers.length; ++i) {
                this.clearScreen(this.layers[i]);
            }

            this.clearScreen(this.fxCtx);
        }
    }, {
        key: 'renderScene',
        value: function renderScene(scene) {
            this.clearScreen(this.fxCtx);

            // execute pre fx
            // TODO: here we have to make some hack to pre-render all buffers into a single one
            // then aply fx on this one, then render this one onto for-most layer
            this.executeFx(this.layers[0], null, scene, null, 'pre');

            // TODO: all CTX ?
            for (var i = 0; i < this.layers.length; ++i) {
                this.layers[i].canvas.style.opacity = scene.getOpacity();
            }

            this.clearScreen(this.layers[1]);

            scene.render(this.layers);

            if (scene.hudScene) {
                scene.hudScene.render(this.layers);
            }

            // TODO: here we have to make some hack to pre-render all buffers into a single one
            // then apply fx on this one, then render this one onto for-most layer
            /* HACK */
            if (Object.keys(this.fxQueue['post']).length) {
                this.clearScreen(this.fxCtx);
                // merge all canvas into fxCtx one
                for (var _i = 0; _i < this.layers.length; ++_i) {
                    this.fxCtx.drawImage(this.layers[_i].canvas, 0, 0);
                }
            }
            /* HACK */
            // execute pre fx
            this.executeFx(this.fxCtx, this.fxCtx, scene, null, 'post');
        }
    }, {
        key: 'prepareCanvas',
        value: function prepareCanvas(resources) {
            var context = null,
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
    }, {
        key: 'animate',
        value: function animate(fxName, options, context) {
            console.log('animate');

            var fxClass = __WEBPACK_IMPORTED_MODULE_0_FX_FX__["a" /* default */].getEffect(fxName),
                promise,
                easing = options.easing || 'linear',
                when = options.when || 'pre',
                fx,
                that = this;

            options.context = context || this;
            // console.log('animate', this.fxQueue);

            if (typeof this.fxQueue[when][fxName] !== 'undefined') {
                console.warn('Fx', fxName, 'already in progress, cannot execute twice');
                var def = new __WEBPACK_IMPORTED_MODULE_2_Core_Deferred__["a" /* default */]();
                def.resolve();
                promise = def.promise;
            } else if (!fxClass) {
                console.warn('Fx', fxName, 'unknown: did you spell it correctly ?');
            } else {
                fx = new fxClass(options, this);
                fx.setEasing(new __WEBPACK_IMPORTED_MODULE_0_FX_FX__["a" /* default */].getEasing(easing));

                promise = fx.start().then(function () {
                    console.log('effect ended, need to stop it', fxName);
                    delete that.fxQueue[when][fxName];
                });
                this.fxQueue[when][fxName] = fx;
            }

            return promise;
        }
    }, {
        key: 'stopAnimate',
        value: function stopAnimate() /*fxName*/{
            console.log('TODO: need to stop animation');
        }
    }, {
        key: 'executeFx',
        value: function executeFx(ctx, fxCtx, obj, time, when) {
            var fxObject;

            when = when || 'pre';

            for (var fxName in this.fxQueue[when]) {
                fxObject = this.fxQueue[when][fxName];
                // console.log('processing fx', fxName, fxObject);

                fxObject.process(ctx, fxCtx, obj, time);
            }
        }
    }, {
        key: 'clearDisplay',
        value: function clearDisplay() {
            console.log('clearFX Queue');
            this.fxQueue.pre = {};
            this.fxQueue.post = {};

            this.clearAllScreens();
        }
    }]);

    return Display;
}();

;

/* harmony default export */ __webpack_exports__["a"] = (Display);

/***/ }),
/* 16 */
/* exports provided: default */
/* exports used: default */
/*!**************************************!*\
  !*** ./js/Display/DisplayManager.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Display_Display__ = __webpack_require__(/*! Display/Display */ 15);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/*jshint devel: true*/

var DisplayManager = function () {
    function DisplayManager(options) {
        _classCallCheck(this, DisplayManager);

        console.log('[DisplayManager] Init()' /*, options*/);

        this.displays = {};
    }

    _createClass(DisplayManager, [{
        key: 'addDisplay',
        value: function addDisplay(options, target) {
            console.log('[Display Manager] adding display', options.name /*, 'with options', options*/);

            this.displays[options.name] = new __WEBPACK_IMPORTED_MODULE_0_Display_Display__["a" /* default */](options, target);

            return this.displays[options.name];
        }
    }, {
        key: 'getDisplay',
        value: function getDisplay(id) {
            return this.displays[id];
        }
    }]);

    return DisplayManager;
}();

;

console.log('end DisplayManager');
/* harmony default export */ __webpack_exports__["a"] = (new DisplayManager());

/***/ }),
/* 17 */
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./js/FX/Easing/Easing.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_FX_FX__ = __webpack_require__(/*! FX/FX */ 1);


/*jshint devel: true, bitwise: false*/
var Easing = {
    //                     x,          t,             b,        c,          d
    'easeInQuad': function easeInQuad(x, t, b, c, d) {
        console.log('easeInQuad');
        return c * (t /= d) * t + b;
    },
    'easeOutBounce': function easeOutBounce(x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        } else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
    },
    'swing': function swing(x, t, b, c, d) {
        return 0.5 - Math.cos(x * Math.PI) / 2;
    }
};

Object.keys(Easing).forEach(function (name) {
    return __WEBPACK_IMPORTED_MODULE_0_FX_FX__["a" /* default */].addEasing(name, Easing[name]);
});

/* harmony default export */ __webpack_exports__["a"] = (Easing);

/***/ }),
/* 18 */
/* exports provided: default */
/* exports used: default */
/*!***********************!*\
  !*** ./js/Map/Map.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Map_Tile__ = __webpack_require__(/*! Map/Tile */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Object_Wave__ = __webpack_require__(/*! Object/Wave */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Resource_ResourceManager__ = __webpack_require__(/*! Resource/ResourceManager */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Notification_NotificationManager__ = __webpack_require__(/*! Notification/NotificationManager */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_FX_FX__ = __webpack_require__(/*! FX/FX */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_Map_MapEvent__ = __webpack_require__(/*! Map/MapEvent */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_Core_Deferred__ = __webpack_require__(/*! Core/Deferred */ 0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }









/*jshint devel: true, bitwise: false*/

window.maps = {};

/**
 * The `Map` is used to display tile-based backgrounds. It is usually initialized using a buffer containing
 * tiles and tilebehaviors. It has a viewport so that only a part of the map can be displayed.
 * A map also contains objects that are added onto the map once the viewport reaches a `block`.
 * 
 * @param {Object} options
 * @param {string} options.src The url to an image that will be used for the tiles
 * @param {number} options.tileWidth The width of a tile
 * @param {number} options.tileHeight The height of a tile
 * @param {number} options.width The full width of the map
 * @param {number} options.height The full height of the map
 * @param {number} options.viewportW The width of the viewport: it is usually the same as the game width
 * @param {number} options.viewportH The height of the viewport: it is usually the same as the game height
 * @param {ArrayBuffer} options.buffer The buffer containing width \* height bytes container tile numbers followed by width*height bytes for the tile behaviors
 * @example
 * var map = new Map({
 *    src: 'mapTiles.jpg',
 *    tileWidth: 32,
 *    tileHeight 32,
 *    width: 800,
 *    height: 600,
 *    buffer: new ArrayBuffer(800*600*2)
 * })
 * 
 */

var Map = function () {
	function Map(options) {
		_classCallCheck(this, Map);

		this.options = options;

		// image url used for the map graphic tiles
		this.src = options.src;

		// tiles and map width
		this.tileWidth = options.tileWidth || 64;
		this.tileHeight = options.tileHeight || 32;
		this.width = options.width || 1024;
		this.height = options.height || 1024;

		// DEBUG: usually tiles are loaded from binary files and set as ArrayBuffer
		// but previously tiles could be set from a JSON text file
		this.tiles = options.tiles && this._createTiles(options.tiles) || [];

		this.triggers = options.triggers || {};
		this.windows = options.windows || {};

		// defines viewport window: used for scrolling
		this.viewportX = options.viewportX || 0;
		this.viewportY = options.viewportY || 0;
		this.viewportW = options.viewportW || 0;
		this.viewportH = options.viewportH || 0;

		// when scrolling we set a new target and keep track of previous start x & y
		this.viewportTargetX = this.viewportTargetY = this.viewportSpeedX = this.viewsportSpeedY = this.viewportStartX = this.viewportStartY = 0;

		/* Scroll Type 1 */
		// this.viewportLimitX = 230;
		// this.viewportCenterX = 10; // 207

		// this.viewportLimitY = 154;
		// this.viewportCenterY = 230;

		/* Scroll Type 2 */
		/* Scrolling specific: TODESCRIBE */
		this.viewportLimitX = 230;
		this.viewportCenterX = 307;

		this.viewportLimitY = 154;
		this.viewportCenterY = 230;

		/* / End Scrolltype */
		this.scrollOffsetX = 0;
		this.scrollOffsetY = 0;

		this.scrollTileOffsetX = 0;
		this.scrollTileOffsetY = 0;

		this.viewportLimits = {
			x1: this.viewportLimitX,
			x2: this.viewportW - this.viewportLimitX,
			y1: this.viewportLimitY,
			y2: this.viewportLimitH - this.viewportLimitY
		};

		/* list of objects sorted by type for faster colision detection */
		this.objects = [];
		this.friendBullets = [];
		this.enemies = [];
		this.platforms = [];

		this.name = options.name;

		// calculate the number of rows/cols depending on the viewport window
		this._calcNumTiles(false);

		// sets map data buffer
		this.setBuffer(options.buffer);

		this.dataUrl = options.dataUrl;
		/*
  		this.map = options.map || new Array(this.numCols * this.numRows);
                this.tileTypes = options.tileTypes || new Array(this.numCols * this.numRows);
  		*/

		this.reverse = false;

		this.firstRow = this.lastRow = this.firstCol = this.lastCol = 0;

		this.isDebug = false;

		this.srcBitmap = null;

		// if map is being scrolled, should we scroll again ?
		this.moving = false;

		// Easing function to use while moving viewport (scrolling)
		// See FX/Easing for a list of available easing functions
		this.easing = __WEBPACK_IMPORTED_MODULE_4_FX_FX__["a" /* default */].getEasing(options.easing || 'linear');

		// used when initiating a new scroll
		this.startMoveTime = null;
		// scrollType 1
		// this.duration = 10;
		// scrollType 2
		// scrolling duration
		this.duration = 800;

		this.masterObject = null;

		// current viewport window
		this.currentWindow = null;

		// start position of the master object
		this.startX = options.startX || 0;
		this.startY = options.startY || 0;

		// Debug: add current map to the global list of maps
		window.maps[this.name] = this;

		// set mapEvent class
		// if (options.mapEventClass) {
		// 	this.mapEvent = new options.mapEventClass(this);
		// } else {
		// 	this.mapEvent = new MapEvent(this);
		// }

		// TODESCRIBE
		this.mapEvent = new __WEBPACK_IMPORTED_MODULE_5_Map_MapEvent__["a" /* default */](this);

		// flag that 
		this.isDirty = true;
	}

	/**
  * 
  * Changes the start position using the master's current position: usually called when reaching a checkpoint
  * 
  */


	_createClass(Map, [{
		key: 'setStartXYFromMaster',
		value: function setStartXYFromMaster() {
			this.startX = this.masterObject.x;
			this.startY = this.masterObject.y;
		}

		/**
   * Resets the master's position to the map.startX/startY position & resets its animation state:
   * usually called when player loses a life and needs to be positionned at checkpoint
   * 
   */

	}, {
		key: 'resume',
		value: function resume() {
			console.log('avant', this.masterObject.running, this.masterObject.currentAnimName);
			this.masterObject.reset();
			console.log('apres', this.masterObject.running, this.masterObject.currentAnimName);
			console.log('resuming', this.startX, this.startY);

			this.masterObject.x = this.startX;
			this.masterObject.y = this.startY;
		}

		/**
   * 
   * Resets the map:
   * 	- removes objects from the map
   *  - reset windows
   *  - reset triggers
   *  - reset mapEvents
   *  - reset viewport + scrollOffset
   *  - sets isDirty to true so that map is redrawn
   * 
   * TODO: scrollOffset shouldn't be 0 but depends on the master's position
   * 
   */

	}, {
		key: 'reset',
		value: function reset() {
			this.masterObject = null;

			// remove objects from the map and empty collision groups
			this.objects.length = 0;
			this.friendBullets.length = 0;
			this.enemies.length = 0;
			this.platforms.length = 0;
			// reset mapItems

			// reset windows
			for (var id in this.windows) {
				this.windows[id].displayed = false;
			}

			// reset triggers
			for (var _id in this.triggers) {
				this.triggers[_id].trigerred = false;
			}

			// reset mapEvent switches states too (fixes switch that automatically triggers)
			this.mapEvent.reset();

			// and reset viewPort too
			this.viewportX = this.options.viewportX || 0;
			this.viewportY = this.options.viewportY || 0;
			this.viewportW = this.options.viewportW || 0;
			this.viewportH = this.options.viewportH || 0;

			// and scroll offset
			this.scrollOffsetX = 0;
			this.scrollOffsetY = 0;

			this.scrollTileOffsetX = 0;
			this.scrollTileOffsetY = 0;

			this.firstCol = -this.viewportX / this.tileWidth;
			this.firstRow = -this.viewportY / this.tileHeight;

			this.lastCol = this.firstCol + this.numViewportCols;
			this.lastRow = this.firstRow + this.numViewportRows;

			this.isDirty = true;
		}

		/**
   * Sets the map tiles and tiletypes from binary buffer:
   *  - first (numCols * numRows) bytes are visual tile numbers
   *  - last (numCols * numRows) bytes are the tile types (wall, ladder,...)
   * 
   * @param {any} buffer
   * 
   */

	}, {
		key: 'setBuffer',
		value: function setBuffer(buffer) {
			var size = this.numCols * this.numRows;

			this.map = new Uint8Array(buffer, 0, size);
			this.tileTypes = new Uint8Array(buffer, size);
		}

		/**
   * Sets the master object, it will be used for:
   *  - scrolling the viewport when needed, centering it around the master sprite
   *  - collision detection
   * 
   * @param {GfxObject} obj The object to set as master.
   * 
   */

	}, {
		key: 'setMasterObject',
		value: function setMasterObject(obj) {
			this.masterObject = obj;

			// position master object at map's startX/Y
			// TODO: use checkpoint instead
			obj.x = this.startX;
			obj.y = this.startY;
		}

		/**
   * Add a new graphical object on to the map, it will be:
   *  - displayed if it is visible (in the viewport)
   *  - added to collision group
   * 
   * @param {GfxObject} obj A reference to the new object to add
   * 
   * @note the object will be added to the correct collision group
   * if obj.collideGroup is set
   * 
   */

	}, {
		key: 'addObject',
		value: function addObject(obj) {
			if (!obj.image) {
				obj.setImage(__WEBPACK_IMPORTED_MODULE_2_Resource_ResourceManager__["a" /* default */].getResourceById(obj.imageSrc));
			}
			obj.setMap(this);

			this.objects.push(obj);

			if (obj.master === true) {
				this.setMasterObject(obj);
			}

			// add element to collision group
			if (obj.collideGroup === 1) {
				// console.log('adding', obj.id, 'to enemies group!');
				this.enemies.push(obj);
			} else if (obj.collideGroup === 2) {
				// console.log('adding', obj.id, 'to friend bullets group!');
				this.friendBullets.push(obj);
			} else if (obj.collideGroup === 3) {
				console.log('adding platform', obj.id);
				this.platforms.push(obj);
			} else {
				console.log('no collision or master for', obj.id);
			}
			/*				if (obj.children.length) {
   					for (var i = 0; i < obj.children.length; i++) {
   						this.addObject(obj.children[i]);
   					}
   				}*/
		}

		/**
   * Sets the map tile size (in pixels)
   * 
   * @param {number} width of a map tile.
   * @param {number} height of a map tile.
   * 
   */

	}, {
		key: 'setTilesSize',
		value: function setTilesSize(width, height) {
			this.tileWidth = width;
			this.tileHeight = height;
		}

		/**
   * changes current viewport size and position
   * 
   * @param {number} x Horizontal position of the viewport.
   * @param {number} y Vertical position of the viewport.
   * @param {number} w Width of the viewport.
   * @param {number} h Height of the viewport.
   * 
   * @note there is currently no boundaries checks
   * 
   */

	}, {
		key: 'setViewPort',
		value: function setViewPort(x, y, w, h) {
			this.viewportX = x;
			this.viewportY = y;
			this.viewportW = w;
			this.viewportH = h;
		}

		/**
   * Sets current debug status: when set to true outputs more console logs and may also debug visual stuff
   * like map tiles and objects onto the map
   * 
   * @param {boolean} isDebug Set to true to enable debug.
   * 
   */

	}, {
		key: 'debug',
		value: function debug(isDebug) {
			this.isDebug = isDebug;
			// force tiles redraw at for next map render
			this.isDirty = true;
		}

		/**
   * Move movable objects into the map
   * 
   */

	}, {
		key: 'moveObjects',
		value: function moveObjects() {
			this.objects.forEach(function (obj) {
				// moving platforms must be moved before any other object
				// so they are moved in Map.movePlatforms() first
				if (obj.collideGroup !== 3) {
					obj.move();

					// TODO: set platform() if object reached a platform
				}
			});
		}

		/**
   * Move platform objects onto the map: they must be moved before normal objects are moved 
   * so that movable objects move related to the platforms
   * 
   */

	}, {
		key: 'movePlatforms',
		value: function movePlatforms() {
			this.platforms.forEach(function (obj) {
				obj.move();
			});
		}

		/**
   * Handle moving map & its objects:
   *  - updates the viewport window if map.moving is set
   *  - checks for triggers (that could spawn new objects onto the map)
   *  - move platforms and objects
   * 
   */

	}, {
		key: 'move',
		value: function move() {
			var currentTime = new Date().getTime(),
			    ellapsedTime = currentTime - this.startMoveTime,
			    t = ellapsedTime / this.duration,
			    moveProgress = void 0;

			// TODO: handle end/begining of map reach
			if (this.moving === true) {
				if (ellapsedTime >= this.duration) {
					this.moving = false;
					this.viewportX = this.viewportTargetX;
					this.viewportY = this.viewportTargetY;
					// TODO: send endMove event ?
				} else {
					moveProgress = this.easing(t, ellapsedTime, 0, 1, this.duration);

					// console.log('moving', this.viewportX);

					this.viewportX = this.viewportStartX + moveProgress * this.viewportSpeedX | 0;
					this.viewportY = this.viewportStartY + moveProgress * this.viewportSpeedY | 0;
				}
				this.isDirty = true;
			} else if (this.masterObject) {
				// TODO: this has nothing to do in this method!
				this.checkMasterPosition();
				this.checkForTriggers();
			}

			// first move platforms
			this.movePlatforms();

			// then move normal objects
			this.moveObjects();
		}

		/**
   * 
   * Triggers map scrolling depending on the master's position (if needed)
   * 
   */

	}, {
		key: 'checkMasterPosition',
		value: function checkMasterPosition() {
			var destX = null,
			    destY = null;
			// TODO: adapt moveTo() ?
			// TODO: do not scroll left if we already see all of the map on the left
			if (this.masterObject && !this.moving) {
				// Scroll Type 1: continous
				// if (this.viewportX && ((this.masterObject.x + this.viewportX) < this.viewportLimitX)) {
				// 	destX = this.viewportX + (this.viewportLimitX - (this.masterObject.x + this.viewportX)); // this.viewportCenterX;
				// } else if (((-this.viewportX + this.viewportW) - this.masterObject.x) < this.viewportLimitX) {
				// 	destX = this.viewportX - (this.viewportLimitX - ((-this.viewportX + this.viewportW) - this.masterObject.x)); // this.viewportCenterX;
				// }

				// if (this.viewportY && ((this.masterObject.y + this.viewportY) < this.viewportLimitY)) {
				// 	destY = this.viewportY + this.viewportCenterY;
				// } else if (((-this.viewportY + this.viewportH) - this.masterObject.y) < this.viewportLimitY) {
				// 	destY = this.viewportY - this.viewportCenterY;
				// }

				// Scroll Type 2: direct
				if (this.viewportX && this.masterObject.x + this.viewportX <= this.viewportLimitX) {
					destX = this.viewportX + this.viewportCenterX;
				} else if (-this.viewportX + this.viewportW - this.masterObject.x <= this.viewportLimitX) {
					destX = this.viewportX - this.viewportCenterX;
				}

				if (this.viewportY && this.masterObject.y + this.viewportY <= this.viewportLimitY) {
					destY = this.viewportY + this.viewportCenterY;
				} else if (-this.viewportY + this.viewportH - this.masterObject.y <= this.viewportLimitY) {
					destY = this.viewportY - this.viewportCenterY;
				}

				if (destX !== null || destY !== null) {
					this.moveTo(destX !== null ? destX : this.viewportX, destY !== null ? destY : this.viewportY);
				}

				if (destX !== null || destY !== null) {
					this.moveTo(destX !== null ? destX : this.viewportX, destY !== null ? destY : this.viewportY);
				}
			}
		}

		/**
   * 
   * Checks for collisions
   * 
   */

	}, {
		key: 'checkCollisions',
		value: function checkCollisions() {
			if (this.masterObject && this.masterObject.canCollide) {
				this.checkMasterToEnemiesCollisions();
			}

			this.checkMasterBulletsToEnemiesCollisions();
		}

		/**
   * 
   * Check for map triggers and handle any found triggers, like enemies or bonus that can appear
   * when the player reaches certain positions
   * 
   */

	}, {
		key: 'checkForTriggers',
		value: function checkForTriggers() {
			var _this = this;

			var box = this.masterObject.getHitBox(),
			    triggers = this.getTriggersForBox(this.masterObject.x + box.x, this.masterObject.y + box.y, this.masterObject.x + box.x2, this.masterObject.y + box.y2);

			triggers.forEach(function (trigger) {
				trigger.triggered = !_this.mapEvent.handleEvent(trigger);
			});
		}

		/**
   * Sets a new destination for the viewport: this method doesn't not set it immediately
   * but sets a new target instead: if not already moving, new move will happen at each
   * render inside the map.move() method
   * 
   * @param {number} x The horizontal position to move the viewport at.
   * @param {number} y The vertical position to move the viewport at.
   * 
   * @note moveTo will do nothing in case the map already has a destination set
   */

	}, {
		key: 'moveTo',
		value: function moveTo(x, y) {
			// TODO: snap x/y to screen edge
			if (!this.moving) {
				console.log('moveTo from', this.viewportX, 'to', x);
				if (this.masterObject) {
					this.masterObject.savePosition();
				}

				this.viewportTargetX = x > 0 ? 0 : x;
				// TODO: snap y to edge of the screen
				this.viewportTargetY = y;
				this.startMoveTime = new Date().getTime();
				this.viewportSpeedX = x - this.viewportX | 0;
				this.viewportSpeedY = y - this.viewportY | 0;
				this.viewportStartX = this.viewportX;
				this.viewportStartY = this.viewportY;
				this.moving = true;
			}
		}

		/**
   * Sets new tiles image source
   * 
   * @param {Object} options
   * @param {String} options.src The new source.
   * 
   * @private
   * 
   */

	}, {
		key: 'setNewSrc',
		value: function setNewSrc(options) {
			this.src = options.src;
		}

		/**
   * Returns current source image url used to render map tiles
   * 
   * @returns {String} The current source image used to render the tiles.
   * 
   * @private
   */

	}, {
		key: 'getSrc',
		value: function getSrc() {
			return this.src;
		}

		/**
   * Checks if tile at position x,y is `TYPE.WALL` and returns true if it is a wall, false otherwise
   * 
   * @param {number} x The x position of the tile to check.
   * @param {number} y The y position of the tile to check.
   * @returns {boolean} Returns true if the tile is a wall, false otherwise.
   * 
   * @related {Tile}
   */

	}, {
		key: 'fallTest',
		value: function fallTest(x, y) {
			var pos = this.getTilePos(x, y);

			// return (!(this.tileTypes[pos.x + pos.y * this.numCols] & 1));
			return this.tileTypes[pos.x + pos.y * this.numCols] === __WEBPACK_IMPORTED_MODULE_0_Map_Tile__["a" /* default */].TYPE.WALL;
		}

		/**
   * 
   * Checks collisions between master bullets and enemies: call hitTest method on
   * any frend bullet object with the enemies object as parameter
   * 
   */

	}, {
		key: 'checkMasterBulletsToEnemiesCollisions',
		value: function checkMasterBulletsToEnemiesCollisions() {
			var i = 0,
			    j = 0,
			    bullet = null,
			    enemy = null,
			    maxBullets = this.friendBullets.length,
			    maxEnemies = this.enemies.length;

			for (i = 0; i < maxBullets; ++i) {
				for (j = 0; j < maxEnemies; ++j) {
					if (this.enemies[j] && this.enemies[j].canCollideFriendBullet) {
						this.friendBullets[i] && this.friendBullets[i].hitTest(this.enemies[j]);
					}
				}
			}
		}

		/**
   * Checks collisions between master object and enemies, calling hitTest on any enemie
   * that collides with the master
   * 
   * @returns {boolean} Returns true if the masterSprite was hit, false otherwise.
   * 
   */

	}, {
		key: 'checkMasterToEnemiesCollisions',
		value: function checkMasterToEnemiesCollisions() {
			var i = 0,
			    max = this.enemies.length,
			    found = false;

			// TODO: player should have some invicibility for a few frames once it has
			// hit an enemy
			while (i < max && !found) {
				found = this.enemies[i].hitTest(this.masterObject);
				i++;
			}

			return found;
		}

		/**
   * WIP: Check if user will reach a platform
   * 
   * @param {any} sprite
   * @param {any} vx
   * @param {any} vy
   * @returns {boolean} false (not fully implemented yet)
   * 
   * @private
   * 
   */

	}, {
		key: 'checkForPlatform',
		value: function checkForPlatform(object, vx, vy) {
			var box = object.getHitBox(),
			    x = box.x + sprite.x,
			    y = box.y + sprite.y;

			this.platforms.forEach(function (platform) {
				var platformBox = platform.getHitBox(),
				    platformX = platform.x + platformBox.x,
				    platformY = platform.y + platformBox.y;
			});

			return false;
		}

		/**
   * getTriggers for map window: `(x, y, x2, y2)`
   * 
   * @param {number} x The x coordonate of left top corner of the box to check for.
   * @param {numer} y The y coordonate of left top corner of the box to check for.
   * @param {numer} x2 The x coordonate of right bottom corner of the box to check for.
   * @param {number} y2 The y coordonate of right bottom corner of the box to check for.
   * 
   * @returns {Array} a list of trigger objects that have not already been triggered
   * 
   * @private
   */

	}, {
		key: 'getTriggersForBox',
		value: function getTriggersForBox(x, y, x2, y2) {
			var pos1 = this.getTilePos(x, y),
			    pos2 = this.getTilePos(x2, y),
			    pos3 = this.getTilePos(x, y2),

			/* pos4 = this.getTilePos(x2, y2), */
			max1 = pos2.x,
			    max2 = pos3.y,
			    i = void 0,
			    j = void 0,
			    triggers = [],
			    trigger = null;

			for (i = pos1.x; i <= max1; i++) {
				for (j = pos1.y; j <= max2; j++) {
					trigger = this.triggers[j * this.numCols + i];
					if (trigger && !trigger.triggered) {
						// remove it so it cannot be triggered again: what if we want to run the map again ?
						// this.triggers[j * this.numCols + i] = null;
						triggers.push(trigger);
					}
				}
			}

			return triggers;
		}

		/**
   * Calculates and sets the object's next x position using its current x, vx and
   * avoids tileTypes tiles (ie: walls, moving platforms)
   * 
   * @param {GfxObject} sprite The sprite to get next position of.
   * @param {number} tileTypes The tileType.
   * @returns {boolean} Returns true if the object hit the spcified tile, false otherwise
   * 
   */

	}, {
		key: 'setNextX',
		value: function setNextX(sprite, tileTypes) {
			// TODO: if player moves too fast, or tiles are too small,
			// we may miss some tiles and do not detect colisions
			// TODO: 2. handle type of movingPlatform: platformType: 0 | 1
			// TODO: 3. Iterate through list of movingPlatforms of platformType [1] too
			// if closer than (sprite.x + sprite.vx [ +hitBox.x2 ]) && < maxX
			// then maxX = movingPlatform.size - 1

			var left = sprite.vx > 0 ? false : true;

			var hitBox = sprite.getHitBox(),
			    spriteYMax = sprite.y + hitBox.y2,
			    startX = left ? sprite.x + hitBox.x - 1 : sprite.x + hitBox.x2 + 1,
			    startY = sprite.y + hitBox.y,
			    tilePos = this.getTilePos(startX, startY),
			    found = false,
			    minX = left ? startX : 0;
			//
			// console.log('begin test');
			// left: minX >= sprite.vx => minX 
			while (!found && (left && minX >= sprite.vx || !left && minX <= sprite.vx)) {
				for (var i = tilePos.y * this.tileHeight; i < spriteYMax; i += this.tileHeight, tilePos.y++) {
					// DISABLE WALL COLLISIONS
					// TODO: add a parameter to toggle collisions at runtime
					if (this.tileTypes[tilePos.y * this.numCols + tilePos.x] === tileTypes) {
						found = true;
						break;
					}
				}

				if (!found) {
					minX = left ? tilePos.x * this.tileWidth - startX : ++tilePos.x * this.tileWidth - startX;
				}
				startX = left ? tilePos.x * this.tileWidth - 1 : tilePos.x * this.tileWidth;

				tilePos = this.getTilePos(startX, startY);
			}
			// console.log('end test');

			if (left && sprite.vx >= minX || !left && sprite.vx < minX) {
				sprite.x += sprite.vx;
				return false;
			} else {
				console.log('**collision');
				sprite.x += minX;
				return true;
			}
		}

		/**
   * WIP: Calculates and sets the object's next y position using its current y, vy and
   * avoids tileTypes tiles (ie: walls, moving platforms)
   * 
   * @param {any} sprite
   * @param {any} tileTypes
   * @returns true if the object hit a tile, false otherwise
   * 
   */

	}, {
		key: 'setNextYTop',
		value: function setNextYTop(sprite, tileTypes) {
			var hitBox = sprite.getHitBox,
			    spriteXMax = sprite.x + hitBox.x2,
			    startX = sprite.x + hitBox.x,
			    startY = sprite.y + hitBox.x2 + 1,
			    tilePos = this.getTilePos(startX, startY),
			    found = false,
			    minY = 0;

			// while (!found && minY <= sprite.vy) {
			// 	for (let i = tilePos.x * this.tileWidth; i < spriteXMax; i += this.tileWidth) {
			// 		if (this.tileTypes[tilePos.y * this.numCols + tilePos.x] === tileTypes) {
			// 			found = true;
			// 			break;
			// 		}
			// 	}				
			// }

			sprite.y += sprite.vy;
		}

		// setNextXRight(sprite, tileTypes) {
		// 	let hitBox = sprite.getHitBox(),
		// 		spriteYMax = sprite.y + hitBox.y2,
		// 		startX = sprite.x + hitBox.x2 + 1,
		// 		startY = sprite.y + hitBox.y,
		// 		tilePos = this.getTilePos(startX, startY),
		// 		found = false,
		// 		minX = 0;

		// 		//
		// 		// console.log('begin test');
		// 		while (!found && minX <= sprite.vx) {
		// 			// check full sprite's height for a collision
		// 			for (let i = tilePos.y * this.tileHeight; i < spriteYMax; i += this.tileHeight, tilePos.y++) {
		// 				if (this.tileTypes[tilePos.y * this.numCols + tilePos.x] === tileTypes) {
		// 					found = true;
		// 					break;
		// 				}
		// 			}

		// 			// not found ? minX maybe next tile on the right then
		// 			if (!found) {
		// 				minX = (++tilePos.x * this.tileWidth) - startX;
		// 			}
		// 			startX = tilePos.x * this.tileWidth;

		// 			tilePos = this.getTilePos(startX, startY);
		// 		}
		// 		// console.log('end test');

		// 		if (sprite.vx < minX) {
		// 			sprite.x += sprite.vx;
		// 			return false;
		// 		} else {
		// 			sprite.x += minX;
		// 			return true;
		// 		}
		// 	}


		/**
   * Checks if an object is in front of a certain type of tileType,
   * optionnaly centering the object under the tile
   * 
   * Used when checking if the player can climb a ladder for example
   * 
   * spaceX/spaceY specify how to reduce the players hitbox
   * 
   * @param {GfxObject} sprite The sprite to check.
   * @param {number} tileType The tileType to check for.
   * @param {number} [spaceX=0] The x padding that is accepted: if horizontal position is +/- that spaceX, check will succeed.
   * @param {number} [spaceY=0] The y padding that is accepted: if vertical position is +/- that spaceX, check will succeed.
   * @param {boolean} [center=false] Set to true if you want to sprite to be centered on the tile.
   * 
   * @returns {boolean} True if the tile was found, false otherwise
   * 
   */

	}, {
		key: 'checkForTileType',
		value: function checkForTileType(sprite, tileType) {
			var spaceX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
			var spaceY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
			var center = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

			var currentHitBox = sprite.getHitBox(),
			    pos = this.hitObjectTest(currentHitBox.x + sprite.x + spaceX, currentHitBox.y + sprite.y + spaceY, currentHitBox.x2 + sprite.x - spaceX, currentHitBox.y2 + sprite.y - spaceY, tileType);

			if (pos) {
				// TODO: center if center === true
				if (center) {
					sprite.centerXOverTile(pos);
				}
				return true;
			} else {
				return false;
			}
		}

		/**
   * Tests if a rectangle collapses with certain types of tiles
   * Used when checking colligions between a sprite and walls for example
   * 
   * @param {number} x
   * @param {number} y
   * @param {number} x2
   * @param {number} y2
   * @param {number} types
   * @returns {boolean} True if colision detected
   * 
   */

	}, {
		key: 'hitObjectTest',
		value: function hitObjectTest(x, y, x2, y2, types) {
			var pos1 = this.getTilePos(x, y),
			    pos2 = this.getTilePos(x2, y),
			    pos3 = this.getTilePos(x, y2),
			    max1 = pos2.x,
			    max2 = pos3.y,
			    i = void 0,
			    j = void 0,
			    tileType = void 0;

			for (i = pos1.x; i <= max1; i++) {
				for (j = pos1.y; j <= max2; j++) {
					tileType = this.tileTypes[j * this.numCols + i];
					if (tileType === types) {
						return {
							x: i,
							y: j,
							tile: {
								x: i * this.tileWidth,
								y: j * this.tileHeight
							}
						};
					}
				}
			}

			return false;
		}

		/**
   * Draws tile at pixel position (x, y) onto the specified {Canvas} context
   * 
   * @note If offset is true it means scroll is in progress and
   * we are drawing the first col: in this case we have to draw
   * a partial tile and we do not use tileWidth/tileHeight
   * but this.scrollTileOffsetX instead
   * 
   * @param {number} tileNum The tile number to draw.
   * @param {CanvasContext} ctx The canvas rendering context to draw the tile into.
   * @param {number} x The horizontal position where to draw the tile.
   * @param {number} y The vertical position where to draw the tile.
   * @param {Boolean} useScrollOffset If set to true, the tile will be partially rendered
   * starting at scrollOffsetX. This happens if the tile is at the firstRow/firstCol of the viewport.
   * 
   * @note Unless noted otherwise, positions are related to the whole map, and not to the viewport.
   */

	}, {
		key: 'drawTile',
		value: function drawTile(tileNum, ctx, x, y, useScrollOffset) {
			var currentTile = this.tiles[tileNum];

			if (useScrollOffset) {
				ctx.drawImage(this.srcBitmap, currentTile.offsetX + this.scrollOffsetX, currentTile.offsetY + this.scrollOffsetY, this.scrollTileOffsetX, this.scrollTileOffsetY, x, y, this.scrollTileOffsetX, this.scrollTileOffsetY);
			} else {
				ctx.drawImage(this.srcBitmap, currentTile.offsetX, currentTile.offsetY, this.tileWidth, this.tileHeight, x, y, this.tileWidth, this.tileHeight);
			}
		}

		/**
   * Internal: calculates scrolling offsets for first cols in case a scrolling is in progress
   * 
   * @private
   */

	}, {
		key: '_getScrollOffset',
		value: function _getScrollOffset() {
			var viewportX = Math.abs(this.viewportX),
			    viewportY = Math.abs(this.viewportY);

			this.scrollOffsetX = viewportX < this.tileWidth ? viewportX : viewportX % this.tileWidth, this.scrollOffsetY = viewportY < this.tileHeight ? viewportY : viewportY % this.tileHeight;
			this.scrollTileOffsetX = this.tileWidth - this.scrollOffsetX;
			this.scrollTileOffsetY = this.tileHeight - this.scrollOffsetY;
		}

		/**
   * Draws the map, showing the whole map and not only the visible window if showHidden true
   * 
   * @param {CanvasContext} ctx The context of the canvas where to draw the map.
   * @param {boolean} showHidden The map only draws the viewport, set this to true to draw the whole map.
   * 
   * @private
   */

	}, {
		key: 'draw',
		value: function draw(ctx, showHidden) {
			var i = void 0,
			    j = void 0,
			    max = void 0,
			    max2 = void 0,
			    tileNum = 0,
			    x = 0,
			    y = 0;

			if (!this.srcBitmap) {
				// console.log('[Map] no bitmap, need to get the source');
				this.srcBitmap = __WEBPACK_IMPORTED_MODULE_2_Resource_ResourceManager__["a" /* default */].getResourceById(this.src);
			}

			// this.isDirty = true;

			i = j = max = max2 = 0;
			// 1. get first col/row of map
			if (this.isDirty || !this.lastCol) {
				this._getBoundariesTiles(showHidden);
			}

			if (this.isDirty || !this.lastCol) {
				this._getScrollOffset();

				for (i = this.firstRow, max = this.lastRow, y = 0; i < max; i++) {
					for (j = this.firstCol, max2 = this.lastCol, x = 0; j < max2; j++) {
						tileNum = this.map[i * this.numCols + j];

						if (tileNum < 255) {
							// no tile goes here
							// TODO: check that viewportY is not zero too ?
							this.drawTile(tileNum, ctx, x, y, this.viewportY && i === this.firstRow || this.viewportX && j === this.firstCol);
						}
						if (this.viewportX && j === this.firstCol) {
							x += this.scrollTileOffsetX;
						} else {
							x += this.tileWidth;
						}
					}
					if (this.viewPortY && i === this.firstRow) {
						y += this.scrollTileOffsetY;
					} else {
						y += this.tileHeight;
					}
				}

				/* This should be done in another canvas */
				if (this.isDebug === true) {
					this.showTileBehaviors(ctx, showHidden);
				}

				this.addNewObjectsFromWindow();

				this.isDirty = false;
			} else {
				// do not draw map otherwise
			}
		}

		/**
   * Adds new Objects onto the map if this is the first time we display this window.
   * 
   * Each map is divided into windows: each viewport window is the size of the current viewport
   * When drawing a window for the first time, objects found into this window are added to the map
   * It can be enemies, etc...
   * 
   * @private
   */

	}, {
		key: 'addNewObjectsFromWindow',
		value: function addNewObjectsFromWindow() {
			var _this2 = this;

			var windowNum = (Math.abs(this.viewportX) / this.viewportW | 0) + (Math.abs(this.viewportY) / this.viewportH | 0),
			    window = this.windows[windowNum];

			if (window.displayed === false) {
				window.displayed = true;
				window.items.forEach(function (item, i) {
					var obj = __WEBPACK_IMPORTED_MODULE_2_Resource_ResourceManager__["a" /* default */].newResourceFromPool(item.type, item.spriteOptions);
					_this2.addObject(obj);
					// add a reference to the sprite into mapEvent.items
					// this will be used to destroy sprite when puzzle is checked
					// for example
					if (item.itemId) {
						_this2.mapEvent.addItem(item.itemId, obj);
					}
				});
			}
		}

		/**
   * Draw all objects that are onto the map
   * 
   * @param {CanvasContext} ctx The context where to draw the objects.
   * 
   * @private
   */

	}, {
		key: 'drawObjects',
		value: function drawObjects(ctx) {
			var i = void 0,
			    max = this.objects.length,
			    objects = this.objects;

			// TODO: only draw visible objects (viewport) + active ones
			for (i = max - 1; i >= 0; i--) {
				// console.log('drawing', objects[i].id);
				objects[i].draw(ctx, this.isDebug);
			}
		}

		/**
   * Returns the tile at (x, y) pixels
   * 
   * @param {number} x The horizontal position in pixels.
   * @param {number} y The vertical position in pixels.
   * 
   * @note Position is related to the whole map, not the viewport.
   * 
   * @returns {Tile=undefined} The tile that is found at position x, y, undefined if tile `(x, y)` is out of bounds
   * 
   */

	}, {
		key: 'getTileAt',
		value: function getTileAt(x, y) {
			var i = void 0,
			    j = void 0,
			    tileNum = void 0;

			i = x / this.tileWidth | 0;
			j = y / this.tileHeight | 0;
			tileNum = this.map[this.numCols * j + i];

			return this.tiles[tileNum];
		}

		/**
   * Returns index of the tile at pos (x,y) in map array
   * 
   * @param {number} x
   * @param {number} y
   * @returns {Object} Object with i, j tile index
   * 
   */

	}, {
		key: 'getTilePos',
		value: function getTilePos(x, y) {
			var i = void 0,
			    j = void 0;

			i = x / this.tileWidth | 0;
			j = y / this.tileHeight | 0;

			return {
				x: i,
				y: j
			};
		}

		/**
   * 
   * INTERNAL: Calculates the number of tile rows & cols, and number of rows/cols
   * per viewport window
   * 
   * @private
   */

	}, {
		key: '_calcNumTiles',
		value: function _calcNumTiles() {
			this.numCols = this.width / this.tileWidth | 0;
			this.numRows = this.height / this.tileHeight | 0;

			this.numViewportCols = this.viewportW / this.tileWidth | 0;
			this.numViewportRows = this.viewportH / this.tileHeight | 0;
		}

		/**
   * Calculates first/last Row & Cool that is part of current display viewport
   * If showHidden is set to true we display the whole map so:
   * firstCol = firstRow = 0
   * lastCol/lastRow = lastCol/lastRow of the map
   * 
   * @param {Boolean=false} showHidden Set to true to get boundaries for the whole map.
   * 
   * @private
   */

	}, {
		key: '_getBoundariesTiles',
		value: function _getBoundariesTiles(showHidden) {
			// TODO: handle boundaries and reverse ?!!
			// offsetX is current x offset in pixel: we need to get the corresponding tile number
			if (showHidden) {
				this.firstCol = 0;
				this.firstRow = 0;

				this.lastCol = this.width / this.tileWidth | 0;
				// console.log(this.viewportW, '/', this.tileWidth);
				this.lastRow = this.height / this.tileHeight | 0;
			} else {
				this.firstCol = Math.floor(-this.viewportX / this.tileWidth);
				this.firstRow = Math.floor(-this.viewportY / this.tileHeight);

				this.lastCol = this.firstCol + this.numViewportCols;
				this.lastRow = this.firstRow + this.numViewportRows;

				if (this.viewportX % this.tileWidth) {
					this.lastCol++;
				}

				if (this.viewportY % this.tileHeight) {
					this.lastRow++;
				}
			}
		}

		/**
   * Send specified event to the NotificationManager
   * 
   * @param {String} eventType The type of event to send.
   * @param {Object} data The data to send with the notification.
   * 
   */

	}, {
		key: 'notify',
		value: function notify(eventType, data) {
			__WEBPACK_IMPORTED_MODULE_3_Notification_NotificationManager__["a" /* default */].notify(eventType, data);
		}

		/**
   * removeObject from the map
   * 
   * @param {GfxObject} gfxObject The object to remove from the map.
   * 
   * @note the object if automatically removed from collision lists
   * 
   */

	}, {
		key: 'removeObject',
		value: function removeObject(gfxObject) {
			var foundIndex = this.objects.indexOf(gfxObject);

			if (foundIndex > -1) {
				this.objects.splice(foundIndex, 1);
			}

			foundIndex = this.enemies.indexOf(gfxObject);

			if (foundIndex > -1) {
				this.enemies.splice(foundIndex, 1);
			} else if ((foundIndex = this.friendBullets.indexOf(gfxObject)) > -1) {
				this.friendBullets.splice(foundIndex, 1);
			}
		}

		/**
   * Schedule adding a new object to the map
   * 
   * @param {String} spriteId The id of the new sprite to add.
   * @param {Object} spriteOptions The options that will be passed to the object constructor.
   * @param {number=0} delay The delay in milliseconds to wait before adding the object.
   * @returns {GfxObject} the new object
   * 
   */

	}, {
		key: 'scheduleSprite',
		value: function scheduleSprite(spriteId, spriteOptions, delay) {
			var _this3 = this;

			var sprite = __WEBPACK_IMPORTED_MODULE_2_Resource_ResourceManager__["a" /* default */].newResourceFromPool(spriteId, spriteOptions);

			// No need to call setTimeout if delay is zero
			if (delay) {
				setTimeout(function () {
					_this3.addObject(sprite);
				}, delay);
			} else {
				this.addObject(sprite);
			}

			return sprite;
		}

		/**
   * Add a new wave of objects to the map
  * Used for example when the player triggers apparition of several enemies or bonuses
   * 
   * @param {Object} options The options to pass to the wav object
   * @returns
   * 
  * @related {Wave}
   */

	}, {
		key: 'handleWave',
		value: function handleWave(options) {
			// console.log('wave');
			var waveSize = options.size,
			    wave = new __WEBPACK_IMPORTED_MODULE_1_Object_Wave__["a" /* default */](options),
			    i = 0,
			    delay = 0;

			options.spriteOptions.wave = wave;

			for (i = 0; i < waveSize; i++) {
				this.scheduleSprite(options.spriteId, options.spriteOptions, delay);
				// setTimeout((function(options, map) { return function() {
				//     // var sprite = new (RM.getResourceById(options.spriteId))(options.spriteOptions);
				//     var sprite = RM.newResourceFromPool(options.spriteId, options.spriteOptions);
				//     map.addSprite(sprite);
				// };})(options, this.map), delay);
				delay += options.delay || 0;
			}

			return false;
		}

		/**
   * DEBUG: draw outline of each tile with a different color, depending
   * on the type of tile
   * 
   * @param {CanvasContext} ctx The canvas context to render outline on.
   * 
   */

	}, {
		key: 'showTileBehaviors',
		value: function showTileBehaviors(ctx) {
			var i = void 0,
			    j = void 0,
			    max = void 0,
			    max2 = void 0,
			    x = 0,
			    y = 0,
			    styles = [null, null, 'rgba(240,0,0,.6)', 'rgba(0,0,240,.6)'],
			    w = void 0,
			    h = void 0;

			i = j = max = max2 = 0;

			for (i = this.firstRow, max = this.lastRow, y = 0; i < max; i++) {
				for (j = this.firstCol, max2 = this.lastCol, x = 0; j < max2; j++) {
					w = this.viewportX && j === this.firstCol ? this.scrollTileOffsetX : this.tileWidth;
					h = this.viewPortY && i === this.firstRow ? this.scrollTileOffsetY : this.tileHeight;
					if (this.tileTypes[i * this.numCols + j] > 1) {
						// if (this.tileTypes[i * this.numCols + j] > 1) {
						// 	debugger;
						// }
						ctx.fillStyle = styles[this.tileTypes[i * this.numCols + j]];
						ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.lineTo(x + w, y);
						ctx.lineTo(x + w, y + h);
						ctx.lineTo(x, y + h);
						ctx.lineTo(x, y);
						ctx.closePath();
						ctx.fill();
					}
					if (this.viewportX && j === this.firstCol) {
						x += this.scrollTileOffsetX;
					} else {
						x += this.tileWidth;
					}
				}
				if (this.viewPortY && i === this.firstRow) {
					y += this.scrollTileOffsetY;
				} else {
					y += this.tileHeight;
				}
			}
		}

		/**
   * 
   * DEBUG: displays the list of each object and its type/id onto the console
   * 
   * @private
   */

	}, {
		key: 'getObjectsList',
		value: function getObjectsList() {
			this.objects.forEach(function (obj, i) {
				console.log('[' + i + ']', obj.type, '(' + obj.id + ')');
			});
		}

		/**
   * WIP/DEBUG: converts current map into a string
   * 
   * @returns {String} The json export of the map
   * 
   * @private
   */

	}, {
		key: 'toString',
		value: function toString() {
			// exports the options needed to create current map
			// especially usefull when working on a new map with the MapEditor
			//
			var i = 0,
			    max = this.tiles.length,
			    tile = null,
			    obj = {
				src: this.src,
				viewportX: 0,
				viewportY: 0,
				viewportW: this.viewportW,
				viewportH: this.viewportH,
				width: this.width,
				height: this.height,
				tileWidth: this.tileWidth,
				tileHeight: this.tileHeight,
				map: this.map,
				bjects: this.objects,
				tiles: []
			};

			for (i = 0; i < max; i++) {
				tile = this.tiles[i];
				obj.tiles.push('new Tile({' + 'offsetX: tile.offsetX,' + 'offsetY: tile.offsetY,' + 'width: tile.width,' + 'height: tile.height,' + 'inertia: tile.inertia,' + 'upCollide: tile.upCollide,' + 'downCollide: tile.downCollide' + '}),');
			}

			return JSON.stringify(obj);
		}

		/**
   * DEPRECATED: Creates tiles from an array of tiles description
   * 
   * @param {any} tilesArray
   * @returns array of tile objects
   * 
   * @private
   */

	}, {
		key: '_createTiles',
		value: function _createTiles(tilesArray) {
			// TODO: replace with map()
			var tiles = [];

			tilesArray.forEach(function (tileDesc) {
				tiles.push(new __WEBPACK_IMPORTED_MODULE_0_Map_Tile__["a" /* default */](tileDesc));
			});

			return tiles;
		}

		/**
   * WIP & NOT TESTED: some code to allow resizing a map, was to be used in map editor
   * 
   * @param {string} direction Where to extend the map, can be 'bottomLeft', 'bottomRight', 'topLeft', 'topRight'
   * @param {Object} options
   * 
   * @private
   */

	}, {
		key: 'resize',
		value: function resize(direction, options) {
			/*
   	only increases size for now (decrease means we may loose some objects,...)
   	direction:
   	'topleft' == top -> bottom, left -> right (option = {newWidth, newHeight})
   	'topright' == top -> bottom, right -> left (option = {newWidth, newHeight})
   	'bottomleft' == bottom -> top, left -> right (option = {newWidth, newHeight})
   	'bottomright' == bottom -> top, right -> left (option = {newWidth, newHeight})
   	'center' == center -> each side (option = {newSize})
   */
			var buffer = null,
			    triggers = {},
			    itemBlocks = {},
			    map = null,
			    tileTypes = null,
			    item = null,
			    items = null;

			// TODO: should we allow changing viewpPort size as well ?
			/*				this.width = width;
   				this.height = height;
   				this.viewportW = vpWidth;
   				this.viewportH = vpHeight;
   				this.viewportX = 0;
   				this.viewportY = 0;*/

			if (direction === 'bottomleft') {
				var diffWidth = options.newWidth - this.width,
				    diffHeight = options.newHeight - this.height,
				    numCols = options.newWidth / this.tileWidth | 0,
				    numRows = options.newHeight / this.tileHeight | 0,
				    diffCols = numCols - this.numCols,
				    diffRows = numRows - this.numRows,
				    oldBlockX = this.width / this.viewportW | 0,
				    oldBlockY = this.height / this.viewportH | 0,
				    newBlockX = options.newWidth / this.viewportW | 0,
				    newBlockY = options.newHeight / this.viewportH | 0,
				    newBlocksX = newBlockX - oldBlockX,
				    newBlocksY = newBlockY - oldBlockY;

				// create new buffer for map tiles + behaviors
				buffer = new ArrayBuffer(numCols * numRows * 2), map = new Uint8Array(buffer, 0, numRows * numCols), tileTypes = new Uint8Array(buffer, numRows * numCols, numRows * numCols);

				// new buffer is automatically filled with zeros
				// so we only need to copy existing tiles/behaviors into the new
				// buffer at the correct position
				for (var y = diffRows; y < numRows; y++) {
					for (var x = 0; x < this.numCols; x++) {
						map[y * numCols + x] = this.map[y * numCols + x];
						tileTypes[y * numCols + x] = this.tileTypes[y * numCols + x];

						if (this.triggers[y * numCols + x]) {
							item = Object.assign({}, true, this.triggers[y * numCols + x]);
							if (item.spriteOptions) {
								item.spriteOptions.y += diffHeight;
							}
							triggers[y * numCols + x] = item;
						}
					}
				}

				this.setBuffer(buffer);
				this.width = options.newWidth;
				this.height = options.newHeight;

				this.triggers = triggers;

				this._calcNumTiles();

				// this was the easiest part, now we need to update triggers and mapblocks
				// if needed, we simply create new blocks, but do not modify blocks (we would
				// need to move each item depending on position, this is too much work)
				// simply add existing blocks, new ones are empty so should not be added
				for (var _y = newBlocksY; _y < newBlockY; ++_y) {
					for (var _x4 = 0; _x4 < oldBlockX; ++_x4) {
						if (this.windows[_y * oldBlockX + _x4]) {
							items = this.windows[_y * oldBlockX + _x4].items;

							for (var num = 0; num < items.length; ++num) {
								item = Object.assign({}, items[num]);
								// we consider x and y are always set
								if (item.spriteOptions) {
									item.spriteOptions.y += diffHeight;
								}
							}

							// TODO: since we're doing this.windows = mapItemBlocks we
							// should copy and not only get references of each element
							itemBlocks[_y * oldBlockX + _x4] = {
								displayed: false,
								items: items.slice(0)
							};
						}
					}
				}

				this.windows = itemBlocks;

				// that's all folks !
				// TODO: test me!
			} else {
				throw 'resize not support for direction' + direction;
			}
		}
	}]);

	return Map;
}();

;

/* harmony default export */ __webpack_exports__["a"] = (Map);

/***/ }),
/* 19 */
/* exports provided: default */
/* exports used: default */
/*!****************************!*\
  !*** ./js/Map/MapEvent.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint devel: true*/
/**
 * MapEvent handles events that are triggered on the map.
 * Such events can be: checkpoint was reached, new wave needs to
 * be generated, etc...
 * 
 * For that, the MapEvent class stores a list of items, events, switches
 * that are on the map.
 * 
 * This is a default MapEvent class: games should extend MapEvent
 * to handle whatever events they need.
 * 
 * @param {Map} map The [`Map`](#Map) to use
 */
var MapEvent = function () {
    function MapEvent(map) {
        _classCallCheck(this, MapEvent);

        console.log('[MapEvent] init with map');
        this.map = map || null;
        this.reset();
    }

    /**
     * Resets the MapEvent switches, events and items
     */


    _createClass(MapEvent, [{
        key: 'reset',
        value: function reset() {
            this.switches = {};
            this.events = [];
            this.items = {};
        }

        /**
         * Adds a new [`GfxObject`]{#item} onto the map
         * 
         * @param {string} id of the item to add
         * @param {GfxObject} item to add
         */

    }, {
        key: 'addItem',
        value: function addItem(id, item) {
            this.items[id] = item;
        }

        /**
         * Returns an item
         * 
         * @param {string} id of the item to retrieve
         * 
         * @returns {Object|undefined} The item or undefined if it wasn't handled by the map
         */

    }, {
        key: 'getItem',
        value: function getItem(id) {
            return this.items[id];
        }

        // TODO: ability to trigger an event once a switch has been modified

    }, {
        key: 'setSwitch',
        value: function setSwitch(id, bool) {
            this.switches[id] = bool;
        }
    }, {
        key: 'toggleSwitch',
        value: function toggleSwitch(id) {
            this.setSwitch(id, typeof this.switches[id] !== 'undefined' ? !this.switches[id] : true);
        }
    }, {
        key: 'getSwitch',
        value: function getSwitch(id) {
            return this.switches[id] || false;
        }
    }, {
        key: 'checkConditions',
        value: function checkConditions(trigger) {
            var conditions = trigger.conditions,
                cond = null,
                i,
                success = true,
                max;

            if (!conditions) {
                return true;
            } else {
                // test that all conditions are valid
                for (i = 0, max = conditions.length; i < max; i++) {
                    cond = conditions[i];
                    switch (cond.type) {
                        case 'time':
                            // compare time
                            break;

                        case 'switch':
                            // get switch & status and compare
                            // console.log('getting switch', cond.id, '=>', cond.status);
                            success = this.getSwitch(cond.id) === cond.status;
                            break;
                    }

                    if (!success) {
                        break;
                    }
                }
                return success;
            }
        }
    }, {
        key: 'handleAction',
        value: function handleAction(options) {
            var sprite;

            // handle action
            switch (options.type) {
                case 'toggleSwitch':
                    sprite = options.sprite;
                    // toggle Sprite image
                    sprite.toggleSwitch();
                    // and set internal state for this sprite id
                    this.toggleSwitch(sprite.id);
                    break;

                default:
                    // super.handleAction(options);
                    console.log('[MapEvent] non-handled action type', options.type);
                    break;
            }
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(options) {
            var type = options.type,
                item = null;

            if (this.checkConditions(options)) {
                switch (type) {
                    case 'cp':
                        this.map.setStartXYFromMaster();
                        break;

                    case 'message':
                        this.map.notify('game:message', {
                            message: options.message
                        });
                        break;

                    case 'wave':
                        return this.map.handleWave(Object.assign({}, options));
                        break;

                    case 'explosion':
                        // generate explosion
                        this.map.scheduleSprite(options.spriteId, options.spriteOptions, 0);

                        item = this.getItem(options.targetId);

                        item.destroy();
                        break;

                    default:
                        // return super.handleEvent(options);
                        console.log('non-handled Event', options.type);
                        break;
                }
            } else {
                // we need to recheck a non triggered event
                return true;
            }
        }
    }, {
        key: 'triggerEvent',
        value: function triggerEvent(id) {
            this.events.push(id);
        }
    }, {
        key: 'isEventTriggered',
        value: function isEventTriggered(id) {
            return this.events.indexOf(id) > -1;
        }

        // handleEvent(options) {
        //     console.warn('[MapEvent] Unhandled event', options.type);
        //     return false;
        // }

        // handleAction(options) {

        // }

    }]);

    return MapEvent;
}();

/* harmony default export */ __webpack_exports__["a"] = (MapEvent);
;

/***/ }),
/* 20 */
/* exports provided: default */
/* exports used: default */
/*!*********************************!*\
  !*** ./js/Object/BitmapText.js ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Object__ = __webpack_require__(/*! Object/Object */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_FX_FX__ = __webpack_require__(/*! FX/FX */ 1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/*jshint devel: true, bitwise: false*/
/*globals Class*/
/**
 * The BitmapText class allows to use a spritesheet as a font to draw text onto the screen
 * 
 * @param {String} type The type of the sprite.
 * @param {Object} options The options describing the BitmapText.
 * @param {String} options.imageSrc The path to the spritesheet file.
 * @param {Number} [options.offsetX=0] The optional horizontal offset at which to start getting bitmap characters inside the spritesheet.
 * @param {Number} [options.bmStartY=0] The optinal vertical offset at which to start getting bitmap characters.
 * @param {Number} charWidth the width of a character in pixels.
 * @param {Number} charHeight The height of a character in pixels.
 * 
 * @note the charset is limited to a subset of ascii right now: a-z 0-9
 * @example
 * 
 *	let myFont = new BitmapText('myFont', {
 *		offsetX: 34,
 *		bmStartY: 36,
 *		charWidth: 16,
 *		charHeight: 18,
 *		imageSrc: 'font'
 *	});
 */

var BitmapText = function (_GfxObject) {
	_inherits(BitmapText, _GfxObject);

	function BitmapText(type, options) {
		_classCallCheck(this, BitmapText);

		var _this = _possibleConstructorReturn(this, (BitmapText.__proto__ || Object.getPrototypeOf(BitmapText)).call(this, type, options));

		_this.imageSrc = options.imageSrc;

		// TODO: maybe we want to have fullsize ?
		_this.w = options.w || 320;
		_this.h = options.h || 18;

		_this.pixelHeight = 0;

		_this.maxLines = Math.floor(_this.h / (_this.charHeight + _this.lineSpacing));

		_this.easing = __WEBPACK_IMPORTED_MODULE_1_FX_FX__["a" /* default */].getEasing(options.easing || 'linear');

		_this.imageSrc = options.imageSrc || 'image not set';

		// TODO: buffer should be created here and not when object is added to the scene
		_this.buffer = null;

		_this.image = null;

		_this.scrolling = false;

		_this.text = options.text || 'BitmapText';

		/*			this.charCodes = this.getCharCodes(this.text);*/

		_this.scrollOffsetX = options.scrollOffsetX || 0;
		_this.scrollOffsetY = options.scrollOffsetY || 0;

		_this.textArray = [];

		_this.setFontParams(options);
		return _this;
	}

	/**
  * Generates a new buffer that can hold current text
  * 
  * @param {Display} display the display to get the buffer from
  */


	_createClass(BitmapText, [{
		key: 'createBuffer',
		value: function createBuffer(display) {
			// generate a buffer with enough height to hold every lines of text
			var width = this.w,
			    height = this.textArray.length * (this.charHeight + this.lineSpacing);

			this.buffer = display.getBuffer(width, height);
		}

		/**
   * Clears the buffer
   */

	}, {
		key: 'clearBuffer',
		value: function clearBuffer() {
			this.currentScene.display.clearScreen(this.buffer);
		}

		/**
   * Sets bitmapText properties using options
   * 
   * @param {Object} options
   */

	}, {
		key: 'setFontParams',
		value: function setFontParams(options) {
			this.lineSpacing = options.lineSpacing || 2;
			this.letterSpacing = options.letterSpacing || 2;

			this.charWidth = options.charWidth || 16; // 16
			this.charHeight = options.charHeight || 18; // 18
			this.maxCharPerLine = Math.floor(this.w / (this.charWidth + this.letterSpacing));
			this.maxPixels = this.maxCharPerLine * (this.charWidth + this.letterSpacing);

			this.offsetX = options.offsetX || 0; // 34
			this.offsetY = options.offsetY || 0; // 0
			this.bmStartX = options.bmStartX || 0; // 0
			this.bmStartY = options.bmStartY || 0; // 36
		}

		/**
   * Resets the bitmapFont to its default options
   */

	}, {
		key: 'reset',
		value: function reset() {
			_get(BitmapText.prototype.__proto__ || Object.getPrototypeOf(BitmapText.prototype), 'reset', this).call(this);
			this.setTextPosition();
		}
		/*		getCharCodes: function(str) {
  			var charCodes = [];
  
  			for (var i = 0; i < str.length; ++i) {
  				charCodes.push(str.charCodeAt(i));
  			}
  		},*/
		/**
   * Returns the lenght of a text line, in characters
   * 
   * @param {String} str The string to mesure.
   * @param {String} eof The character to use as end of line.
   * 
   * @returns {Number} The length of the string
   */

	}, {
		key: 'getNextLineLength',
		value: function getNextLineLength(str, eof) {
			var length = 0;

			while (length < str.length && str[length] !== eof) {
				length++;
			}

			return length;
		}

		/**
   * Calculates the position and size of each pixel lines to be rendered onto the screen
   */

	}, {
		key: 'getLines',
		value: function getLines() {
			var str = this.text,
			    line = '',
			    end = false,
			    i = 0,
			    j = 0,
			    size = 0;

			// reset textarray
			this.textArray.length = 0;

			while (!end) {
				str = str.replace(/^\n/, '');
				i = this.getNextLineLength(str, '\n');

				if (i) {
					line = str.substr(0, i);
					if (line.length <= this.maxCharPerLine) {
						// start with line length
						str = str.substr(i);
					} else {
						// we need to cut text
						line = str.substr(0, this.maxCharPerLine);
						// start with line length
						str = str.substr(this.maxCharPerLine);
					}

					// add new line
					this.textArray.push({
						text: line,
						x: this.align === 'center' ? Math.floor((this.maxPixels - line.length * (this.charWidth + this.letterSpacing)) / 2) : 0,
						y: j
					});

					j += this.charHeight + this.lineSpacing;
				} else {
					end = true;
				}
			}

			this.pixelHeight = this.textArray.length * (this.charHeight + this.lineSpacing);
		}

		/**
   * Scrolls text from the bottom to the top, firing an optional callback at the end
   * 
   * @param {Number} The duration of the scrolling in milliseconds.
   * @param {Function=undefined} An optional callback to fire when the scrolling is over.
   */

	}, {
		key: 'scrollFromBottom',
		value: function scrollFromBottom(duration, callback) {
			// set scrollPos to offscreen
			this.scrollOffsetY = this.h;

			this.scrollText({
				callback: callback,
				duration: duration,
				targetOffsetX: 0,
				targetOffsetY: this.h - this.pixelHeight
			});
		}

		/**
   * Scrolls text from the top, firing an optional callback at the end
   * 
   * @param {Number} The duration of the scrolling in milliseconds.
   * @param {Function=undefined} An optional callback to fire when the scrolling is over.
   */

	}, {
		key: 'scrollFromTop',
		value: function scrollFromTop(duration, callback) {
			// set scrollPos to offscreen
			this.scrollOffsetY = -this.pixelHeight;

			this.scrollText({
				callback: callback,
				duration: duration,
				targetOffsetX: 0,
				targetOffsetY: 0
			});
		}

		/**
   * Scrolls the current text block
   * 
   * @param {Object} options
   * @param {Number} options.targetOffsetX The horizontal destination of the scrolling.
   * @param {Number} options.targetOffsetY The vertical destination of the scrolling.
   * @param {Number} options.duration The duration of the scrolling, in milliseconds.
   * @param {Function} [options.callback=undefined] An optional callback function to call when the scrolling is done.
   * 
   * @note if a scrolling is already in progress, nothing happens
   * 
   * @private
   */

	}, {
		key: 'scrollText',
		value: function scrollText(options) {
			if (!this.scrolling) {
				console.log('starting scrolling');
				this.scrolling = true;

				this.callback = options.callback && options.callback.bind(this) || null;
				this.duration = options.duration || 10000;

				this.targetOffsetX = options.targetOffsetX;
				this.targetOffsetY = options.targetOffsetY;

				this.startX = this.scrollOffsetX;
				this.startY = this.scrollOffsetY;

				this.speedX = this.targetOffsetX - this.startX | 0;
				this.speedY = this.targetOffsetY - this.startY | 0;

				this.startMoveTime = new Date().getTime();
			}
		}

		/**
   * Does nothing
   * 
   * @private
   */

	}, {
		key: 'setTextPosition',
		value: function setTextPosition() {}
		// set back text position (resets scrolling)


		/**
   * Move() is called at each render loop and calculates the next position during a scrolling
   */

	}, {
		key: 'move',
		value: function move() {
			var currentTime = new Date().getTime(),
			    ellapsedTime = currentTime - this.startMoveTime,
			    t = ellapsedTime / this.duration,
			    moveProgress = void 0;

			if (this.scrolling === true) {
				if (ellapsedTime >= this.duration) {
					this.scrolling = false;
					this.scrollOffsetX = this.targetOffsetX;
					this.scrollOffsetY = this.targetOffsetY;
					if (this.callback) {
						this.callback();
					}
				} else {
					moveProgress = this.easing(t, ellapsedTime, 0, 1, this.duration);

					this.scrollOffsetX = this.startX + moveProgress * this.speedX | 0;
					this.scrollOffsetY = this.startY + moveProgress * this.speedY | 0;
				}
			}
		}

		/**
   * Returns the character horizontal offset in pixels inside the spritesheet
   * 
   * @param {String} char The character to get the position inside the spritesheet
   * 
   * @returns {Number} The horizontal offset in pixels of the character
   */

	}, {
		key: 'getCharOffset',
		value: function getCharOffset(char) {
			// The magic happens here!
			var code = char.toUpperCase().charCodeAt(0) - 65;

			return code * this.offsetX;
		}

		/**
   * Draws the specified line onto the screen
   * 
   * @param {Object} options
   * @param {Number} options.x The horizontal position of the line to draw
   * @param {Number} options.x The vertical position of the line to draw
   * @param {String} options.text The text to draw
   * 
   * @example
   * 
   * bitmapText.drawLine({
   * 	x: 0,
   *  y: 0,
   *  text: 'hi there'
   * })
   */

	}, {
		key: 'drawLine',
		value: function drawLine(options) {
			var x = options.x,
			    y = options.y,
			    i = 0,
			    offset = 0,
			    max = options.text.length;

			// draw each character
			for (i = 0; i < max; ++i) {
				if (options.text[i].charCodeAt(0) !== 32) {
					offset = this.getCharOffset(options.text[i]);
					this.buffer.drawImage(this.image, offset, this.bmStartY, this.charWidth, this.charHeight, x, y, this.charWidth, this.charHeight);
				}
				x += this.letterSpacing + this.charWidth;
			}
		}

		/**
  * Pre-renders text from this.textArray into the internal buffer
  * 
  */

	}, {
		key: 'renderText',
		value: function renderText() {
			var i = 0,
			    max = 0,
			    line = void 0;

			max = this.textArray.length;

			for (i = 0; i < max; ++i) {
				line = this.textArray[i];
				this.drawLine(line);
			}
		}

		/**
   * Changes the text of the sprite, calculates every line size, and renders it into
   * the internal buffer
   * 
   * @param {String} text The new text to use
   */

	}, {
		key: 'setText',
		value: function setText(text) {
			this.text = text;

			this.getLines();

			// generate wide-enough internal buffer to hold every lines of text
			if (!this.buffer) {
				this.createBuffer(this.currentScene.display);
			} else {
				this.clearBuffer();
			}

			this.renderText(this.text);
		}

		/**
   * Changes the image to use as spritesheet
   * 
   * @param {Image} image The new {image} to use as source.
   */

	}, {
		key: 'setImage',
		value: function setImage(image) {
			this.image = image;
		}

		/**
   * Sets the scene of the bitmap font
   * 
   * @param {Scene} scene The scene to use.
   */

	}, {
		key: 'setScene',
		value: function setScene(scene) {
			_get(BitmapText.prototype.__proto__ || Object.getPrototypeOf(BitmapText.prototype), 'setScene', this).call(this, scene);

			this.setText(this.text);
		}

		/**
   * Draws pre-rendered into destination buffer
   * 
   * @param {CanvasContext} destCtx The new cancas context where to draw the bitmap font.
   * @param {Boolean} debug Wether to draw debug stuff.
   * 
   * @note: once added onto the scene, this method is automatically called at each render loop.
   * 
   * @related {Scene}
   * 
   * @private
   */

	}, {
		key: 'draw',
		value: function draw(destCtx, debug) {
			var destY, copyHeight, copyStartY;

			if (!this.visible) {
				return;
			}

			if (this.scrollOffsetY >= 0) {
				destY = this.scrollOffsetY;
				copyHeight = this.h - destY;
				copyStartY = 0;
			} else {
				destY = 0;
				copyHeight = this.h; // auto clipped ?
				copyStartY = Math.abs(this.scrollOffsetY);
			}
			// if this.scrolling, need to first offset text into this.buffer

			if (this.isFxQueueEmpty()) {
				// draw
				// throw 'TODO: drawing of bitmapText';
				// TODO: should use scrollPos to update destination and simulate horizontal/vertical text scrolling
				destCtx.drawImage(this.buffer.canvas, 0, copyStartY, this.w, copyHeight, this.x + this.scrollOffsetX, this.y + destY, this.w, copyHeight);
				// destCtx.drawImage(this.image, Math.floor(this.x), Math.floor(this.y), Math.floorthis.(w), Math.floor(this.h), Math.floor(drawX + mapOffsetX), Math.floor(drawY + mapOffsetY), Math.floor(scaledW), Math.floor(scaledH));
			} else {
				this.executeFx(destCtx);
				throw 'TODO: drawing of bitmapText';
			}

			if (debug) {
				this.showObjectBox(destCtx);
			}
		}
	}]);

	return BitmapText;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Object__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (BitmapText);

/***/ }),
/* 21 */
/* exports provided: default */
/* exports used: default */
/*!***************************!*\
  !*** ./js/Object/Wave.js ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Resource_ResourceManager__ = __webpack_require__(/*! Resource/ResourceManager */ 6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Wave = function () {
	function Wave(options) {
		_classCallCheck(this, Wave);

		this.counter = options.size;
		this.type = options.afterDestroy;
		this.data = options.afterDestroyData;
	}

	_createClass(Wave, [{
		key: 'remove',
		value: function remove(element) {
			this.counter--;

			if (!this.counter) {
				this.destroy(element);
			}
		}
	}, {
		key: 'destroy',
		value: function destroy(element) {
			switch (this.type) {
				case 'reward':
					if (this.data) {
						var reward = new (__WEBPACK_IMPORTED_MODULE_0_Resource_ResourceManager__["a" /* default */].getResourceById('SmallItem'))({
							x: element.x + 24, // bad: hardcoded !!
							y: element.y - 20,
							vy: -2,
							data: {
								itemType: this.data
							}
						});

						element.currentMap.addObject(reward);
					}
					break;

				default:
					throw 'reward not implemented', this.type;
					break;
			}
		}
	}]);

	return Wave;
}();

/* harmony default export */ __webpack_exports__["a"] = (Wave);
;

/***/ }),
/* 22 */
/* unknown exports provided */
/* exports used: default */
/*!*******************************************!*\
  !*** ./~/es6-promise/dist/es6-promise.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(/*! vertx */ 44);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));
//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 41), __webpack_require__(/*! ./../../webpack/buildin/global.js */ 43)))

/***/ }),
/* 23 */
/* exports provided: Game, Pool, Scene, ResourceManager, Object, Sprite, Text, Wave, Menu, Hud, BitmapText, Circle, NotificationManager, Map, MapEvent, FX, Easing, InputManager, DisplayManager, Display, AudioManager, Binary, Dom */
/* all exports used */
/*!*****************************!*\
  !*** ./js/athena-module.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Core_Game__ = __webpack_require__(/*! Core/Game */ 24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return __WEBPACK_IMPORTED_MODULE_0_Core_Game__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Core_Pool__ = __webpack_require__(/*! Core/Pool */ 14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Pool", function() { return __WEBPACK_IMPORTED_MODULE_1_Core_Pool__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Scene_Scene__ = __webpack_require__(/*! Scene/Scene */ 39);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return __WEBPACK_IMPORTED_MODULE_2_Scene_Scene__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Resource_ResourceManager__ = __webpack_require__(/*! Resource/ResourceManager */ 6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceManager", function() { return __WEBPACK_IMPORTED_MODULE_3_Resource_ResourceManager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Object_Object__ = __webpack_require__(/*! Object/Object */ 4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Object", function() { return __WEBPACK_IMPORTED_MODULE_4_Object_Object__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_Object_Sprite__ = __webpack_require__(/*! Object/Sprite */ 12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return __WEBPACK_IMPORTED_MODULE_5_Object_Sprite__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_Object_Text__ = __webpack_require__(/*! Object/Text */ 13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return __WEBPACK_IMPORTED_MODULE_6_Object_Text__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_Object_Wave__ = __webpack_require__(/*! Object/Wave */ 21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Wave", function() { return __WEBPACK_IMPORTED_MODULE_7_Object_Wave__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_Object_Menu__ = __webpack_require__(/*! Object/Menu */ 38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return __WEBPACK_IMPORTED_MODULE_8_Object_Menu__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_Object_Hud__ = __webpack_require__(/*! Object/Hud */ 37);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Hud", function() { return __WEBPACK_IMPORTED_MODULE_9_Object_Hud__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_Object_BitmapText__ = __webpack_require__(/*! Object/BitmapText */ 20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BitmapText", function() { return __WEBPACK_IMPORTED_MODULE_10_Object_BitmapText__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_Object_Circle__ = __webpack_require__(/*! Object/Circle */ 36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return __WEBPACK_IMPORTED_MODULE_11_Object_Circle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_Notification_NotificationManager__ = __webpack_require__(/*! Notification/NotificationManager */ 10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationManager", function() { return __WEBPACK_IMPORTED_MODULE_12_Notification_NotificationManager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_Map_Map__ = __webpack_require__(/*! Map/Map */ 18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return __WEBPACK_IMPORTED_MODULE_13_Map_Map__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_Map_MapEvent__ = __webpack_require__(/*! Map/MapEvent */ 19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MapEvent", function() { return __WEBPACK_IMPORTED_MODULE_14_Map_MapEvent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_FX_FX__ = __webpack_require__(/*! FX/FX */ 1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FX", function() { return __WEBPACK_IMPORTED_MODULE_15_FX_FX__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_FX_Easing_Easing__ = __webpack_require__(/*! FX/Easing/Easing */ 17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Easing", function() { return __WEBPACK_IMPORTED_MODULE_16_FX_Easing_Easing__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_Input_InputManager__ = __webpack_require__(/*! Input/InputManager */ 9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "InputManager", function() { return __WEBPACK_IMPORTED_MODULE_17_Input_InputManager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_Display_DisplayManager__ = __webpack_require__(/*! Display/DisplayManager */ 16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DisplayManager", function() { return __WEBPACK_IMPORTED_MODULE_18_Display_DisplayManager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_Display_Display__ = __webpack_require__(/*! Display/Display */ 15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Display", function() { return __WEBPACK_IMPORTED_MODULE_19_Display_Display__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_Audio_AudioManager__ = __webpack_require__(/*! Audio/AudioManager */ 5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AudioManager", function() { return __WEBPACK_IMPORTED_MODULE_20_Audio_AudioManager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_Binary_Binary__ = __webpack_require__(/*! Binary/Binary */ 11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Binary", function() { return __WEBPACK_IMPORTED_MODULE_21_Binary_Binary__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_Core_Dom__ = __webpack_require__(/*! Core/Dom */ 7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Dom", function() { return __WEBPACK_IMPORTED_MODULE_22_Core_Dom__["a"]; });



































/***/ }),
/* 24 */
/* exports provided: default */
/* exports used: default */
/*!*************************!*\
  !*** ./js/Core/Game.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Resource_ResourceManager__ = __webpack_require__(/*! Resource/ResourceManager */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Binary_Binary__ = __webpack_require__(/*! Binary/Binary */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Display_DisplayManager__ = __webpack_require__(/*! Display/DisplayManager */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Audio_AudioManager__ = __webpack_require__(/*! Audio/AudioManager */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Notification_NotificationManager__ = __webpack_require__(/*! Notification/NotificationManager */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_Input_InputManager__ = __webpack_require__(/*! Input/InputManager */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fpscounter__ = __webpack_require__(/*! fpscounter */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fpscounter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_fpscounter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_Core_Dom__ = __webpack_require__(/*! Core/Dom */ 7);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint devel: true, bitwise: false*/









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

var Game = function () {
    function Game() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Game);

        console.log('[Game] Init()' /*, options*/);

        this.debug = options.debug;
        this.name = options.name;

        var target = options.target && new __WEBPACK_IMPORTED_MODULE_7_Core_Dom__["a" /* default */](options.target);

        // DOM element to use for the game (it will be cleared)
        this.target = target && target.length && target[0] || new __WEBPACK_IMPORTED_MODULE_7_Core_Dom__["a" /* default */]('div').appendTo('body')[0];

        // weather to display FPS
        this.showFps = typeof options.showFps !== 'undefined' ? options.showFps : false;

        if (this.showFps) {
            __WEBPACK_IMPORTED_MODULE_6_fpscounter___default()({
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
            __WEBPACK_IMPORTED_MODULE_0_Resource_ResourceManager__["a" /* default */].skipResources.push('audio');
        }

        // eventLoop timeout
        this.timeout = null;

        // rendering loop
        this.animFrame = null;

        // listen for all events
        this.bindEvents('*');
    }

    /**
     * Get ready for events from NotificationManager
     * 
     * @param {String} eventList space-separated list of events to listen to
     * 
     */


    _createClass(Game, [{
        key: 'bindEvents',
        value: function bindEvents(eventList) {
            __WEBPACK_IMPORTED_MODULE_4_Notification_NotificationManager__["a" /* default */].listen(eventList, this.onEvent.bind(this));
        }

        /**
         * Method that gets called when receiving an event: by default it does nothing
         * It's up to the developer to overwrite this method on its Game
         * 
         * @param {string} event the event name that got fired.
         * 
         */

    }, {
        key: 'onEvent',
        value: function onEvent(event) {}

        /**
         * Toggles global sound
         * 
         * @param {boolean} bool Weather to enable or disable sound.
         * 
         */

    }, {
        key: 'toggleSound',
        value: function toggleSound(bool) {
            this.sound = bool;
            __WEBPACK_IMPORTED_MODULE_3_Audio_AudioManager__["a" /* default */].toggleSound(bool);
        }

        /**
         * Load resources associated with the game
         * TODO: DESCRIBE
         * 
         * @param {array} res An array of resources to load.
         * @param {function} [progressCb=undefined] A progress callback function that gets called after each resource has been loaded
         * @returns {Deferred} `this.readyDef`
         * @obsolete
         * 
         */
        // loadResources(res, progressCb/*, doneCb, failCb*/) {
        //     console.log('[Game] loading Resources...');
        //     this.readyDef = ResourceManager.addResources(res);

        //     // this.readyDef.done(this.cacheImages.bind(this));

        //     ResourceManager.loadResources('any', progressCb);

        //     return this.readyDef;
        // }


        /**
         * Creates a new display
         * 
         * TODO: DESCRIBE
         * @param {Object}
         * @param {String|HTMLElement} The target of the display: this is were canvas elements will be added
         * @private
         * 
         */

    }, {
        key: 'createDisplay',
        value: function createDisplay(options, target) {
            this.display = __WEBPACK_IMPORTED_MODULE_2_Display_DisplayManager__["a" /* default */].addDisplay(options, target);
        }

        /**
         * INTERNAL: initialize input events
         * @private
         */

    }, {
        key: '_initEvents',
        value: function _initEvents() {
            __WEBPACK_IMPORTED_MODULE_5_Input_InputManager__["a" /* default */]._init(this, {
                joystick: true
            });
        }

        /**
         * Calls when game is ready: DESCRIBE
         * 
         * @param {any} cb 
         * 
         */

    }, {
        key: 'onReady',
        value: function onReady(cb) {
            console.log('**this', this);
            cb.apply(this);
        }

        /**
         * Sets a new scene as the current scene, autostarting it optionnaly
         * 
         * @param {Scene} scene instance to set as current Scene
         * @param {Boolean} autoStart should the scene autostart
         * 
         */

    }, {
        key: 'setScene',
        value: function setScene(scene, autoStart) {
            if (this.scene) {
                console.log('need to stop scene');
                this.stopScene();
                this.scene.stop();
            }

            if (scene) {
                debugger;
                this.scene = scene;

                this.scene.setDisplay(this.display);

                this.display.clearDisplay();

                console.log('**autoStart', autoStart);
                if (autoStart !== false) {
                    this.startScene();
                } else {
                    debugger;
                }
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

    }, {
        key: '_renderSceneLoop',
        value: function _renderSceneLoop(time) {
            var scene = this.scene;

            if (this.debug !== true && this.running) {
                // if we are playing events, set on each frame
                // TODO: maybe we could throttle it for 1/2 frame
                if (__WEBPACK_IMPORTED_MODULE_5_Input_InputManager__["a" /* default */].playingEvents) {
                    __WEBPACK_IMPORTED_MODULE_5_Input_InputManager__["a" /* default */].nextRecordedEvents();
                }

                this.animFrame = window.requestAnimationFrame(this._renderSceneLoop.bind(this));

                this.display.renderScene(scene);

                // TODO: hudScene drawing is hardcoded into display
                // this should be moved back here
                if (scene.hudScene) {}
                // use another display (canvas) for the hud: we could use the same one
                // this.display.renderSecondary(scene.hudScene);
                //
                // this.display.renderScene(scene.hudScene);


                // if we are recording events, we do it on each frame
                // TODO: maybe we could only record once key has been received ?
                if (__WEBPACK_IMPORTED_MODULE_5_Input_InputManager__["a" /* default */].recording) {
                    __WEBPACK_IMPORTED_MODULE_5_Input_InputManager__["a" /* default */].recordEvents();
                }
            }
        }

        /**
         * Main event loop: handles scene based-events
         * 
         * @private
         */

    }, {
        key: '_runSceneLoop',
        value: function _runSceneLoop() {
            var scene = this.scene;

            if (!this.running) {
                this.running = true;
            }

            scene.run();

            if (this.debug !== true && this.running) {
                this.timeout = setTimeout(this._runSceneLoop.bind(this), 16);
            }
        }

        /**
         * Pauses the game: both loops are stopped so almost no cpu/gpu is used when calling it
         * 
         */

    }, {
        key: 'togglePauseGame',
        value: function togglePauseGame() {
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
         * - loads the scene if not already loaded
         * - once it's loaded calls scene.start() and start both event & render loops
         * 
         */

    }, {
        key: 'startScene',
        value: function startScene() {
            console.log('[Game] startScene');
            var that = this;

            if (this.scene) {
                console.log('[Game] loading scene');
                this.scene.load().then(function () {
                    console.log('[Game] Scene', that.scene.name, 'loaded: starting run & render loops');
                    // setTimeout(function() {
                    debugger;
                    that.scene.start();
                    debugger;
                    that._runSceneLoop();
                    that._renderSceneLoop();
                    // }, 0);
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

    }, {
        key: 'stopScene',
        value: function stopScene() {
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
    }]);

    return Game;
}();

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 25 */
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./js/FX/Effect/Custom.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_FX_Effect_Effect__ = __webpack_require__(/*! FX/Effect/Effect */ 8);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/*jshint devel: true, bitwise: false*/

var Custom = function (_Effect) {
    _inherits(Custom, _Effect);

    function Custom(options, display) {
        _classCallCheck(this, Custom);

        var _this = _possibleConstructorReturn(this, (Custom.__proto__ || Object.getPrototypeOf(Custom)).call(this, options, display));

        _this.callback = options.callback;

        _this.diff = _this.endValue - _this.startValue;
        return _this;
    }
    /*        start: function() {
                this.currentAngle = this.startAngle;
    
                // start timer and get deferred
                return this._super();
            },*/


    _createClass(Custom, [{
        key: 'process',
        value: function process(ctx, fxCtx, obj) {
            _get(Custom.prototype.__proto__ || Object.getPrototypeOf(Custom.prototype), 'process', this).call(this);

            this.callback(this.startValue + this.animProgress * this.diff);

            return this.ended;
        }
    }]);

    return Custom;
}(__WEBPACK_IMPORTED_MODULE_0_FX_Effect_Effect__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (Custom);

/***/ }),
/* 26 */
/* exports provided: default */
/* exports used: default */
/*!******************************!*\
  !*** ./js/FX/Effect/Fade.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_FX_Effect_Effect__ = __webpack_require__(/*! FX/Effect/Effect */ 8);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/*jshint devel: true, bitwise: false*/

var Fade = function (_Effect) {
    _inherits(Fade, _Effect);

    function Fade(options, display) {
        _classCallCheck(this, Fade);

        var _this = _possibleConstructorReturn(this, (Fade.__proto__ || Object.getPrototypeOf(Fade)).call(this, Object.assign({
            startValue: 0,
            endValue: 1
        }, options), display));

        _this.startOpacity = _this.startValue !== undefined ? options.startValue : 0;
        _this.endOpacity = _this.endValue !== undefined ? options.endValue : 1;

        _this.diff = _this.endValue - _this.startValue;
        return _this;
    }

    _createClass(Fade, [{
        key: 'start',
        value: function start() {
            this.currentOpacity = 1;

            // start timer and get deferred
            return _get(Fade.prototype.__proto__ || Object.getPrototypeOf(Fade.prototype), 'start', this).call(this);
        }
    }, {
        key: 'process',
        value: function process(ctx, fxCtx, obj) {
            _get(Fade.prototype.__proto__ || Object.getPrototypeOf(Fade.prototype), 'process', this).call(this);

            this.currentOpacity = this.startValue + this.animProgress * this.diff;

            obj.setOpacity(this.currentOpacity);

            return this.ended;
        }
    }]);

    return Fade;
}(__WEBPACK_IMPORTED_MODULE_0_FX_Effect_Effect__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (Fade);

/***/ }),
/* 27 */
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./js/FX/Effect/Mosaic.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_FX_Effect_Effect__ = __webpack_require__(/*! FX/Effect/Effect */ 8);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/*jshint devel: true, bitwise: false*/

var Mosaic = function (_Effect) {
    _inherits(Mosaic, _Effect);

    function Mosaic(options, display) {
        _classCallCheck(this, Mosaic);

        // TODO: use displayManager to get a buffer
        var _this = _possibleConstructorReturn(this, (Mosaic.__proto__ || Object.getPrototypeOf(Mosaic)).call(this, Object.assign({
            startValue: 0.002,
            endValue: 1
        }, options), display));

        _this.buffer = display.getBuffer(_this.width, _this.height);

        _this.startWidth = null;

        // get ratio of the picture since we want to keep it during animation
        _this.ratio = _this.width / _this.height;
        _this.diff = _this.endValue * _this.width - _this.startValue * _this.width;

        console.log('got ratio=', _this.ratio, 'for', _this.width, _this.height, 'diff', _this.diff);
        return _this;
    }

    _createClass(Mosaic, [{
        key: 'start',
        value: function start() {
            this.startWidth = this.startValue * this.width;
            console.log('***', this.startWidth);

            return _get(Mosaic.prototype.__proto__ || Object.getPrototypeOf(Mosaic.prototype), 'start', this).call(this);
        }
    }, {
        key: 'process',
        value: function process(ctx, fxCtx) {
            _get(Mosaic.prototype.__proto__ || Object.getPrototypeOf(Mosaic.prototype), 'process', this).call(this);

            var newWidth = this.startWidth + this.animProgress * this.diff,
                newHeight = newWidth / this.ratio;

            // first draw image onto canvas
            this.buffer.drawImage(ctx.canvas, 0, 0, newWidth | 0, newHeight | 0);
            ctx.drawImage(this.buffer.canvas, 0, 0, newWidth | 0, newHeight | 0, 0, 0, this.width, this.height);

            return this.ended;
        }
    }]);

    return Mosaic;
}(__WEBPACK_IMPORTED_MODULE_0_FX_Effect_Effect__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Mosaic);

/***/ }),
/* 28 */
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./js/FX/Effect/Rotate.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_FX_Effect_Effect__ = __webpack_require__(/*! FX/Effect/Effect */ 8);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/*jshint devel: true, bitwise: false*/

var Rotate = function (_Effect) {
    _inherits(Rotate, _Effect);

    function Rotate(options, display) {
        _classCallCheck(this, Rotate);

        var _this = _possibleConstructorReturn(this, (Rotate.__proto__ || Object.getPrototypeOf(Rotate)).call(this, Object.assign({
            startValue: 0,
            endValue: 2 * Math.PI,
            loop: true
        }, options), display));

        _this.startAngle = _this.startAngle !== undefined ? options.startValue : 0;
        _this.endAngle = _this.endAngle !== undefined ? options.endValue : 1;

        _this.diff = _this.endValue - _this.startValue;
        return _this;
    }

    _createClass(Rotate, [{
        key: 'start',
        value: function start() {
            this.currentAngle = this.startAngle;

            // start timer and get deferred
            return _get(Rotate.prototype.__proto__ || Object.getPrototypeOf(Rotate.prototype), 'start', this).call(this);
        }
    }, {
        key: 'process',
        value: function process(ctx, fxCtx, obj) {
            _get(Rotate.prototype.__proto__ || Object.getPrototypeOf(Rotate.prototype), 'process', this).call(this);

            this.currentAngle = this.startValue + this.animProgress * this.diff;

            obj.setAngle(this.currentAngle);

            return this.ended;
        }
    }]);

    return Rotate;
}(__WEBPACK_IMPORTED_MODULE_0_FX_Effect_Effect__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (Rotate);

/***/ }),
/* 29 */
/* exports provided: default */
/* exports used: default */
/*!*****************************************!*\
  !*** ./js/Object/Behavior/Behaviors.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Behavior_GroundMove__ = __webpack_require__(/*! Object/Behavior/GroundMove */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Object_Behavior_SimpleFall__ = __webpack_require__(/*! Object/Behavior/SimpleFall */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Object_Behavior_PlayerMove__ = __webpack_require__(/*! Object/Behavior/PlayerMove */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Object_Behavior_InOut__ = __webpack_require__(/*! Object/Behavior/InOut */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Object_Behavior_Path__ = __webpack_require__(/*! Object/Behavior/Path */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_Object_Behavior_WeaponMove__ = __webpack_require__(/*! Object/Behavior/WeaponMove */ 35);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








/*jshint devel: true, bitwise: false*/
var behaviors = {};

var Behaviors = function () {
    function Behaviors() {
        _classCallCheck(this, Behaviors);
    }

    _createClass(Behaviors, [{
        key: 'addBehavior',
        value: function addBehavior(behaviorName, moveFn) {
            behaviors[behaviorName] = moveFn;
        }
    }, {
        key: 'getBehavior',
        value: function getBehavior(behaviorName) {
            return behaviors[behaviorName];
        }
    }]);

    return Behaviors;
}();

;

var inst = new Behaviors();

inst.addBehavior('ground', __WEBPACK_IMPORTED_MODULE_0_Object_Behavior_GroundMove__["a" /* default */]);
inst.addBehavior('inout', __WEBPACK_IMPORTED_MODULE_3_Object_Behavior_InOut__["a" /* default */]);
inst.addBehavior('simplefall', __WEBPACK_IMPORTED_MODULE_1_Object_Behavior_SimpleFall__["a" /* default */]);
inst.addBehavior('weapon', __WEBPACK_IMPORTED_MODULE_5_Object_Behavior_WeaponMove__["a" /* default */]);
inst.addBehavior('player', __WEBPACK_IMPORTED_MODULE_2_Object_Behavior_PlayerMove__["a" /* default */]);
inst.addBehavior('path', __WEBPACK_IMPORTED_MODULE_4_Object_Behavior_Path__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (inst);

/***/ }),
/* 30 */
/* exports provided: default */
/* exports used: default */
/*!******************************************!*\
  !*** ./js/Object/Behavior/GroundMove.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__ = __webpack_require__(/*! Object/Behavior/Behavior */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Map_Tile__ = __webpack_require__(/*! Map/Tile */ 2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/*jshint devel: true, bitwise: false*/
// by default
/**
 * GroundMove is a simple behavior that causes an object to move along the horizontal
 * axis until a wall or an hole is reached.
 * 
 * @param {Sprite} sprite The sprite to attach the behavior to.
 * @param {InputManager} Input A reference to the InputManager.
 * @param {Object} options General behavior & GroundMove specific options
 * @param {String} [options.direction="right"] The initial direction of the move, default = `right`.
 * 
 * @see {Behavior}
 */

var GroundMove = function (_Behavior) {
    _inherits(GroundMove, _Behavior);

    function GroundMove(sprite, Input, options) {
        _classCallCheck(this, GroundMove);

        var _this = _possibleConstructorReturn(this, (GroundMove.__proto__ || Object.getPrototypeOf(GroundMove)).call(this, sprite, Input, options));

        _this.direction = options.direction || 'right';

        if (_this.direction.match('left')) {
            _this.sprite.vx = -_this.sprite.vx;
        }

        if (_this.direction.match('top')) {
            _this.sprite.vy = -_this.sprite.vy;
        }
        return _this;
    }

    /**
     * Simple onMove handler that checks for a wall or hole
     * 
     */


    _createClass(GroundMove, [{
        key: 'onMove',
        value: function onMove(t) {
            var sprite = this.sprite,
                map = sprite.currentMap,
                nextX = sprite.x + sprite.vx,
                nextY = sprite.y + sprite.vy,
                hitBox = sprite.getHitBox(),
                startX = sprite.vx > 0 ? hitBox.x2 : hitBox.x;

            if (map.hitObjectTest(nextX + startX, nextY + hitBox.y, nextX + startX, nextY + hitBox.y, __WEBPACK_IMPORTED_MODULE_1_Map_Tile__["a" /* default */].TYPE.WALL)) {
                sprite.vx = -sprite.vx;
                if (this.onVXChange) {
                    this.onVXChange(sprite.vx);
                }
            } else if (map.hitObjectTest(nextX + hitBox.x, nextY + hitBox.y2 + 2, nextX + hitBox.x2, nextY + hitBox.y2 + 2, __WEBPACK_IMPORTED_MODULE_1_Map_Tile__["a" /* default */].TYPE.AIR)) {
                sprite.vx = -sprite.vx;
                if (this.onVXChange) {
                    this.onVXChange(sprite.vx);
                }
            } else if (map.hitObjectTest(nextX + hitBox.x, nextY + hitBox.y2 + 2, nextX + hitBox.x2, nextY + hitBox.y2 + 2, __WEBPACK_IMPORTED_MODULE_1_Map_Tile__["a" /* default */].TYPE.LADDER)) {
                sprite.vx = -sprite.vx;
                if (this.onVXChange) {
                    this.onVXChange(sprite.vx);
                }
            }

            sprite.x += sprite.vx;
            sprite.y += sprite.vy;
        }
    }]);

    return GroundMove;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (GroundMove);

/***/ }),
/* 31 */
/* exports provided: default */
/* exports used: default */
/*!*************************************!*\
  !*** ./js/Object/Behavior/InOut.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__ = __webpack_require__(/*! Object/Behavior/Behavior */ 3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/*jshint devel: true, bitwise: false*/
// by default

var InOut = function (_Behavior) {
    _inherits(InOut, _Behavior);

    function InOut(sprite, Input, options) {
        _classCallCheck(this, InOut);

        var _this = _possibleConstructorReturn(this, (InOut.__proto__ || Object.getPrototypeOf(InOut)).call(this, sprite, Input, options));

        _this.startY = sprite.y;
        _this.startX = sprite.x;

        _this.maxX = options.minX || 0;

        _this.maxY = options.minY || 0;
        return _this;
    }

    _createClass(InOut, [{
        key: 'onMove',
        value: function onMove(t) {
            var sprite = this.sprite,
                diffY = Math.abs(sprite.y - this.startY),
                diffX = Math.abs(sprite.x - this.startX);

            if (diffY > this.maxY) {
                sprite.vy = -sprite.vy;
                if (this.onVYChange) {
                    this.onVYChange();
                }
            }

            if (diffX > this.maxX) {
                sprite.vx = -sprite.vx;
                if (this.onVXChange) {
                    this.onVXChange();
                }
            }

            sprite.x += sprite.vx;
            sprite.y += sprite.vy;
        }
    }]);

    return InOut;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (InOut);

/***/ }),
/* 32 */
/* exports provided: default */
/* exports used: default */
/*!************************************!*\
  !*** ./js/Object/Behavior/Path.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__ = __webpack_require__(/*! Object/Behavior/Behavior */ 3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/*jshint devel: true, bitwise: false*/

function sign(x) {
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

/**
 * A Path is a special behavior that uses a pre-defined (recorded) path to move
 * an object.
 * 
 * @param {Sprite} sprite The sprite to attach the behavior to.
 * @param {InputManager} Input A reference to the InputManager.
 * @param {Object} options The options of the behavior.
 * @param {Array} options.nodes The nodes of the path: a simple array with nodes[0] = vx, nodes[1] = vy, nodes[2] = vx, nodes[3] = vy,...
 * @param {Boolean} options.reverse Set to true so that when the end of the path is reached, movement goes backwards.
 * 
 * @see {Behavior}
 */

var Path = function (_Behavior) {
    _inherits(Path, _Behavior);

    function Path(sprite, Input, options) {
        _classCallCheck(this, Path);

        var _this = _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).call(this, sprite, Input, options));

        _this.startY = sprite.y;
        _this.startX = sprite.x;

        _this.currentNode = 0;

        _this.offset = 2;

        _this.nodes = options.nodes;

        _this.reverse = options.reverse || false;

        _this.dirX = 0;
        _this.dirY = 0;

        _this.numNodes = _this.nodes.length / 2;
        return _this;
    }

    /**
     * Move handler: gets the next vx/vy from `this.nodes`
     * and makes sure to call onVXChange/onVYChange at each sign change
     */


    _createClass(Path, [{
        key: 'onMove',
        value: function onMove(t) {
            var sprite = this.sprite,
                pos = this.currentNode,
                offsetX = this.nodes[pos],
                offsetY = this.nodes[pos + 1];

            if (this.offset > 0) {
                sprite.x += offsetX;
                sprite.y += offsetY;
            } else {
                sprite.x -= offsetX;
                sprite.y -= offsetY;
            }

            if (offsetX) {
                if (this.dirX && sign(this.dirX) !== sign(offsetX)) {
                    this.onVXChange && this.onVXChange();
                }
                this.dirX = offsetX;
            }

            if (offsetY) {
                if (this.dirY && sign(this.dirY) !== sign(offsetY)) {
                    this.onVYChange && this.onVYChange();
                }
                this.dirY = offsetY;
            }

            this.currentNode += this.offset;

            if (this.currentNode >= this.nodes.length || this.currentNode < 0) {
                if (!this.reverse) {
                    sprite.moving = false;
                    return;
                } else {
                    if (this.onVXChange) {
                        this.dirX = 0;
                        this.onVXChange();
                    }

                    if (this.onVYChange) {
                        this.dirY = 0;
                        this.onVYChange();
                    }
                    this.currentNode = this.currentNode < 0 ? 0 : this.nodes.length - 2;
                    this.offset = -this.offset;
                }
            }
        }
    }]);

    return Path;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (Path);

/***/ }),
/* 33 */
/* exports provided: default */
/* exports used: default */
/*!******************************************!*\
  !*** ./js/Object/Behavior/PlayerMove.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__ = __webpack_require__(/*! Object/Behavior/Behavior */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Audio_AudioManager__ = __webpack_require__(/*! Audio/AudioManager */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Map_Tile__ = __webpack_require__(/*! Map/Tile */ 2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/*jshint devel: true, bitwise: false*/
/*globals Game*/

/**
 * PlayerMove is a behavior that is controlled by the player using keyboard/touch events.
 * 
 * To have a sprite controlled by the user you can simply attach this behavior.
 * 
 * @param {Sprite} sprite The sprite to attach the behavior to.
 * @param {InputManager} Input A reference to the InputManager
 * @param {Object} options Parameters specifics to the behavior
 * @param {String} [options.startMovement="idle""] The initial behavior state.
 * @param {String} [options.direction="right"] The initial direction.
 * @param {String} [options.lookDirection="left"] The initial look direction, can be different than direction.
 * 
 * @see {Behavior}
 */

var PlayerMove = function (_Behavior) {
    _inherits(PlayerMove, _Behavior);

    function PlayerMove(sprite, Input, options) {
        _classCallCheck(this, PlayerMove);

        var _this = _possibleConstructorReturn(this, (PlayerMove.__proto__ || Object.getPrototypeOf(PlayerMove)).call(this, sprite, Input, options));

        _this.direction = options.direction || 'right';

        _this.currentMovement = options.startMovement || '';

        _this.lookDirection = options.lookDirection || 'left';

        _this.climbVY = 2;

        _this.jumping = false;

        _this.firing = false;

        _this.fromLadder = false;

        _this.sideHit = false;
        return _this;
    }

    /**
     * onMove handler: uses InputManager to get keyboard status and move the sprite when needed
     * 
     * @param {Number} t The time ellapsed since last move
     */


    _createClass(PlayerMove, [{
        key: 'onMove',
        value: function onMove(t) {
            var Input = this.Input;

            if (this.currentMovement !== 'falling' && !this.currentMovement.match(/jump/) && !this.firing) {
                // console.log('left', Input.getKeyStatus(Input.keys.LEFT));
                // direction
                if (Input.getKeyStatus(Input.keys.LEFT) === true) {
                    if (Input.getKeyStatus(Input.keys.UP) === true) {
                        this.startJump('left');
                    } else {
                        this.walkLeft();
                    }
                } else if (Input.getKeyStatus(Input.keys.RIGHT) === true) {
                    if (Input.getKeyStatus(Input.keys.UP) === true) {
                        this.startJump('right');
                        console.log('startJump right', this.fromLadder);
                    } else {
                        this.walkRight();
                    }
                } else if (Input.getKeyStatus(Input.keys.UP) === true) {
                    this.goUpOrClimb(false);
                } else if (Input.getKeyStatus(Input.keys.DOWN) === true) {
                    // empty ? => fall (possible ?)
                    this.goDownOrClimb(0);
                } else {
                    if (this.currentMovement !== 'climb') {
                        if (!this.currentMovement.match('fire')) {
                            this.idle();
                        }
                    } else {
                        this.stopClimbing();
                    }
                }

                // fire (we may fire while jumping/moving)
                if (Input.getKeyStatus(Input.keys.CTRL, true) === true) {
                    switch (this.currentMovement) {
                        case 'faceWall':
                            if (this.switchAbove) {
                                this.getMapEvent().handleAction({
                                    type: 'toggleSwitch',
                                    sprite: this.switchAbove
                                });
                            }
                            break;

                        case 'climb':
                            if (!this.lookDirection) {
                                break;
                            }
                        case 'idle':
                        case 'walk_right':
                        case 'walk_left':
                            this.handleFire();
                            break;

                        case 'down':
                            // inventory
                            break;

                        default:
                            console.log('unhandle fire');
                            console.log(this.currentMovement);
                            break;
                    }
                }
            } else {
                if (this.currentMovement.match(/jump/)) {
                    // console.log('***', this.currentMovement, Input.getKeyStatus(Input.keys.SPACE, true));
                    if (Input.getKeyStatus(Input.keys.CTRL, true)) {
                        this.handleFire();
                    }
                    // TODO: handle up key to catch the ladder
                    if (!this.fromLadder && Input.getKeyStatus(Input.keys.UP) === true && !this.goUpOrClimb(true)) {
                        this.jump(this.lookDirection);
                    } else {
                        // console.log('jump 2');
                        this.jump(this.lookDirection);
                    }
                } else if (!this.currentMovement.match('fire') && !this.currentMovement.match('climb')) {
                    console.log('cas 2.2', this.currentMovement);
                    this.fall();
                }
            }
        }

        /**
         * Called when the player attemps to fire
         * 
         * @private
         */

    }, {
        key: 'handleFire',
        value: function handleFire() {
            var canFire = false,
                that = this;

            console.log('fire direction', this.lookDirection);

            if (this.firing) {
                return;
            }

            // TODO: right/left ?
            canFire = this.sprite.onEvent('fire', {
                direction: this.lookDirection
            });

            if (canFire) {
                this.firing = true;

                // player can fire & move only after fire animation has completed
                this.previousMovement = this.currentMovement;
                this.sprite.storeCurrentAnim();
                this.sprite.setAnimation('fire' + this.lookDirection, function () {
                    that.firing = false;
                    this.restorePreviousAnim();
                });
                // this.currentMovement = 'fire' + dir;
                // if (!this.previousMovement.match(/jump/)) {
                //    this.currentMovement = 'fire' + this.lookDirection;
                // }
            }
        }

        /**
         * Called when the player is walking
         * 
         * @param {String} direction The direction the player is heading at.
         * 
         * @private
         */

    }, {
        key: 'walk',
        value: function walk(direction) {
            // ADD: this.currentMovement = 'walk_left|right'
            var sprite = this.sprite,
                currentHitBox = sprite.getHitBox(),
                nextX = void 0,
                nextY = void 0,
                sound = void 0;

            this.currentMovement = 'walk_' + direction;

            this.vy = 0;
            sprite.currentAnimName = 'walk' + direction.charAt(0).toUpperCase() + direction.slice(1);
            sound = 'step_' + direction;
            this.lookDirection = direction;

            if (direction === 'left') {
                this.vx = -2;
            } else {
                this.vx = 2;
            }

            nextX = sprite.x + this.vx;
            nextY = sprite.y + this.vy;

            // hit wall ?
            if (!sprite.currentMap.hitObjectTest(nextX + currentHitBox.x, nextY + currentHitBox.y, nextX + currentHitBox.x2, nextY + currentHitBox.y2, __WEBPACK_IMPORTED_MODULE_2_Map_Tile__["a" /* default */].TYPE.WALL)) {
                sprite.startAnimation();
                if (sprite.currentFrameNum !== sprite.previousFrameNum && (sprite.currentFrameNum === 3 || sprite.currentFrameNum === 7)) {
                    __WEBPACK_IMPORTED_MODULE_1_Audio_AudioManager__["a" /* default */].play(sound);
                }
            } else {
                this.idle();
            }

            sprite.x += this.vx;
            sprite.y += this.vy;

            this.fallTest();

            return 0;
        }

        /**
         * Called when player needs to walk on the left
         * 
         * @private
         */

    }, {
        key: 'walkLeft',
        value: function walkLeft() {
            if (this.currentMovement !== 'climb') {
                this.walk('left');
            } else {
                this.lookDirection = 'left';
            }
        }

        /**
         * Called when player needs to walk on the right
         * 
         * Lots of hardcoded constants that would be better off as behavior options
         * 
         * @private
         */

    }, {
        key: 'walkRight',
        value: function walkRight() {
            if (this.currentMovement !== 'climb') {
                this.walk('right');
            } else {
                this.lookDirection = 'right';
            }
        }

        /**
         * Called when the play starts jumping
         * 
         * @param {String} direction The direction of the jump (right or left).
         * 
         * @private
         */

    }, {
        key: 'startJump',
        value: function startJump(direction) {
            var sprite = this.sprite,
                that = this;

            if (!this.jumping) {
                console.log('starting jump', sprite.y);
                this.readyToJump = false;
                this.currentMovement = 'startjump';
                this.vx = direction === 'left' ? -2 : 2;
                this.vy = -4;
                this.gravity = 0.098;

                console.log('startJump', this.vy);

                sprite.setAnimation('goDown' + direction, function () {
                    console.log('end goDownLeft, ready to jump', this.vy, this.y);
                    that.readyToJump = true;
                    that.currentMovement = 'jump' + direction;
                    that.jumping = true;

                    // TODO: call onEvent('jump')
                    this.setAnimation('jump' + direction);
                });
            } else {
                that.readyToJump = true;
                this.jumping = true;
                that.currentMovement = 'jump' + direction;

                this.vx = direction === 'left' ? -2 : 2;
                this.vy = -4;
                this.gravity = 0.098;

                // TODO: call onEvent('jump')
                this.sprite.setAnimation('jump' + direction);
            }

            this.lookDirection = this.direction = direction;
            this.sideHit = false;

            __WEBPACK_IMPORTED_MODULE_1_Audio_AudioManager__["a" /* default */].play('jump');
        }

        /**
         * Called when the playing is already jumping: this method is checks for colisions and
         * calculates next x/y sprite position
         * 
         * @param {String} direction The direction of the jump.
         * 
         * @private
         */

    }, {
        key: 'jump',
        value: function jump(direction) {
            var sprite = this.sprite,
                nextX = sprite.x + Math.ceil(this.vx),
                nextY = sprite.y + Math.ceil(this.vy),
                currentHitBox = sprite.getHitBox(),
                horizTileHit = null,
                vertTileHit = null,
                noVx = false,
                noVy = false;

            if (!this.readyToJump) {
                console.log('not ready to jump', this.fromLadder);
                return;
            }

            if (this.currentMovement.match(/jump/)) {
                horizTileHit = sprite.currentMap.hitObjectTest(nextX + currentHitBox.x, sprite.y + currentHitBox.y, nextX + currentHitBox.x2, sprite.y + currentHitBox.y2, __WEBPACK_IMPORTED_MODULE_2_Map_Tile__["a" /* default */].TYPE.WALL);
                // left/right collision ? => vx = 0, but player continues to go up
                if (horizTileHit) {
                    // debugger;
                    // console.log('[PlayerMove] Left/Right collision!');

                    // this.vx = 0;
                    this.sideHit = true;
                    noVx = true;

                    // set x to max(wall, nextx), which is wall-1
                    if (this.direction === 'right') {
                        sprite.x = horizTileHit.tile.x - currentHitBox.x2 - currentHitBox.x - 1;
                    } else {
                        sprite.x = horizTileHit.tile.x + sprite.currentMap.tileWidth;
                    }
                } /* else if (!this.fromLadder && this.sideHit === true) {
                  // side was hit during jump
                  noVy = true;
                     this.currentMovement = '';
                  AM.play('land');
                  }*/
                // top/down collision
                vertTileHit = sprite.currentMap.hitObjectTest(sprite.x + currentHitBox.x, nextY + currentHitBox.y, sprite.x + currentHitBox.x2, nextY + currentHitBox.y2, __WEBPACK_IMPORTED_MODULE_2_Map_Tile__["a" /* default */].TYPE.WALL);
                // top/bottom collision ? => fall
                if (vertTileHit) {
                    // top
                    if (this.vy < 0) {
                        // debugger;
                        console.log('[PlayerMove] Top collision, reversing vy!');
                        if (!this.sideHit) {
                            this.fall();
                        } else {
                            this.vy = -this.vy;
                            // ** this.vx = 0;
                        }
                        return;
                    } else {
                        // ground touched
                        console.log('[PlayerMove] touch ground!', this.currentMovement);
                        // debugger;
                        this.jumping = false;
                        this.fromLadder = false;

                        // TODO: play endJumLeft animation => onAnimationEnd, readyLeft
                        __WEBPACK_IMPORTED_MODULE_1_Audio_AudioManager__["a" /* default */].play('land');
                        this.currentMovement = 'idle';

                        sprite.y = vertTileHit.tile.y - sprite.getCurrentHeight();
                        this.vy = 0;
                        return;
                    }
                }
            }

            if (!noVx) {
                sprite.x += Math.ceil(this.vx);
            }
            if (!noVy) {
                sprite.y += Math.ceil(this.vy);
                this.vy += this.gravity;
            } else {
                this.vy = 0;
            }
        }

        /**
         * Called when the player stops moving
         * 
         * @private
         */

    }, {
        key: 'idle',
        value: function idle() {
            var sprite = this.sprite;

            this.vx = 0;
            this.vy = 0;

            sprite.stopAnimation();
        }

        /**
         * Called when the player needs to goDown
         * 
         * @private
         */

    }, {
        key: 'goDown',
        value: function goDown() {
            var sprite = this.sprite;
            this.vx = 0;
            this.vy = 0;

            sprite.currentAnimName = 'goDown' + this.lookDirection;

            this.currentMovement = '';
        }

        /**
         * Called when the player faces the wall
         * 
         * @private
         */

    }, {
        key: 'faceWall',
        value: function faceWall() {
            var sprite = this.sprite;

            this.vx = 0;
            this.vy = 0;

            // only check once
            if (this.currentMovement !== 'faceWall') {
                this.currentMovement = 'faceWall';
                sprite.advanceFrame('faceWall');
                this.switchAbove = this.sprite.currentMap.getSwitchAboveMaster();
                console.log('**** faceWall', this.switchAbove);
            }
        }

        /**
         * Called when the player starts climbing a ladder
         * 
         * @param {Number} direction The direction, can be 0 (down) or 1 (up)
         * 
         * @private
         */

    }, {
        key: 'climb',
        value: function climb(direction) {
            console.log('climbing');
            var sprite = this.sprite;

            this.fromLadder = true;

            this.currentMovement = 'climb';
            this.vx = 0;
            this.vy = direction ? -this.climbVY : this.climbVY;

            sprite.currentAnimName = 'climb';
            sprite.startAnimation();

            // TODO: check for top ladder or floor

            sprite.x += this.vx;
            sprite.y += this.vy;
        }

        /**
         * Called when the player stops climbing (ie: released up/down keys)
         * 
         * @private
         */

    }, {
        key: 'stopClimbing',
        value: function stopClimbing() /*direction*/{
            var sprite = this.sprite;

            this.vx = 0;
            this.vy = 0;
            sprite.stopAnimation();
        }

        /**
         * Called when the player moves the up arrow key: depending on its position he will face a wall
         * or climb a ladder
         * 
         * @param {Boolean} onlyClimb Set to true to only climb
         * 
         * @private
         */

    }, {
        key: 'goUpOrClimb',
        value: function goUpOrClimb(onlyClimb) {
            var sprite = this.sprite,
                currentHitBox = sprite.getHitBox(),
                diff = onlyClimb ? 0 : 24,
                pos = false,
                pos2 = false,
                Input = this.Input;

            if (Input.getKeyStatus(Input.keys.LEFT) === true || Input.getKeyStatus(Input.keys.RIGHT) === true) {
                return false;
            }

            if (onlyClimb === true) {
                if (sprite.currentMap.hitObjectTest(currentHitBox.x + sprite.x, currentHitBox.y + sprite.y + 40, currentHitBox.x + sprite.x - diff, currentHitBox.y2 + sprite.y - 50, __WEBPACK_IMPORTED_MODULE_2_Map_Tile__["a" /* default */].TYPE.LADDER)) {
                    pos = sprite.currentMap.hitObjectTest(currentHitBox.x2 + sprite.x + diff, currentHitBox.y + sprite.y + 40, currentHitBox.x2 + sprite.x - diff, currentHitBox.y2 + sprite.y - 50, __WEBPACK_IMPORTED_MODULE_2_Map_Tile__["a" /* default */].TYPE.LADDER);
                }
            } else {
                pos = sprite.currentMap.hitObjectTest(currentHitBox.x + sprite.x + diff, currentHitBox.y + sprite.y + 40, currentHitBox.x2 + sprite.x - diff, currentHitBox.y2 + sprite.y - 50, __WEBPACK_IMPORTED_MODULE_2_Map_Tile__["a" /* default */].TYPE.LADDER);
            }

            if (pos !== false) {
                // debugger;
                // center player over tile (ladder)
                if (this.currentMovement !== 'climb') {
                    // debugger;
                    sprite.centerXOverTile(pos);
                    this.lookDirection = '';
                }
                console.log('climbing, fromLadder', this.fromLadder, this.currentMovement);
                this.climb(1);

                return true;
            } else if (!onlyClimb) {
                // TODO: if (climb) anim(faceLadder)
                this.faceWall();

                return false;
            }
        }

        /**
         * This method is called when the player presses the down arrow key: depending on its position,
         * player will climb a ladder or get down
         * 
         * @private
         */

    }, {
        key: 'goDownOrClimb',
        value: function goDownOrClimb() {
            var sprite = this.sprite,
                currentHitBox = sprite.getHitBox(),
                pos = sprite.currentMap.hitObjectTest(currentHitBox.x + sprite.x + 24, currentHitBox.y2 + sprite.y + this.climbVY, currentHitBox.x2 + sprite.x - 24, currentHitBox.y2 + sprite.y + this.climbVY, __WEBPACK_IMPORTED_MODULE_2_Map_Tile__["a" /* default */].TYPE.LADDER);

            if (pos) {
                if (this.currentMovement !== 'climb') {
                    sprite.centerXOverTile(pos);
                }
                console.log(currentHitBox.x2 + sprite.x - 24, currentHitBox.y2 + sprite.y + this.climbVY);
                this.climb(0);
            } else {
                // TODO: if (climb) anim(faceLadder)
                if (this.currentMovement === 'climb' || this.currentMovement === 'faceWall') {
                    // debugger;
                    console.log(currentHitBox.x2 + sprite.x - 24, currentHitBox.y2 + sprite.y + this.climbVY);
                    console.log('faceWall');
                    pos = sprite.currentMap.hitObjectTest(currentHitBox.x + sprite.x + 24, currentHitBox.y2 + sprite.y + this.climbVY, currentHitBox.x2 + sprite.x - 24, currentHitBox.y2 + sprite.y + this.climbVY, __WEBPACK_IMPORTED_MODULE_2_Map_Tile__["a" /* default */].TYPE.LADDER);
                    this.faceWall();
                } else {
                    this.goDown();
                }
            }
        }

        /**
         * Called when the player is falling
         * 
         * @private
         */

    }, {
        key: 'fall',
        value: function fall() {
            var i = 4,
                sprite = this.sprite;

            this.jumping = false;

            //          AM.play('falling');
            // TODO: guess movement is different if we're falling after a jump or simple walk
            // console.log('fall()', this.lookDirection);
            for (; i > 0; i--) {
                if (this.fallTest(i)) {
                    this.vy = i;
                    break;
                }
            }

            if (i > 0) {
                this.vx = 0;
                sprite.y += this.vy;
                sprite.advanceFrame('fall' + this.lookDirection);
            } else {
                this.fromLadder = false;
                console.log('**land =>', this.fromLadder);
                // if (this.currentMovement === 'falling') {
                //     AM.play('land');
                // }
            }
        }

        /**
         * Checkes that player can fall
         * 
         * @param {Number=1} size The gap size to check for.
         * 
         * @returns {Boolean} true if the player falls
         * 
         * @private
         */

    }, {
        key: 'fallTest',
        value: function fallTest(size) {
            size = size || 1;

            var sprite = this.sprite,
                currentHitBox = sprite.getHitBox(),
                y = sprite.y + currentHitBox.y2 + size;

            // check for falling
            // var y = sprite.y + sprite.getCurrentHeight() + size;

            if (!sprite.currentMap.fallTest(sprite.x + currentHitBox.x, y) && !sprite.currentMap.fallTest(sprite.x + currentHitBox.x2, y)) {
                this.currentMovement = 'falling';
                return true;
            } else {

                //                    if (this.currentMovement == 'falling') {
                //                        debugger;
                //                        this.currentMap.fallTest(this.x + currentHitBox.x, y) && this.currentMap.fallTest(this.x + currentHitBox.x2, y);
                //                    }
                if (this.currentMovement == 'falling') {
                    this.currentMovement = '';
                }
                return false;
            }
        }
    }]);

    return PlayerMove;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (PlayerMove);

/***/ }),
/* 34 */
/* exports provided: default */
/* exports used: default */
/*!******************************************!*\
  !*** ./js/Object/Behavior/SimpleFall.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__ = __webpack_require__(/*! Object/Behavior/Behavior */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Map_Tile__ = __webpack_require__(/*! Map/Tile */ 2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/*jshint devel: true, bitwise: false*/
/**
 * Simple behavior that makes an object bounce on the ground
 * 
 * @param {Sprite} sprite The sprite to attach the behavior to.
 * @param {InputManager} Input A reference to the InputManager.
 * @param {Object} options The options of the behavior.
 * @param {Number} [options.elasticity=0.80] The elasticity: the closer it is to 1, the higher the bounce.
 * @param {Function} [options.onEnd=undefined] An optional callback to execute when the object stops bouncing.
 * @param {Function} [options.onGround=undefined] An optional callback to execute each time the object touches the ground.
 * 
 * @example
 * 
 *  sprite.setBehavior('simplefall', {
 *    gravity: 0.3,
 *    onEnd: () => {
 *        this.moving = false;
 *    },
 *    onGround: function() {
 *      AM.play('bounce');
 *    }
 * });
 */

var SimpleFall = function (_Behavior) {
    _inherits(SimpleFall, _Behavior);

    function SimpleFall(sprite, Input, options) {
        _classCallCheck(this, SimpleFall);

        var _this = _possibleConstructorReturn(this, (SimpleFall.__proto__ || Object.getPrototypeOf(SimpleFall)).call(this, sprite, Input, options));

        _this.elasticity = typeof options.elasticity !== 'undefined' ? options.elasticity : 0.80;

        _this.onEnd = options.onEnd || null;
        _this.onGround = options.onGround || null;

        console.log('move initiated', sprite.vx, sprite.vy, _this.startVy, sprite.gravity);
        return _this;
    }

    /**
     * The move handler that gets executed at each move loop.
     * 
     * Simply calculates the next vertical position using current velocity.
     * Each time the object reaches the ground, it bounces a little less, using the elasticity property,
     * until it reaches the ground and stops bouncing.
     * 
     */


    _createClass(SimpleFall, [{
        key: 'onMove',
        value: function onMove(t) {
            var sprite = this.sprite,
                map = sprite.currentMap,
                nextX = sprite.x + sprite.vx,
                nextY = sprite.y + sprite.vy,
                hitBox = sprite.getHitBox(),
                hitTest = null;

            // reached ground ? revert vy
            hitTest = map.hitObjectTest(nextX + hitBox.x, nextY + hitBox.y2, nextX + hitBox.x2, nextY + hitBox.y2, __WEBPACK_IMPORTED_MODULE_1_Map_Tile__["a" /* default */].TYPE.WALL);
            if (hitTest) {
                if (this.onGround) {
                    this.onGround();
                }
                this.resetY();
                if (Math.abs(sprite.vy) <= sprite.gravity) {
                    sprite.moving = false;
                    if (this.onEnd) {
                        this.onEnd();
                    }
                }
            } else {
                sprite.vy += sprite.gravity;

                sprite.y += sprite.vy;
            }
        }

        /**
         * Called when the object reaches the ground: simply inverts velocity
         * 
         * @private
         */

    }, {
        key: 'resetY',
        value: function resetY() {
            this.sprite.vy = -this.sprite.vy * this.elasticity;
        }
    }]);

    return SimpleFall;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (SimpleFall);

/***/ }),
/* 35 */
/* exports provided: default */
/* exports used: default */
/*!******************************************!*\
  !*** ./js/Object/Behavior/WeaponMove.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__ = __webpack_require__(/*! Object/Behavior/Behavior */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Map_Tile__ = __webpack_require__(/*! Map/Tile */ 2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/*jshint devel: true, bitwise: false*/
/**
 * Simple behavior that moves horizontally until a wall is reached.
 * 
 * @param {Sprite} sprite The sprite to attach the behavior to.
 * @param {InputManager} Input A reference to the InputManager.
 * @param {Object} options The options of the behavior
 * @param {String} [options.direction="left"] The initial direction of the move, default is `right`.
 * 
 */

var WeaponMove = function (_Behavior) {
    _inherits(WeaponMove, _Behavior);

    function WeaponMove(sprite, Input, options) {
        _classCallCheck(this, WeaponMove);

        var _this = _possibleConstructorReturn(this, (WeaponMove.__proto__ || Object.getPrototypeOf(WeaponMove)).call(this, sprite, Input, options));

        _this.direction = options.direction || 'right';

        if (_this.direction.match('left')) {
            sprite.vx = -sprite.vx;
        }

        if (_this.direction.match('top')) {
            sprite.vy = -sprite.vy;
        }
        return _this;
    }

    /**
     * The onMove event handler, simply moves updates the object's x using vx and calls VXChange
     * when it reaches a wall
     */


    _createClass(WeaponMove, [{
        key: 'onMove',
        value: function onMove(t) {
            var sprite = this.sprite,
                map = sprite.currentMap,
                nextX = sprite.x + sprite.vx,
                nextY = sprite.y + sprite.vy,
                hitBox = sprite.getHitBox(),
                startX = sprite.vx > 0 ? hitBox.x2 : hitBox.x;

            if (map.hitObjectTest(nextX + startX, nextY + hitBox.y, nextX + startX, nextY + hitBox.y2, __WEBPACK_IMPORTED_MODULE_1_Map_Tile__["a" /* default */].TYPE.WALL)) {
                sprite.vx = -sprite.vx;
                if (this.onVXChange) {
                    this.onVXChange(sprite.vx);
                }
            }

            sprite.x += sprite.vx;
            sprite.y += sprite.vy;
        }
    }]);

    return WeaponMove;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Behavior_Behavior__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (WeaponMove);

/***/ }),
/* 36 */
/* exports provided: default */
/* exports used: default */
/*!*****************************!*\
  !*** ./js/Object/Circle.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Object__ = __webpack_require__(/*! Object/Object */ 4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Circle = function (_GfxObject) {
    _inherits(Circle, _GfxObject);

    function Circle(options) {
        _classCallCheck(this, Circle);

        var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, 'circle', options));

        _this.w = options.w || 0;
        _this.h = options.h || 0;
        _this.x = options.x || _this.w / 2;
        _this.y = options.y || _this.h / 2;
        _this.radius = options.radius || _this.w / 2;
        _this.color = options.color || "red";
        return _this;
    }

    _createClass(Circle, [{
        key: 'draw',
        value: function draw(ctx, debug) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }]);

    return Circle;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Object__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Circle);
;

/***/ }),
/* 37 */
/* exports provided: default */
/* exports used: default */
/*!**************************!*\
  !*** ./js/Object/Hud.js ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Sprite__ = __webpack_require__(/*! Object/Sprite */ 12);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// define(['Sprite'], function() {

/*jshint devel: true, bitwise: false*/
/*globals Class*/

var Hud = function () {
	function Hud(options) {
		_classCallCheck(this, Hud);

		// super(options);

		this.score = options.score || 0;
		this.alertnateScore = options.alternateScore || 0;
		this.energy = options.energy || 100;
		this.$dest = options.target;
		this.info = '';
		this.inventory = {};

		this.width = options.width || 1024;
		this.height = options.height || 64;

		Object.defineProperty(this, "score", {
			get: function get() {
				return this.score;
			},

			set: function set(score) {
				// TODO: some checks
				this.score = score;
			}
		});
	}

	_createClass(Hud, [{
		key: 'drawBackground',
		value: function drawBackground() {}
	}, {
		key: 'draw',
		value: function draw() {
			// TODO
			this.drawBackground();
		}
	}]);

	return Hud;
}();

/* harmony default export */ __webpack_exports__["a"] = (Hud);

/***/ }),
/* 38 */
/* exports provided: default */
/* exports used: default */
/*!***************************!*\
  !*** ./js/Object/Menu.js ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Object_Object__ = __webpack_require__(/*! Object/Object */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Object_Text__ = __webpack_require__(/*! Object/Text */ 13);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/*jshint devel: true, bitwise: false*/
/**
 * The menu class allows to quickly add text menu to an Athena Scene
 * 
 * Each menu entry is called menuItem and is a simple object with the following properties:
 * { text: 'menu text', selectable: true|false, active: true|false, visible: true|false }
 * 
 * @param {String} type The type of object.
 * @param {Object} options
 * @param {String} [options.title="Menu Title"] The title of the menu.
 * @param {String} [options.color="black"] The color of the menu.
 * @param {Array} [options.menuItems=[]] The menu items to add.
 * @param {String} [options.selectedColor="red"] The default color to use for the selected menu item.
 * 
 * @example
 * 
 * let myMenu = new Menu('mainMenu', {
 *   title: 'Gods JS',
 *      color: 'white',
 *      menuItems: [
 *      {
 *          text: '> Start Game',
 *          selectable: true,
 *          visible: true,
 *          active: true
 *      },
 *      {
 *          text: '> Cannot Select ;)',
 *          selectable: true,
 *          visible: true
 *      }]
 *    })
 */

var Menu = function (_GfxObject) {
    _inherits(Menu, _GfxObject);

    function Menu(type, options) {
        _classCallCheck(this, Menu);

        // this.type = type;
        // this.id = this.type + new Date().getTime();

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, type, options));

        _this.title = new __WEBPACK_IMPORTED_MODULE_1_Object_Text__["a" /* default */](type, {
            color: options.color || 'black',
            text: options.title || 'Menu Title'
        });

        _this.color = options.color || 'white';
        _this.selectedColor = options.selectedColor || 'red';

        _this.menuItems = [];

        _this.selectedItem = options.selectedItem || 0;

        _this.selectCallbacks = [];
        _this.hoverCallbacks = [];

        _this.itemHeight = options.itemHeight || 40;

        // SUPERHERE this._super(type, options);

        _this.title.moveTo(_this.x, _this.y);

        _this.addMenuItems(options.menuItems || []);
        return _this;
    }

    /**
     * Adds a new menu item
     * 
     * @param {Object} menu An hash describing the menu.
     * The hash can have the following properties: 
     * { text: 'menu text', selectable: true|false, active: true|false, visible: true|false }
     */


    _createClass(Menu, [{
        key: 'addMenuItem',
        value: function addMenuItem(menu) {
            var y = this.y + (this.menuItems.length + 1) * this.itemHeight,
                menuItem = new __WEBPACK_IMPORTED_MODULE_1_Object_Text__["a" /* default */]('menuItem' + this.menuItems.length, menu);

            menuItem.moveTo(this.x, y);
            menuItem.visible = menu.visible === true || false;
            menuItem.selectable = menu.selectable === true || false;

            this.menuItems.push(menuItem);
        }

        /**
         * Adds several menuItems in a row
         * 
         * @param {Array} items The list of items to add
         * 
         * @see addMenuItem()
         */

    }, {
        key: 'addMenuItems',
        value: function addMenuItems(items) {
            var _this2 = this;

            console.log('addMenuItems', items);

            items.forEach(function (item, idx) {
                _this2.addMenuItem(item);
                if (item.active) {
                    _this2.selectedItem = idx;
                }
            });
        }

        /**
         * Selects the next item in the item list
         * 
         * @private
         */

    }, {
        key: 'nextItem',
        value: function nextItem() {
            if (++this.selectedItem >= this.menuItems.length) {
                this.selectedItem = 0;
            }

            if (this.selectedItem && this.menuItems[this.selectedItem] && !this.menuItems[this.selectedItem].selectable) {
                this.nextItem();
            }
        }

        /**
         * Returns the index of the selected item
         * 
         * @returns {Number} The index of the selected item.
         * 
         * @private
         */

    }, {
        key: 'getSelectedItemIndex',
        value: function getSelectedItemIndex() {
            return this.selectedItem;
        }

        /**
         * Returns the current selected Item object
         * 
         * @returns {Object} Current selected item.
         * 
         * @private
         */

    }, {
        key: 'getSelectedItem',
        value: function getSelectedItem() {
            return this.menuItems[this.selectedItem];
        }

        /**
         * Updates the text of a menu item
         * 
         * @param {Number} itemId The index of the item to modify.
         * @param {String} text The new text.
         * 
         */

    }, {
        key: 'setText',
        value: function setText(itemId, text) {
            this.menuItems[itemId] = text;
        }

        /**
         * Draw method for the Text object
         * 
         * @param {CanvasContext} destCtx The canvas context where to draw the menu
         * 
         * @private
         */

    }, {
        key: 'draw',
        value: function draw(destCtx) {
            var _this3 = this;

            if (this.angle !== 0) {
                destCtx.save();
                destCtx.rotate(this.angle);
            }

            this.title.draw(destCtx);

            this.menuItems.forEach(function (menuItem, idx) {
                if (idx === _this3.selectedItem) {
                    menuItem.color = _this3.selectedColor || 'blue';
                } else {
                    menuItem.color = _this3.color;
                }
                menuItem.draw(destCtx);
            });

            if (this.angle !== 0) {
                destCtx.restore();
            }
        }
    }]);

    return Menu;
}(__WEBPACK_IMPORTED_MODULE_0_Object_Object__["a" /* default */]);

;

/* harmony default export */ __webpack_exports__["a"] = (Menu);

/***/ }),
/* 39 */
/* exports provided: default */
/* exports used: default */
/*!***************************!*\
  !*** ./js/Scene/Scene.js ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Resource_ResourceManager__ = __webpack_require__(/*! Resource/ResourceManager */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Object_Sprite__ = __webpack_require__(/*! Object/Sprite */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Object_BitmapText__ = __webpack_require__(/*! Object/BitmapText */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Object_Text__ = __webpack_require__(/*! Object/Text */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Map_Map__ = __webpack_require__(/*! Map/Map */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_Map_Tile__ = __webpack_require__(/*! Map/Tile */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_Notification_NotificationManager__ = __webpack_require__(/*! Notification/NotificationManager */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_Core_Deferred__ = __webpack_require__(/*! Core/Deferred */ 0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }










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

var Scene = function () {
    function Scene(options) {
        _classCallCheck(this, Scene);

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

        this.loaded = false;

        this.running = false;

        this.backgroundImage = null;

        this.name = options.name || 'Scene' + new Date().getTime();

        this.opacity = typeof options.opacity !== 'undefined' ? options.opacity : 1;

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


    _createClass(Scene, [{
        key: '_prepareCanvas',
        value: function _prepareCanvas() {
            if (this.resources) {
                this.display.prepareCanvas(this.resources);
            }
        }

        /**
         * Fill layers arrays
         * @private
         */

    }, {
        key: '_fillArrays',
        value: function _fillArrays() {
            for (var i = 0; i < this.layers.length; ++i) {
                this.layers[i] = [];
            }

            for (var _i = 0; _i < this.backgrounds.length; ++_i) {
                this.backgrounds[_i] = [];
            }
            for (var _i2 = 0; _i2 < this.foregrounds.length; ++_i2) {
                this.foregrounds[_i2] = [];
            }
        }

        /**
         * Save references of loaded resources for later use
         * @private
         */

    }, {
        key: '_getResourcesRef',
        value: function _getResourcesRef() {
            var resources = this.resources;

            if (resources) {
                resources.forEach(function (res) {
                    res.elt = __WEBPACK_IMPORTED_MODULE_0_Resource_ResourceManager__["a" /* default */].getResourceById(res.id);
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

    }, {
        key: 'loadResources',
        value: function loadResources(res, progressCb /*, doneCb, failCb*/) {
            var _this = this;

            console.log('[scene ' + this.name + '] ' + 'loading Resources...');

            if (!this.loaded) {
                console.log('[scene ' + this.name + '] ' + ' seems like the scene needs to be loaded: goooo!');
                this.readyDef = __WEBPACK_IMPORTED_MODULE_0_Resource_ResourceManager__["a" /* default */].addResources(res);

                // add the huds resources as well
                // if (this.hudScene && !this.hudScene.loaded) {
                //     this.readyDef = ResourceManager.addResources(this.hudScene.resources);
                // }

                this.readyDef.then(function () {
                    // if (this.hudScene) {
                    //     this.hudScene.load();
                    // }
                    _this.loaded = true;
                });

                this.readyDef.then(this.cacheImages.bind(this));
                this.readyDef.then(this.onLoad.bind(this));

                __WEBPACK_IMPORTED_MODULE_0_Resource_ResourceManager__["a" /* default */].loadResources('any', progressCb);
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

    }, {
        key: 'load',
        value: function load() {
            var _this2 = this;

            console.log('[Scene ' + this.name + '] load()');
            if (this.hudScene && !this.hudScene.loaded) {
                var def = new __WEBPACK_IMPORTED_MODULE_7_Core_Deferred__["a" /* default */]();
                this.hudScene.load().then(function () {
                    _this2.loadResources(_this2.resources).then(function () {
                        debugger;
                        def.resolve();
                    });
                });

                return def.promise;
            } else {
                return this.loadResources(this.resources);
            }
        }

        /**
         * Simple debug method: this be redefined for specific games
         */

    }, {
        key: 'debug',
        value: function debug() {
            console.log('[scene ' + this.name + '] ' + 'debug() default scene debug does nothing!');
        }

        /**
         * This method is called once resources have been loaded and does the following:
         * 1. creates layer arrays
         * 2. get reference resources from the resourceManager
         * 3. prepare canvas elements
         */

    }, {
        key: 'onLoad',
        value: function onLoad() {
            this._fillArrays();
            this._getResourcesRef();
            this._prepareCanvas();
        }
    }, {
        key: 'onStart',
        value: function onStart(cb) {
            this._startCallbacks.push(cb.bind(this));
            if (this.running) {
                cb();
            }
        }

        /**
         * Get a reference of each `image` resource that has been loaded.
         * 
         * @private
         */

    }, {
        key: 'cacheImages',
        value: function cacheImages() {
            console.log('[scene ' + this.name + '] ' + ' caching Images');
            // var max = this.resources.length,
            //     i,
            //     id;
            if (!this.resources) {
                return;
            }

            try {
                for (var i = 0, max = this.resources.length; i < max; i++) {
                    var id = this.resources[i].id;
                    if (this.resources[i].type === 'image') {
                        this.pics[id] = __WEBPACK_IMPORTED_MODULE_0_Resource_ResourceManager__["a" /* default */].getResourceById(id);
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
         */

    }, {
        key: 'setMap',
        value: function setMap(map) {
            if (map instanceof __WEBPACK_IMPORTED_MODULE_4_Map_Map__["a" /* default */]) {
                this.map = map;
            } else {
                this.map = new __WEBPACK_IMPORTED_MODULE_4_Map_Map__["a" /* default */](map);
            }
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

    }, {
        key: 'addObject',
        value: function addObject(objects, layerType, layerNum) {
            console.log('[scene ' + this.name + '] ' + 'addObject', objects, layerType, layerNum);
            // var layer = null,
            //     that = this;

            var type = layerType || 'front',
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

            debugger;
            if (Array.isArray(objects)) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var obj = _step.value;

                        console.log('[scene ' + this.name + '] ' + 'pushing', obj);
                        layer.push(obj);
                        if (typeof obj.setImage === 'function') {
                            obj.setImage(this.pics[obj.imageSrc]);
                        }
                        obj.setScene(this);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
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

    }, {
        key: 'drawMap',
        value: function drawMap(destCtx) {
            if (!this.map.isDirty) {
                return;
            }

            this.display.clearScreen(destCtx);
            this.map.draw(destCtx, false);
        }

        /**
         * Draws every object that is part of the associated map
         * 
         * @param {CanvasContext} destCtx The canvas context where the map should be rendered.
         * 
         * @private
         */

    }, {
        key: 'drawMapObjects',
        value: function drawMapObjects(destCtx) {
            console.log('drawObjects');
            this.map.drawObjects(destCtx);
        }

        /**
         * Draws every object that has been added onto the scene
         * 
         * @param {CanvasContext} destCtx The canvas context where the map should be rendered.
         * 
         * @private
         */

    }, {
        key: 'drawSceneObjects',
        value: function drawSceneObjects(destCtx) {
            // var i, j,
            //     max, max2,
            //     obj = null,
            //     layer = null;

            // i = j = max = max2 = 0;
            // got through the list of all objects and render them if they are visible ?
            for (var i = 0, max = this.layers.length; i < max; i++) {
                var layer = this.layers[i];
                for (var j = 0, max2 = layer.length; j < max2; j++) {
                    var obj = layer[j];
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

    }, {
        key: 'moveSceneObjects',
        value: function moveSceneObjects() {
            // var i, j,
            //     max, max2,
            //     obj = null,
            //     layer = null;

            // i = j = max = max2 = 0;

            // got through the list of all objects and call move method ?
            for (var i = 0, max = this.layers.length; i < max; i++) {
                var layer = this.layers[i];
                for (var j = 0, max2 = layer.length; j < max2; j++) {
                    var obj = layer[j];
                    obj.move();
                }
            }
        }

        /**
         * Changes the opacity of the scene
         * 
         * @param {number} opacity The new opacity.
         */

    }, {
        key: 'setOpacity',
        value: function setOpacity(opacity) {
            this.opacity = opacity;
        }

        /**
         * Returns the current opacity of the scene
         * 
         * @returns {number} The current opacity value.
         */

    }, {
        key: 'getOpacity',
        value: function getOpacity() {
            return this.opacity;
        }

        /**
         * You can set a static background image independently of the layers/
         * 
         * @param {Image|String} The image to set as background
         * @obsolete
         */

    }, {
        key: 'setBackgroundImage',
        value: function setBackgroundImage(image) {
            this.backgroundImage = image;
            // todo: hardcoded for now
            if (image instanceof Image) {
                new Dom('.main').css('backgroundImage', 'url(' + image.src + ')');
            } else {
                new Dom('.main').css('backgroundImage', 'url(' + image + ')');
            }
        }

        /**
         * Resume the scene playback
         */

    }, {
        key: 'resume',
        value: function resume() {
            this.start(true);
        }

        /**
         * Starts the scene
         * 
         * @param {boolean} [doNotResetMap=false] set to false if you don't want the map associated with the scene to have
         * its objects reset. This is useful when pausing the game for example.
         */

    }, {
        key: 'start',
        value: function start(doNotResetMap) {
            if (!this.loaded) {
                console.warn('[Scene] start() attempt to start a scene that has not been loaded yet. Start failed.');
            }

            this.running = true;

            if (this.map) {
                if (!doNotResetMap) this.map.reset();else this.map.resume();

                // force render of the map in any way
                this.map.isDirty = true;
            }

            // reset layers too
            this.backgrounds.length = 0;

            this.layers.forEach(function (layer) {
                layer.length = 0;
            });

            // be sure to clear all canvas, inc. secondary, especially
            // if we go from a scene with an hud, to a scene without one
            this.display.clearAllScreens();

            this.foregrounds.length = 0;

            this.time = new Date().getTime();

            this.playTime = null;

            if (this.hudScene) {
                this.hudScene.start();
            }

            this._startCallbacks.forEach(function (cb) {
                cb();
            });
        }

        /***
         * stop the scene: TODO MERGE
         */

    }, {
        key: 'stop',
        value: function stop() {
            this.running = false;

            if (this.hudScene) {
                this.hudScene.stop();
            }
        }

        /**
         * pause the scene: TODO MERGE
         */

    }, {
        key: 'pause',
        value: function pause() {
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

    }, {
        key: 'unpause',
        value: function unpause() {
            this.running = true;
            this.time = new Date().getTime() - this.playTime;
            console.log('resuming, playTime = ', this.playTime / 1000);
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

    }, {
        key: 'getPlayTime',
        value: function getPlayTime() {
            var playTime = null;

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

    }, {
        key: 'run',
        value: function run() {
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

    }, {
        key: 'render',
        value: function render(layers) {
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

    }, {
        key: 'notify',
        value: function notify(eventType, data) {
            __WEBPACK_IMPORTED_MODULE_6_Notification_NotificationManager__["a" /* default */].notify(eventType, data);
        }

        /**
         * Subscribe to a list of events
         * 
         * @param {String} eventList The list of events to subscribe to as a space separated string.
         */

    }, {
        key: 'bindEvents',
        value: function bindEvents(eventList) {
            __WEBPACK_IMPORTED_MODULE_6_Notification_NotificationManager__["a" /* default */].listen(eventList, this.onEvent.bind(this));
        }

        /**
         * onEvent is called once one of the registered events has been triggered
         */

    }, {
        key: 'onEvent',
        value: function onEvent() {}

        /**
         * Attach the specified display to the scene
         * 
         * @param {Display} display The display to attach the scene to.
         */

    }, {
        key: 'setDisplay',
        value: function setDisplay(display) {
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

    }, {
        key: 'animate',
        value: function animate(fxName, options) {
            return this.display.animate(fxName, options, this);
        }

        /**
         * Remove the specified object from the scene
         * 
         * @param {GfxObject} gfxObject the object to remove from the scene
         */

    }, {
        key: 'removeObject',
        value: function removeObject(gfxObject) {
            var layer = this.layers[0],
                foundIndex = layer.indexOf(gfxObject);

            if (foundIndex > -1) {
                layer.splice(foundIndex, 1);
            }
        }
    }]);

    return Scene;
}();

;

/* harmony default export */ __webpack_exports__["a"] = (Scene);

/***/ }),
/* 40 */
/* unknown exports provided */
/* exports used: default */
/*!*********************************************!*\
  !*** ./js/lib/fpscounter/fpscounter.min.js ***!
  \*********************************************/
/***/ (function(module, exports) {

/*
 * fpscounter.js
 *
 * A simple in-browser fps counter, suitable for using with a bookmarklet
 * 
 * @author Pete Otaqui <pete@otaqui.com>
 * @url https://github.com/pete-otaqui/fpscounter
 * @license Creative Commons Attribution 3.0 Unported
 * @license http://creativecommons.org/licenses/by/3.0/deed.en_GB
*/
(function (global) {
    global.fpscounter = function (options) {
        // late binding for options > global.fpscounter_options > defaults
        options = options || {};
        var globals = global.fpscounter_options || {};

        var defaults = {
            remove_on_click: false,
            width: 100,
            height: 50
        };
        Object.keys(defaults).forEach(function (key) {
            options[key] = options[key] || globals[key] || defaults[key];
        });

        // get the width height for repeated use
        var canvas_w = options.width,
            canvas_h = options.height;

        // create the new dom elements, the canvas context, the style
        var ele = document.createElement('div');
        ele.className = 'fpscounter';
        ele.style.width = canvas_w + 'px';
        ele.style.height = canvas_h + 'px';

        var canvas = document.createElement('canvas');
        canvas.className = 'fpscounter-canvas';
        canvas.width = canvas_w;
        canvas.height = canvas_h;

        var context = canvas.getContext('2d'),
            text_fps_x = canvas_w / 2 - 14,
            text_fps_y = canvas_h / 2 + 10,
            text_max_x = 4,
            text_max_y = 8,
            text_min_x = 4,
            text_min_y = canvas_h - 4,
            fps_font = 'bold 30px Monospace',
            min_max_font = '10px Monospace';

        var gradient_fill = context.createLinearGradient(0, 0, 0, canvas_h);
        gradient_fill.addColorStop(0, '#001133');
        gradient_fill.addColorStop(1, '#112288');

        var gradient_line = context.createLinearGradient(0, 0, 0, canvas_h);
        gradient_line.addColorStop(0, '#2848d8');
        gradient_line.addColorStop(1, '#3366ff');

        context.lineWidth = 1;
        context.strokeStyle = gradient_line;

        var style = document.createElement('style');
        style.textContent = '.fpscounter { ' + 'position: fixed; ' + 'top: 0; ' + 'right: 0; ' + 'background-color: #000; ' + 'color: #fff; ' + 'font-size: 30px; ' + 'font-family: monospace;' + 'z-index: 999999' + '}';

        ele.appendChild(canvas);
        document.body.appendChild(ele);
        document.querySelector('head').appendChild(style);

        // initialize some timing and history variables
        var t_pre,
            t_now,
            u_pre,
            u_lim,
            h_arr = [],
            h_len = canvas_w,
            raf_request,
            raf_running;

        // we won't update anything more often than this many milliseconds
        u_lim = 100;

        // reduce an array of values to it members bounding values in the form [min, max]
        function h_reduce(memo, item) {
            if (!memo[0] || item < memo[0]) memo[0] = item;
            if (!memo[1] || item > memo[1]) memo[1] = item;
            return memo;
        }

        function checkfps() {
            var fps, c_min_max, c_min, c_max, c_delta, first_point, xy;
            raf_running = true;
            t_now = Date.now();
            // this is where we throttle displayed updates
            if (t_now >= u_pre + u_lim) {

                // get the fps for the history
                fps = Math.min(60, Math.round(1 / (t_now - t_pre) * 1000));
                h_arr.unshift(fps);

                // do required math
                context.clearRect(0, 0, canvas_w, canvas_h);
                if (h_arr.length > h_len) h_arr.pop();
                c_min_max = h_arr.reduce(h_reduce, []);
                c_min = c_min_max[0];
                c_max = c_min_max[1];
                c_delta = c_max - c_min;

                // draw the line graph
                context.fillStyle = gradient_fill;
                context.beginPath();
                // first_point = fpsToPoint(0, h_arr[0], c_min, c_delta);
                context.moveTo(canvas_w, canvas_h);
                h_arr.forEach(function (fps_val, index) {
                    xy = fpsToPoint(index, fps_val, c_min, c_delta);
                    context.lineTo(xy[0], xy[1]);
                });
                context.lineTo(xy[0], canvas_h);
                context.lineTo(canvas_w, canvas_h);
                context.fill();
                context.stroke();

                context.fillStyle = '#fff';
                // write the main FPS text
                context.font = fps_font;
                context.fillText(fps, text_fps_x, text_fps_y);

                // write the limit texts
                context.font = min_max_font;
                context.fillText(c_min, text_min_x, text_min_y);
                context.fillText(c_max, text_max_x, text_max_y);

                // set the "update time" counter
                u_pre = t_now;
            }

            // set the "frame time" counter
            t_pre = t_now;

            // request another update later
            if (raf_running) {
                raf_request = requestAnimationFrame(checkfps);
            }
        }

        // convert an fps value to an [x,y] array
        function fpsToPoint(index, fps_val, min, delta) {
            return [canvas_w - index, canvas_h - canvas_h * (fps_val - min) / delta];
        }

        // add removal event
        ele.addEventListener('click', function () {
            raf_running = !raf_running;
            if (raf_running) {
                start();
            } else {
                cancelAnimationFrame(raf_request);
                if (options.remove_on_click) {
                    document.body.removeChild(ele);
                }
            }
        });

        // start
        function start() {
            t_pre = Date.now();
            h_arr = [];
            u_pre = t_pre;
            checkfps();
        }

        start();
    };

    // lots of negatives here because the assumption is we should start
    if (!global.fpscounter_options || global.fpscounter_options.auto_start !== false) {
        // global.fpscounter();
    }
})(window);

/*** EXPORTS FROM exports-loader ***/
module.exports = fpscounter;

/***/ }),
/* 41 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 42 */
/* unknown exports provided */
/* exports used: default */
/*!**************************************!*\
  !*** ./~/web-audio-daw/build/wad.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return (root['Wad'] = factory());
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Wad'] = factory();
  }
}(this, function () {

(function(window){

  var WORKER_PATH = 'recorderWorker.js';

  var Recorder = function(source, cfg){
    var config = cfg || {};
    var bufferLen = config.bufferLen || 4096;
    var numChannels = config.numChannels || 2;
    this.context = source.context;
    this.node = (this.context.createScriptProcessor ||
                 this.context.createJavaScriptNode).call(this.context,
                 bufferLen, numChannels, numChannels);
    var worker = new Worker(config.workerPath || WORKER_PATH);
    worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate,
        numChannels: numChannels
      }
    });
    var recording = false,
      currCallback;

    this.node.onaudioprocess = function(e){
      if (!recording) return;
      var buffer = [];
      for (var channel = 0; channel < numChannels; channel++){
          buffer.push(e.inputBuffer.getChannelData(channel));
      }
      worker.postMessage({
        command: 'record',
        buffer: buffer
      });
    }

    this.configure = function(cfg){
      for (var prop in cfg){
        if (cfg.hasOwnProperty(prop)){
          config[prop] = cfg[prop];
        }
      }
    }

    this.record = function(){
      recording = true;
    }

    this.stop = function(){
      recording = false;
    }

    this.clear = function(){
      worker.postMessage({ command: 'clear' });
    }

    this.getBuffer = function(cb) {
      currCallback = cb || config.callback;
      worker.postMessage({ command: 'getBuffer' })
    }

    this.exportWAV = function(cb, type){
      currCallback = cb || config.callback;
      type = type || config.type || 'audio/wav';
      if (!currCallback) throw new Error('Callback not set');
      worker.postMessage({
        command: 'exportWAV',
        type: type
      });
    }

    worker.onmessage = function(e){
      var blob = e.data;
      currCallback(blob);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination);    //this should not be necessary
  };

  Recorder.forceDownload = function(blob, filename){
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var link = window.document.createElement('a');
    link.href = url;
    link.download = filename || 'output.wav';
    var click = document.createEvent("Event");
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  }

  window.Recorder = Recorder;

})(window);;/*
    Copyright (c) 2012 DinahMoe AB & Oskar Eriksson

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
    modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function(window) {
    var userContext,
        userInstance,
        pipe = function(param, val) {
            param.value = val;
        },
        Super = Object.create(null, {
            activate: {
                writable: true,
                value: function(doActivate) {
                    if (doActivate) {
                        this.input.disconnect();
                        this.input.connect(this.activateNode);
                        if (this.activateCallback) {
                            this.activateCallback(doActivate);
                        }
                    } else {
                        this.input.disconnect();
                        this.input.connect(this.output);
                    }
                }
            },
            bypass: {
                get: function() {
                    return this._bypass;
                },
                set: function(value) {
                    if (this._lastBypassValue === value) {
                        return;
                    }
                    this._bypass = value;
                    this.activate(!value);
                    this._lastBypassValue = value;
                }
            },
            connect: {
                value: function(target) {
                    this.output.connect(target);
                }
            },
            disconnect: {
                value: function(target) {
                    this.output.disconnect(target);
                }
            },
            connectInOrder: {
                value: function(nodeArray) {
                    var i = nodeArray.length - 1;
                    while (i--) {
                        if (!nodeArray[i].connect) {
                            return console.error("AudioNode.connectInOrder: TypeError: Not an AudioNode.", nodeArray[i]);
                        }
                        if (nodeArray[i + 1].input) {
                            nodeArray[i].connect(nodeArray[i + 1].input);
                        } else {
                            nodeArray[i].connect(nodeArray[i + 1]);
                        }
                    }
                }
            },
            getDefaults: {
                value: function() {
                    var result = {};
                    for (var key in this.defaults) {
                        result[key] = this.defaults[key].value;
                    }
                    return result;
                }
            },
            automate: {
                value: function(property, value, duration, startTime) {
                    var start = startTime ? ~~(startTime / 1000) : userContext.currentTime,
                        dur = duration ? ~~(duration / 1000) : 0,
                        _is = this.defaults[property],
                        param = this[property],
                        method;

                    if (param) {
                        if (_is.automatable) {
                            if (!duration) {
                                method = "setValueAtTime";
                            } else {
                                method = "linearRampToValueAtTime";
                                param.cancelScheduledValues(start);
                                param.setValueAtTime(param.value, start);
                            }
                            param[method](value, dur + start);
                        } else {
                            param = value;
                        }
                    } else {
                        console.error("Invalid Property for " + this.name);
                    }
                }
            }
        }),
        FLOAT = "float",
        BOOLEAN = "boolean",
        STRING = "string",
        INT = "int";

    if (typeof module !== "undefined" && module.exports) {
        module.exports = Tuna;
    } else if (true) {
        window.define("Tuna", definition);
    } else {
        window.Tuna = Tuna;
    }

    function definition() {
        return Tuna;
    }

    function Tuna(context) {
        if (!(this instanceof Tuna)) {
            return new Tuna(context);
        }
        if (!window.AudioContext) {
            window.AudioContext = window.webkitAudioContext;
        }
        if (!context) {
            console.log("tuna.js: Missing audio context! Creating a new context for you.");
            context = window.AudioContext && (new window.AudioContext());
        }
        if (!context) {
            throw new Error("Tuna cannot initialize because this environment does not support web audio.");
        }
        connectify(context);
        userContext = context;
        userInstance = this;
    }

    function connectify(context) {
        if (context.__connectified__ === true) return;

        var gain = context.createGain(),
            proto = Object.getPrototypeOf(Object.getPrototypeOf(gain)),
            oconnect = proto.connect;

        proto.connect = shimConnect;
        context.__connectified__ = true; // Prevent overriding connect more than once

        function shimConnect() {
            var node = Array.prototype.shift.apply(arguments);
            node = Super.isPrototypeOf ? (Super.isPrototypeOf(node) ? node.input : node) : (node.input || node);
            arguments = Array.prototype.slice.call(arguments);
            arguments.unshift(node);
            oconnect.apply(this, arguments);
            return node;
        }
    }

    function dbToWAVolume(db) {
        return Math.max(0, Math.round(100 * Math.pow(2, db / 6)) / 100);
    }

    function fmod(x, y) {
        // http://kevin.vanzonneveld.net
        // *     example 1: fmod(5.7, 1.3);
        // *     returns 1: 0.5
        var tmp, tmp2, p = 0,
            pY = 0,
            l = 0.0,
            l2 = 0.0;

        tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
        p = parseInt(tmp[2], 10) - (tmp[1] + "").length;
        tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
        pY = parseInt(tmp[2], 10) - (tmp[1] + "").length;

        if (pY > p) {
            p = pY;
        }

        tmp2 = (x % y);

        if (p < -100 || p > 20) {
            // toFixed will give an out of bound error so we fix it like this:
            l = Math.round(Math.log(tmp2) / Math.log(10));
            l2 = Math.pow(10, l);

            return (tmp2 / l2).toFixed(l - p) * l2;
        } else {
            return parseFloat(tmp2.toFixed(-p));
        }
    }

    function sign(x) {
        if (x === 0) {
            return 1;
        } else {
            return Math.abs(x) / x;
        }
    }

    function tanh(n) {
        return (Math.exp(n) - Math.exp(-n)) / (Math.exp(n) + Math.exp(-n));
    }

    function initValue(userVal, defaultVal) {
        return userVal === undefined ? defaultVal : userVal;
    }

    Tuna.prototype.Bitcrusher = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.bufferSize = properties.bufferSize || this.defaults.bufferSize.value;

        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.processor = userContext.createScriptProcessor(this.bufferSize, 1, 1);
        this.output = userContext.createGain();

        this.activateNode.connect(this.processor);
        this.processor.connect(this.output);

        var phaser = 0,
            last = 0,
            input, output, step, i, length;
        this.processor.onaudioprocess = function(e) {
            input = e.inputBuffer.getChannelData(0),
            output = e.outputBuffer.getChannelData(0),
            step = Math.pow(1 / 2, this.bits);
            length = input.length;
            for (i = 0; i < length; i++) {
                phaser += this.normfreq;
                if (phaser >= 1.0) {
                    phaser -= 1.0;
                    last = step * Math.floor(input[i] / step + 0.5);
                }
                output[i] = last;
            }
        };

        this.bits = properties.bits || this.defaults.bits.value;
        this.normfreq = initValue(properties.normfreq, this.defaults.normfreq.value);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Bitcrusher.prototype = Object.create(Super, {
        name: {
            value: "Bitcrusher"
        },
        defaults: {
            writable: true,
            value: {
                bits: {
                    value: 4,
                    min: 1,
                    max: 16,
                    automatable: false,
                    type: INT
                },
                bufferSize: {
                    value: 4096,
                    min: 256,
                    max: 16384,
                    automatable: false,
                    type: INT
                },
                bypass: {
                    value: false,
                    automatable: false,
                    type: BOOLEAN
                },
                normfreq: {
                    value: 0.1,
                    min: 0.0001,
                    max: 1.0,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        bits: {
            enumerable: true,
            get: function() {
                return this.processor.bits;
            },
            set: function(value) {
                this.processor.bits = value;
            }
        },
        normfreq: {
            enumerable: true,
            get: function() {
                return this.processor.normfreq;
            },
            set: function(value) {
                this.processor.normfreq = value;
            }
        }
    });

    Tuna.prototype.Cabinet = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.convolver = this.newConvolver(properties.impulsePath ||
            "../impulses/impulse_guitar.wav");
        this.makeupNode = userContext.createGain();
        this.output = userContext.createGain();

        this.activateNode.connect(this.convolver.input);
        this.convolver.output.connect(this.makeupNode);
        this.makeupNode.connect(this.output);

        this.makeupGain = initValue(properties.makeupGain, this.defaults
            .makeupGain);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Cabinet.prototype = Object.create(Super, {
        name: {
            value: "Cabinet"
        },
        defaults: {
            writable: true,
            value: {
                makeupGain: {
                    value: 1,
                    min: 0,
                    max: 20,
                    automatable: true,
                    type: FLOAT
                },
                bypass: {
                    value: false,
                    automatable: false,
                    type: BOOLEAN
                }
            }
        },
        makeupGain: {
            enumerable: true,
            get: function() {
                return this.makeupNode.gain;
            },
            set: function(value) {
                this.makeupNode.gain.value = value;
            }
        },
        newConvolver: {
            value: function(impulsePath) {
                return new userInstance.Convolver({
                    impulse: impulsePath,
                    dryLevel: 0,
                    wetLevel: 1
                });
            }
        }
    });

    Tuna.prototype.Chorus = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.attenuator = this.activateNode = userContext.createGain();
        this.splitter = userContext.createChannelSplitter(2);
        this.delayL = userContext.createDelay();
        this.delayR = userContext.createDelay();
        this.feedbackGainNodeLR = userContext.createGain();
        this.feedbackGainNodeRL = userContext.createGain();
        this.merger = userContext.createChannelMerger(2);
        this.output = userContext.createGain();

        this.lfoL = new userInstance.LFO({
            target: this.delayL.delayTime,
            callback: pipe
        });
        this.lfoR = new userInstance.LFO({
            target: this.delayR.delayTime,
            callback: pipe
        });

        this.input.connect(this.attenuator);
        this.attenuator.connect(this.output);
        this.attenuator.connect(this.splitter);
        this.splitter.connect(this.delayL, 0);
        this.splitter.connect(this.delayR, 1);
        this.delayL.connect(this.feedbackGainNodeLR);
        this.delayR.connect(this.feedbackGainNodeRL);
        this.feedbackGainNodeLR.connect(this.delayR);
        this.feedbackGainNodeRL.connect(this.delayL);
        this.delayL.connect(this.merger, 0, 0);
        this.delayR.connect(this.merger, 0, 1);
        this.merger.connect(this.output);

        this.feedback = initValue(properties.feedback, this.defaults.feedback
            .value);
        this.rate = initValue(properties.rate, this.defaults.rate.value);
        this.delay = initValue(properties.delay, this.defaults.delay.value);
        this.depth = initValue(properties.depth, this.defaults.depth.value);
        this.lfoR.phase = Math.PI / 2;
        this.attenuator.gain.value = 0.6934; // 1 / (10 ^ (((20 * log10(3)) / 3) / 20))
        this.lfoL.activate(true);
        this.lfoR.activate(true);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Chorus.prototype = Object.create(Super, {
        name: {
            value: "Chorus"
        },
        defaults: {
            writable: true,
            value: {
                feedback: {
                    value: 0.4,
                    min: 0,
                    max: 0.95,
                    automatable: false,
                    type: FLOAT
                },
                delay: {
                    value: 0.0045,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                depth: {
                    value: 0.7,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                rate: {
                    value: 1.5,
                    min: 0,
                    max: 8,
                    automatable: false,
                    type: FLOAT
                },
                bypass: {
                    value: false,
                    automatable: false,
                    type: BOOLEAN
                }
            }
        },
        delay: {
            enumerable: true,
            get: function() {
                return this._delay;
            },
            set: function(value) {
                this._delay = 0.0002 * (Math.pow(10, value) * 2);
                this.lfoL.offset = this._delay;
                this.lfoR.offset = this._delay;
                this._depth = this._depth;
            }
        },
        depth: {
            enumerable: true,
            get: function() {
                return this._depth;
            },
            set: function(value) {
                this._depth = value;
                this.lfoL.oscillation = this._depth * this._delay;
                this.lfoR.oscillation = this._depth * this._delay;
            }
        },
        feedback: {
            enumerable: true,
            get: function() {
                return this._feedback;
            },
            set: function(value) {
                this._feedback = value;
                this.feedbackGainNodeLR.gain.value = this._feedback;
                this.feedbackGainNodeRL.gain.value = this._feedback;
            }
        },
        rate: {
            enumerable: true,
            get: function() {
                return this._rate;
            },
            set: function(value) {
                this._rate = value;
                this.lfoL.frequency = this._rate;
                this.lfoR.frequency = this._rate;
            }
        }
    });

    Tuna.prototype.Compressor = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.compNode = this.activateNode = userContext.createDynamicsCompressor();
        this.makeupNode = userContext.createGain();
        this.output = userContext.createGain();

        this.compNode.connect(this.makeupNode);
        this.makeupNode.connect(this.output);

        this.automakeup = initValue(properties.automakeup, this.defaults
            .automakeup
            .value);
        this.makeupGain = properties.makeupGain || this.defaults.makeupGain
            .value;
        this.threshold = initValue(properties.threshold, this.defaults.threshold
            .value);
        this.release = properties.release || this.defaults.release.value;
        this.attack = initValue(properties.attack, this.defaults.attack
            .value);
        this.ratio = properties.ratio || this.defaults.ratio.value;
        this.knee = initValue(properties.knee, this.defaults.knee.value);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Compressor.prototype = Object.create(Super, {
        name: {
            value: "Compressor"
        },
        defaults: {
            writable: true,
            value: {
                threshold: {
                    value: -20,
                    min: -60,
                    max: 0,
                    automatable: true,
                    type: FLOAT
                },
                release: {
                    value: 250,
                    min: 10,
                    max: 2000,
                    automatable: true,
                    type: FLOAT
                },
                makeupGain: {
                    value: 1,
                    min: 1,
                    max: 100,
                    automatable: true,
                    type: FLOAT
                },
                attack: {
                    value: 1,
                    min: 0,
                    max: 1000,
                    automatable: true,
                    type: FLOAT
                },
                ratio: {
                    value: 4,
                    min: 1,
                    max: 50,
                    automatable: true,
                    type: FLOAT
                },
                knee: {
                    value: 5,
                    min: 0,
                    max: 40,
                    automatable: true,
                    type: FLOAT
                },
                automakeup: {
                    value: false,
                    automatable: false,
                    type: BOOLEAN
                },
                bypass: {
                    value: false,
                    automatable: false,
                    type: BOOLEAN
                }
            }
        },
        computeMakeup: {
            value: function() {
                var magicCoefficient = 4,
                    // raise me if the output is too hot
                    c = this.compNode;
                return -(c.threshold.value - c.threshold.value /
                        c.ratio.value) /
                    magicCoefficient;
            }
        },
        automakeup: {
            enumerable: true,
            get: function() {
                return this._automakeup;
            },
            set: function(value) {
                this._automakeup = value;
                if (this._automakeup) this.makeupGain = this.computeMakeup();
            }
        },
        threshold: {
            enumerable: true,
            get: function() {
                return this.compNode.threshold;
            },
            set: function(value) {
                this.compNode.threshold.value = value;
                if (this._automakeup) this.makeupGain = this.computeMakeup();
            }
        },
        ratio: {
            enumerable: true,
            get: function() {
                return this.compNode.ratio;
            },
            set: function(value) {
                this.compNode.ratio.value = value;
                if (this._automakeup) this.makeupGain = this.computeMakeup();
            }
        },
        knee: {
            enumerable: true,
            get: function() {
                return this.compNode.knee;
            },
            set: function(value) {
                this.compNode.knee.value = value;
                if (this._automakeup) this.makeupGain = this.computeMakeup();
            }
        },
        attack: {
            enumerable: true,
            get: function() {
                return this.compNode.attack;
            },
            set: function(value) {
                this.compNode.attack.value = value / 1000;
            }
        },
        release: {
            enumerable: true,
            get: function() {
                return this.compNode.release;
            },
            set: function(value) {
                this.compNode.release = value / 1000;
            }
        },
        makeupGain: {
            enumerable: true,
            get: function() {
                return this.makeupNode.gain;
            },
            set: function(value) {
                this.makeupNode.gain.value = dbToWAVolume(value);
            }
        }
    });

    Tuna.prototype.Convolver = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.convolver = userContext.createConvolver();
        this.dry = userContext.createGain();
        this.filterLow = userContext.createBiquadFilter();
        this.filterHigh = userContext.createBiquadFilter();
        this.wet = userContext.createGain();
        this.output = userContext.createGain();

        this.activateNode.connect(this.filterLow);
        this.activateNode.connect(this.dry);
        this.filterLow.connect(this.filterHigh);
        this.filterHigh.connect(this.convolver);
        this.convolver.connect(this.wet);
        this.wet.connect(this.output);
        this.dry.connect(this.output);

        this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel
            .value);
        this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel
            .value);
        this.highCut = properties.highCut || this.defaults.highCut.value;
        this.buffer = properties.impulse ||
            "../impulses/ir_rev_short.wav";
        this.lowCut = properties.lowCut || this.defaults.lowCut.value;
        this.level = initValue(properties.level, this.defaults.level.value);
        this.filterHigh.type = "lowpass";
        this.filterLow.type = "highpass";
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Convolver.prototype = Object.create(Super, {
        name: {
            value: "Convolver"
        },
        defaults: {
            writable: true,
            value: {
                highCut: {
                    value: 22050,
                    min: 20,
                    max: 22050,
                    automatable: true,
                    type: FLOAT
                },
                lowCut: {
                    value: 20,
                    min: 20,
                    max: 22050,
                    automatable: true,
                    type: FLOAT
                },
                dryLevel: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT
                },
                wetLevel: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT
                },
                level: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT
                }
            }
        },
        lowCut: {
            get: function() {
                return this.filterLow.frequency;
            },
            set: function(value) {
                this.filterLow.frequency.value = value;
            }
        },
        highCut: {
            get: function() {
                return this.filterHigh.frequency;
            },
            set: function(value) {
                this.filterHigh.frequency.value = value;
            }
        },
        level: {
            get: function() {
                return this.output.gain;
            },
            set: function(value) {
                this.output.gain.value = value;
            }
        },
        dryLevel: {
            get: function() {
                return this.dry.gain
            },
            set: function(value) {
                this.dry.gain.value = value;
            }
        },
        wetLevel: {
            get: function() {
                return this.wet.gain;
            },
            set: function(value) {
                this.wet.gain.value = value;
            }
        },
        buffer: {
            enumerable: false,
            get: function() {
                return this.convolver.buffer;
            },
            set: function(impulse) {
                var convolver = this.convolver,
                    xhr = new XMLHttpRequest();
                if (!impulse) {
                    console.log("Tuna.Convolver.setBuffer: Missing impulse path!");
                    return;
                }
                xhr.open("GET", impulse, true);
                xhr.responseType = "arraybuffer";
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status < 300 && xhr.status > 199 || xhr.status === 302) {
                            userContext.decodeAudioData(xhr.response, function(buffer) {
                                convolver.buffer = buffer;
                            }, function(e) {
                                if (e) console.log("Tuna.Convolver.setBuffer: Error decoding data" + e);
                            });
                        }
                    }
                };
                xhr.send(null);
            }
        }
    });

    Tuna.prototype.Delay = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.dry = userContext.createGain();
        this.wet = userContext.createGain();
        this.filter = userContext.createBiquadFilter();
        this.delay = userContext.createDelay();
        this.feedbackNode = userContext.createGain();
        this.output = userContext.createGain();

        this.activateNode.connect(this.delay);
        this.activateNode.connect(this.dry);
        this.delay.connect(this.filter);
        this.filter.connect(this.feedbackNode);
        this.feedbackNode.connect(this.delay);
        this.feedbackNode.connect(this.wet);
        this.wet.connect(this.output);
        this.dry.connect(this.output);

        this.delayTime = properties.delayTime || this.defaults.delayTime.value;
        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
        this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel.value);
        this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel.value);
        this.cutoff = properties.cutoff || this.defaults.cutoff.value;
        this.filter.type = "lowpass";
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Delay.prototype = Object.create(Super, {
        name: {
            value: "Delay"
        },
        defaults: {
            writable: true,
            value: {
                delayTime: {
                    value: 100,
                    min: 20,
                    max: 1000,
                    automatable: false,
                    type: FLOAT
                },
                feedback: {
                    value: 0.45,
                    min: 0,
                    max: 0.9,
                    automatable: true,
                    type: FLOAT
                },
                cutoff: {
                    value: 20000,
                    min: 20,
                    max: 20000,
                    automatable: true,
                    type: FLOAT
                },
                wetLevel: {
                    value: 0.5,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT
                },
                dryLevel: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT
                }
            }
        },
        delayTime: {
            enumerable: true,
            get: function() {
                return this.delay.delayTime;
            },
            set: function(value) {
                this.delay.delayTime.value = value / 1000;
            }
        },
        wetLevel: {
            enumerable: true,
            get: function() {
                return this.wet.gain;
            },
            set: function(value) {
                this.wet.gain.value = value;
            }
        },
        dryLevel: {
            enumerable: true,
            get: function() {
                return this.dry.gain;
            },
            set: function(value) {
                this.dry.gain.value = value;
            }
        },
        feedback: {
            enumerable: true,
            get: function() {
                return this.feedbackNode.gain;
            },
            set: function(value) {
                this.feedbackNode.gain.value = value;
            }
        },
        cutoff: {
            enumerable: true,
            get: function() {
                return this.filter.frequency;
            },
            set: function(value) {
                this.filter.frequency.value = value;
            }
        }
    });

    Tuna.prototype.Filter = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.filter = userContext.createBiquadFilter();
        this.output = userContext.createGain();

        this.activateNode.connect(this.filter);
        this.filter.connect(this.output);

        this.frequency = properties.frequency || this.defaults.frequency
            .value;
        this.Q = properties.resonance || this.defaults.Q.value;
        this.filterType = initValue(properties.filterType, this.defaults
            .filterType
            .value);
        this.gain = initValue(properties.gain, this.defaults.gain.value);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Filter.prototype = Object.create(Super, {
        name: {
            value: "Filter"
        },
        defaults: {
            writable: true,
            value: {
                frequency: {
                    value: 800,
                    min: 20,
                    max: 22050,
                    automatable: true,
                    type: FLOAT
                },
                Q: {
                    value: 1,
                    min: 0.001,
                    max: 100,
                    automatable: true,
                    type: FLOAT
                },
                gain: {
                    value: 0,
                    min: -40,
                    max: 40,
                    automatable: true,
                    type: FLOAT
                },
                bypass: {
                    value: false,
                    automatable: false,
                    type: BOOLEAN
                },
                filterType: {
                    value: "lowpass",
                    automatable: false,
                    type: STRING
                }
            }
        },
        filterType: {
            enumerable: true,
            get: function() {
                return this.filter.type;
            },
            set: function(value) {
                this.filter.type = value;
            }
        },
        Q: {
            enumerable: true,
            get: function() {
                return this.filter.Q;
            },
            set: function(value) {
                this.filter.Q.value = value;
            }
        },
        gain: {
            enumerable: true,
            get: function() {
                return this.filter.gain;
            },
            set: function(value) {
                this.filter.gain.value = value;
            }
        },
        frequency: {
            enumerable: true,
            get: function() {
                return this.filter.frequency;
            },
            set: function(value) {
                this.filter.frequency.value = value;
            }
        }
    });

    Tuna.prototype.MoogFilter = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.bufferSize = properties.bufferSize || this.defaults.bufferSize
            .value;

        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.processor = userContext.createScriptProcessor(this.bufferSize,
            1,
            1);
        this.output = userContext.createGain();

        this.activateNode.connect(this.processor);
        this.processor.connect(this.output);

        var in1, in2, in3, in4, out1, out2, out3, out4;
        in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;
        var input, output, f, fb, i, length;
        this.processor.onaudioprocess = function(e) {
            input = e.inputBuffer.getChannelData(0),
                output = e.outputBuffer.getChannelData(0),
                f = this.cutoff * 1.16,
                inputFactor = 0.35013 * (f * f) * (f * f);
            fb = this.resonance * (1.0 - 0.15 * f * f);
            length = input.length;
            for (i = 0; i < length; i++) {
                input[i] -= out4 * fb;
                input[i] *= inputFactor;
                out1 = input[i] + 0.3 * in1 + (1 - f) * out1; // Pole 1
                in1 = input[i];
                out2 = out1 + 0.3 * in2 + (1 - f) * out2; // Pole 2
                in2 = out1;
                out3 = out2 + 0.3 * in3 + (1 - f) * out3; // Pole 3
                in3 = out2;
                out4 = out3 + 0.3 * in4 + (1 - f) * out4; // Pole 4
                in4 = out3;
                output[i] = out4;
            }
        };

        this.cutoff = initValue(properties.cutoff, this.defaults.cutoff
            .value);
        this.resonance = initValue(properties.resonance, this.defaults.resonance
            .value);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.MoogFilter.prototype = Object.create(Super, {
        name: {
            value: "MoogFilter"
        },
        defaults: {
            writable: true,
            value: {
                bufferSize: {
                    value: 4096,
                    min: 256,
                    max: 16384,
                    automatable: false,
                    type: INT
                },
                bypass: {
                    value: false,
                    automatable: false,
                    type: BOOLEAN
                },
                cutoff: {
                    value: 0.065,
                    min: 0.0001,
                    max: 1.0,
                    automatable: false,
                    type: FLOAT
                },
                resonance: {
                    value: 3.5,
                    min: 0.0,
                    max: 4.0,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        cutoff: {
            enumerable: true,
            get: function() {
                return this.processor.cutoff;
            },
            set: function(value) {
                this.processor.cutoff = value;
            }
        },
        resonance: {
            enumerable: true,
            get: function() {
                return this.processor.resonance;
            },
            set: function(value) {
                this.processor.resonance = value;
            }
        }
    });

    Tuna.prototype.Overdrive = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.inputDrive = userContext.createGain();
        this.waveshaper = userContext.createWaveShaper();
        this.outputDrive = userContext.createGain();
        this.output = userContext.createGain();

        this.activateNode.connect(this.inputDrive);
        this.inputDrive.connect(this.waveshaper);
        this.waveshaper.connect(this.outputDrive);
        this.outputDrive.connect(this.output);

        this.ws_table = new Float32Array(this.k_nSamples);
        this.drive = initValue(properties.drive, this.defaults.drive.value);
        this.outputGain = initValue(properties.outputGain, this.defaults
            .outputGain
            .value);
        this.curveAmount = initValue(properties.curveAmount, this.defaults
            .curveAmount
            .value);
        this.algorithmIndex = initValue(properties.algorithmIndex, this
            .defaults
            .algorithmIndex.value);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Overdrive.prototype = Object.create(Super, {
        name: {
            value: "Overdrive"
        },
        defaults: {
            writable: true,
            value: {
                drive: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT,
                    scaled: true
                },
                outputGain: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT,
                    scaled: true
                },
                curveAmount: {
                    value: 0.725,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                algorithmIndex: {
                    value: 0,
                    min: 0,
                    max: 5,
                    automatable: false,
                    type: INT
                }
            }
        },
        k_nSamples: {
            value: 8192
        },
        drive: {
            get: function() {
                return this.inputDrive.gain;
            },
            set: function(value) {
                this._drive = value;
            }
        },
        curveAmount: {
            get: function() {
                return this._curveAmount;
            },
            set: function(value) {
                this._curveAmount = value;
                if (this._algorithmIndex === undefined) {
                    this._algorithmIndex = 0;
                }
                this.waveshaperAlgorithms[this._algorithmIndex]
                    (this._curveAmount,
                        this.k_nSamples, this.ws_table);
                this.waveshaper.curve = this.ws_table;
            }
        },
        outputGain: {
            get: function() {
                return this.outputDrive.gain;
            },
            set: function(value) {
                this._outputGain = dbToWAVolume(value);
            }
        },
        algorithmIndex: {
            get: function() {
                return this._algorithmIndex;
            },
            set: function(value) {
                this._algorithmIndex = value;
                this.curveAmount = this._curveAmount;
            }
        },
        waveshaperAlgorithms: {
            value: [
                function(amount, n_samples, ws_table) {
                    amount = Math.min(amount, 0.9999);
                    var k = 2 * amount / (1 - amount),
                        i, x;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        ws_table[i] = (1 + k) * x / (1 + k * Math.abs(x));
                    }
                },
                function(amount, n_samples, ws_table) {
                    var i, x, y;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        y = ((0.5 * Math.pow((x + 1.4), 2)) - 1) * y >= 0 ? 5.8 : 1.2;
                        ws_table[i] = tanh(y);
                    }
                },
                function(amount, n_samples, ws_table) {
                    var i, x, y, a = 1 - amount;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        y = x < 0 ? -Math.pow(Math.abs(x), a + 0.04) : Math.pow(x, a);
                        ws_table[i] = tanh(y * 2);
                    }
                },
                function(amount, n_samples, ws_table) {
                    var i, x, y, abx, a = 1 - amount > 0.99 ? 0.99 : 1 - amount;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        abx = Math.abs(x);
                        if (abx < a) y = abx;
                        else if (abx > a) y = a + (abx - a) / (1 + Math.pow((abx - a) / (1 - a), 2));
                        else if (abx > 1) y = abx;
                        ws_table[i] = sign(x) * y * (1 / ((a + 1) / 2));
                    }
                },
                function(amount, n_samples, ws_table) { // fixed curve, amount doesn't do anything, the distortion is just from the drive
                    var i, x;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        if (x < -0.08905) {
                            ws_table[i] = (-3 / 4) * (1 - (Math.pow((1 - (Math.abs(x) - 0.032857)), 12)) + (1 / 3) * (Math.abs(x) -
                                0.032847)) + 0.01;
                        } else if (x >= -0.08905 && x < 0.320018) {
                            ws_table[i] = (-6.153 * (x * x)) + 3.9375 * x;
                        } else {
                            ws_table[i] = 0.630035;
                        }
                    }
                },
                function(amount, n_samples, ws_table) {
                    var a = 2 + Math.round(amount * 14),
                        // we go from 2 to 16 bits, keep in mind for the UI
                        bits = Math.round(Math.pow(2, a - 1)),
                        // real number of quantization steps divided by 2
                        i, x;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        ws_table[i] = Math.round(x * bits) / bits;
                    }
                }
            ]
        }
    });

    Tuna.prototype.Phaser = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.splitter = this.activateNode = userContext.createChannelSplitter(2);
        this.filtersL = [];
        this.filtersR = [];
        this.feedbackGainNodeL = userContext.createGain();
        this.feedbackGainNodeR = userContext.createGain();
        this.merger = userContext.createChannelMerger(2);
        this.filteredSignal = userContext.createGain();
        this.output = userContext.createGain();
        this.lfoL = new userInstance.LFO({
            target: this.filtersL,
            callback: this.callback
        });
        this.lfoR = new userInstance.LFO({
            target: this.filtersR,
            callback: this.callback
        });

        var i = this.stage;
        while (i--) {
            this.filtersL[i] = userContext.createBiquadFilter();
            this.filtersR[i] = userContext.createBiquadFilter();
            this.filtersL[i].type = "allpass";
            this.filtersR[i].type = "allpass";
        }
        this.input.connect(this.splitter);
        this.input.connect(this.output);
        this.splitter.connect(this.filtersL[0], 0, 0);
        this.splitter.connect(this.filtersR[0], 1, 0);
        this.connectInOrder(this.filtersL);
        this.connectInOrder(this.filtersR);
        this.filtersL[this.stage - 1].connect(this.feedbackGainNodeL);
        this.filtersL[this.stage - 1].connect(this.merger, 0, 0);
        this.filtersR[this.stage - 1].connect(this.feedbackGainNodeR);
        this.filtersR[this.stage - 1].connect(this.merger, 0, 1);
        this.feedbackGainNodeL.connect(this.filtersL[0]);
        this.feedbackGainNodeR.connect(this.filtersR[0]);
        this.merger.connect(this.output);

        this.rate = initValue(properties.rate, this.defaults.rate.value);
        this.baseModulationFrequency = properties.baseModulationFrequency || this.defaults.baseModulationFrequency.value;
        this.depth = initValue(properties.depth, this.defaults.depth.value);
        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
        this.stereoPhase = initValue(properties.stereoPhase, this.defaults.stereoPhase.value);

        this.lfoL.activate(true);
        this.lfoR.activate(true);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Phaser.prototype = Object.create(Super, {
        name: {
            value: "Phaser"
        },
        stage: {
            value: 4
        },
        defaults: {
            writable: true,
            value: {
                rate: {
                    value: 0.1,
                    min: 0,
                    max: 8,
                    automatable: false,
                    type: FLOAT
                },
                depth: {
                    value: 0.6,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                feedback: {
                    value: 0.7,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                stereoPhase: {
                    value: 40,
                    min: 0,
                    max: 180,
                    automatable: false,
                    type: FLOAT
                },
                baseModulationFrequency: {
                    value: 700,
                    min: 500,
                    max: 1500,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        callback: {
            value: function(filters, value) {
                for (var stage = 0; stage < 4; stage++) {
                    filters[stage].frequency.value = value;
                }
            }
        },
        depth: {
            get: function() {
                return this._depth;
            },
            set: function(value) {
                this._depth = value;
                this.lfoL.oscillation = this._baseModulationFrequency * this._depth;
                this.lfoR.oscillation = this._baseModulationFrequency * this._depth;
            }
        },
        rate: {
            get: function() {
                return this._rate;
            },
            set: function(value) {
                this._rate = value;
                this.lfoL.frequency = this._rate;
                this.lfoR.frequency = this._rate;
            }
        },
        baseModulationFrequency: {
            enumerable: true,
            get: function() {
                return this._baseModulationFrequency;
            },
            set: function(value) {
                this._baseModulationFrequency = value;
                this.lfoL.offset = this._baseModulationFrequency;
                this.lfoR.offset = this._baseModulationFrequency;
                this._depth = this._depth;
            }
        },
        feedback: {
            get: function() {
                return this._feedback;
            },
            set: function(value) {
                this._feedback = value;
                this.feedbackGainNodeL.gain.value = this._feedback;
                this.feedbackGainNodeR.gain.value = this._feedback;
            }
        },
        stereoPhase: {
            get: function() {
                return this._stereoPhase;
            },
            set: function(value) {
                this._stereoPhase = value;
                var newPhase = this.lfoL._phase + this._stereoPhase *
                    Math.PI /
                    180;
                newPhase = fmod(newPhase, 2 * Math.PI);
                this.lfoR._phase = newPhase;
            }
        }
    });

    Tuna.prototype.PingPongDelay = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.wetLevel = userContext.createGain();
        this.stereoToMonoMix = userContext.createGain();
        this.feedbackLevel = userContext.createGain();
        this.output = userContext.createGain();
        this.delayLeft = userContext.createDelay();
        this.delayRight = userContext.createDelay();

        this.activateNode = userContext.createGain();
        this.splitter = userContext.createChannelSplitter(2);
        this.merger = userContext.createChannelMerger(2);

        this.activateNode.connect(this.splitter);
        this.splitter.connect(this.stereoToMonoMix, 0, 0);
        this.splitter.connect(this.stereoToMonoMix, 1, 0);
        this.stereoToMonoMix.gain.value = .5;
        this.stereoToMonoMix.connect(this.wetLevel);
        this.wetLevel.connect(this.delayLeft);
        this.feedbackLevel.connect(this.delayLeft);
        this.delayLeft.connect(this.delayRight);
        this.delayRight.connect(this.feedbackLevel);
        this.delayLeft.connect(this.merger, 0, 0);
        this.delayRight.connect(this.merger, 0, 1);
        this.merger.connect(this.output);
        this.activateNode.connect(this.output);

        this.delayTimeLeft = properties.delayTimeLeft !== undefined ? properties.delayTimeLeft : this.defaults.delayTimeLeft.value;
        this.delayTimeRight = properties.delayTimeRight !== undefined ? properties.delayTimeRight : this.defaults.delayTimeRight.value;
        this.feedbackLevel.gain.value = properties.feedback !== undefined ? properties.feedback : this.defaults.feedback.value;
        this.wetLevel.gain.value = properties.wetLevel !== undefined ? properties.wetLevel : this.defaults.wetLevel.value;
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.PingPongDelay.prototype = Object.create(Super, {
        name: {
            value: "PingPongDelay"
        },
        delayTimeLeft: {
            enumerable: true,
            get: function() {
                return this._delayTimeLeft;
            },
            set: function(value) {
                this._delayTimeLeft = value;
                this.delayLeft.delayTime.value = value / 1000;
            }
        },
        delayTimeRight: {
            enumerable: true,
            get: function() {
                return this._delayTimeRight;
            },
            set: function(value) {
                this._delayTimeRight = value;
                this.delayRight.delayTime.value = value / 1000;
            }
        },
        defaults: {
            writable: true,
            value: {
                delayTimeLeft: {
                    value: 200,
                    min: 1,
                    max: 10000,
                    automatable: false,
                    type: INT
                },
                delayTimeRight: {
                    value: 400,
                    min: 1,
                    max: 10000,
                    automatable: false,
                    type: INT
                },
                feedback: {
                    value: 0.3,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                wetLevel: {
                    value: 0.5,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                }
            }
        }
    });

    Tuna.prototype.Tremolo = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.splitter = this.activateNode = userContext.createChannelSplitter(
                2),
            this.amplitudeL = userContext.createGain(), this.amplitudeR =
            userContext.createGain(), this.merger = userContext.createChannelMerger(
                2), this.output = userContext.createGain();
        this.lfoL = new userInstance.LFO({
            target: this.amplitudeL.gain,
            callback: pipe
        });
        this.lfoR = new userInstance.LFO({
            target: this.amplitudeR.gain,
            callback: pipe
        });

        this.input.connect(this.splitter);
        this.splitter.connect(this.amplitudeL, 0);
        this.splitter.connect(this.amplitudeR, 1);
        this.amplitudeL.connect(this.merger, 0, 0);
        this.amplitudeR.connect(this.merger, 0, 1);
        this.merger.connect(this.output);

        this.rate = properties.rate || this.defaults.rate.value;
        this.intensity = initValue(properties.intensity, this.defaults.intensity
            .value);
        this.stereoPhase = initValue(properties.stereoPhase, this.defaults
            .stereoPhase
            .value);

        this.lfoL.offset = 1 - (this.intensity / 2);
        this.lfoR.offset = 1 - (this.intensity / 2);
        this.lfoL.phase = this.stereoPhase * Math.PI / 180;

        this.lfoL.activate(true);
        this.lfoR.activate(true);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Tremolo.prototype = Object.create(Super, {
        name: {
            value: "Tremolo"
        },
        defaults: {
            writable: true,
            value: {
                intensity: {
                    value: 0.3,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                stereoPhase: {
                    value: 0,
                    min: 0,
                    max: 180,
                    automatable: false,
                    type: FLOAT
                },
                rate: {
                    value: 5,
                    min: 0.1,
                    max: 11,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        intensity: {
            enumerable: true,
            get: function() {
                return this._intensity;
            },
            set: function(value) {
                this._intensity = value;
                this.lfoL.offset = 1 - this._intensity / 2;
                this.lfoR.offset = 1 - this._intensity / 2;
                this.lfoL.oscillation = this._intensity;
                this.lfoR.oscillation = this._intensity;
            }
        },
        rate: {
            enumerable: true,
            get: function() {
                return this._rate;
            },
            set: function(value) {
                this._rate = value;
                this.lfoL.frequency = this._rate;
                this.lfoR.frequency = this._rate;
            }
        },
        stereoPhase: {
            enumerable: true,
            get: function() {
                return this._rate;
            },
            set: function(value) {
                this._stereoPhase = value;
                var newPhase = this.lfoL._phase + this._stereoPhase *
                    Math.PI /
                    180;
                newPhase = fmod(newPhase, 2 * Math.PI);
                this.lfoR.phase = newPhase;
            }
        }
    });

    Tuna.prototype.WahWah = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.envelopeFollower = new userInstance.EnvelopeFollower({
            target: this,
            callback: function(context, value) {
                context.sweep = value;
            }
        });
        this.filterBp = userContext.createBiquadFilter();
        this.filterPeaking = userContext.createBiquadFilter();
        this.output = userContext.createGain();

        //Connect AudioNodes
        this.activateNode.connect(this.filterBp);
        this.filterBp.connect(this.filterPeaking);
        this.filterPeaking.connect(this.output);

        //Set Properties
        this.init();
        this.automode = initValue(properties.enableAutoMode, this.defaults
            .automode
            .value);
        this.resonance = properties.resonance || this.defaults.resonance
            .value;
        this.sensitivity = initValue(properties.sensitivity, this.defaults
            .sensitivity
            .value);
        this.baseFrequency = initValue(properties.baseFrequency, this.defaults
            .baseFrequency
            .value);
        this.excursionOctaves = properties.excursionOctaves || this.defaults
            .excursionOctaves
            .value;
        this.sweep = initValue(properties.sweep, this.defaults.sweep.value);

        this.activateNode.gain.value = 2;
        this.envelopeFollower.activate(true);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.WahWah.prototype = Object.create(Super, {
        name: {
            value: "WahWah"
        },
        defaults: {
            writable: true,
            value: {
                automode: {
                    value: true,
                    automatable: false,
                    type: BOOLEAN
                },
                baseFrequency: {
                    value: 0.5,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                excursionOctaves: {
                    value: 2,
                    min: 1,
                    max: 6,
                    automatable: false,
                    type: FLOAT
                },
                sweep: {
                    value: 0.2,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                resonance: {
                    value: 10,
                    min: 1,
                    max: 100,
                    automatable: false,
                    type: FLOAT
                },
                sensitivity: {
                    value: 0.5,
                    min: -1,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        activateCallback: {
            value: function(value) {
                this.automode = value;
            }
        },
        automode: {
            get: function() {
                return this._automode;
            },
            set: function(value) {
                this._automode = value;
                if (value) {
                    this.activateNode.connect(this.envelopeFollower.input);
                    this.envelopeFollower.activate(true);
                } else {
                    this.envelopeFollower.activate(false);
                    this.activateNode.disconnect();
                    this.activateNode.connect(this.filterBp);
                }
            }
        },
        filterFreqTimeout: {
            value: 0
        },
        setFilterFreq: {
            value: function() {
                try {
                    this.filterBp.frequency.value = this._baseFrequency + this._excursionFrequency * this._sweep;
                    this.filterPeaking.frequency.value = this._baseFrequency + this._excursionFrequency * this._sweep;
                } catch (e) {
                    clearTimeout(this.filterFreqTimeout);
                    //put on the next cycle to let all init properties be set
                    this.filterFreqTimeout = setTimeout(function() {
                        this.setFilterFreq();
                    }.bind(this), 0);
                }
            }
        },
        sweep: {
            enumerable: true,
            get: function() {
                return this._sweep.value;
            },
            set: function(value) {
                this._sweep = Math.pow(value > 1 ? 1 : value <
                    0 ? 0 :
                    value,
                    this._sensitivity);
                this.setFilterFreq();
            }
        },
        baseFrequency: {
            enumerable: true,
            get: function() {
                return this._baseFrequency;
            },
            set: function(value) {
                this._baseFrequency = 50 * Math.pow(10, value *
                    2);
                this._excursionFrequency = Math.min(userContext
                    .sampleRate /
                    2,
                    this.baseFrequency * Math.pow(2, this._excursionOctaves)
                );
                this.setFilterFreq();
            }
        },
        excursionOctaves: {
            enumerable: true,
            get: function() {
                return this._excursionOctaves;
            },
            set: function(value) {
                this._excursionOctaves = value;
                this._excursionFrequency = Math.min(userContext
                    .sampleRate /
                    2,
                    this.baseFrequency * Math.pow(2, this._excursionOctaves)
                );
                this.setFilterFreq();
            }
        },
        sensitivity: {
            enumerable: true,
            get: function() {
                return this._sensitivity;
            },
            set: function(value) {
                this._sensitivity = Math.pow(10, value);
            }
        },
        resonance: {
            enumerable: true,
            get: function() {
                return this._resonance;
            },
            set: function(value) {
                this._resonance = value;
                this.filterPeaking.Q = this._resonance;
            }
        },
        init: {
            value: function() {
                this.output.gain.value = 1;
                this.filterPeaking.type = "peaking";
                this.filterBp.type = "bandpass";
                this.filterPeaking.frequency.value = 100;
                this.filterPeaking.gain.value = 20;
                this.filterPeaking.Q.value = 5;
                this.filterBp.frequency.value = 100;
                this.filterBp.Q.value = 1;
            }
        }
    });

    Tuna.prototype.EnvelopeFollower = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.jsNode = this.output = userContext.createScriptProcessor(
            this.buffersize,
            1, 1);

        this.input.connect(this.output);

        this.attackTime = initValue(properties.attackTime, this.defaults
            .attackTime
            .value);
        this.releaseTime = initValue(properties.releaseTime, this.defaults
            .releaseTime
            .value);
        this._envelope = 0;
        this.target = properties.target || {};
        this.callback = properties.callback || function() {};
    };
    Tuna.prototype.EnvelopeFollower.prototype = Object.create(Super, {
        name: {
            value: "EnvelopeFollower"
        },
        defaults: {
            value: {
                attackTime: {
                    value: 0.003,
                    min: 0,
                    max: 0.5,
                    automatable: false,
                    type: FLOAT
                },
                releaseTime: {
                    value: 0.5,
                    min: 0,
                    max: 0.5,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        buffersize: {
            value: 256
        },
        envelope: {
            value: 0
        },
        sampleRate: {
            value: 44100
        },
        attackTime: {
            enumerable: true,
            get: function() {
                return this._attackTime;
            },
            set: function(value) {
                this._attackTime = value;
                this._attackC = Math.exp(-1 / this._attackTime *
                    this.sampleRate /
                    this.buffersize);
            }
        },
        releaseTime: {
            enumerable: true,
            get: function() {
                return this._releaseTime;
            },
            set: function(value) {
                this._releaseTime = value;
                this._releaseC = Math.exp(-1 / this._releaseTime *
                    this.sampleRate /
                    this.buffersize);
            }
        },
        callback: {
            get: function() {
                return this._callback;
            },
            set: function(value) {
                if (typeof value === "function") {
                    this._callback = value;
                } else {
                    console.error("tuna.js: " + this.name +
                        ": Callback must be a function!");
                }
            }
        },
        target: {
            get: function() {
                return this._target;
            },
            set: function(value) {
                this._target = value;
            }
        },
        activate: {
            value: function(doActivate) {
                this.activated = doActivate;
                if (doActivate) {
                    this.jsNode.connect(userContext.destination);
                    this.jsNode.onaudioprocess = this.returnCompute(
                        this);
                } else {
                    this.jsNode.disconnect();
                    this.jsNode.onaudioprocess = null;
                }
            }
        },
        returnCompute: {
            value: function(instance) {
                return function(event) {
                    instance.compute(event);
                };
            }
        },
        compute: {
            value: function(event) {
                var count = event.inputBuffer.getChannelData(0)
                    .length,
                    channels = event.inputBuffer.numberOfChannels,
                    current, chan, rms, i;
                chan = rms = i = 0;
                if (channels > 1) { //need to mixdown
                    for (i = 0; i < count; ++i) {
                        for (; chan < channels; ++chan) {
                            current = event.inputBuffer.getChannelData(chan)[i];
                            rms += (current * current) / channels;
                        }
                    }
                } else {
                    for (i = 0; i < count; ++i) {
                        current = event.inputBuffer.getChannelData(0)[i];
                        rms += (current * current);
                    }
                }
                rms = Math.sqrt(rms);

                if (this._envelope < rms) {
                    this._envelope *= this._attackC;
                    this._envelope += (1 - this._attackC) * rms;
                } else {
                    this._envelope *= this._releaseC;
                    this._envelope += (1 - this._releaseC) *
                        rms;
                }
                this._callback(this._target, this._envelope);
            }
        }
    });

    Tuna.prototype.LFO = function(properties) {
        //Instantiate AudioNode
        this.output = userContext.createScriptProcessor(256, 1, 1);
        this.activateNode = userContext.destination;

        //Set Properties
        this.frequency = initValue(properties.frequency, this.defaults.frequency
            .value);
        this.offset = initValue(properties.offset, this.defaults.offset.value);
        this.oscillation = initValue(properties.oscillation, this.defaults
            .oscillation
            .value);
        this.phase = initValue(properties.phase, this.defaults.phase.value);
        this.target = properties.target || {};
        this.output.onaudioprocess = this.callback(properties.callback ||
            function() {});
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.LFO.prototype = Object.create(Super, {
        name: {
            value: "LFO"
        },
        bufferSize: {
            value: 256
        },
        sampleRate: {
            value: 44100
        },
        defaults: {
            value: {
                frequency: {
                    value: 1,
                    min: 0,
                    max: 20,
                    automatable: false,
                    type: FLOAT
                },
                offset: {
                    value: 0.85,
                    min: 0,
                    max: 22049,
                    automatable: false,
                    type: FLOAT
                },
                oscillation: {
                    value: 0.3,
                    min: -22050,
                    max: 22050,
                    automatable: false,
                    type: FLOAT
                },
                phase: {
                    value: 0,
                    min: 0,
                    max: 2 * Math.PI,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        frequency: {
            get: function() {
                return this._frequency;
            },
            set: function(value) {
                this._frequency = value;
                this._phaseInc = 2 * Math.PI * this._frequency *
                    this.bufferSize /
                    this.sampleRate;
            }
        },
        offset: {
            get: function() {
                return this._offset;
            },
            set: function(value) {
                this._offset = value;
            }
        },
        oscillation: {
            get: function() {
                return this._oscillation;
            },
            set: function(value) {
                this._oscillation = value;
            }
        },
        phase: {
            get: function() {
                return this._phase;
            },
            set: function(value) {
                this._phase = value;
            }
        },
        target: {
            get: function() {
                return this._target;
            },
            set: function(value) {
                this._target = value;
            }
        },
        activate: {
            value: function(doActivate) {
                if (!doActivate) {
                    this.output.disconnect(userContext.destination);
                } else {
                    this.output.connect(userContext.destination);
                }
            }
        },
        callback: {
            value: function(callback) {
                var that = this;
                return function() {
                    that._phase += that._phaseInc;
                    if (that._phase > 2 * Math.PI) {
                        that._phase = 0;
                    }
                    callback(that._target, that._offset +
                        that._oscillation *
                        Math.sin(that._phase));
                };
            }
        }
    });

    Tuna.toString = Tuna.prototype.toString = function() {
        return "Please visit https://github.com/Theodeus/tuna/wiki for instructions on how to use Tuna.js";
    };
})(this);
;

/** Let's do the vendor-prefix dance. **/
    var audioContext = window.AudioContext || window.webkitAudioContext;
    var context      = new audioContext();
    var MediaStreamHelper = {
        /*
	        The browser have to support Promises if the browser supports only the deprecated version of getUserMedia.
	        There is a polyfill for Promises!
          Example:
	          MediaStreamHelper.initialize(window);
	          getUserMedia({audio: true}).then(function(stream) {}).catch(function(error) {});
	*/
		    UNSUPPORT: false,
		    SUPPORT_STANDARD_VERSION: 1,
		    SUPPORT_DEPRECATED_VERSION: 2,
		    isGetUserMediaSupported: function isGetUserMediaSupported(window) {
				    if(window.navigator.mediaDevices.getUserMedia) return this.SUPPORT_STANDARD_VERSION;
				    else if(window.navigator.getUserMedia) return this.SUPPORT_DEPRECATED_VERSION;
				    else
					    return this.UNSUPPORT;
			    },
		    initialize: function initializeMediaStreamHelper(window) {
				    window.navigator.mediaDevices = window.navigator.mediaDevices || {};
				    window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;

				    var howIsItSupported = this.isGetUserMediaSupported(window);
				    if(howIsItSupported != this.UNSUPPORT)
				    {
					    window.getUserMedia = howIsItSupported == this.SUPPORT_STANDARD_VERSION ?
						    window.navigator.mediaDevices.getUserMedia.bind(window.navigator.mediaDevices) :
						    function(constraints) {
								    return new Promise(function(resolve, reject) {
										    window.navigator.getUserMedia(constraints, resolve, reject);
									    });
							    };
				    }
			    }
	    };
    MediaStreamHelper.initialize(window);
    if(window.getUserMedia) console.log("Your browser supports getUserMedia.");
    else
        console.log("Your browser does not support getUserMedia.");
/////////////////////////////////////////

var Wad = (function(){

/** Pre-render a noise buffer instead of generating noise on the fly. **/
    var noiseBuffer = (function(){
        // the initial seed
        Math.seed = 6;
        Math.seededRandom = function(max, min){
            max = max || 1;
            min = min || 0;
            Math.seed = ( Math.seed * 9301 + 49297 ) % 233280;
            var rnd = Math.seed / 233280;

            return min + rnd * (max - min);
        }
        var bufferSize = 2 * context.sampleRate;
        var noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
        var output = noiseBuffer.getChannelData(0);
        for ( var i = 0; i < bufferSize; i++ ) {
            output[i] = Math.seededRandom() * 2 - 1;
        }
        return noiseBuffer;
    })()
/////////////////////////////////////////////////////////////////////////

/** a lil hack. just be glad it isn't on Object.prototype. **/
    var isArray = function(object){
        return Object.prototype.toString.call(object) === '[object Array]';
    }

/** Set up the default ADSR envelope. **/
    var constructEnv = function(that, arg){
        that.env = { //default envelope, if one is not specified on play
            attack  : arg.env ? valueOrDefault(arg.env.attack,  1) : 0,    // time in seconds from onset to peak volume
            decay   : arg.env ? valueOrDefault(arg.env.decay,   0) : 0,    // time in seconds from peak volume to sustain volume
            sustain : arg.env ? valueOrDefault(arg.env.sustain, 1) : 1,    // sustain volume level, as a percent of peak volume. min:0, max:1
            hold    : arg.env ? valueOrDefault(arg.env.hold, 3.14159) : 3.14159, // time in seconds to maintain sustain volume
            release : arg.env ? valueOrDefault(arg.env.release, 0) : 0     // time in seconds from sustain volume to zero volume
        };
        that.defaultEnv = {
            attack  : arg.env ? valueOrDefault(arg.env.attack,  1) : 0,    // time in seconds from onset to peak volume
            decay   : arg.env ? valueOrDefault(arg.env.decay,   0) : 0,    // time in seconds from peak volume to sustain volume
            sustain : arg.env ? valueOrDefault(arg.env.sustain, 1) : 1,    // sustain volume level, as a percent of peak volume. min:0, max:1
            hold    : arg.env ? valueOrDefault(arg.env.hold, 3.14159) : 3.14159, // time in seconds to maintain sustain volume
            release : arg.env ? valueOrDefault(arg.env.release, 0) : 0     // time in seconds from sustain volume to zero volume
        };
    }
/////////////////////////////////////////


/** Set up the default filter and filter envelope. **/
    var constructFilter = function(that, arg){

        if ( !arg.filter ) { arg.filter = null; }

        else if ( isArray(arg.filter) ) {
            that.filter = arg.filter.map(function(filterArg){
                return {
                    type : filterArg.type || 'lowpass',
                    frequency : filterArg.frequency || 600,
                    q : filterArg.q || 1,
                    env : filterArg.env || null,
                }
            });
        }
        else {
            that.filter  = [{
                type : arg.filter.type || 'lowpass',
                frequency : arg.filter.frequency || 600,
                q : arg.filter.q || 1,
                env : arg.filter.env ||null,
            }];
        }
    }
//////////////////////////////////////////////////////


/** If the Wad uses an audio file as the source, request it from the server.
Don't let the Wad play until all necessary files have been downloaded. **/
    var requestAudioFile = function(that, callback){
        var request = new XMLHttpRequest();
        request.open("GET", that.source, true);
        request.responseType = "arraybuffer";
        that.playable--;
        request.onload = function(){
            context.decodeAudioData(request.response, function (decodedBuffer){
                that.decodedBuffer = decodedBuffer;
                if ( that.env.hold === 3.14159 ) { // audio buffers should not use the default hold
                    that.env.hold = that.decodedBuffer.duration + 1
                }
                if ( callback ) { callback(that); }
                that.playable++;
                if ( that.playOnLoad ) { that.play(that.playOnLoadArg); }
            })
        };
        request.send();
    };
//////////////////////////////////////////////////////////////////////////

/** Set up the vibrato LFO **/
    var constructVibrato = function(that, arg){
        if ( arg.vibrato ) {
            that.vibrato = {
                shape     : valueOrDefault(arg.vibrato.shape, 'sine'),
                speed     : valueOrDefault(arg.vibrato.speed, 1),
                magnitude : valueOrDefault(arg.vibrato.magnitude, 5),
                attack    : valueOrDefault(arg.vibrato.attack, 0)
            };
        }
        else { that.vibrato = null; }
    };
//////////////////////////////


/** Set up the tremolo LFO **/
    var constructTremolo = function(that, arg){
        if ( arg.tremolo ) {
            that.tremolo = {
                shape     : valueOrDefault(arg.tremolo.shape, 'sine'),
                speed     : valueOrDefault(arg.tremolo.speed, 1),
                magnitude : valueOrDefault(arg.tremolo.magnitude, 5),
                attack    : valueOrDefault(arg.tremolo.attack, 1)
            };
        }
        else { that.tremolo = null; }
    };
//////////////////////////////

/** Grab the reverb impulse response file from a server.
You may want to change Wad.defaultImpulse to serve files from your own server.
Check out http://www.voxengo.com/impulses/ for free impulse responses. **/
    var constructReverb = function(that, arg){
        if ( arg.reverb ) {
            that.reverb = { wet : valueOrDefault(arg.reverb.wet, 1) };
            var impulseURL = arg.reverb.impulse || Wad.defaultImpulse;
            var request = new XMLHttpRequest();
            request.open("GET", impulseURL, true);
            request.responseType = "arraybuffer";
            that.playable--;
            request.onload = function(){
                context.decodeAudioData(request.response, function (decodedBuffer){

                    that.reverb.buffer = decodedBuffer;
                    that.playable++;
                    if ( that.playOnLoad ) { that.play(that.playOnLoadArg); }
                    if ( that instanceof Wad.Poly ) { that.setUp(arg); }
                    if ( that.source === 'mic' && that.reverb && that.reverb.buffer && that.reverb.node && !that.reverb.node.buffer ) { // I think this is only relevant when calling play() with args on a mic
                        that.reverb.node.convolver.buffer = that.reverb.buffer;
                    }

                })
            };
            request.send();
        }
        else {
            that.reverb = null;
        }
    };

    var constructPanning = function(that, arg){
        if ( 'panning' in arg ) {
            that.panning = { location : arg.panning };
            if ( typeof(arg.panning) === "number" ) {
                that.panning.type = 'stereo';
            }

            else {
                that.panning.type = '3d'
                that.panning.panningModel = arg.panningModel || 'equalpower';
            }
        }

        else {
            that.panning = {
                location : 0,
                type     : 'stereo',
            };
        }
        if ( that.panning.type === 'stereo' && !context.createStereoPanner ) {
            console.log("Your browser does not support stereo panning. Falling back to 3D panning.")
            that.panning = {
                location     : [0,0,0],
                type         : '3d',
                panningModel : 'equalpower',
            }
        }
    };
//////////////////////////////////////////////////////////////////////////////
    var constructDelay = function(that, arg){
        if ( arg.delay ) {
            that.delay = {
                delayTime    : valueOrDefault(arg.delay.delayTime, .5),
                maxDelayTime : valueOrDefault(arg.delay.maxDelayTime, 2),
                feedback     : valueOrDefault(arg.delay.feedback, .25),
                wet          : valueOrDefault(arg.delay.wet, .25)
            };
        }
        else { that.delay = null; }
    };
/** Special initialization and configuration for microphone Wads **/
    var getConsent = function(that, arg) {
        that.nodes             = [];
        that.mediaStreamSource = null;
        that.gain              = null;
        getUserMedia({audio: true, video: false}).then(function(stream) {
            // console.log('got stream')
            that.mediaStreamSource = context.createMediaStreamSource(stream);
            Wad.micConsent = true
            setUpMic(that, arg);
        }).catch(function(error) { console.log('Error setting up microphone input: ', error); }); // This is the error callback.
    };
////////////////////////////////////////////////////////////////////

    var setUpMic = function(that, arg){
        that.nodes           = [];
        that.gain            = context.createGain();
        that.gain.gain.value = valueOrDefault(arg.volume,that.volume);
        that.nodes.push(that.mediaStreamSource);
        that.nodes.push(that.gain);
        // console.log('that ', arg)

        if ( that.filter || arg.filter ) { createFilters(that, arg); }

        if ( that.reverb || arg.reverb ) { setUpReverbOnPlay(that, arg); }

        constructPanning(that, arg);
        setUpPanningOnPlay(that, arg);

        if ( that.delay || arg.delay ) {
            setUpDelayOnPlay(that, arg);
        }
        setUpTunaOnPlay(that, arg)
        that.setUpExternalFxOnPlay(arg, context);
    }

    var Wad = function(arg){
/** Set basic Wad properties **/
        this.source        = arg.source;
        this.destination   = arg.destination || context.destination; // the last node the sound is routed to
        this.volume        = valueOrDefault(arg.volume, 1); // peak volume. min:0, max:1 (actually max is infinite, but ...just keep it at or below 1)
        this.defaultVolume = this.volume;
        this.playable      = 1; // if this is less than 1, this Wad is still waiting for a file to download before it can play
        this.pitch         = Wad.pitches[arg.pitch] || arg.pitch || 440;
        this.detune        = arg.detune || 0 // In Cents.
        this.globalReverb  = arg.globalReverb || false;
        this.gain          = [];
        this.loop          = arg.loop || false;
        this.tuna          = arg.tuna || null;
        constructEnv(this, arg);
        constructFilter(this, arg);
        constructVibrato(this, arg);
        constructTremolo(this, arg);
        constructReverb(this, arg);
        this.constructExternalFx(arg, context);
        constructPanning(this, arg);
        constructDelay(this, arg);
////////////////////////////////


/** If the Wad's source is noise, set the Wad's buffer to the noise buffer we created earlier. **/
        if ( this.source === 'noise' ) {
            this.decodedBuffer = noiseBuffer;
        }
//////////////////////////////////////////////////////////////////////////////////////////////////


/** If the Wad's source is the microphone, the rest of the setup happens here. **/
        else if ( this.source === 'mic' ) {
            getConsent(this, arg);
        }
//////////////////////////////////////////////////////////////////////////////////


/** If the Wad's source is an object, assume it is a buffer from a recorder. There's probably a better way to handle this. **/
        else if ( typeof this.source == 'object' ) {
            var newBuffer = context.createBuffer(2, this.source[0].length, context.sampleRate);
            newBuffer.getChannelData(0).set(this.source[0]);
            newBuffer.getChannelData(1).set(this.source[1]);
            this.decodedBuffer = newBuffer;
        }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/** If the source is not a pre-defined value, assume it is a URL for an audio file, and grab it now. **/
        else if ( !( this.source in { 'sine' : 0, 'sawtooth' : 0, 'square' : 0, 'triangle' : 0 } ) ) {
            requestAudioFile(this, arg.callback);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////
        else { arg.callback && arg.callback(this) }
    };
    Wad.micConsent = false
    Wad.audioContext = context
    if ( window.Tuna != undefined ) {
        Wad.tuna = new Tuna(Wad.audioContext)
    }

/** When a note is played, these two functions will schedule changes in volume and filter frequency,
as specified by the volume envelope and filter envelope **/
    var filterEnv = function(wad, arg){
        wad.filter.forEach(function (filter, index){
            filter.node.frequency.linearRampToValueAtTime(filter.frequency, arg.exactTime);
            filter.node.frequency.linearRampToValueAtTime(filter.env.frequency, arg.exactTime + filter.env.attack);
        });
    };

    var playEnv = function(wad, arg){
        wad.gain[0].gain.linearRampToValueAtTime(0.0001, arg.exactTime);
        wad.gain[0].gain.linearRampToValueAtTime(wad.volume, arg.exactTime + wad.env.attack + 0.00001);
        wad.gain[0].gain.linearRampToValueAtTime(wad.volume * wad.env.sustain, arg.exactTime + wad.env.attack + wad.env.decay + 0.00002);
        wad.gain[0].gain.linearRampToValueAtTime(wad.volume * wad.env.sustain, arg.exactTime + wad.env.attack + wad.env.decay + wad.env.hold + 0.00003);
        wad.gain[0].gain.linearRampToValueAtTime(0.0001, arg.exactTime + wad.env.attack + wad.env.decay + wad.env.hold + wad.env.release + 0.00004);
        wad.soundSource.start(arg.exactTime);
        wad.soundSource.stop(arg.exactTime + wad.env.attack + wad.env.decay + wad.env.hold + wad.env.release);
    };

////////////////////////////////////////////////////////////////////////////////////////////////////


/** When all the nodes are set up for this Wad, this function plugs them into each other,
with special handling for nodes with custom interfaces (e.g. reverb, delay). **/
    var plugEmIn = function(that, arg){
        // console.log('nodes? ', that.nodes)
        var destination = ( arg && arg.destination ) || that.destination;
        for ( var i = 1; i < that.nodes.length; i++ ) {
            if ( that.nodes[i-1].interface === 'custom' ) {
                var from = that.nodes[i-1].output;
            }
            else { // assume native interface
                var from = that.nodes[i-1];
            }
            if ( that.nodes[i].interface === 'custom' ) {
                var to = that.nodes[i].input
            }
            else { // assume native interface
                var to = that.nodes[i]
            }
            from.connect(to);
        }
        if ( that.nodes[that.nodes.length-1].interface === 'custom') {
            var lastStop = that.nodes[that.nodes.length-1].output;
        }
        else { // assume native interface
            var lastStop = that.nodes[that.nodes.length-1];
        }
        lastStop.connect(destination);

        /** Global reverb is super deprecated, and should be removed at some point. **/
        if ( Wad.reverb && that.globalReverb ) {
            that.nodes[that.nodes.length - 1].connect(Wad.reverb.node);
            Wad.reverb.node.connect(Wad.reverb.gain);
            Wad.reverb.gain.connect(destination);
        }
        /**************************************************************************/
    };
/////////////////////////////////////////////////////////////////////////////////////////


/** Initialize and configure an oscillator node **/
    var setUpOscillator = function(that, arg){
        arg = arg || {};
        that.soundSource = context.createOscillator();
        that.soundSource.type = that.source;
        if ( arg.pitch ) {
            if ( arg.pitch in Wad.pitches ) {
                that.soundSource.frequency.value = Wad.pitches[arg.pitch];
            }
            else {
                that.soundSource.frequency.value = arg.pitch;
            }
        }
        else {
            that.soundSource.frequency.value = that.pitch;
        }
        that.soundSource.detune.value = arg.detune || that.detune;
    };
///////////////////////////////////////////////////

/** Set the ADSR volume envelope according to play() arguments, or revert to defaults **/
    var setUpEnvOnPlay = function(that, arg){
        if ( arg && arg.env ) {
            that.env.attack  = valueOrDefault(arg.env.attack, that.defaultEnv.attack);
            that.env.decay   = valueOrDefault(arg.env.decay, that.defaultEnv.decay);
            that.env.sustain = valueOrDefault(arg.env.sustain, that.defaultEnv.sustain);
            that.env.hold    = valueOrDefault(arg.env.hold, that.defaultEnv.hold);
            that.env.release = valueOrDefault(arg.env.release, that.defaultEnv.release);
        }
        else {
            that.env = {
                attack  : that.defaultEnv.attack,
                decay   : that.defaultEnv.decay,
                sustain : that.defaultEnv.sustain,
                hold    : that.defaultEnv.hold,
                release : that.defaultEnv.release
            };
        }
    };
//////////////////////////////////////////////////////////////////////////////////


/** Set the filter and filter envelope according to play() arguments, or revert to defaults **/

    var createFilters = function(that, arg){
        if ( arg.filter && !isArray(arg.filter) ) {
            arg.filter = [arg.filter];
        }
        that.filter.forEach(function (filter, i) {
            filter.node                 = context.createBiquadFilter();
            filter.node.type            = filter.type;
            filter.node.frequency.value = ( arg.filter && arg.filter[i] ) ? ( arg.filter[i].frequency || filter.frequency ) : filter.frequency;
            filter.node.Q.value         = ( arg.filter && arg.filter[i] ) ? ( arg.filter[i].q         || filter.q )         : filter.q;
            if ( ( arg.filter && arg.filter[i].env || that.filter[i].env ) && !( that.source === "mic" ) ) {
                filter.env = {
                    attack    : ( arg.filter && arg.filter[i].env && arg.filter[i].env.attack )    || that.filter[i].env.attack,
                    frequency : ( arg.filter && arg.filter[i].env && arg.filter[i].env.frequency ) || that.filter[i].env.frequency
                };
            }

            that.nodes.push(filter.node);
        })
    };

    var setUpFilterOnPlay = function(that, arg){
        if ( arg && arg.filter && that.filter ) {
            if ( !isArray(arg.filter) ) arg.filter = [arg.filter]
            createFilters(that, arg)
        }
        else if ( that.filter ) {
            createFilters(that, that);
        }
    };
///////////////////////////////////////////////////////////////////////////////////////////////

/** Initialize and configure a convolver node for playback **/
    var setUpReverbOnPlay = function(that, arg){
        var reverbNode = {
            interface : 'custom',
            input : context.createGain(),
            convolver : context.createConvolver(),
            wet : context.createGain(),
            output : context.createGain()
        }
        reverbNode.convolver.buffer = that.reverb.buffer;
        reverbNode.wet.gain.value   = that.reverb.wet;

        reverbNode.input.connect(reverbNode.convolver);
        reverbNode.input.connect(reverbNode.output);
        reverbNode.convolver.connect(reverbNode.wet);
        reverbNode.wet.connect(reverbNode.output);

        that.reverb.node = reverbNode;
        that.nodes.push(that.reverb.node);
    };
//////////////////////////////////////////////////////////////


/** Initialize and configure a panner node for playback **/
    var setUpPanningOnPlay = function(that, arg){
        var panning = arg && arg.panning; // can be zero provided as argument
        if (typeof panning === 'undefined') { panning = that.panning.location; }

        if (typeof panning  === 'number') {
            that.panning.node = context.createStereoPanner();
            that.panning.node.pan.value = panning;
            that.panning.type = 'stereo';
        }
        else {
            that.panning.node = context.createPanner();
            that.panning.node.setPosition(panning[0], panning[1], panning[2]);
            that.panning.node.panningModel = arg.panningModel || that.panningModel || 'equalpower';
            that.panning.type = '3d';
        }

        that.nodes.push(that.panning.node);

    };
///////////////////////////////////////////////////////////


/** Initialize and configure a vibrato LFO Wad for playback **/
    var setUpVibratoOnPlay = function(that, arg){
        that.vibrato.wad = new Wad({
            source : that.vibrato.shape,
            pitch  : that.vibrato.speed,
            volume : that.vibrato.magnitude,
            env    : {
                attack : that.vibrato.attack
            },
            destination : that.soundSource.frequency
        });
        that.vibrato.wad.play();
    };
///////////////////////////////////////////////////////////////


/** Initialize and configure a tremolo LFO Wad for playback **/
    var setUpTremoloOnPlay = function(that, arg){
        that.tremolo.wad = new Wad({
            source : that.tremolo.shape,
            pitch  : that.tremolo.speed,
            volume : that.tremolo.magnitude,
            env    : {
                attack : that.tremolo.attack,
                hold   : 10
            },
            destination : that.gain[0].gain
        });
        that.tremolo.wad.play();
    };
///////////////////////////////////////////////////////////////

    var setUpDelayOnPlay = function(that, arg){
        if ( that.delay ) {
            if ( !arg.delay ) { arg.delay = {}; }
            //create the nodes we’ll use
            var delayNode = { // the custom delay node
                interface    : 'custom',
                input        : context.createGain(),
                output       : context.createGain(),
                delayNode    : context.createDelay(that.delay.maxDelayTime), // the native delay node inside the custom delay node.
                feedbackNode : context.createGain(),
                wetNode      : context.createGain(),
            }

            //set some decent values
            delayNode.delayNode.delayTime.value = valueOrDefault(arg.delay.delayTime, that.delay.delayTime);
            delayNode.feedbackNode.gain.value   = valueOrDefault(arg.delay.feedback, that.delay.feedback);
            delayNode.wetNode.gain.value        = valueOrDefault(arg.delay.wet, that.delay.wet);


            //set up the routing
            delayNode.input.connect(delayNode.delayNode);
            delayNode.input.connect(delayNode.output);
            delayNode.delayNode.connect(delayNode.feedbackNode);
            delayNode.delayNode.connect(delayNode.wetNode);
            delayNode.feedbackNode.connect(delayNode.delayNode);
            delayNode.wetNode.connect(delayNode.output);
            that.delay.delayNode = delayNode;

            that.nodes.push(delayNode)
        }
    };

/** **/
    var constructCompressor = function(that, arg){
        that.compressor = context.createDynamicsCompressor();
        that.compressor.attack.value    = valueOrDefault(arg.compressor.attack, that.compressor.attack.value);
        that.compressor.knee.value      = valueOrDefault(arg.compressor.knee, that.compressor.knee.value);
        that.compressor.ratio.value     = valueOrDefault(arg.compressor.ratio, that.compressor.ratio.value);
        that.compressor.release.value   = valueOrDefault(arg.compressor.release, that.compressor.release.value);
        that.compressor.threshold.value = valueOrDefault(arg.compressor.threshold, that.compressor.threshold.value);
        that.nodes.push(that.compressor);
    };
    var setUpTunaOnPlay = function(that, arg){
        if ( !( that.tuna || arg.tuna ) ) { return }
        var tunaConfig = {}
        if ( that.tuna ) {
            for ( var key in that.tuna ) {
                tunaConfig[key] = that.tuna[key]
            }
        }

        // overwrite settings from `this` with settings from arg
        if ( arg.tuna ) {
            for ( var key in arg.tuna ) {
                tunaConfig[key] = arg.tuna[key]
            }
        }
        console.log('tunaconfig: ', tunaConfig)
        for ( var key in tunaConfig) {
            console.log(key)
            var tunaEffect = new Wad.tuna[key](tunaConfig[key])
            that.nodes.push(tunaEffect)
        }
        // console.log(that.nodes)
    }
///

/** Method to allow users to setup external fx in the constructor **/
    Wad.prototype.constructExternalFx = function(arg, context){
        //override me in your own code
    };


//////////////////////////////////////////////////////////////////////////////

/** To be overrided by the user **/
    Wad.prototype.setUpExternalFxOnPlay = function(arg, context){
        //user does what is necessary here, and then maybe does something like:
        // this.nodes.push(externalFX)
    };
///////////////////////////////////////////////////////////////


/** the play() method will create the various nodes that are required for this Wad to play,
set properties on those nodes according to the constructor arguments and play() arguments,
plug the nodes into each other with plugEmIn(),
then finally play the sound by calling playEnv() **/
    Wad.prototype.play = function(arg){
        arg = arg || { arg : null };
        if ( this.playable < 1 ) {
            this.playOnLoad    = true;
            this.playOnLoadArg = arg;
        }

        else if ( this.source === 'mic' ) {
            if ( Wad.micConsent ) {
                if ( arg.arg === null ) {
                    plugEmIn(this, arg);
                }
                else {
                    constructFilter(this, arg);
                    constructVibrato(this, arg);
                    constructTremolo(this, arg);
                    constructReverb(this, arg);
                    this.constructExternalFx(arg, context);
                    constructPanning(this, arg);
                    constructDelay(this, arg);
                    setUpMic(this, arg);
                    plugEmIn(this, arg);
                }
            }
            else { console.log('You have not given your browser permission to use your microphone.')}
        }

        else {
            this.nodes = [];
            if ( !arg.wait ) { arg.wait = 0; }
            if ( arg.volume ) { this.volume = arg.volume; }
            else { this.volume = this.defaultVolume; }

            if ( this.source in { 'sine' : 0, 'sawtooth' : 0, 'square' : 0, 'triangle' : 0 } ) {
                setUpOscillator(this, arg);
            }

            else {
                this.soundSource = context.createBufferSource();
                this.soundSource.buffer = this.decodedBuffer;
                if ( this.source === 'noise' || this.loop || arg.loop ) {
                    this.soundSource.loop = true;
                }
            }

            if (arg.exactTime === undefined) {
                arg.exactTime = context.currentTime + arg.wait;
            }

            this.nodes.push(this.soundSource);


    /**  sets the volume envelope based on the play() arguments if present,
    or defaults to the constructor arguments if the volume envelope is not set on play() **/
            setUpEnvOnPlay(this, arg);
    ////////////////////////////////////////////////////////////////////////////////////////


    /**  sets up the filter and filter envelope based on the play() argument if present,
    or defaults to the constructor argument if the filter and filter envelope are not set on play() **/
            setUpFilterOnPlay(this, arg);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
            setUpTunaOnPlay(this, arg);

            this.setUpExternalFxOnPlay(arg, context);


            this.gain.unshift(context.createGain()); // sets up the gain node
            this.gain[0].label = arg.label;
            this.nodes.push(this.gain[0]);

            if ( this.gain.length > 15 ) {
                this.gain.length = 15
            }

            // sets up reverb
            if ( this.reverb ) { setUpReverbOnPlay(this, arg); }

    /**  sets panning based on the play() argument if present, or defaults to the constructor argument if panning is not set on play **/
            setUpPanningOnPlay(this, arg);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            setUpDelayOnPlay(this, arg);

            plugEmIn(this, arg);

            if ( this.filter && this.filter[0].env ) { filterEnv(this, arg); }
            playEnv(this, arg);

            //sets up vibrato LFO
            if ( this.vibrato ) { setUpVibratoOnPlay(this, arg); }

            //sets up tremolo LFO
            if ( this.tremolo ) { setUpTremoloOnPlay(this, arg); }
        }
        if ( arg.callback ) { arg.callback(this); }
        return this;
    };

//////////////////////////////////////////////////////////////////////////////////////////


    /** Change the volume of a Wad at any time, including during playback **/
    Wad.prototype.setVolume = function(volume){
        this.defaultVolume = volume;
        if ( this.gain.length > 0 ) { this.gain[0].gain.value = volume; }
        return this;
    };

    /**
    Change the playback speed of a Wad during playback.
    inputSpeed is a value of 0 < speed, and is the rate of playback of the audio.
    E.g. if input speed = 2.0, the playback will be twice as fast
    **/
    Wad.prototype.setSpeed = function(inputSpeed) {

        //Check/Save the input
        var speed;
        if(inputSpeed && inputSpeed > 0) speed = inputSpeed;
        else speed = 0;

        //Check if we have a soundsource (Though we always should)
        if(this.soundSource) {

            //Set the value
            this.soundSource.playbackRate.value = speed;
        }
        else {

            //Inform that there is no delay on the current wad
            console.log("Sorry, but the wad does not contain a soundSource!");
        }

        return this;
    };

    Wad.prototype.setDetune = function(detune){
        this.soundSource.detune.value = detune;
        return this;
    };

    /** Change the panning of a Wad at any time, including during playback **/
    Wad.prototype.setPanning = function(panning){
        this.panning.location = panning;
        if ( isArray(panning) && this.panning.type === '3d' && this.panning.node ) {
            this.panning.node.setPosition(panning[0], panning[1], panning[2]);

        }
        else if ( typeof panning === 'number' && this.panning.type === 'stereo' && this.panning.node) {
            this.panning.node.pan.value = panning;
        }

        if ( isArray(panning) ) { this.panning.type = '3d' }
        else if ( typeof panning === 'number' ) { this.panning.type = 'stereo' }
        return this;
    };

    /**
    Change the Reverb of a Wad at any time, including during playback.
    inputWet is a value of 0 < wetness/gain < 1
    **/
    Wad.prototype.setReverb = function(inputWet) {

        //Check/Save the input

        var wet;
        if(inputWet && inputWet > 0 && inputWet < 1) wet = inputWet;
        else if(inputWet >= 1) wet = 1;
        else wet = 0;

        //Check if we have delay
        if(this.reverb) {

            //Set the value
            this.reverb.wet = wet;

            //Set the node's value, if it exists
            if(this.reverb.node) {

                this.reverb.node.wet.gain.value = wet;
            }
        }
        else {

            //Inform that there is no reverb on the current wad
            console.log("Sorry, but the wad does not contain Reverb!");
        }

        return this;
    };


    /**
    Change the Delay of a Wad at any time, including during playback.
    inputTime is a value of time > 0, and is the time in seconds between each delayed playback.
    inputWet is a value of gain 0 < inputWet < 1, and is Relative volume change between the original sound and the first delayed playback.
    inputFeedback is a value of gain 0 < inputFeedback < 1, and is Relative volume change between each delayed playback and the next.
    **/
    Wad.prototype.setDelay = function(inputTime, inputWet, inputFeedback){

        //Check/Save the input
        var time;
        if(inputTime && inputTime > 0) time = inputTime;
        else time = 0;

        var wet;
        if(inputWet && inputWet > 0 && inputWet < 1) wet = inputWet;
        else if(inputWet >= 1) wet = 1;
        else wet = 0;

        var feedback;
        if(inputFeedback && inputFeedback > 0 && inputFeedback < 1) feedback = inputFeedback;
        else if(inputFeedback >= 1) feedback = 1;
        else feedback = 0;

        //Check if we have delay
        if(this.delay) {

            //Set the value
            this.delay.delayTime = time;
            this.delay.wet = wet;
            this.delay.feedback = feedback;

            //Set the node's value, if it exists
            if(this.delay.delayNode) {

                this.delay.delayNode.delayNode.delayTime.value = time;
                this.delay.delayNode.wetNode.gain.value = wet;
                this.delay.delayNode.feedbackNode.gain.value = feedback;
            }
        }
        else {

            //Inform that there is no delay on the current wad
            console.log("Sorry, but the wad does not contain delay!");
        }

        return this;
    };


//////////////////////////////////////////////////////////////////////////////////////////


/** If multiple instances of a sound are playing simultaneously, stop() only can stop the most recent one **/
    Wad.prototype.stop = function(label){
        if ( !( this.source === 'mic' ) ) {
            if ( label ) {
                for ( var i = 0; i < this.gain.length; i++ ) {
                    if ( this.gain[i].label === label ) {
                        this.gain[i].gain.cancelScheduledValues(context.currentTime);
                        this.gain[i].gain.setValueAtTime(this.gain[i].gain.value, context.currentTime);
                        this.gain[i].gain.linearRampToValueAtTime(.0001, context.currentTime + this.env.release);
                    }
                }
            }
            if ( !label ) {
                this.gain[0].gain.cancelScheduledValues(context.currentTime);
                this.gain[0].gain.setValueAtTime(this.gain[0].gain.value, context.currentTime);
                this.gain[0].gain.linearRampToValueAtTime(.0001, context.currentTime + this.env.release);
            }
        }
        else if (Wad.micConsent ) {
            this.mediaStreamSource.disconnect(0);
        }
        else { console.log('You have not given your browser permission to use your microphone.')}
        if ( this.tremolo ) {
            this.tremolo.wad.stop()
        }
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    var buflen = 2048;
    var buf = new Uint8Array( buflen );
    var MINVAL = 134;  // 128 == zero.  MINVAL is the "minimum detected signal" level.

    var noteFromPitch = function( frequency ) {
        var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
        return Math.round( noteNum ) + 69;
    }

    var frequencyFromNoteNumber = function( note ) {
        return 440 * Math.pow(2,(note-69)/12);
    }

    var centsOffFromPitch = function( frequency, note ) {
        return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
    }


    function autoCorrelate( buf, sampleRate ) {
        var MIN_SAMPLES = 4;    // corresponds to an 11kHz signal
        var MAX_SAMPLES = 1000; // corresponds to a 44Hz signal
        var SIZE = 1000;
        var best_offset = -1;
        var best_correlation = 0;
        var rms = 0;
        var foundGoodCorrelation = false;

        if (buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES))
            return -1;  // Not enough data

        for ( var i = 0; i < SIZE; i++ ) {
            var val = ( buf[i] - 128 ) / 128;
            rms += val * val;
        }
        rms = Math.sqrt(rms/SIZE);
        if (rms<0.01)
            return -1;

        var lastCorrelation=1;
        for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
            var correlation = 0;

            for (var i=0; i<SIZE; i++) {
                correlation += Math.abs(((buf[i] - 128)/128)-((buf[i+offset] - 128)/128));
            }
            correlation = 1 - (correlation/SIZE);
            if ((correlation>0.9) && (correlation > lastCorrelation))
                foundGoodCorrelation = true;
            else if (foundGoodCorrelation) {
                // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
                return sampleRate/best_offset;
            }
            lastCorrelation = correlation;
            if (correlation > best_correlation) {
                best_correlation = correlation;
                best_offset = offset;
            }
        }
        if (best_correlation > 0.01) {
            // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
            return sampleRate/best_offset;
        }
        return -1;
    //  var best_frequency = sampleRate/best_offset;
    }


    Wad.Poly = function(arg){
        if ( !arg ) { arg = {}; }
        this.isSetUp  = false;
        this.playable = 1;

        if ( arg.reverb ) {
            constructReverb(this, arg); // We need to make sure we have downloaded the impulse response before continuing with the setup.
        }
        else {
            this.setUp(arg);
        }
    };

    Wad.Poly.prototype.setUp = function(arg){ // Anything that needs to happen before reverb is set up can go here.
        this.wads              = [];
        this.input             = context.createAnalyser();
        this.input.fftSize     = 2048
        this.nodes             = [this.input];
        this.destination       = arg.destination || context.destination; // the last node the sound is routed to
        this.volume            = arg.volume || 1;
        this.output            = context.createGain();
        this.output.gain.value = this.volume;
        this.tuna              = arg.tuna || null;

        if ( !( typeof Recorder === 'undefined' ) && arg.recConfig ) { // Recorder should be defined, unless you're running the unconcatenated source version and forgot to include recorder.js.
            this.rec               = new Recorder(this.output, arg.recConfig);
            this.rec.recordings    = [];

            var that = this;
            var getRecorderBufferCallback = function( buffers ) {
                that.rec.createWadArg.source = buffers;
                that.rec.recordings.unshift(new Wad(that.rec.createWadArg));
            };
            this.rec.createWad = function(arg){
                this.createWadArg = arg || { env : { hold : 9001 } };
                this.getBuffer(getRecorderBufferCallback);
            };
        }

        this.globalReverb = arg.globalReverb || false; // deprecated

        constructFilter(this, arg);
        if ( this.filter ) { createFilters(this, arg); }

        if ( this.reverb ) { setUpReverbOnPlay(this, arg); }

        this.constructExternalFx(arg, context);

        constructPanning(this, arg);
        setUpPanningOnPlay(this, arg);
        if ( arg.compressor ) { constructCompressor(this, arg); }

        constructDelay(this, arg);
        setUpDelayOnPlay(this, arg);
        setUpTunaOnPlay(this, arg);
        this.nodes.push(this.output);
        plugEmIn(this, arg);
        this.isSetUp = true;
        if ( arg.callback ) { arg.callback(this); }
    }

/**
    The MIT License (MIT)

Copyright (c) 2014 Chris Wilson
**/
    Wad.Poly.prototype.updatePitch = function( time ) {
        this.input.getByteTimeDomainData( buf );
        var ac = autoCorrelate( buf, context.sampleRate );

        if ( ac !== -1 && ac !== 11025 && ac !== 12000 ) {
            var pitch = ac;
            this.pitch = Math.floor( pitch ) ;
            var note = noteFromPitch( pitch );
            this.noteName = Wad.pitchesArray[note - 12];
            // Detune doesn't seem to work.
            // var detune = centsOffFromPitch( pitch, note );
            // if (detune == 0 ) {
            //     this.detuneEstimate = 0;
            // } else {

            //     this.detuneEstimate = detune
            // }
        }
        var that = this;
        that.rafID = window.requestAnimationFrame( function(){ that.updatePitch() } );
    }

    Wad.Poly.prototype.stopUpdatingPitch = function(){
        cancelAnimationFrame(this.rafID)
    }

    Wad.Poly.prototype.setVolume = function(volume){
        if ( this.isSetUp ) {
            this.output.gain.value = volume;
        }
        else {
            console.log('This PolyWad is not set up yet.');
        }
        return this;
    }

    Wad.Poly.prototype.play = function(arg){
        if ( this.isSetUp ) {
            if ( this.playable < 1 ) {
                this.playOnLoad    = true;
                this.playOnLoadArg = arg;
            }
            else {
                if ( arg && arg.volume ) {
                    this.output.gain.value = arg.volume; // if two notes are played with volume set as a play arg, does the second one overwrite the first? maybe input should be an array of gain nodes, like regular wads.
                    arg.volume = undefined; // if volume is set, it should change the gain on the polywad's gain node, NOT the gain nodes for individual wads inside the polywad.
                }
                for ( var i = 0; i < this.wads.length; i++ ) {
                    this.wads[i].play(arg);
                }
            }
        }
        else {
            console.log('This PolyWad is not set up yet.');
        }
        return this;
    };

    Wad.Poly.prototype.stop = function(arg){
        if ( this.isSetUp ) {
            for ( var i = 0; i < this.wads.length; i++ ) {
                this.wads[i].stop(arg);
            }
        }
    };

    Wad.Poly.prototype.add = function(wad){
        if ( this.isSetUp ) {
            wad.destination = this.input;
            this.wads.push(wad);
            if ( wad instanceof Wad.Poly ) {
                wad.output.disconnect(0);
                wad.output.connect(this.input);
            }
        }
        else {
            console.log('This PolyWad is not set up yet.');
        }
        return this;
    };



    Wad.Poly.prototype.remove = function(wad){
        if ( this.isSetUp ) {
            for ( var i = 0; i < this.wads.length; i++ ) {
                if ( this.wads[i] === wad ) {
                    this.wads[i].destination = context.destination;
                    this.wads.splice(i,1);
                    if ( wad instanceof Wad.Poly ) {
                        wad.output.disconnect(0);
                        wad.output.connect(context.destination);
                    }
                }
            }
        }
        return this;
    };

    Wad.Poly.prototype.constructExternalFx = function(arg, context){

    };

/** If a Wad is created with reverb without specifying a URL for the impulse response,
grab it from the defaultImpulse URL **/
    Wad.defaultImpulse = 'http://www.codecur.io/us/sendaudio/widehall.wav';

    // This method is deprecated.
    Wad.setGlobalReverb = function(arg){
        Wad.reverb                 = {};
        Wad.reverb.node            = context.createConvolver();
        Wad.reverb.gain            = context.createGain();
        Wad.reverb.gain.gain.value = arg.wet;
        var impulseURL             = arg.impulse || Wad.defaultImpulse;
        var request                = new XMLHttpRequest();
        request.open("GET", impulseURL, true);
        request.responseType = "arraybuffer";

        request.onload = function() {
            context.decodeAudioData(request.response, function (decodedBuffer){
                Wad.reverb.node.buffer = decodedBuffer;
            });
        };
        request.send();

    };
//////////////////////////////////////////////////////////////////////////////////////
//  Utility function to avoid javascript type conversion bug checking zero values   //

    var valueOrDefault = function(value, def) {
        var val = (value == null) ? def : value;
        return val;
    };

//////////////////////////////////////////////////////////////////////////////////////
/** This object is a mapping of note names to frequencies. **/
    Wad.pitches = {
        'A0'  : 27.5000,
        'A#0' : 29.1352,
        'Bb0' : 29.1352,
        'B0'  : 30.8677,
        'B#0'  : 32.7032,
        'Cb1'  : 30.8677,
        'C1'  : 32.7032,
        'C#1' : 34.6478,
        'Db1' : 34.6478,
        'D1'  : 36.7081,
        'D#1' : 38.8909,
        'Eb1' : 38.8909,
        'E1'  : 41.2034,
        'Fb1'  : 41.2034,
        'E#1'  : 43.6535,
        'F1'  : 43.6535,
        'F#1' : 46.2493,
        'Gb1' : 46.2493,
        'G1'  : 48.9994,
        'G#1' : 51.9131,
        'Ab1' : 51.9131,
        'A1'  : 55.0000,
        'A#1' : 58.2705,
        'Bb1' : 58.2705,
        'B1'  : 61.7354,
        'Cb2'  : 61.7354,
        'B#1'  : 65.4064,
        'C2'  : 65.4064,
        'C#2' : 69.2957,
        'Db2' : 69.2957,
        'D2'  : 73.4162,
        'D#2' : 77.7817,
        'Eb2' : 77.7817,
        'E2'  : 82.4069,
        'Fb2'  : 82.4069,
        'E#2'  : 87.3071,
        'F2'  : 87.3071,
        'F#2' : 92.4986,
        'Gb2' : 92.4986,
        'G2'  : 97.9989,
        'G#2' : 103.826,
        'Ab2' : 103.826,
        'A2'  : 110.000,
        'A#2' : 116.541,
        'Bb2' : 116.541,
        'B2'  : 123.471,
        'Cb3'  : 123.471,
        'B#2'  : 130.813,
        'C3'  : 130.813,
        'C#3' : 138.591,
        'Db3' : 138.591,
        'D3'  : 146.832,
        'D#3' : 155.563,
        'Eb3' : 155.563,
        'E3'  : 164.814,
        'Fb3'  : 164.814,
        'E#3'  : 174.614,
        'F3'  : 174.614,
        'F#3' : 184.997,
        'Gb3' : 184.997,
        'G3'  : 195.998,
        'G#3' : 207.652,
        'Ab3' : 207.652,
        'A3'  : 220.000,
        'A#3' : 233.082,
        'Bb3' : 233.082,
        'B3'  : 246.942,
        'Cb4'  : 246.942,
        'B#3'  : 261.626,
        'C4'  : 261.626,
        'C#4' : 277.183,
        'Db4' : 277.183,
        'D4'  : 293.665,
        'D#4' : 311.127,
        'Eb4' : 311.127,
        'E4'  : 329.628,
        'Fb4'  : 329.628,
        'E#4'  : 349.228,
        'F4'  : 349.228,
        'F#4' : 369.994,
        'Gb4' : 369.994,
        'G4'  : 391.995,
        'G#4' : 415.305,
        'Ab4' : 415.305,
        'A4'  : 440.000,
        'A#4' : 466.164,
        'Bb4' : 466.164,
        'B4'  : 493.883,
        'Cb5'  : 493.883,
        'B#4'  : 523.251,
        'C5'  : 523.251,
        'C#5' : 554.365,
        'Db5' : 554.365,
        'D5'  : 587.330,
        'D#5' : 622.254,
        'Eb5' : 622.254,
        'E5'  : 659.255,
        'Fb5'  : 659.255,
        'E#5'  : 698.456,
        'F5'  : 698.456,
        'F#5' : 739.989,
        'Gb5' : 739.989,
        'G5'  : 783.991,
        'G#5' : 830.609,
        'Ab5' : 830.609,
        'A5'  : 880.000,
        'A#5' : 932.328,
        'Bb5' : 932.328,
        'B5'  : 987.767,
        'Cb6'  : 987.767,
        'B#5'  : 1046.50,
        'C6'  : 1046.50,
        'C#6' : 1108.73,
        'Db6' : 1108.73,
        'D6'  : 1174.66,
        'D#6' : 1244.51,
        'Eb6' : 1244.51,
        'Fb6'  : 1318.51,
        'E6'  : 1318.51,
        'E#6'  : 1396.91,
        'F6'  : 1396.91,
        'F#6' : 1479.98,
        'Gb6' : 1479.98,
        'G6'  : 1567.98,
        'G#6' : 1661.22,
        'Ab6' : 1661.22,
        'A6'  : 1760.00,
        'A#6' : 1864.66,
        'Bb6' : 1864.66,
        'B6'  : 1975.53,
        'Cb7'  : 1975.53,
        'B#6'  : 2093.00,
        'C7'  : 2093.00,
        'C#7' : 2217.46,
        'Db7' : 2217.46,
        'D7'  : 2349.32,
        'D#7' : 2489.02,
        'Eb7' : 2489.02,
        'E7'  : 2637.02,
        'Fb7'  : 2637.02,
        'E#7'  : 2793.83,
        'F7'  : 2793.83,
        'F#7' : 2959.96,
        'Gb7' : 2959.96,
        'G7'  : 3135.96,
        'G#7' : 3322.44,
        'Ab7' : 3322.44,
        'A7'  : 3520.00,
        'A#7' : 3729.31,
        'Bb7' : 3729.31,
        'B7'  : 3951.07,
        'Cb8' : 3951.07,
        'B#7'  : 4186.01,
        'C8'  : 4186.01
    };


    Wad.pitchesArray = [ // Just an array of note names. This can be useful for mapping MIDI data to notes.
        'C0',
        'C#0',
        'D0',
        'D#0',
        'E0',
        'F0',
        'F#0',
        'G0',
        'G#0',
        'A0',
        'A#0',
        'B0',
        'C1',
        'C#1',
        'D1',
        'D#1',
        'E1',
        'F1',
        'F#1',
        'G1',
        'G#1',
        'A1',
        'A#1',
        'B1',
        'C2',
        'C#2',
        'D2',
        'D#2',
        'E2',
        'F2',
        'F#2',
        'G2',
        'G#2',
        'A2',
        'A#2',
        'B2',
        'C3',
        'C#3',
        'D3',
        'D#3',
        'E3',
        'F3',
        'F#3',
        'G3',
        'G#3',
        'A3',
        'A#3',
        'B3',
        'C4',
        'C#4',
        'D4',
        'D#4',
        'E4',
        'F4',
        'F#4',
        'G4',
        'G#4',
        'A4',
        'A#4',
        'B4',
        'C5',
        'C#5',
        'D5',
        'D#5',
        'E5',
        'F5',
        'F#5',
        'G5',
        'G#5',
        'A5',
        'A#5',
        'B5',
        'C6',
        'C#6',
        'D6',
        'D#6',
        'E6',
        'F6',
        'F#6',
        'G6',
        'G#6',
        'A6',
        'A#6',
        'B6',
        'C7',
        'C#7',
        'D7',
        'D#7',
        'E7',
        'F7',
        'F#7',
        'G7',
        'G#7',
        'A7',
        'A#7',
        'B7',
        'C8'
    ];
//////////////////////////////////////////////////////////////

    Wad.midiInstrument = {
        play : function() { console.log('playing midi')  },
        stop : function() { console.log('stopping midi') }
    };
    Wad.midiInputs  = [];

    midiMap = function(event){
        console.log(event.receivedTime, event.data);
        if ( event.data[0] === 144 ) { // 144 means the midi message has note data
            // console.log('note')
            if ( event.data[2] === 0 ) { // noteOn velocity of 0 means this is actually a noteOff message
                console.log('|| stopping note: ', Wad.pitchesArray[event.data[1]-12]);
                Wad.midiInstrument.stop(Wad.pitchesArray[event.data[1]-12]);
            }
            else if ( event.data[2] > 0 ) {
                console.log('> playing note: ', Wad.pitchesArray[event.data[1]-12]);
                Wad.midiInstrument.play({pitch : Wad.pitchesArray[event.data[1]-12], label : Wad.pitchesArray[event.data[1]-12], callback : function(that){
                }})
            }
        }
        else if ( event.data[0] === 176 ) { // 176 means the midi message has controller data
            console.log('controller');
            if ( event.data[1] == 46 ) {
                if ( event.data[2] == 127 ) { Wad.midiInstrument.pedalMod = true; }
                else if ( event.data[2] == 0 ) { Wad.midiInstrument.pedalMod = false; }
            }
        }
        else if ( event.data[0] === 224 ) { // 224 means the midi message has pitch bend data
            console.log('pitch bend');
        }
    };


    var onSuccessCallback = function(midiAccess){
        // console.log('inputs: ', m.inputs)

        Wad.midiInputs = []
        var val = midiAccess.inputs.values();
        for ( var o = val.next(); !o.done; o = val.next() ) {
            Wad.midiInputs.push(o.value)
        }
        // Wad.midiInputs = [m.inputs.values().next().value];   // inputs = array of MIDIPorts
        console.log('MIDI inputs: ', Wad.midiInputs)
        // var outputs = m.outputs(); // outputs = array of MIDIPorts
        for ( var i = 0; i < Wad.midiInputs.length; i++ ) {
            Wad.midiInputs[i].onmidimessage = midiMap; // onmidimessage( event ), event.data & event.receivedTime are populated
        }
        // var o = m.outputs()[0];           // grab first output device
        // o.send( [ 0x90, 0x45, 0x7f ] );     // full velocity note on A4 on channel zero
        // o.send( [ 0x80, 0x45, 0x7f ], window.performance.now() + 1000 );  // full velocity A4 note off in one second.
    };
    var onErrorCallback = function(err){
        console.log("uh-oh! Something went wrong!  Error code: " + err.code );
    };

    if ( navigator && navigator.requestMIDIAccess ) {
        try {
            navigator.requestMIDIAccess().then(onSuccessCallback, onErrorCallback);
        }
        catch(err) {
            var text = "There was an error on this page.\n\n";
            text += "Error description: " + err.message + "\n\n";
            text += "Click OK to continue.\n\n";
            console.log(text);
        }
    }


    Wad.presets = {
        hiHatClosed : { source : 'noise', env : { attack : .001, decay : .008, sustain : .2, hold : .03, release : .01}, filter : { type : 'highpass', frequency : 400, q : 1 } },
        snare : { source : 'noise', env : {attack : .001, decay : .01, sustain : .2, hold : .03, release : .02}, filter : {type : 'bandpass', frequency : 300, q : .180 } },
        hiHatOpen : { source : 'noise', env : { attack : .001, decay : .008, sustain : .2, hold : .43, release : .01}, filter : { type : 'highpass', frequency : 100, q : .2 } },
        ghost : { source : 'square', volume : .3, env : { attack : .01, decay : .002, sustain : .5, hold : 2.5, release : .3 }, filter : { type : 'lowpass', frequency : 600, q : 7, env : { attack : .7, frequency : 1600 } }, vibrato : { attack : 8, speed : 8, magnitude : 100 } },
        piano : { source : 'square', volume : 1.4, env : { attack : .01, decay : .005, sustain : .2, hold : .015, release : .3 }, filter : { type : 'lowpass', frequency : 1200, q : 8.5, env : { attack : .2, frequency : 600 } } }
    };
    return Wad;

})()

if(typeof module !== 'undefined' && module.exports) {
    module.exports = Wad;
}

return Wad;

}));


/***/ }),
/* 43 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 44 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** vertx (ignored) ***!
  \***********************/
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 45 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** multi ./js/athena-module.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./js/athena-module.js */23);


/***/ })
/******/ ]);
});
//# sourceMappingURL=athena.js.map