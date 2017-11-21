define([
    'Scene',
    'SimpleText',
    'Pool',
    'Sprite',
    'EventManager',
    'AudioManager',
    'ResourceManager'
],
    function (Scene) {
        return Scene.extend({
            init: function (options) {
                this._super(options);
            },
            // we simply override the draw method
            draw: function (destCtx, debug) {
                if (!this.visible) {
                    return;
                }

                // auto goto next frame
                if (this.currentAnimName.length) {
                    this.advanceFrame(this.currentAnimName);
                }

                var w = this.getCurrentWidth(),
                    scaledW = w * this.scale,
                    h = this.getCurrentHeight(),
                    scaledH = h * this.scale,
                    subScaledW = (scaledW / 2) | 0,
                    subScaledH = (scaledH / 2) | 0,
                    x = this.getCurrentOffsetX(),
                    y = this.getCurrentOffsetY(),
                    drawX = this.x + this.getCurrentShiftX(),
                    drawY = this.y + this.getCurrentShiftY(),
                    mapOffsetX = this.currentMap && this.currentMap.viewportX || 0,

                    mapOffsetY = this.currentMap && this.currentMap.viewportY || 0;

                // TODO: fix map position when rotate is used
                if ($.isEmptyObject(this.fxQueue)) {
                    if (this.type === 'enemy1' && window.todo)
                        var date = new Date().getTime();
                    destCtx.drawImage(this.image, x, y, w, h, drawX + mapOffsetX, drawY + mapOffsetY, scaledW, scaledH);
                    if (this.type === 'enemy1' && window.todo) {
                        var date2 = new Date().getTime();
                        console.log('drawSprite call duration:', date2 - date);
                    }
                    if (this.isDebug === true || debug === true) {
                        this.showHitBox(destCtx);
                    }
                } else {
                    this.executeFx(destCtx);
                    // translate to keep the object as its position
                    destCtx.save();
                    destCtx.translate(drawX + mapOffsetX + subScaledW, drawY + mapOffsetY + subScaledH);
                    destCtx.rotate(this.angle);
                    destCtx.drawImage(this.image, x, y, w, h, -subScaledW, -subScaledH, scaledW, scaledH);
                    if (this.isDebug === true || debug === true) {
                        this.showHitBox(destCtx);
                    }
                    destCtx.restore();
                }
            },
            showHitBox: function (ctx) {
                // TODO: add scale (rotation ?)
                var hitBox = this.getHitBox(),
                    mapOffsetX = this.currentMap && this.currentMap.viewportX || 0,
                    mapOffsetY = this.currentMap && this.currentMap.viewportY || 0;

                ctx.strokeStyle = 'rgb(0,230,0)';
                ctx.beginPath();
                ctx.moveTo(hitBox.x + this.x + mapOffsetX, hitBox.y + this.y + mapOffsetY);
                ctx.lineTo(hitBox.x2 + this.x + mapOffsetX, hitBox.y + this.y + mapOffsetY);
                ctx.lineTo(hitBox.x2 + this.x + mapOffsetX, hitBox.y2 + this.y + mapOffsetY);
                ctx.lineTo(hitBox.x + this.x + mapOffsetX, hitBox.y2 + this.y + mapOffsetY);
                ctx.lineTo(hitBox.x + this.x + mapOffsetX, hitBox.y + this.y + mapOffsetY);
                ctx.closePath();
                ctx.stroke();
            },
            start: function () {
                this.reset();
                var that = this;

                /*				Input.clearEvents();
                
                                Input.installKeyCallback('ESCAPE', 'up', function() {
                                    Input.clearEvents();
                
                                    that.animate('Fade', {
                                        startValue: 1,
                                        endValue: 0
                                    }).done(function() {
                                        that.notifyGame('exitLevel');
                                    });
                                });
                
                                AM.play('restart');
                
                                this.animate('Mosaic', {
                                    when: 'post',
                                    duration: 2000,
                                    startValue: 0.0005,
                                    endValue: 0.4,
                                    easing: 'swing'
                                });
                
                                this._super();
                
                                this.pauseText = new SimpleText('pause', {
                                    text: 'P A U S E',
                                    color: 'white',
                                    fontSize: '25px'
                                }).moveTo(200, 300).hide();
                
                                this.addObject(this.pauseText);*/
            },
            stop: function () {
                console.log('stop');
                Input.clearEvents();

                this._super();
            },
            run: function () {
            }
        });
    }	// function()
);
