import Behavior from './Behavior';
import Input from '../../Input/InputManager';
import Tile from '../../Map/Tile';
import AM from '../../Audio/AudioManager';

// debug
window.AM = AM;

// Possible level 1 & 2 statuses for the player movements
var STATUS = {},
    DIR = {};

['STANDING', 'FIRING', 'JUMPING', 'FALLING', 'CLIMBING', 'GOINGDOWN', 'WALKING'
].forEach(function (statusName, i) {
    STATUS[statusName] = i;
});

['WALL', 'LEFT', 'RIGHT', 'UP', 'DOWN'
].forEach(function (dirName, i) {
    DIR[dirName] = i;
});

// possible level
class PlayerMove2 extends Behavior {
    constructor(sprite, Input, options) {
        super(sprite, Input, options);

        // start level 1 status
        this.status = STATUS[options.status] || STATUS.STANDING;

        // start level 2 status: for example, main action can be walk, and 2nd action fire
        this.subStatus = 0;

        // flags: used to determine what's possible or ongoing
        // some actions may need time before running
        // for example: when jumping, playing first needs to play goDown animation
        // then it's ready to jump: we consider both status as JUMPING, only difference is
        // actionReady that should be set once goDownAnimation is over
        this.actionReady = true;

        // we may need to store previous status to keep track of previous animations
        this.previousStatus = '';
        this.previousDirection = '';

        // PUBLIC
        // determines if the player may fire (should go on sprite object instead ?)
        this.canFire = false;

        // PUBLIC
        // can player react to joystick/kb/touch moves ?
        // some actions may temporary block moves, for example, start of a jump,...
        this.canMove = true;

        // player direction: may be LEFT
        this.statusDirection = 0;

        // since player can move and fire at the same time,
        // we need another variable to store its fire direction
        this.fireDirection = 0;

        // we also need to parameter different velocity for each possible move
        // right now, walk only has vx, in a future version we could have vy as well
        this.walkVX = options.walkVX || 2;
        this.walkVY = options.walkVY | 0;

        // right now, fall only has vy, we could imagine having vx as well
        this.fallVY = options.fallVY || 4;
        this.fallVX = options.fallVX || 0;

        this.jumpVX = options.jumpVX || 2;
        this.jumpVY = options.jumpVY || -4;

        // TODO: should we have different gravity for different moves ?
        this.gravity = options.gravity || 0.098;

        this.climbVY = options.climbVY || 2;
        // again, we could imagine having vx for climb
        this.climbVX = options.climbVX || 0;

        this.collisionDetected = false;

        // then we define action keys for our move
        // fire and action keys are the same here but of course
        // we could imagine having different keys
        this.actionKeys = Object.assign({
            RIGHT: Input.keys.RIGHT,
            LEFT: Input.keys.LEFT,
            UP: Input.keys.UP,
            DOWN: Input.keys.DOWN,
            FIRE: Input.keys.CTRL,
            ACTION: Input.keys.CTRL
        }, options.actionKeys);

        this.keyCodes = [Input.keys.RIGHT, Input.keys];

        // now comes every animations that will configure the player's behavior
        this.animations = Object.assign({
            faceWall: 'faceWall',
            facePlayer: 'standStill',
            startFireLeft: '',
            startFireRight: '',
            fireLeft: 'fireLeft',
            fireRight: 'fireRight',
            walkLeft: 'walkLeft',
            walkRight: 'walkRight',
            turnRight: 'turnRight',
            turnLeft: 'turnLeft',
            startJumpLeft: 'goDownLeft',
            startJumpRight: 'goDownRight',
            jumpRight: 'jumpRight',
            jumpLeft: 'jumpLeft',
            // we could have ability to turn while jumping
            turnJumpLeft: '',
            turnJumpRight: '',
            startFireJumpLeft: '',
            startFireJumpRight: '',
            fireJumpRight: 'fireRight',
            fireJumpLeft: 'fireLeft',
            climbUp: 'climbUp',
            climbDown: 'climbDown',
            fireClimbRight: 'fireRight',
            fireClimbLeft: 'fireLeft',
            landRight: 'goDownRight',
            landLeft: 'goDownLeft',
            goDownLeft: 'goDownLeft',
            goDownRight: 'goDownRight',
            // WARN: these two should be reversed ?
            goUpRight: 'goDownRight',
            goUpLeft: 'goDownLeft'
        }, options.animations);

        // gameplay stuff
        // can we turn while jumping
        this.turnWhileJumping = options.turnWhileJumping || false;
    }

    setStatus(newStatus, newDirection) {
        // console.log('[PlayerMove2] Setting status to', newStatus, 'previous status', this.status);
        this.previousStatus = this.status;
        this.previousDirection = this.statusDirection;

        this.status = newStatus;
        this.statusDirection = newDirection || this.statusDirection;
    }

    onUpdate(timestamp) {
        this.collisionDetected = false;

        // console.log('onMove', this.status);
        // first: calculate next position (limiting to max + wall)
        this.getNextPosition();

        // console.log('onMove after', this.status);

        switch (this.status) {
            case STATUS.STANDING:
                // first action
                if (!this.actionReady) {
                    this.sprite.setAnimation(this.animations.facePlayer);
                    this.actionReady = true;
                    this.canFire = false;
                }
                this.nextStatusFromIdle();
                break;
            case STATUS.WALKING:
                this.nextStatusFromWalk();
                if (this.sprite.currentFrameNum !== this.sprite.previousFrameNum && (this.sprite.currentFrameNum === 3 || this.sprite.currentFrameNum === 7)) {
                    AM.play('step_' + (this.statusDirection > 1 ? 'right' : 'left'));
                }
                break;

            case STATUS.CLIMBING:
                this.nextStatusFromClimb();
                break;
        }
    }

