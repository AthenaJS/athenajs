import RM from '../Resource/ResourceManager';

export default class Wave {
	constructor(options) {
		this.counter = options.size;
		this.type = options.afterDestroy;
		this.data = options.afterDestroyData;
	}

	remove(element) {
		this.counter--;

		if (!this.counter) {
			this.destroy(element);
		}
	}

	destroy(element) {
		switch (this.type) {
			case 'reward':
				if (this.data) {
					let reward = new (RM.getResourceById('SmallItem'))({
						x: element.x + 24,	// bad: hardcoded !!
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
				throw ('reward not implemented', this.type);
				break;
		}
	}
};
