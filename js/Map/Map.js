import Tile from 'Map/Tile';
import Wave from 'Object/Wave';
import RM from 'Resource/ResourceManager';
import NM from 'Notification/NotificationManager';
import FX from 'FX/FX';
import MapEvent from 'Map/MapEvent';
import Deferred from 'Core/Deferred';

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
 * @param {number} options.viewportW The width of the viewport: it is usually the same as the game width. Default = map.width
 * @param {number} options.viewportH The height of the viewport: it is usually the same as the game height. Default = map.height
 * @param {ArrayBuffer} options.buffer The buffer containing width \* height bytes container tile numbers followed by width*height bytes for the tile behaviors
 * @example
 * var map = new Map({
 *    src: 'mapTiles.jpg',
 *    tileWidth: 32,
 *    tileHeight: 32,
 *    width: 800,
 *    height: 600,
 *    buffer: new ArrayBuffer(800*600*2)
 * });
 * 
 */
class Map {
    constructor(options) {
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
        this.viewportW = options.viewportW || this.width;
        this.viewportH = options.viewportH || this.height;

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
        this.easing = FX.getEasing(options.easing || 'linear');

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
        this.mapEvent = new MapEvent(this);

        // flag that 
        this.isDirty = true;
    }

	/**
	 * 
	 * Changes the start position using the master's current position: usually called when reaching a checkpoint
	 * 
	 */
    setStartXYFromMaster() {
        this.startX = this.masterObject.x;
        this.startY = this.masterObject.y;
    }

