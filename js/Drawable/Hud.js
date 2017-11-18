// define(['Sprite'], function() {
import Sprite from './Sprite';
/*jshint devel: true, bitwise: false*/
/*globals Class*/
class Hud {
	constructor(options) {
		// super(options);

		this.score = options.score || 0;
		this.alertnateScore = options.alternateScore || 0;
		this.energy = options.energy || 100;
		this.$dest = options.target;
		this.info = '';
		this.inventory = {};

		this.width = options.width || 1024;
		this.height = options.height || 64;

		Object.defineProperty(this, "score", {
			get: function () {
				return this.score;
			},

			set: function (score) {
				// TODO: some checks
				this.score = score;
			}
		});
	}

	drawBackground() {

	}

	draw() {
		// TODO
		this.drawBackground();
	}
}

export default Hud;