    // 1.idle (if wallHit or no more direction)
    // 2. jump
    // 3. walk, other direction
    nextStatusFromWalk() {
        let leftPressed = Input.getKeyStatus(this.actionKeys.LEFT),
            rightPressed = Input.getKeyStatus(this.actionKeys.RIGHT);

        // 1st collision ?
        if (this.collisionDetected === true) {
            this.sprite.stopAnimation();
            // do not reset vx: in case we hit a moving platform
            // if it moves in the right direction, player need
            // to move
            /* this.vx = 0; */
        }

        // console.log('nextStatusFromWalk', this.statusDirection);

        // no left or right pressed: got idle position
        if (!(leftPressed | rightPressed)) {
            console.log('**idle');
            this.idle();
            // only one direction pressed: detect direction change
        } else if (!(leftPressed && rightPressed)) {
            if (this.statusDirection === DIR.LEFT && rightPressed) {
                this.idle();
            } else if (this.statusDirection === DIR.RIGHT && leftPressed) {
                this.idle();
            }
        }
    }

    // current status is idle
    // possible actions:
    // 1.get down
    // 2.walk left/right
    // 3.jump left/right
    // 4.faceWall
    // 5 climbup/down
    // 6 idle
    nextStatusFromIdle() {
        // from here, possible: walk right, jumpright ? (add goDownRight ?)
        if (Input.getKeyStatus(this.actionKeys.RIGHT)) {
            // jump
            if (Input.getKeyStatus(this.actionKeys.UP)) {
                console.log('not handled yet: jumping right from idle');
            } else {    // walk right
                this.walk(DIR.RIGHT);
            }
        } else if (Input.getKeyStatus(this.actionKeys.LEFT)) {
            // jump
            if (Input.getKeyStatus(this.actionKeys.UP)) {
                console.log('not handled yet: jumping left from idle');
            } else {    // walk right
                this.walk(DIR.LEFT);
            }
        } else if (Input.getKeyStatus(this.actionKeys.UP)) {
            // TODO: can we calculate this ?
            if (this.statusDirection !== DIR.WALL && !this.sprite.currentMap.checkForTileType(this.sprite, TYPE.LADDER, 20, 5, true)) {
                console.log('face wall');
                this.faceWall();
            } else {
                console.log('need to climb');
                this.climb(DIR.UP);
            }
        }
    }

    nextStatusFromClimb() {
        // TODO: check is collision detected
        if (!Input.getKeyStatus(this.actionKeys.UP)) {
            this.idle();
        }
    }

    climb(direction) {
        this.setStatus(STATUS.CLIMBING, direction);
        this.sprite.setAnimation(this.animations.climbUp);

        this.sprite.vy = -this.climbVY;
        // again, we could imagine having vx for climb
        this.sprite.vx = this.climbVX;
    }

    faceWall() {
        this.setStatus(STATUS.STANDING, DIR.WALL);
        this.sprite.advanceFrame(this.animations.faceWall);
        this.switchAbove = this.sprite.currentMap.getSwitchAboveMaster();
    }

    idle(direction) {
        console.log('[PlayerMove2] Switching to idle mode');
        this.setStatus(STATUS.STANDING);

        this.sprite.stopAnimation();

        this.sprite.vx = 0;
        this.sprite.vy = 0;
    }

    // TODO: handle direction
    walk(direction) {
        // console.log('[PlayerMove2] Switching to walk mode');
        let sprite = this.sprite,
            isRight = direction === DIR.RIGHT;

        // what animations do we need to play ?
        if (this.previousStatus !== STATUS.WALKING || this.previousDirection !== direction) {
            this.actionReady = false;
            this.sprite.setAnimation(isRight ? this.animations.turnRight : this.animations.turnLeft, () => {
                this.actionReady = true;
                sprite.vx = isRight ? this.walkVX : -this.walkVX;
                sprite.vy = this.walkVY;
                sprite.setAnimation(isRight ? this.animations.walkRight : this.animations.walkLeft);
            });
        } else {
            this.sprite.setAnimation(isRight ? this.animations.walkRight : this.animations.walkLeft);
        }
        // else 
        if (this.actionReady) {
            this.sprite.vx = isRight ? this.walkVX : -this.walkVX;
            this.sprite.vy = this.walkVY;
            // TODO: we need to save previous direction
            // if new different than previous => play previous turn in reverse, then
            // new turn, then walk...
            this.sprite.startAnimation();
        }

        this.setStatus(STATUS.WALKING, direction);
    }

    // calculate next position using vx/vy/elasticity
    // limiting to walls & movingPlatforms
    getNextPosition() {
        let sprite = this.sprite,
            isCollide,
            nextY;

        // TODO: if platform, then add platform.vx as well 

        // TODO: no test if vx/vy == 0!
        if (this.status === STATUS.STANDING && this.sprite.vx) {
            // debugger;
        }
        if (!sprite.vy) {
            if (sprite.vx) {
                isCollide = sprite.currentMap.setNextX(sprite, TYPE.WALL);

                if (isCollide) {    // collision
                    this.collisionDetected = true;
                }
            }
        } else {    // we need to do more calcs
            isCollide = sprite.currentMap.setNextYTop(sprite, TYPE.WALL);
        }
        // nextX = sprite.map.max(nextX, wallX - nextX)
        // then check if we hit a wall
        // console.log('nextPositionNotHandledYet');
        // limitx
        /*            if (this.sprite.vx) {
                        
                    }*/
        // after moving, we check if we reached or left a platform
        // var bool = sprite.currentMap.checkForPlatform(sprite, x, y);            
    }
};

export default PlayerMove2;