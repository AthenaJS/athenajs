import Drawable from './Drawable';
import FX from '../FX/FX';

/**
 * The BitmapText class allows to use a spritesheet as a font to draw text onto the screen
 * 
 * @extends Drawable
 */
class BitmapText extends Drawable {
    /**
     * Creates a new BitmapText Drawable
     * 
     * <blockquote><strong>Note:</strong> the charset is limited to a subset of ascii right now: a-z 0-9</blockquote>
     * 
     * @param {String} [type='BitmapText'] The type of the sprite.
     * @param {Object} options The options describing the BitmapText.
     * @param {String} options.imageId The path to the spritesheet file.
     * @param {Number} [options.charWidth] The width of a character in pixels.
     * @param {Number} [options.charHeight] The height of a character in pixels.
     * @param {String} [options.characters] The list of supported characters in the spritesheet
     * @param {Number} [options.offsetX=charWidth] The full width of the character (including spaces) inside the spritesheet
     * @param {Number} [options.letterSpacing=2] The space between each drawn character (in pixels).
     * @param {Number} [options.startY=0] The optinal vertical offset at which to start getting bitmap characters.
     * @param {Number} [options.startX=0] The optinal hoeizontal offset at which to start getting bitmap characters.
     *
     * @example
     *
     *  let myFont = new BitmapText('myFont', {
     *      charWidth: 18,
     *      charHeight: 18,
     *      imageId: 'font'
     *      offsetX: 34,
     *      startY: 36
     *   });
     *
     */
    constructor(type = 'BitmapText', options) {
        super(type, options);

        // TODO: maybe we want to have fullsize ?
        this.width = options.width || 320;
        this.height = options.height || 18;

        this.pixelHeight = 0;

        this.easing = FX.getEasing(options.easing || 'linear');

        this.imageId = options.imageId || 'image not set';

        this.characters = options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        if (options.imageSrc) {
            this.imageId = options.imageSrc;

            // RM.loadImage({
            // 	src: options.imageSrc,
            // 	id: options.imageSrc,
            // 	type: 'image'
            // }).then((img) => {
            // 	console.log('bitmapText image ready!');
            // 	this.setImage(img);
            // });
        }
        // TODO: buffer should be created here and not when object is added to the scene
        this.buffer = null;

        this.image = null;

        this.scrolling = false;

        this.text = options.text || 'BitmapText';

        /*			this.charCodes = this.getCharCodes(this.text);*/

        this.scrollOffsetX = options.scrollOffsetX || 0;
        this.scrollOffsetY = options.scrollOffsetY || 0;

        this.textArray = [];

        this.setFontParams(options);
    }

    /**
     * Generates a new buffer that can hold current text
     *
     * @param {Display} display the display to get the buffer from
     */
    createBuffer(display) {
        // generate a buffer with enough height to hold every lines of text
        let width = this.width,
            height = this.height;
        // this.textArray.length * (this.charHeight + this.lineSpacing);

        this.buffer = display.getBuffer(width, height);
    }

    /**
     * Clears the buffer
     */
    clearBuffer() {
        this.currentScene.display.clearScreen(this.buffer);
    }

    /**
     * Sets bitmapText properties using options
     *
     * @param {Object} options
     */
    setFontParams(options) {
        this.lineSpacing = options.lineSpacing || 2;
        this.letterSpacing = options.letterSpacing || 2;

        this.charWidth = options.charWidth || 16;               // 16
        this.charHeight = options.charHeight || 18;     // 18
        this.maxCharPerLine = Math.floor(this.width / (this.charWidth + this.letterSpacing));
        this.maxPixels = this.maxCharPerLine * ((this.charWidth + this.letterSpacing));

        this.offsetX = options.offsetX || this.charWidth;     // 34
        this.startX = options.startX || 0;  // 0
        this.startY = options.startY || 0;  // 36
    }

    /**
     * Resets the bitmapFont to its default options
     * 
     * @private
     */
    _reset() {
        super._reset();
        this.setTextPosition();
    }
    /*		getCharCodes: function(str) {
                var charCodes = [];

                for (var i = 0; i < str.length; ++i) {
                    charCodes.push(str.charCodeAt(i));
                }
            },*/
    /**
     * Returns the length of a text line, in characters
     *
     * @param {String} str The string to mesure.
     * @param {String} eof The character to use as end of line.
     *
     * @returns {Number} The length of the string
     */
    getNextLineLength(str, eof) {
        let length = 0;


        while (length < str.length && str[length] !== eof) {
            length++;
        }

        return length;
    }

