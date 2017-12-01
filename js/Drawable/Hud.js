/**
 * The Hud class is a WIP object that will make head-up display (HUD)
 * handling easier.
 * 
 * It's non fonctionnal yet
 * 
 * @private
 */
class Hud {
    /**
     * Creates a new Hud class
     * 
     */
    constructor(options) {
        // super(options);

        this.score = options.score || 0;
        this.alternateScore = options.alternateScore || 0;
        this.energy = options.energy || 100;
        this.$dest = options.target;
        this.info = '';
        this.inventory = {};

        this.width = options.width || 1024;
        this.height = options.height || 64;

        Object.defineProperty(this, 'score', {
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