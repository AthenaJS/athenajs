
	/*jshint devel: true, bitwise: false*/
	class Tile{
		constructor(options) {
			this.offsetX = options.offsetX || 0;
			this.offsetY = options.offsetY || 0;
			this.width = options.width || 0;
			this.height = options.height || 0;

			// move
			this.inertia = options.inertia || 1;			// this is the inertia factor
			this.upCollide = options.upCollide || true;		// will object collide when dropping over this tile ?
			this.downCollide = options.downCollide || true;
		}

		static get TYPE() {
			return {
				AIR: 1,
				WALL: 2,
				LADDER: 3
			};
		}
	};

	export default Tile;
