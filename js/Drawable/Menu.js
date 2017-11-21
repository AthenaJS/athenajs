import Drawable from './Drawable';
import SimpleText from './SimpleText';


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
class Menu extends Drawable {
    constructor(type, options) {

        super(type, options);
        // this.type = type;
        // this.id = this.type + new Date().getTime();

        this.title = new SimpleText(type, {
            color: options.color || 'black',
            text: options.title || 'Menu Title'
        });

        this.color = options.color || 'white';
        this.selectedColor = options.selectedColor || 'red';

        this.menuItems = [];

        this.selectedItem = options.selectedItem || 0;

        this.selectCallbacks = [];
        this.hoverCallbacks = [];

        this.itemHeight = options.itemHeight || 40;

        // SUPERHERE this._super(type, options);

        this.title.moveTo(this.x, this.y);

        this.addMenuItems(options.menuItems || []);
    }

    /**
     * Adds a new menu item
     *
     * @param {Object} menu An hash describing the menu.
     * The hash can have the following properties:
     * { text: 'menu text', selectable: true|false, active: true|false, visible: true|false }
     */
    addMenuItem(menu) {
        let y = this.y + ((this.menuItems.length + 1) * this.itemHeight),
            menuItem = new SimpleText('menuItem' + this.menuItems.length, menu);

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
    addMenuItems(items) {
        console.log('addMenuItems', items);

        items.forEach((item, idx) => {
            this.addMenuItem(item);
            if (item.active) {
                this.selectedItem = idx;
            }
        });
    }

    /**
     * Selects the next item in the item list
     *
     * @private
     */
    nextItem() {
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
    getSelectedItemIndex() {
        return this.selectedItem;
    }

    /**
     * Returns the current selected Item object
     *
     * @returns {Object} Current selected item.
     *
     * @private
     */
    getSelectedItem() {
        return this.menuItems[this.selectedItem];
    }

    /**
     * Updates the text of a menu item
     *
     * @param {Number} itemId The index of the item to modify.
     * @param {String} text The new text.
     *
     */
    setText(itemId, text) {
        this.menuItems[itemId] = text;
    }

    /**
     * Draw method for the Text object
     *
     * @param {CanvasContext} destCtx The canvas context where to draw the menu
     *
     * @private
     */
    draw(destCtx) {
        if (this.angle !== 0) {
            destCtx.save();
            destCtx.rotate(this.angle);
        }

        this.title.draw(destCtx);

        this.menuItems.forEach((menuItem, idx) => {
            if (idx === this.selectedItem) {
                menuItem.color = this.selectedColor || 'blue';
            } else {
                menuItem.color = this.color;
            }
            menuItem.draw(destCtx);
        });

        if (this.angle !== 0) {
            destCtx.restore();
        }
    }
};

export default Menu;
