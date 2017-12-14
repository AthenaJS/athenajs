# AthenaJS Tutorials

On this page you will find some tutorials on specific parts of AthenaJS

Most of these tutorials can be downloaded on the *athenajs-samples* [https://github.com/AthenaJS/athenajs-samples](repository)

## TOC

 - [Games & Scenes](#games-scenes) Athena-JS core concepts: check these before first
 - [Drawables](#drawables): getting started with graphical elements


## Drawables

 Athena supports the following built-in objects:

  - [Sprite](?api=drawable#Sprite): stylesheet based image that can have any number of *animations*
  - [SimpleText](?api=drawable#SimpleText): Canvas-based text rendering
  - [BitmapText](?api=drawable#BitmapText): text-rendering using a bitmap font
  - [Paint](#paint): for drawing shapes

All of the classes extend the [Drawable](?api=drawable#Drawable) class. You can use any number of these elements in your scene, and you can (and **should**) also extend `Drawable` to write your own drawables.

### Paint

The [Paint](?api=drawable#Paint) class allows to manipulate drawing HTML5-Canvas functions without having to deal with the *rendering context* and other low-level Canvas stuff.

The Paint class also benefits fromm every `Drawable` features: animation, colision, etc.

Paint elements can be used on Scene as well as on Maps, just like any other Drawable.

To draw something using the Paint class, you simply have to call any paint method inside the `render` method.

For example, this will draw a smiley:

```js
import { Paint } from 'athenajs';

class Smiley extends Paint {
    constructor(options) {
        super(Paint.name, options);
    }

    render() {
        // face
        this.circle(0, 0, this.width / 2, 'yellow', 2, 'black');
        // eyes
        this.circle(this.width / 5, this.height / 3, this.width / 12, 'black');
        this.circle(this.width - this.width / 3, this.height / 3, this.width / 12, 'black');
        // mouth
        this.arc(this.width / 2, this.height - this.height / 2.5, this.width / 4, 0, Math.PI, 'black', 2);
    }
}
```

### Sprite

The [Sprite](?api=drawable#Sprite) class allows to draw sprite-based animations.

A Sprite can have any number of animations each with any number of frames and with a different framerate.

Each frame can also have a different *hitbox*.

To add an animation you can do it the quick and easy way, using the [Sprite.addAnimation](?api=drawable#Sprite#addAnimation) method:

```js
class MySprite extends Sprite {
    constructor(options) {
        super('mySprite', options);

        // add a new run animation that will use the sballer spritesheet
        this.addAnimation('run', 'sballer', {
            numFrames: 9,
            frameWidth: 82,
            frameHeight: 69,
            frameDuration: 4
        });
    }
}
```

This will use the whole frameWidth & frameHeight as hitbox, and automatically set the `run` animation as current animation.

The frameDuration is a multiple of `16ms` so using `frameDuration: 4` would mean that each frame of the animation would last `16*4=56ms`.

You can also pass a *JSON* Object describing each frame to the Sprite's constructor.

For example this code would create a new `Gem` Sprite with a `mainLoop` animation.

```js
import { Sprite } from 'athenajs';

class Gem extends Sprite {
    constructor(options = {}) {
        super('gem', {
            imageId: 'objects',
            x: options.x,
            y: options.y,
            pool: options.pool,
            canCollide: true,
            collideGroup: 1,
            animations: {
                mainLoop: {
                    frameDuration: 4,
                    frames: [{
                        offsetX: 136,
                        offsetY: 189,
                        width: 31,
                        height: 31,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 170,
                        offsetY: 189,
                        width: 31,
                        height: 31,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 204,
                        offsetY: 189,
                        width: 31,
                        height: 31,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    }],
                    loop: 1
                }
            }
        });
    }
}
```

Note that the spritesheet used in the sprite must have previously been loaded.

## Games & Scenes

## foo