		/*jshint devel: true, bitwise: false*/
		/*globals Class*/
		class Selection {
			constructor(options) {
				console.log('Selection()', options);

				this.tileWidth = options.width || 64;
				this.tileHeight = options.height || 32;
				// width in tiles
				this.fullWidth = options.fullWidth || 1024;
				this.$dest = options.dest;
				this.$vp = options.vp;
				this.tileX = 0;
				this.tileY = 0;
				this.isEnabled = true;
				this.multiSelect = options.multiSelect || true;
				this.name = options.name || 'walls';
				this.callback = null;

				this.selections = [];

				$('.cursor').remove();

				this.$cursor = $('<div class="cursor"/>').css({
					width: this.tileWidth,
					height: this.tileHeight,
					boxSizing: 'border-box',
					border: '2px dotted green',
					backgroundColor: 'rgba(255,255,255,.2)',
					position: 'absolute',
					left: 0,
					right: 0,
					zIndex: '10'
				}).appendTo(this.$dest.css('position', 'relative'));

				// mouse move on $dest, calc
				this.bindEvents();
			}
            
			addSelections(array) {
				var i = 0,
					max = array.length;

				for (i = 0; i < max; i++) {
					this.selections.push(array[i]);
				}
			}
            
			setCursorHtml(html) {
				this.$cursor.html(html);
			}
            
			setCursorSize(width, height) {
				this.$cursor.width(width);
				this.$cursor.height(height);
			}
            
			moveTo(x, y) {
				this.$cursor.css({
					left: x + 'px',
					top: y + 'px'
				});
			}
            
			bindSelection(callback) {
				this.callback = callback;
			}
            
			onSelectionEvent(action) {
				console.log('onSelectionEvent', action);
				if (this.callback) {
					this.callback(action);
				}
			}
            
			addSelection(num) {
				var action = {
					action: 'added',
					num: num
				};

				this.selections.push(num);
				console.log(this.selections);
				/*
				this.$vp.append(this.$cursor.clone().css({
					border:'none',
					backgroundColor: 'rgba(255,0,0,.5)'
				}).addClass('selection_' + this.name + '_' + num));
				*/

				return action;
			}
			
            removeSelection(num) {
				var action = {
					action: 'removed',
					num: num
				},
				pos = this.selections.indexOf(num);

				$('.selection_' + this.name + '_' + num).remove();
				delete this.selections[pos];

				return action;
			}
			
            bindEvents() {
				var that = this;

				this.$vp.bind('mousemove', function(event) {
					if (!that.isEnabled) {
						return;
					}
					that.tileX = (Math.floor((event.pageX + this.scrollLeft - Math.floor($(this).offset().left))/that.tileWidth)) * that.tileWidth;
					that.tileY = (Math.floor((event.pageY + this.scrollTop - Math.floor($(this).offset().top))/that.tileHeight)) * that.tileHeight;

					that.moveTo(that.tileX, that.tileY);
				}).bind('click', function() {
					var action = null,
						pos = 0,
						num = 0;

					if (!that.isEnabled) {
						return;
					}

					num = ((that.tileY / that.tileHeight) | 0) * that.fullWidth + ((that.tileX / that.tileWidth) | 0);

					if (!that.multiSelect) {
						that.selections = [];
						$('.selection_' + that.name + '_' + num).remove();

						action = that.addSelection(num);
					} else {
						pos = that.selections.indexOf(num);

						if (pos > -1) {
							action = that.removeSelection(num);
						} else {
							action = that.addSelection(num);
						}
					}

					that.onSelectionEvent(action);

					return action;
				});
			}
			
            enable(bool) {
				this.isEnabled = bool;
				if (this.isEnabled === true) {
					this.$cursor.show();
				} else {
					this.$cursor.hide();
				}
			}
            
			show() {
				$('.cursor').show();
			}
            
			hide() {
				$('.cursor').hide();
			}
		}

		export default Selection;