    /**
     * Calculates the position and size of each pixel lines to be rendered onto the screen
     */
    getLines() {
        let str = this.text,
            line = '',
            end = false,
            i = 0,
            j = 0;

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
                    x: this.align === 'center' ? Math.floor((this.maxPixels - (line.length * (this.charWidth + this.letterSpacing))) / 2) : 0,
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
     * @param {Function} [callback=undefined] An optional callback to fire when the scrolling is over.
     */
    scrollFromBottom(duration, callback) {
        // set scrollPos to offscreen
        this.scrollOffsetY = this.height;

        this.scrollText({
            callback: callback,
            duration: duration,
            targetOffsetX: 0,
            targetOffsetY: this.height - this.pixelHeight
        });
    }

    /**
     * Scrolls text from the top, firing an optional callback at the end
     *
     * @param {Number} duration The duration of the scrolling in milliseconds.
     * @param {Function} [callback=undefined] An optional callback to fire when the scrolling is over.
     */
    scrollFromTop(duration, callback) {
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
     * <blockquote><strong>Note:</strong> if a scrolling is already in progress, nothing happens</blockquote>
     * 
     * @param {Object} options
     * @param {Number} options.targetOffsetX The horizontal destination of the scrolling.
     * @param {Number} options.targetOffsetY The vertical destination of the scrolling.
     * @param {Number} options.duration The duration of the scrolling, in milliseconds.
     * @param {Function} [options.callback=undefined] An optional callback function to call when the scrolling is done.
     *
     * @private
     */
    scrollText(options) {
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
    setTextPosition() {
        // set back text position (resets scrolling)
    }

    /**
     * update() is called at each render loop and calculates the next position during a scrolling
     */
    update() {
        let currentTime = new Date().getTime(),
            ellapsedTime = currentTime - this.startMoveTime,
            t = ellapsedTime / this.duration,
            moveProgress;

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
    getCharOffset(char) {
        // The magic happens here!
        // let code = char.toUpperCase().charCodeAt(0) - 65;
        let index = this.characters.indexOf(char);

        if (index < 0) {
            index = this.characters.indexOf(char.toUpperCase());
        }

        // return code * this.offsetX;
        return index * this.offsetX;
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
    drawLine(options) {
        let x = options.x,
            y = options.y,
            i = 0,
            offset = 0,
            max = options.text.length;

        // draw each character
        for (i = 0; i < max; ++i) {
            if (options.text[i].charCodeAt(0) !== 32) {
                offset = this.getCharOffset(options.text[i]);
                if (offset >= 0) {
                    this.buffer.drawImage(this.image, offset, this.startY, this.charWidth, this.charHeight, x, y, this.charWidth, this.charHeight);
                } else {
                    console.log(`[BitmapText] character ${options.text[i]} not supported`);
                }
            }
            x += this.letterSpacing + this.charWidth;
        }
    }

    /**
     * Pre-renders text from this.textArray into the internal buffer
     *
     */
    renderText() {
        let i = 0,
            max = 0,
            line;

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
    setText(text) {
        this.text = text;

        this.getLines();

        // generate wide-enough internal buffer to hold every lines of text
        if (!this.buffer) {
            this.createBuffer(this.currentScene.display);
        } else {
            this.clearBuffer();
        }

        this.renderText();
    }

    /**
     * Changes the image to use as spritesheet
     *
     * @param {Image} image The new {image} to use as source.
     */
    setImage(image) {
        if (!image) {
            console.warn('[BitmapText] setImage(): image not loaded', this.imageId || this.imageSrc);
            return;
        }

        this.image = image;
    }

    /**
     * Sets the scene of the bitmap font
     *
     * @param {Scene} scene The scene to use.
     */
    setScene(scene) {
        super.setScene(scene);

        this.setText(this.text);
    }

    /**
     * Draws pre-rendered into destination buffer
     *
     * <blockquote><strong>Note:</strong> once added onto the scene, this method is automatically called at each render loop.</blockquote>
     * 
     * @param {RenderingContext} destCtx The new cancas context where to draw the bitmap font.
     *
     *
     * @related {Scene}
     *
     * @private
     */
    draw(destCtx) {
        var destY,
            copyHeight,
            copyStartY,
            scaledW = this.width * this.scale,
            scaledH = this.height * this.scale,
            subScaledW = Math.floor(scaledW / 2),
            subScaledH = Math.floor(scaledH / 2),
            mapOffsetX = this.currentMap && this.currentMap.viewportX || 0,
            mapOffsetY = this.currentMap && this.currentMap.viewportY || 0,
            width = this.width,
            height = this.height;

        /* if image isn't loaded yet, simply do not render the object */
        if (!this.visible || !this.image) {
            return;
        }

        this.executeFx(destCtx);

        if (this.scrollOffsetY >= 0) {
            destY = this.scrollOffsetY;
            copyHeight = this.height - destY;
            copyStartY = 0;
        } else {
            destY = 0;
            copyHeight = height;    // auto clipped ?
            copyStartY = Math.abs(this.scrollOffsetY);
        }
        // if this.scrolling, need to first offset text into this.buffer

        destCtx.setTransform(this.scale, 0, 0, this.scale, this.x + mapOffsetX + subScaledW, this.y + mapOffsetY + subScaledH);
        destCtx.rotate(this.angle);

        destCtx.drawImage(this.buffer.canvas, 0, copyStartY, Math.floor(width), Math.floor(height), Math.floor(-subScaledW), Math.floor(-subScaledH), Math.floor(scaledW), Math.floor(scaledH));
    }
};

export default BitmapText;
