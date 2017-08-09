import GfxObject from 'Object/Object';

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
export default class Text extends GfxObject {
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

        this._setFont();

        this.setText(options.text || '');

        this.w = options.w || 0;
        this.h = options.h || 0;
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
     * @param {Number} w The width of the object.
     * @param {Number} h The height of the object.
     */
    setSize(w, h) {
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
    setText(text, align) {
        this.text = text;
        this.align = align || 'center';
    }

    /**
     * Change the color of the object
     * 
     * @param {String} color Thew new color to use, can be anything that is valid for the `color` *CSS* property.
     */
    setColor(color) {
        this.color = color;
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
        return this.w;
    }

    /**
     * Returns the height of the text object
     * 
     * @returns [Number] The object's height
     */
    getCurrentHeight() {
        return this.h;
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
     * @param {GfxObject} obj The graphical object that collided.
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
        if (!this.visible) {
            return;
        }

        this._applyMask(destCtx, this.x, this.y);

        const fakeHeight = parseInt(destCtx.font),
            lines = this.text.split('\n');

        destCtx.fillStyle = this.color;
        destCtx.font = this.font;
        destCtx.textBaseline = 'top';

        if (this.angle !== 0) {
            destCtx.save();
            destCtx.rotate(this.angle);
        }

        for (let i = 0; i < lines.length; ++i) {
            destCtx.fillText(lines[i], this.x, this.y + fakeHeight * i);
        }

        if (this.angle !== 0) {
            destCtx.restore();
        }

        this._undoMask();
    }

    /**
     * Generates the font css property using current this.fontSize and this.fontFace
     */
    _setFont() {
        this.font = this.fontSize + ' ' + this.fontFace;
    }
};
