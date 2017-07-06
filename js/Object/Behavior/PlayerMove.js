import Behavior from 'Object/Behavior/Behavior';
import AM from 'Audio/AudioManager';
import Tile from 'Map/Tile';

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
    class PlayerMove extends Behavior {
        constructor(sprite, Input, options) {
            super(sprite, Input, options);

            this.direction = options.direction || 'right';

            this.currentMovement = options.startMovement || '';

            this.lookDirection = options.lookDirection || 'left';

            this.climbVY = 2;
            
            this.jumping = false;
            
            this.firing = false;
            
            this.fromLadder = false;

			this.sideHit = false;
        }
        
        /**
         * onMove handler: uses InputManager to get keyboard status and move the sprite when needed
         * 
         * @param {Number} t The time ellapsed since last move
         */
        onMove(t) {
            let Input = this.Input;

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
                    switch(this.currentMovement) {
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
        handleFire() {
            let canFire = false,
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
                this.sprite.setAnimation('fire' + this.lookDirection, function() {
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
        walk(direction) {
			// ADD: this.currentMovement = 'walk_left|right'
            let sprite = this.sprite,
                currentHitBox = sprite.getHitBox(),
                nextX,
                nextY,
                sound;

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
            if (!sprite.currentMap.hitObjectTest(nextX + currentHitBox.x, nextY + currentHitBox.y, nextX + currentHitBox.x2, nextY + currentHitBox.y2, Tile.TYPE.WALL)) {
                sprite.startAnimation();
                if (sprite.currentFrameNum !== sprite.previousFrameNum && (sprite.currentFrameNum === 3 || sprite.currentFrameNum === 7)) {
                    AM.play(sound);
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
        walkLeft() {
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
        walkRight() {
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
        startJump(direction) {
          let sprite = this.sprite,
              that = this;
    
                if (!this.jumping) {
                    console.log('starting jump', sprite.y);
                    this.readyToJump = false;
                    this.currentMovement = 'startjump';
                    this.vx = direction === 'left' ? -2 : 2;
                    this.vy = -4;
                    this.gravity  = 0.098;
                    
                    console.log('startJump', this.vy);
                    
                    sprite.setAnimation('goDown' + direction, function() {
                        console.log('end goDownLeft, ready to jump', this.vy, this.y);
                        that.readyToJump = true;
                        that.currentMovement = 'jump' + direction;
                        that.jumping = true;
                        
                        // TODO: call onEvent('jump')
                        this.setAnimation('jump' + direction);
                    });                
                }
                else {
                    that.readyToJump = true;
                    this.jumping = true;
                    that.currentMovement = 'jump' + direction;
    
                    this.vx = direction === 'left' ? -2 : 2;
                    this.vy = -4;
                    this.gravity  = 0.098;                
                    
                    // TODO: call onEvent('jump')
                    this.sprite.setAnimation('jump' + direction);                
                }
    
                this.lookDirection = this.direction = direction;
                this.sideHit = false;            
    
                AM.play('jump');
        }

        /**
         * Called when the playing is already jumping: this method is checks for colisions and
         * calculates next x/y sprite position
         * 
         * @param {String} direction The direction of the jump.
         * 
         * @private
         */
        jump(direction) {
            let sprite = this.sprite,
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
                horizTileHit = sprite.currentMap.hitObjectTest(nextX + currentHitBox.x, sprite.y + currentHitBox.y, nextX + currentHitBox.x2, sprite.y + currentHitBox.y2, Tile.TYPE.WALL);
                // left/right collision ? => vx = 0, but player continues to go up
                if (horizTileHit) {
                    // debugger;
                    // console.log('[PlayerMove] Left/Right collision!');

                    // this.vx = 0;
					         this.sideHit = true;
					         noVx = true;

                    // set x to max(wall, nextx), which is wall-1
                    if (this.direction === 'right') {
                        sprite.x = horizTileHit.tile.x -currentHitBox.x2 -currentHitBox.x -1;
                    } else {
                        sprite.x = horizTileHit.tile.x + sprite.currentMap.tileWidth;
                    }

                }/* else if (!this.fromLadder && this.sideHit === true) {
					// side was hit during jump
					noVy = true;
                    this.currentMovement = '';
					AM.play('land');
                }*/
                // top/down collision
				        vertTileHit = sprite.currentMap.hitObjectTest(sprite.x + currentHitBox.x, nextY + currentHitBox.y, sprite.x + currentHitBox.x2, nextY + currentHitBox.y2, Tile.TYPE.WALL);
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
                    } else {    // ground touched
                        console.log('[PlayerMove] touch ground!', this.currentMovement);
                        // debugger;
                        this.jumping = false;
                        this.fromLadder = false;

                        // TODO: play endJumLeft animation => onAnimationEnd, readyLeft
			            AM.play('land');
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
        idle() {
            let sprite = this.sprite;

            this.vx = 0;
            this.vy = 0;
			
            sprite.stopAnimation();
        }
        
        /**
         * Called when the player needs to goDown
         * 
         * @private
         */
        goDown() {
            let sprite = this.sprite;
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
        faceWall() {
            let sprite = this.sprite;

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
        climb(direction) {
            console.log('climbing');
            let sprite = this.sprite;

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
        stopClimbing(/*direction*/) {
            let sprite = this.sprite;

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
        goUpOrClimb(onlyClimb) {
            let sprite = this.sprite,
                currentHitBox = sprite.getHitBox(),
                diff = onlyClimb ? 0 : 24,
                pos = false,
                pos2 = false,
                Input = this.Input;

            if (Input.getKeyStatus(Input.keys.LEFT) === true || Input.getKeyStatus(Input.keys.RIGHT) === true) {
                return false;
            }
            
            if (onlyClimb === true) {
                if (sprite.currentMap.hitObjectTest(currentHitBox.x + sprite.x, currentHitBox.y + sprite.y + 40, currentHitBox.x + sprite.x -diff, currentHitBox.y2 + sprite.y - 50, Tile.TYPE.LADDER)) {
                    pos = sprite.currentMap.hitObjectTest(currentHitBox.x2 + sprite.x + diff, currentHitBox.y + sprite.y + 40, currentHitBox.x2 + sprite.x -diff, currentHitBox.y2 + sprite.y - 50, Tile.TYPE.LADDER);
                }
            } else {
                pos = sprite.currentMap.hitObjectTest(currentHitBox.x + sprite.x + diff, currentHitBox.y + sprite.y + 40, currentHitBox.x2 + sprite.x -diff, currentHitBox.y2 + sprite.y - 50, Tile.TYPE.LADDER);
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
        goDownOrClimb() {
            let sprite = this.sprite,
                currentHitBox = sprite.getHitBox(),
				pos = sprite.currentMap.hitObjectTest(currentHitBox.x + sprite.x + 24, currentHitBox.y2 + sprite.y + this.climbVY, currentHitBox.x2 + sprite.x -24, currentHitBox.y2 + sprite.y + this.climbVY, Tile.TYPE.LADDER);

            if (pos) {
                if (this.currentMovement !== 'climb') {
                    sprite.centerXOverTile(pos);
                }
                console.log(currentHitBox.x2 + sprite.x -24, currentHitBox.y2 + sprite.y + this.climbVY);
                this.climb(0);
            } else {
                // TODO: if (climb) anim(faceLadder)
                if (this.currentMovement === 'climb' || this.currentMovement === 'faceWall') {
                    // debugger;
                    console.log(currentHitBox.x2 + sprite.x -24, currentHitBox.y2 + sprite.y + this.climbVY);
                    console.log('faceWall');
                    pos = sprite.currentMap.hitObjectTest(currentHitBox.x + sprite.x + 24, currentHitBox.y2 + sprite.y + this.climbVY, currentHitBox.x2 + sprite.x -24, currentHitBox.y2 + sprite.y + this.climbVY, Tile.TYPE.LADDER);
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
        fall() {
            let i = 4,
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
        fallTest(size) {
            size = size || 1;
            
            let sprite = this.sprite,
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
    };
    
    export default PlayerMove;
