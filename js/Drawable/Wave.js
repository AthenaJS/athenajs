import RM from '../Resource/ResourceManager';

/**
 * This class allows to handle wave of Drawables
 */
export default class Wave {
    constructor(options) {
        this.counter = options.size;
        this.type = options.afterDestroy;
        this.data = options.afterDestroyData;
        this.delay = options.afterDestroyDelay || 0;
    }

    remove(element) {
        this.counter--;

        if (!this.counter) {
            this.destroy(element);
        }
    }

    getSpriteOptions(element) {
        const options = Object.assign({}, this.data.spriteOptions);

        if (typeof options.x === 'string') {
            options.x = element.x + Number(options.x);
        }

        if (typeof options.y === 'string') {
            options.y = element.y + Number(options.y);
        }

        return options;
    }

    destroy(element) {
        switch (this.type) {
            case 'reward':
                if (this.data) {
                    debugger;
                    const spriteOptions = this.getSpriteOptions(element, this.data),
                        reward = new (RM.getResourceById(this.data.spriteId))(spriteOptions);

                    element.currentMap.addObject(reward);
                }
                break;

            default:
                throw ('reward not implemented', this.type);
        }
    }
};
