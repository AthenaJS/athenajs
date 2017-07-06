define([
		'Sprite',
		'MapCore',
		'Tile',
		'ResourceManager'
	],
	function(Sprite, Map, Tile, ResourceManager) {
		/*jshint devel: true*/
		/*globals Class*/
		var Screen = Class.extend({
			init: function(options) {
                this.id = options.id || 'screen' + new Date().getTime();
				this.resources = options.resources;
                this.needsRefresh = false;

				// will store images needed by the screen's sprites/backgrounds
				this.objects = {};

                this.readyDef = null;

				this.loadResources();
			},
			loadResources: function() {
				console.log('loading Resources...');
				this.readyDef = ResourceManager.addResources(this.resources);

				this.readyDef.done(this.cacheImages.bind(this));

				ResourceManager.loadResources('any', function(progress) {
					console.log('loading progress', progress + '%');
				});

			},
            draw: function(ctx) {
                let i = 0,
                    max = this.objects.length;
                    
                for (i = 0; i < max; i++) {
                    this.objects[i].draw(ctx);
                }
            }
        });

        return Screen;
    }
);
