import RM from 'ResourceManager';
import Map from 'Map';
import Selection from 'Selection';
 
	/*jshint devel: true, noempty: false*/

	let MapEditor = {
		init: function(options) {
			var that = this;

			options = options || {};

			this.map = null;
			this.wallsSelection = null;
			this.tilesSelection = null;
			this.mapHash = {};
			this.tiles = [];
			this.pics = {};
			this.renderCtx = null;
			this.$canvas = this.$viewport = this.$main = this.$tileViewport = this.$tileCanvas = this.tileCtx = null;
			this.$tileViewport = null;

			this.imagesLoaded = this.numImages = 0;

			this.mode = options.mode || 'walls';

			this.activeType = 1;

			this.types = [ null, 'walls', 'ladders' ];

			this.tilesStamp = [
				[0, 1]
			];

			this.readyDef = RM.addResources([
				// images
				{ id: 'sprites', type: 'image', src: 'gods/img/sprites_blue.png' },
				{ id: 'tiles', type: 'image', src: 'gods/img/gods_sprites_tiles_level1.png' },
				{ id: 'objects', type: 'image', src: 'gods/img/gods_objects.png' },
				{ id: 'enemies', type: 'image', src: 'gods/img/godsSpritesLevel1.png' },

				// objects
				{ id: 'gem', type: 'script', src: 'gods/js/sprites/Gem.js' },
				{ id: 'spear', type: 'script', src: 'gods/js/sprites/Spear.js' },
				{ id: 'spear-wood', type: 'script', src: 'gods/js/sprites/SpearWood.js' },
				{ id: 'enemy1', type: 'script', src: 'gods/js/sprites/Enemy1.js' },
				{ id: 'switch', type: 'script', src: 'gods/js/sprites/Switch.js' },
				{ id: 'smallItem', type: 'script', src: 'gods/js/sprites/SmallItem.js' },                
				{ id: 'gods', type: 'script', src: 'gods/js/sprites/GodsSprite.js' },

				// maps
				{ id: 'level1', type: 'map', src: 'gods/js/maps/mapLevel1.js' }
			]);

			this.cursor = '';

			RM.loadResources('any', function(progress) {
				console.log('loading progress', progress);
			});

			this.readyDef.done(function() {
				console.log("I'm ready :)");
				that.setMap(RM.getResourceById('level1'));
				that.map.debug(true);
                that.initViews();
				that.loadMap(that.$select.find('option:selected').val());
			}).fail(function(err) {
				alert('Ooops, some resources could not be loaded (' + err + ')');
			});
		},
		initViews: function() {
			var that = this;

			this.$main = $('<div class="main"/>');
            this.initOptions();
            this.initViewPort();
			this.initTilesModal();

			this.$main.appendTo('body');

			$('.mainCanvas').photoshopMove({startCB: function() {console.log(that); that.wallsSelection.enable(false); }, endCB: function() { that.wallsSelection.enable(true); }});
		},
		addMapsFrom: function(obj) {
			var att = '';

			for (att in obj) {
				if (obj[att] instanceof Map) {
					this.mapHash[att] = obj[att];
				}
			}
		},
		initTilesModal: function() {
			this.$tilesModal = $('<div class="modal hide fade"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>Tiles List</h3></div><div class="modal-body"></div><div class="modal-footer"><a href="#" class="btn">Close</a><a href="#" class="btn btn-primary">Ok</a></div></div>').modal({
				show: false
			});
			// draw all tiles in the tiles modal

			$('<canvas/>').appendTo(this.$tilesModal.find('.modal-body'));

			this.$tilesModal.on('hidden', this.onNewTileSelection.bind(this));
		},
		initOptions: function() {
			var mapName = '',
				$modeSelect = $('<div class="btn-group" data-toggle="buttons-radio"><button type="button" data-val="walls" class="btn active btn-primary">Edit Map Behavior</button><button type="button" data-val="tiles" class="btn btn-primary">Draw Map</button></div>'),
				$showTiles = $('<button type="button" data-val="showTiles" class="btn">showTiles</button>'),
				$select = $('<select/>'),
				$selectBehavior = $('<select/>'),
				$options = $('<div class="options"/>'),
				i = 0,
				that = this;

			$options.appendTo(this.$main).append('Level: ');

			this.addMapsFrom(window.maps);

			for (mapName in this.mapHash) {
				$select.append($('<option/>').attr('name', 'map_' + mapName).html(mapName));
				$select.bind('change', {mapName: mapName}, that.onLoadMap.bind(that));
				i++;
			}

			this.$select = $select.appendTo($options);

			$options.append('Behavior:').append($selectBehavior);

			this.types.forEach(function(type, i) {
				if (type !== null) {
					$selectBehavior.append($('<option/>').attr('name', type).data('activeType', i).html(type));
				}
			});

			$selectBehavior.bind('change', this.onSelectBehaviorType.bind(this));

			$options.append('Selection Mode: ');

			$options.append($modeSelect.bind('change', function(event, newVal) {
				that.setMode(newVal);
			}));

			$options.append($showTiles.bind('click', function(event, newVal) {
				that.toggleTiles();
			}));
		},
		initViewPort: function() {
			this.$viewport = $('<div class="mainCanvas"/>').appendTo(this.$main);
			this.$canvas = $('<canvas/>').appendTo(this.$viewport);
			this.$tileViewport = $('<div class="tileCanvas">');
			this.$tileCanvas = $('<canvas/>').appendTo(this.$tileViewport);

			this.renderCtx = this.$canvas.get(0).getContext('2d');
			this.tileCtx = this.$tileCanvas.get(0).getContext('2d');
		},
		onSelectBehaviorType: function(event) {
			this.activeType = $(event.target)[0].options.selectedIndex + 1;
		},
		setWallsMode: function() {
			// displays the walls on the screen
			console.log('displays the walls on the screen');
			this.map.debug(true);
			this.$tilesModal.modal('hide');
			this.wallsSelection.show();
			this.wallsSelection.enable(true);
			this.refreshMap();
		},
		setTilesMode: function() {
			console.log('displays the tiles on the screen');
			this.map.debug(false);
			this.wallsSelection.hide();
			this.wallsSelection.enable(false);
			this.refreshMap();
			// ** this.$tilesModal.modal('show');
		},
		toggleTiles: function() {
			this.$tilesModal.modal('show');
		},
		setMode: function(mode) {
			console.log('setting mode to', mode);
			switch(mode) {
				/* falls through */
				case 'tiles':
					this.mode = 'tiles';
					this.setTilesMode();
					break;

				default:
				case 'walls':
					this.mode = 'walls';
					this.setWallsMode();
					break;
			}
		},
        onResizeMap: function(width, height, vpWidth, vpHeight) {
            console.warn('TODO: onResizeMap');
            this.map.resize(width, height, vpWidth, vpHeight);
        },
        onResizeTiles: function(width, height) {
            console.warn('TODO: onResizeTile');
            this.map.setTilesSize(width, height);
        },
		onNewTileSelection: function() {
			console.log('got a new tile!');
		},
		detectTilesFromImage: function(src, borderColor) {
			var img = new Image();

			borderColor = borderColor || 'rgb(255,0,0)';

			img.onload = function() {
				var i,
					j,
					w = this.naturalWidth,
					h = this.naturalHeight,
					x = 0,
					y = 0,
					r,
					g,
					b,
					firstEnd = false,
					started = false,
					gotWidth = false,
					colors = borderColor.match(/rgb\((.*)\)/)[1].split(','),
					max = 4 * w,
					ctx = $('<canvas/>').attr({
					width: this.naturalWidth,
					height: this.naturalHeight
				}).hide().appendTo('body').get(0).getContext('2d');

				// draw the ctx
				ctx.drawImage(this, 0, 0);

				var data = ctx.getImageData(0, 0, w, h).data;

				i = 0;

				// then go through every pixels
				while(i < h) {
					for (j = 0; j < max; j++) {
						r = data[((i*w)*4) + j];
						g = data[((i*w)*4) + j + 1];
						b = data[((i*w)*4) + j + 2];
						if (!started && (r === colors[0] && g === colors[1] && b === colors[2])) {
							// ok, we have a new one
							started = true;
							firstEnd = false;
							// save x & y
							x = j;
							y = i;
						} else if (started && !gotWidth && i > x && (r === colors[0] && g === colors[1] && b === colors[2])) {
							firstEnd = true;
						} else if (started && firstEnd && i > x && (r !== colors[0] || g !== colors[1] || b !== colors[2])) {
							// got the end

						}
					}
					i++;
				}

			};
		},
		exportMap: function() {

		},
		loadMap: function(mapName) {
			var that = this;

			console.log('loading map', mapName);
			this.map = this.mapHash[mapName];

			// ugly hack, remove me !!
			this.map.game = this;
			// /ugly hack

			// set viewport & canvas size
			this.$canvas.attr({
				width: this.map.width + 'px',
				height: this.map.height + 'px'
			}).css({
				width: this.map.width + 'px',
				height: this.map.height + 'px'
			});

			this.$viewport.css({
				overflow: 'auto',
				position: 'relative',
				width: this.map.viewportW + 'px',
				height: this.map.viewportH + 'px'
			});

			this.refreshMap();

			// draw the tiles list
			// TODO
			// this.map.drawTiles(this.tileCtx, true);

			this.wallsSelection = new Selection({
				width: this.map.tileWidth,
				height: this.map.tileHeight,
				dest: this.$canvas.parent(),
				vp: this.$viewport,
				fullWidth: this.map.numCols
			});

			this.wallsSelection.bindSelection(function(action) {
				var oldValue = that.map.objects[action.num];
				console.log('need to react on wall action', action, that.activeType);
				that.map.objects[action.num] = that.activeType === oldValue ? 0 : that.activeType;
				that.refreshMap();
			});

			this.createTilesList();

			console.warn('TODO: use the tilesList viewport as viewport');
			/*
			this.tilesSelection = new Selection({
				width: this.map.tileWidth,
				height: this.map.tileHeight,
				dest: this.$canvas.parent(),
				vp: this.$viewport,
				fullWidth: this.map.numCols
			});
			*/
			//.bind('click', this.addTileToSelection.bind(this));
		},
		createTilesList: function() {
			var numCols = 10,
				width = numCols * this.map.tileWidth,
				canvas = this.$tilesModal.find('canvas').attr({
					width: width + numCols*2 + 1,
					height: 480 + 30
				}),
				ctx = canvas[0].getContext('2d'),
				x = 0,
				y = 0,
				i = 2,
				j = 2,
				that = this;

			// this.$tilesModal.height(480 + 32).width(width + numCols*2 + 1);

			this.map.tiles.forEach(function(tile, tileNum) {
				that.map.drawTile(tileNum, ctx, x * that.map.tileWidth + i, y * that.map.tileHeight + j);
				x++;
				i+=2;
				if (x && !(x % 10)) {
					j+=2;
					y++;
					x = 0;
					i = 2;
				}
			});
		},
		onLoadMap: function(event) {
			console.log('onLoadMap', event.data.mapName);
			this.onLoadMap(event.data.mapName);
		},

		refreshMap: function() {
			// draw the map
			this.map.draw(this.renderCtx, true);
		},

		setMap: function(map) {
			if (map instanceof Map) {
				this.map = map;
			} else {
				this.map = new Map(map);
			}
		}
	};

	window.MapEditor = MapEditor;

	// return MapEditor;
    export default MapEditor;    
	// views:
	// - viewport => move, show/hide tiles, show/hide obstacles
	// - tileList => add, remove...
	// options: load, save/export/import (?)

	// createViews
	// bindEvents

