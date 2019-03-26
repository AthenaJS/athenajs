import Drawable from './Drawable';
import Deferred from '../Util/Deferred';
import Dom from '../Util/Dom';

/*jshint devel: true, bitwise: false*/
/**
 * This class extends {Drawable} to implement 2D sprites using an image sprite sheet.
 *
 * A sprite can have an infinite number of animations.
 * Each animation can have a different frameDuration and any number of frames.
 * Each frame may have a different size and a different hitbox
 *
 * <blockquote><strong>Note:</strong> Since games usually have multiple sprites of the same type, it's common to extend the Sprite class
 * to generate each sprite type with its own properties and then use these sprites instead of instanciating
 * the Sprite class.</blockquote>
 *
 *
 * @extends Drawable
 */
class Sprite extends Drawable {
    /**
     * Creates a new Sprite
     *
     * @param {String} type An identifier for this sprite, can be for example `enemy1`,...
     * @param {Object} options An options hash for the object.
     * @param {String} options.imageId The id to the spritesheet image to use.
     * @param {Object} options.animations A map with a key for each animation of the sprite.
     *
     * @see {@link #Drawable|Drawable} for additionnal parameters
     * @example
     *
     * let mySprite = new Sprite('gem', {
     *  imageId: 'objects',
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
     *              width: 31,
     *              height: 31,
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
     *              width: 31,
     *              height: 31,
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
     */
    constructor(type, options) {
        super(type || 'Sprite', options || {});

        this.imageId = options && options.imageId || null;

        // NOTE: sometimes it is done by drawable.reset(), sometimes not
        // animations can now be added later
        if (options && options.animations) {
            this.load(options.animations);
        }
    }

