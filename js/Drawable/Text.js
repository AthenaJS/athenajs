import Drawable from './Drawable';

/*jshint devel: true, bitwise: false*/
/**
 * Basic class for displaying text using Canvas
 *
 * @param {String} type The type of the graphic object
 * @param {Object} options
 * @param {String} [options.text=undefined] The initial text. Can be changed later using Text.setText().
 * @param {Number} [options.width=0] The width of the text.
 * @param {Number} [options.height=0] The height of the text.
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
export default class Text extends Drawable {
    constructor(type = 'Text' + new Date().getTime(), options = {}) {
        // type = type || 'Text' + new Date().getTime();
        // options = options || {};

        super(type, options);

        this.fontFace = options.fontFace || 'Arial';
        this.fontStyle = options.fontStyle || 'normal';
        this.fontSize = options.fontSize || '18px';
        this.fontWeight = options.fontWeight || 'normal';
        this.align = options.align || 'center';
        this.color = options.color || 'white';

        this.width = options.width || 0;
        this.height = options.height || 0;

        this.buffer = null;

        this.text = options.text || '';
    }

	/**
	 * Generates a new buffer that can hold current text
	 *
	 * @param {Display} display the display to get the buffer from
	 */
    createBuffer(display) {
        // generate a buffer with enough height to hold every lines of text
        let width = this.fakeWidth || 0,
            height = this.fakeHeight || 0;
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
     * TODO
     *
     * @private
     */
    moveWithSpline() {

    }

    /**
     * Change the size of the object
     *
     * @param {Number} width The width of the object.
     * @param {Number} height The height of the object.
     */
    setSize(width, height) {
        if (width !== null) {
            this.width = width;
        }

        if (height !== null) {
            this.height = height;
        }
    }

    /**
     * Prepare render by getting text metrics and creating temp text buffer
     */
    prepareRender() {
        this._setFont();
        this.lines = this.text.split('\n');

        if (!this.buffer) {
            this.createBuffer(this.currentScene.display);
        } else {
            this.clearBuffer();
        }

        this.getMetrics();
    }

    getMetrics() {
        const ctx = this.buffer;
        ctx.font = this.font;
        this.fakeLineHeight = parseInt(ctx.font);
        this.fakeHeight = this.lines.length * this.fakeLineHeight;
        this.fakeWidth = ctx.measureText(this.text).width;

        // set correct with/height since we now have the width
        ctx.canvas.width = this.fakeWidth;
        ctx.canvas.height = this.fakeHeight;

        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.textBaseline = 'top';
        console.log('metrics', this.fakeWidth, this.fakeHeight);
    }

    /**
     * pre-renders text in a temp canvas
     */
    renderText() {
        this.prepareRender();
        for (let i = 0; i < this.lines.length; ++i) {
            this.buffer.fillText(this.lines[i], 0, this.fakeLineHeight * i);
        }
    }

    /**
     * Updates the text's object
     *
     * @param {String} text the new text of the Text object
     */
    setText(text) {
        this.text = text;
        this.renderText();
    }

    setScene(scene) {
        super.setScene(scene);

        this.setText(this.text);
    }

    /**
     * Change the color of the object
     *
     * @param {String} color Thew new color to use, can be anything that is valid for the `color` *CSS* property.
     */
    setColor(color) {
        this.color = color;
        this.renderText();
    }

    /**
     * Returns the hitbox of the text object
     *
     * @returns {Object} The new hitbox
     */
    getHitBox() {
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
    getCurrentWidth() {
        return this.fakeWidth;
    }

    /**
     * Returns the height of the text object
     *
     * @returns [Number] The object's height
     */
    getCurrentHeight() {
        return this.fakeHeight;
    }

    /**
     * Returns the horizontal offset of the text object
     *
     * @returns [Number] The object's horizontal offset
     */
    getCurrentOffsetX() {
        return this.offsetX;
    }

    /**
     * Returns the vertical offset of the text object
     *
     * @returns [Number] The object's vertical offset
     */
    getCurrentOffsetY() {
        return this.offsetY;
    }

    /**
     * Called when an object collides with the text Object
     *
     * @param {Drawable} obj The graphical object that collided.
     */
    onHit(obj) {
        super.onHit(obj);
        console.log('oops, ', this.type, ' [', this.id, '] ', 'was hit by', obj.name, ' [', obj.id, ']');
    }

    /**
     * Called on each render loop: renders the object on the destination canvas context
     *
     * @param {CanvasContext} destCtx Where to render the object.
     *
     * @private
     */
    draw(destCtx) {
        var destY,
            scaledW = this.fakeWidth * this.scale,
            scaledH = this.fakeHeight * this.scale,
            subScaledW = Math.floor(scaledW / 2),
            subScaledH = Math.floor(scaledH / 2),
            mapOffsetX = this.currentMap && this.currentMap.viewportX || 0,
            mapOffsetY = this.currentMap && this.currentMap.viewportY || 0,
            w = this.fakeWidth,
            h = this.fakeHeight;

        if (!this.visible || !this.buffer) {
            return;
        }

        this.executeFx(destCtx);

        destCtx.setTransform(this.scale, 0, 0, this.scale, this.x + mapOffsetX + subScaledW, this.y + mapOffsetY + subScaledH);
        destCtx.rotate(this.angle);

        destCtx.drawImage(this.buffer.canvas, 0, 0, Math.floor(w), Math.floor(h), Math.floor(-subScaledW), Math.floor(-subScaledH), Math.floor(scaledW), Math.floor(scaledH));
    }

    /**
     * Generates the font css property using current this.fontSize and this.fontFace
     */
    _setFont() {
        this.font = `${this.fontSize} ${this.fontFace}`;
    }
};