	/**
	 * Resets the master's position to the map.startX/startY position & resets its animation state:
	 * usually called when player loses a life and needs to be positionned at checkpoint
	 * 
	 */
    resume() {
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
    reset() {
        this.masterObject = null;

        // remove objects from the map and empty collision groups
        this.objects.length = 0;
        this.friendBullets.length = 0;
        this.enemies.length = 0;
        this.platforms.length = 0;
        // reset mapItems

        // reset windows
        for (const id in this.windows) {
            this.windows[id].displayed = false;
        }

        // reset triggers
        for (const id in this.triggers) {
            this.triggers[id].trigerred = false;
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

        this.firstCol = (-this.viewportX / this.tileWidth);
        this.firstRow = (-this.viewportY / this.tileHeight);

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
    setBuffer(buffer) {
        let size = this.numCols * this.numRows;

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
    setMasterObject(obj) {
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
    addObject(obj) {
        if (!obj.image) {
            obj.setImage(RM.getResourceById(obj.imageSrc));
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
    setTilesSize(width, height) {
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
    setViewPort(x, y, w, h) {
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
    debug(isDebug) {
        this.isDebug = isDebug;
        // force tiles redraw at for next map render
        this.isDirty = true;
    }

	/**
	 * Move movable objects into the map
	 * 
	 */
    moveObjects() {
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
    movePlatforms() {
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
    move() {
        let currentTime = new Date().getTime(),
            ellapsedTime = currentTime - this.startMoveTime,
            t = ellapsedTime / this.duration,
            moveProgress;

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
    checkMasterPosition() {
        let destX = null,
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
            if (this.viewportX && ((this.masterObject.x + this.viewportX) <= this.viewportLimitX)) {
                destX = this.viewportX + this.viewportCenterX;
            } else if (((-this.viewportX + this.viewportW) - this.masterObject.x) <= this.viewportLimitX) {
                destX = this.viewportX - this.viewportCenterX;
            }

            if (this.viewportY && ((this.masterObject.y + this.viewportY) <= this.viewportLimitY)) {
                destY = this.viewportY + this.viewportCenterY;
            } else if (((-this.viewportY + this.viewportH) - this.masterObject.y) <= this.viewportLimitY) {
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
    checkCollisions() {
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
    checkForTriggers() {
        let box = this.masterObject.getHitBox(),
            triggers = this.getTriggersForBox(this.masterObject.x + box.x, this.masterObject.y + box.y, this.masterObject.x + box.x2, this.masterObject.y + box.y2);

        triggers.forEach((trigger) => {
            trigger.triggered = !this.mapEvent.handleEvent(trigger);
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
    moveTo(x, y) {
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
    setNewSrc(options) {
        this.src = options.src;
    }


	/**
	 * Returns current source image url used to render map tiles
	 * 
	 * @returns {String} The current source image used to render the tiles.
	 * 
	 * @private
	 */
    getSrc() {
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
    fallTest(x, y) {
        let pos = this.getTilePos(x, y);

        // return (!(this.tileTypes[pos.x + pos.y * this.numCols] & 1));
        return this.tileTypes[pos.x + pos.y * this.numCols] === Tile.TYPE.WALL;
    }


	/**
	 * 
	 * Checks collisions between master bullets and enemies: call hitTest method on
	 * any frend bullet object with the enemies object as parameter
	 * 
	 */
    checkMasterBulletsToEnemiesCollisions() {
        let i = 0,
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
    checkMasterToEnemiesCollisions() {
        let i = 0,
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
    checkForPlatform(object, vx, vy) {
        let box = object.getHitBox(),
            x = box.x + sprite.x,
            y = box.y + sprite.y;

        this.platforms.forEach((platform) => {
            let platformBox = platform.getHitBox(),
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
    getTriggersForBox(x, y, x2, y2) {
        let pos1 = this.getTilePos(x, y),
            pos2 = this.getTilePos(x2, y),
            pos3 = this.getTilePos(x, y2),
            /* pos4 = this.getTilePos(x2, y2), */
            max1 = pos2.x,
            max2 = pos3.y,
            i, j,
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
    setNextX(sprite, tileTypes) {
        // TODO: if player moves too fast, or tiles are too small,
        // we may miss some tiles and do not detect colisions
        // TODO: 2. handle type of movingPlatform: platformType: 0 | 1
        // TODO: 3. Iterate through list of movingPlatforms of platformType [1] too
        // if closer than (sprite.x + sprite.vx [ +hitBox.x2 ]) && < maxX
        // then maxX = movingPlatform.size - 1

        const left = (sprite.vx > 0) ? false : true;

        let hitBox = sprite.getHitBox(),
            spriteYMax = sprite.y + hitBox.y2,
            startX = left ? sprite.x + hitBox.x - 1 : sprite.x + hitBox.x2 + 1,
            startY = sprite.y + hitBox.y,
            tilePos = this.getTilePos(startX, startY),
            found = false,
            minX = left ? startX : 0;
        //
        // console.log('begin test');
        // left: minX >= sprite.vx => minX 
        while (!found && ((left && (minX >= sprite.vx)) || (!left && (minX <= sprite.vx)))) {
            for (let i = tilePos.y * this.tileHeight; i < spriteYMax; i += this.tileHeight, tilePos.y++) {
                // DISABLE WALL COLLISIONS
                // TODO: add a parameter to toggle collisions at runtime
                if (this.tileTypes[tilePos.y * this.numCols + tilePos.x] === tileTypes) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                minX = left ? ((tilePos.x * this.tileWidth) - startX) : ((++tilePos.x * this.tileWidth) - startX);
            }
            startX = left ? ((tilePos.x * this.tileWidth) - 1) : tilePos.x * this.tileWidth;

            tilePos = this.getTilePos(startX, startY);
        }
        // console.log('end test');

        if ((left && sprite.vx >= minX) || (!left && sprite.vx < minX)) {
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
    setNextYTop(sprite, tileTypes) {
        let hitBox = sprite.getHitBox,
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
    checkForTileType(sprite, tileType, spaceX = 0, spaceY = 0, center = false) {
        const currentHitBox = sprite.getHitBox(),
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
    hitObjectTest(x, y, x2, y2, types) {
        let pos1 = this.getTilePos(x, y),
            pos2 = this.getTilePos(x2, y),
            pos3 = this.getTilePos(x, y2),
            max1 = pos2.x,
            max2 = pos3.y,
            i, j,
            tileType;

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
    drawTile(tileNum, ctx, x, y, useScrollOffset) {
        let currentTile = this.tiles[tileNum];

        if (useScrollOffset) {
            ctx.drawImage(this.srcBitmap,
                currentTile.offsetX + this.scrollOffsetX,
                currentTile.offsetY + this.scrollOffsetY,
                this.scrollTileOffsetX,
                this.scrollTileOffsetY,
                x,
                y,
                this.scrollTileOffsetX,
                this.scrollTileOffsetY);
        } else {
            ctx.drawImage(this.srcBitmap,
                currentTile.offsetX,
                currentTile.offsetY,
                this.tileWidth,
                this.tileHeight,
                x,
                y,
                this.tileWidth,
                this.tileHeight);
        }
    }


	/**
	 * Internal: calculates scrolling offsets for first cols in case a scrolling is in progress
	 * 
	 * @private
	 */
    _getScrollOffset() {
        let viewportX = Math.abs(this.viewportX),
            viewportY = Math.abs(this.viewportY);

        this.scrollOffsetX = viewportX < this.tileWidth ? viewportX : viewportX % this.tileWidth,
            this.scrollOffsetY = viewportY < this.tileHeight ? viewportY : viewportY % this.tileHeight;
        this.scrollTileOffsetX = this.tileWidth - this.scrollOffsetX;
        this.scrollTileOffsetY = this.tileHeight - this.scrollOffsetY;
    }


	/**
	 * Draws the map, showing the whole map and not only the visible window if showHidden true
	 * 
	 * @param {CanvasContext} ctx The context of the canvas where to draw the map.
	 * @param {boolean} showHidden The map only draws the viewport, set this to true to draw the whole map.
	 * @param {number=0} mapOffsetX The x offset where to start drawing the map
	 * @param {number=0} mapOffsetY The y offset where to start drawing the map
	 * 
	 * @private
	 */
    draw(ctx, showHidden, mapOffsetX = 0, mapOffsetY = 0) {
        debugger;
        let i, j, max, max2,
            tileNum = 0,
            x = 0,
            y = 0;

        if (!this.srcBitmap) {
            // console.log('[Map] no bitmap, need to get the source');
            this.srcBitmap = RM.getResourceById(this.src);

            if (!this.srcBitmap) {
                debugger;
            }
        }

        // this.isDirty = true;

        i = j = max = max2 = 0;
        // 1. get first col/row of map
        if (this.isDirty || !this.lastCol) {
            this._getBoundariesTiles(showHidden);
        }

        if (this.isDirty || !this.lastCol) {
            this._getScrollOffset();

            for (i = this.firstRow, max = this.lastRow, y = mapOffsetY; i < max; i++) {
                for (j = this.firstCol, max2 = this.lastCol, x = mapOffsetX; j < max2; j++) {
                    tileNum = this.map[i * this.numCols + j];

                    if (tileNum < 255) { // no tile goes here
                        // TODO: check that viewportY is not zero too ?
                        this.drawTile(tileNum, ctx, x, y, ((this.viewportY && i === this.firstRow) || (this.viewportX && j === this.firstCol)));
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
    addNewObjectsFromWindow() {
        let windowNum = ((Math.abs(this.viewportX) / this.viewportW) | 0) + ((Math.abs(this.viewportY) / this.viewportH) | 0),
            window = this.windows[windowNum];

        if (window && window.displayed === false) {
            window.displayed = true;
            window.items.forEach((item, i) => {
                let obj = RM.newResourceFromPool(item.type, item.spriteOptions);
                this.addObject(obj);
                // add a reference to the sprite into mapEvent.items
                // this will be used to destroy sprite when puzzle is checked
                // for example
                if (item.itemId) {
                    this.mapEvent.addItem(item.itemId, obj);
                }
            });
        }
    }


	/**
	 * Draw all objects that are onto the map
	 * 
	 * @param {CanvasContext} ctx The context where to draw the objects.
	 * @param {number=0} mapOffsetX The x offset where to start rendering the object
	 * @param {number=0} mapOffsetY The y offset where to start rendering the object
	 * 
	 * @private
	 */
    drawObjects(ctx, mapOffsetX = 0, mapOffsetY = 0) {
        let i,
            j,
            max = this.objects.length,
            objects = this.objects,
            obj = null,
            child = null;

        // TODO: only draw visible objects (viewport) + active ones
        for (i = max - 1; i >= 0; i--) {
            obj = objects[i];
            // update position with map offset in case map should doesn't take the whole scene display
            if (mapOffsetX || mapOffsetY) {
                obj.x += mapOffsetX;
                obj.y += mapOffsetY;
                if (obj.children.length) {
                    for (j = 0; j < obj.children.length; ++j) {
                        child = obj.children[j];
                        child.x += mapOffsetX;
                        child.y += mapOffsetY;
                    }
                }
            }
            obj.draw(ctx, this.isDebug);
            // restores its position
            if (mapOffsetX || mapOffsetY) {
                obj.x -= mapOffsetX;
                obj.y -= mapOffsetY;
                if (obj.children.length) {
                    for (j = 0; j < obj.children.length; ++j) {
                        child = obj.children[j];
                        child.x -= mapOffsetX;
                        child.y -= mapOffsetY;
                    }
                }
            }
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
    getTileAt(x, y) {
        let i,
            j,
            tileNum;

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
    getTilePos(x, y) {
        let i,
            j;

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
    _calcNumTiles() {
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
    _getBoundariesTiles(showHidden) {
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
    notify(eventType, data) {
        NM.notify(eventType, data);
    }


	/**
	 * removeObject from the map
	 * 
	 * @param {GfxObject} gfxObject The object to remove from the map.
	 * 
	 * @note the object if automatically removed from collision lists
	 * 
	 */
    removeObject(gfxObject) {
        let foundIndex = this.objects.indexOf(gfxObject);

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
    scheduleSprite(spriteId, spriteOptions, delay) {
        let sprite = RM.newResourceFromPool(spriteId, spriteOptions);

        // No need to call setTimeout if delay is zero
        if (delay) {
            setTimeout(() => {
                this.addObject(sprite);
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
    handleWave(options) {
        // console.log('wave');
        var waveSize = options.size,
            wave = new Wave(options),
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
    showTileBehaviors(ctx) {
        let i, j, max, max2,
            x = 0,
            y = 0,
            styles = [
                null,
                null,
                'rgba(240,0,0,.6)',
                'rgba(0,0,240,.6)'
            ],
            w,
            h;

        i = j = max = max2 = 0;

        for (i = this.firstRow, max = this.lastRow, y = 0; i < max; i++) {
            for (j = this.firstCol, max2 = this.lastCol, x = 0; j < max2; j++) {
                w = (this.viewportX && j === this.firstCol) ? this.scrollTileOffsetX : this.tileWidth;
                h = (this.viewPortY && i === this.firstRow) ? this.scrollTileOffsetY : this.tileHeight;
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
    getObjectsList() {
        this.objects.forEach((obj, i) => {
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
    toString() {
        // exports the options needed to create current map
        // especially usefull when working on a new map with the MapEditor
        //
        let i = 0,
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
            obj.tiles.push('new Tile({' +
                'offsetX: tile.offsetX,' +
                'offsetY: tile.offsetY,' +
                'width: tile.width,' +
                'height: tile.height,' +
                'inertia: tile.inertia,' +
                'upCollide: tile.upCollide,' +
                'downCollide: tile.downCollide' +
                '}),');
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
    _createTiles(tilesArray) {
        // TODO: replace with map()
        let tiles = [];

        tilesArray.forEach((tileDesc) => {
            tiles.push(new Tile(tileDesc));
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
    resize(direction, options) {
		/*
			only increases size for now (decrease means we may loose some objects,...)
			direction:
			'topleft' == top -> bottom, left -> right (option = {newWidth, newHeight})
			'topright' == top -> bottom, right -> left (option = {newWidth, newHeight})
			'bottomleft' == bottom -> top, left -> right (option = {newWidth, newHeight})
			'bottomright' == bottom -> top, right -> left (option = {newWidth, newHeight})
			'center' == center -> each side (option = {newSize})
		*/
        let buffer = null,
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
            let diffWidth = options.newWidth - this.width,
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
            buffer = new ArrayBuffer(numCols * numRows * 2),
                map = new Uint8Array(buffer, 0, numRows * numCols),
                tileTypes = new Uint8Array(buffer, numRows * numCols, numRows * numCols);

            // new buffer is automatically filled with zeros
            // so we only need to copy existing tiles/behaviors into the new
            // buffer at the correct position
            for (let y = diffRows; y < numRows; y++) {
                for (let x = 0; x < this.numCols; x++) {
                    map[(y * numCols) + x] = this.map[(y * numCols) + x];
                    tileTypes[(y * numCols) + x] = this.tileTypes[(y * numCols) + x];

                    if (this.triggers[(y * numCols) + x]) {
                        item = Object.assign({}, true, this.triggers[(y * numCols) + x]);
                        if (item.spriteOptions) {
                            item.spriteOptions.y += diffHeight;
                        }
                        triggers[(y * numCols) + x] = item;
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
            for (let y = newBlocksY; y < newBlockY; ++y) {
                for (let x = 0; x < oldBlockX; ++x) {
                    if (this.windows[y * oldBlockX + x]) {
                        items = this.windows[y * oldBlockX + x].items;

                        for (let num = 0; num < items.length; ++num) {
                            item = Object.assign({}, items[num]);
                            // we consider x and y are always set
                            if (item.spriteOptions) {
                                item.spriteOptions.y += diffHeight;
                            }
                        }

                        // TODO: since we're doing this.windows = mapItemBlocks we
                        // should copy and not only get references of each element
                        itemBlocks[y * oldBlockX + x] = {
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
};

export default Map;