    /**
     * Init default sprite properties
     */
    initProperties() {
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
    debug(isDebug) {
        this.isDebug = isDebug;
    }

    /**
     * Adds a new animation to the sprite
     *
     * @param {String} name The name of the new animation.
     * @param {String} id The id of the resource (image) to use for the animation.
     * @param {Object} [options={}] The animation to add, see:
     * @param {number} [options.offsetX=0] The x offset of the sprite frames inside the image.
     * @param {number} [options.offsetY=0] The y offset of the sprite frames inside the image.
     * @param {number} [options.frameWidth] The width of a frame.
     * @param {number} [options.frameHeight=imageHeight] The height of a frame. By default frameHeight is taken from image.naturalHeight.
     * @param {number} [options.frameDuration=1] The duration of a frame (1 = 16ms).
     * @param {number} [options.frameSpacing=0] The space between each frame.
     * @param {number} [options.loop=1] 0 = anim play once and stops at the end, 1 = anim loops to frame 1 at the end, 2 = anim will play in reverse when reaching the end, then plays again, etc.
     * @returns {Deferred} a deferred object that's resolved once the animation is ready.
     * @example
     * // creates a new animation from the image run.png
     * mySprite.addAnimation ('running', 'run.png', {
     *    frameWidth: 32
     * })
     */
    addAnimation(name, id, options = {}) {
        let animations = {};

        animations[name] = Object.assign({
            frameDuration: 1,
            loop: 1,
            frames: []
        }, options);

        if (!options.frameWidth || !options.frameHeight || !options.numFrames) {
            console.error('Parameter missing: frameWidth, frameHeight, numFrames are all required!');
            return;
        }

        // this.imageSrc = source;
        this.imageId = id;

        // RM.loadImage({
        //     src: source,
        //     id: source,
        //     type: 'image'
        // }).then((img) => {
        //     this.setImage(img);
        // });

        let x = options.offsetX || 0,
            y = options.offsetY || 0,
            i = 0,
            numFrames = options.numFrames || 0,
            frames = animations[name].frames,
            frameHeight = options.frameHeight,
            frameSpace = options.frameWidth + (options.frameSpacing || 0);

        while (i < numFrames) {
            frames.push({
                offsetX: x,
                offsetY: y,
                width: options.frameWidth,
                height: frameHeight,
                hitBox: {
                    x: 0,
                    y: 0,
                    x2: options.frameWidth - 1,
                    y2: frameHeight - 1
                }
            });
            x += frameSpace;
            i++;
        }

        if (numFrames) {
            this.load(animations);
        }
    }

    /**
     * Loads animations from settings, flipping sprites if needed
     * and sets the last animation of the array as current animation
     *
     * @param {Object} [anims] The animations map to load.
     */
    load(anims) {
        // if (!this._settings)
        //     debugger;

        let animations = anims || this._settings.animations,
            lastName;

        if (!this.loaded) {
            this.initProperties();
        }

        Object.keys(animations).forEach((name) => {
            let animation = animations[name];
            this.animations[name] = animation;
            lastName = name;
            // handle flip of sprites
            if (animation.flipFrom) {
                this.updateFlipAnimation(animation, animation.flipFrom, animation.flipType);
            }
        });

        if (!this.loaded) {
            this.loaded = true;
            // by default, the last animation becames the current one
            this.setAnimation(lastName);
        }
    }

    /**
     * WIP: updateFlipAnimation
     *
     * It's possible to define a new animation that is simply the flip of another one
     * This method copies the frames of the source animation and flips them
     *
     * @param {Object} anim The animation to create frames for.
     * @param {String} flipFrom The name of the animation to use as reference.
     * @param {Number} flipType The direction of the flip: set to 1 for left/right flip, 2 for top/bottom flip.
     *
     */
    updateFlipAnimation(anim, flipFrom, flipType) {
        let animFromFrames = this.animations[flipFrom].frames;

        // copy frames from source animation (keeping references)
        anim.frames = new Array(animFromFrames.length);

        // right now, flip animations only contain the flipType: 1 = horiz, 2 = vert, 3 = both
        // we only need to define hitBoxes
        for (let i = 0; i < animFromFrames.length; ++i) {
            anim.frames[i] = {};
            // $.extend(true, anim.frames[i], animFromFrames[i]);
            Object.assign(anim.frames[i], animFromFrames[i]);
            if (flipType & 1) {
                anim.frames[i].hitBox.x = animFromFrames[i].width - animFromFrames[i].hitBox.x2;
                anim.frames[i].hitBox.x2 = animFromFrames[i].width - animFromFrames[i].hitBox.x;
            }
            if (flipType & 2) {
                anim.frames[i].hitBox.y = animFromFrames[i].height - animFromFrames[i].hitBox.y2;
                anim.frames[i].hitBox.y2 = animFromFrames[i].height - animFromFrames[i].hitBox.y;
            }
        }
    }

    /**
     * Changes the source image for this sprite
     *
     * @param {Image} image the new Image to use as spritesheet.
     * @param {Boolean} [force=false] will replace current image with a new one if force == false.
     */
    setImage(image, force = false) {
        if (!image) {
            console.warn('[Sprite] setImage(): image not loaded', this.imageId || this.imageSrc);
            return;
        }

        if (this.image && !force) {
            return;
        }

        this.image = image;

        // set image for children as well, this means
        // we assume children are using same image as parent
        // and this is BAD! ;)
        this.children.forEach((child) => {
            child.setImage(image);
        });
    }

    /**
     * Plays the animation from the end up to the first frame
     */
    rewind() {
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
    nextFrame() {
        if (!this.running) {
            return;
        }

        this.currentFrameNum += this.direction;

        if (this.currentFrameNum < 0 || this.currentFrameNum >= this.numFrames) {
            switch (this.currentAnim.loop) {
                // reverse loop
                case 2:
                    this.direction = -this.direction;
                    this.currentFrameNum = (this.currentFrameNum < 0) ? 0 : this.numFrames - 1;
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
    storeCurrentAnim() {
        this.storedAnimName = this.currentAnimName;
        this.storedFrameNum = this.currentFrameNum;
    }

    /**
     * Restore animation to a previous saved state
     *
     * @related {storeCurrentAnim}
     */
    restorePreviousAnim() {
        this.setAnimation(this.storedAnimName, null, this.storedFrameNum);
    }

    /**
     * advanceFrame is called at each render loop and waits for currentAnim.frameDuration
     * before advancing to the next animation frame.
     *
     * @param {String} animName The name to advance.
     *
     * If animName != currentAnimName then switches to the new animation
     */
    advanceFrame(animName) {
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
     * @returns {Number} The width of current animation frame
     *
     */
    getCurrentWidth() {
        // TODO: handle scale/rotate ?
        return this.currentFrame.width;
    }

    /**
     * @returns {Number} the height of current animation frame
     */
    getCurrentHeight() {
        // TODO: handle scale/rotate ?
        return this.currentFrame.height;
    }

    /**
     * Returns the x offset in the spritesheet of current animation frame
     *
     * @returns {number} current frame horizontal offset in the spritesheet
     */
    getCurrentOffsetX() {
        return this.currentFrame.offsetX;
    }

    /**
     * Returns the y offset in the spritesheet of current animation frame
     *
     * @returns {number} current frame vertical offset in the spritesheet
     */
    getCurrentOffsetY() {
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
    getCurrentShiftX() {
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
    getCurrentShiftY() {
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
    getHitBox() {
        return this.currentFrame.hitBox || {
            x: 0,
            y: 0,
            x2: this.getCurrentWidth() - 1,
            y2: this.getCurrentHeight() - 1
        };
    }

    /**
     * Returns hitbox position
     *
     * @returns {Object} the hitbox position using current sprite position
     */
    getHitBox2() {
        const box = this.currentFrame.hitBox;

        return {
            x: this.x + box.x,
            x2: this.x + box.x2,
            y: this.y + box.y,
            y2: this.y + box.y2
        };
    }

    /**
     * Centers the sprite horizontaly around a tile
     *
     * @param {Object} tilePos The tile to center the sprite on.
     */
    centerXOverTile(tilePos) {
        let tileWidth = this.currentMap.tileWidth,
            currentWidth = this.getCurrentWidth(),
            // currentWidth = this.getHitBox().x2 - this.getHitBox().x,
            shift = Math.floor((tileWidth - currentWidth) / 2);

        if (currentWidth <= tileWidth) {
            this.x = (tilePos.x * tileWidth) + shift;
        }
    }

    /**
     * Stops current animation from running
     *
     * TODO: rename this method
     */
    clearMove() {
        this.running = false;
        // super.clearMove();
    }

    /**
     * Changes the sprite's current animation
     *
     * @param {String} anim The new animation to play.
     * @param {Function} [fn=undefined] An optionnal callback to run when the animation will have ended.
     * @param {number} [frameNum=0] The first frame to play, defaults to zero.
     * @param {Boolean} [revert=false] Whether to start playing the animation from the last frame.
     */
    setAnimation(anim, fn, frameNum, revert) {
        // console.log('[Sprite] setting animation of', this.type, 'to', anim);
        // load animations if not loaded
        if (!this.loaded) {
            this.load();
        }

        try {
            if (this.currentAnim) {
                this._animationEnded();
            }

            this.animEndDef = new Deferred();

            if (this.currentAnim) {
                this._animationChanged(this.currentAnimName, anim);
            }

            this.animChangeDef = new Deferred();

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
            console.error('[Sprite] setAnimation() - unable to set animation ', anim, '(' + err.message + ')', 'for sprite', this.id);
        }
    }

    /**
     * Stops playing current animation
     *
     * @param {Boolean} runPreviousEndMethod Set to false if you don't want to run the end callback functions.
     */
    stopAnimation(runPreviousEndMethod) {
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
    startAnimation() {
        this.running = true;
    }

    /**
     * Adds a new function that will be called when current animation ends
     *
     * @param {Function} func The callback to execute.
     */
    onAnimationEnd(func) {
        // console.log(this.currentAnimName, 'animationEnd');
        this.animEndDef.promise.then(func.bind(this));
    }

    /**
     * Adds a new function that will be called when a new animation is ran
     *
     * @param {Function} func The callback function to add.
     */
    onAnimationChange(func) {
        this.animChangeDef.promise.then(func.bind(this));
    }

    /**
     * Runs every registered end callback function
     *
     * @private
     */
    _animationEnded() {
        // console.log('animationEnd', this.currentAnimName);
        this.animEndDef.resolve(this.currentAnimName, this.currentFrameNum);
    }

    /**
     * Runs every registered change callback function
     *
     **@param {String} oldAnim The previous animation.
     * @param {String} newAnim The new animation to be played.
     *
     * @private
     */
    _animationChanged(oldAnim, newAnim) {
        this.animChangeDef.resolve(oldAnim, newAnim/*, this.currentAnimName*/);
    }

    /**
     * onHit is called when a collision has been detect between the sprite and another graphical object
     *
     * @param {Drawable} obj The graphical object that collided.
     */
    onHit(obj) {
        super.onHit(obj);
        console.log('[Sprite] oops, ', this.type, ' [', this.id, '] ', 'was hit by', obj.name, ' [', obj.id, ']');
    }

    /**
     * Draws the sprite onto the canvas context passed
     *
     * @param {CanvasRenderingContext2D} destCtx The context where to render the sprite.
     *
     * @private
     */
    draw(destCtx/*, debug = false*/) {
        if (!this.visible || !this.image || !this.currentAnimName) {
            return;
        }

        // auto goto next frame
        if (this.currentAnimName.length) {
            this.advanceFrame(this.currentAnimName);
        }

        let w = this.getCurrentWidth(),
            scaledW = w * this.scale,
            h = this.getCurrentHeight(),
            scaledH = h * this.scale,
            subScaledW = Math.floor(scaledW / 2),
            subScaledH = Math.floor(scaledH / 2),
            sheetX = this.getCurrentOffsetX(),
            sheetY = this.getCurrentOffsetY(),
            drawX = this.currentAnim.flipFrom ? (this.x + this.getCurrentShiftX() - scaledW) : (this.x + this.getCurrentShiftX()),
            drawY = this.currentAnim.flipFrom ? (this.y + this.getCurrentShiftY() - scaledH) : (this.y + this.getCurrentShiftY()),
            mapOffsetX = this.currentMap && this.currentMap.viewportX || 0,
            mapOffsetY = this.currentMap && this.currentMap.viewportY || 0;

        // if width or height equals to 0 we may skip drawing
        // this fixes IndexSizeError in Firefox
        if (!w || !h) {
            return;
        }

        this.executeFx(destCtx);

        if (this.mask && !this.mask.exclude) {
            this._applyMask(destCtx, Math.floor(drawX + mapOffsetX), Math.floor(drawY + mapOffsetY));
        }

        destCtx.setTransform(this.scale, 0, 0, this.scale, drawX + mapOffsetX + subScaledW, drawY + mapOffsetY + subScaledH);
        destCtx.rotate(this.angle);
        if (this.id.startsWith('shape') && this.y > 60) {

        }
        destCtx.drawImage(this.image, Math.floor(sheetX), Math.floor(sheetY), Math.floor(w), Math.floor(h), Math.floor(-subScaledW), Math.floor(-subScaledH), Math.floor(scaledW), Math.floor(scaledH));
        // destCtx.restore();

        // in exclude mode, we need to write the mask after having rendered the object
        if (this.mask && this.mask.exclude) {
            destCtx.setTransform(1, 0, 0, 1, 0, 0);
            this._applyMask(destCtx, Math.floor(drawX + mapOffsetX), Math.floor(drawY + mapOffsetY));
        }

        // undo clipping as it's specitic to the object
        this._undoMask(destCtx);
    }

    /**
     * Draws all sprite animation frames onto a temporary canvas that is added to the body tag
     *
     * This is used for debugging sprites
     *
     * @private
     */
    describeAllAnimations() {
        let animation = null,
            that = this,
            destX = 1,
            destY = 1,
            width = 0,
            height = 0,
            totalWidth = 0,
            totalHeight = 0,
            canvas,
            ctx = null;

        Object.keys(this.animations).forEach((animationName) => {
            animation = this.animations[animationName];
            width = animation.frames[0].width;
            height = animation.frames[0].height;

            if ((width + 5) * animation.frames.length > totalWidth) {
                totalWidth = (width + 5) * animation.frames.length;
            }

            totalHeight += (height + 5);
        });

        canvas = document.getElementById('describe');

        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'describe';
            canvas.setAttribute('width', totalWidth.toString());
            canvas.setAttribute('height', totalHeight.toString());
        }

        ctx = Dom('#describe')[0] && Dom('#describe')[0].getContext('2d') || new Dom('canvas').attr('id', 'describe').attr('width', totalWidth).attr('height', totalHeight).css('zIndex', '100').appendTo('body')[0].getContext('2d');

        ctx.webkitImageSmoothingEnabled = false;

        Object.keys(this.animations).forEach((animationName) => {
            destX = 1;

            animation = this.animations[animationName];
            console.log(animationName, 'got', animation.frames.length);
            console.log('frameDuration=', animation.frameDuration);
            console.log('loop=', animation.loop);
            console.log('loopFrom=', animation.loopFrom);
            console.log('rewindOnEnd', animation.rewindOnEnd);

            animation.frames.forEach((frame) => {
                var w = frame.width,
                    h = frame.height,
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
     * Returns the sprite's animation map
     *
     * @returns {Object} return the sprite's animations map
     *
     * Used for debugging
     *
     * @private
     */
    listAnimations() {
        return this.animations;
    }
}

export default Sprite;