# Getting Started with AthenaJS

 - [WebpackStarterTemplate](#webpack-starter-template): a one-command installer to get ready for AthenaJS development
 - [Games & Scenes](#games-scenes) Athena-JS core concepts: **read this first**!
 - [Drawables](#drawables): getting started with graphical elements
 - [Going Further](#going-further)

## Webpack Starter Template

The easiest way to get started is to clone the athena-starter [repository](https://github.com/AthenaJS/athenajs-webpack-starter) and then type:

```bash
npm install && npm start
```

This will install all required dependencies and will get you ready to start developing using AthenaJS.

Simply edit index.js and open the `http://127.0.0.1:8888` to test your changes.

The following npm scripts are ready to use:

 - `npm start`: build development version and watch for file changes
 - `npm run build`: build a production version of your app
 - `npm run test`: run test suite with Jest

## Games & Scenes

At the core level of AthenaJS is the [Game](?api=game) class. This is the entry point of every AthenaJS game.

The game describes your game:

 - its size
 - where it will be displayed into the DOM

To create a game you simple create a Game instance:

```js
const myGame = new Game({
    name: 'my-first-athena-game',
    showFps: true,
    width: 320,
    height: 200,
    debug: true
});

```

This example will create a new Game with a (visible) screen of 320x200 pixels, with debug enabled, and will display a little FPS counter.

A game in itself does nothing without a [Scene](?api=scene) which is the second most important class in AthenaJS.

The scene is where you put your `drawables` (graphical objects): just like in real life, this is where the action is happening.

Creating a Scene, is as easy as:

```js
const scene = new Scene();

```

A scene can have as many objects as you want. To add (and display) an object, you simply add it to your scene:

```js
text = new SimpleText("nextString", {
    text: "Canvas text",
    x: 150,
    y: 120,
    color: 'black'
});

scene.addObject(text);
```

Finally, for the scene to become *active* and for your game to draw something, you simply use the `Game.setScene()` method, which will start executing your scene, and render whatever objects have been added into it:

```js
myGame.setScene(scene);
```

Here are all these parts glued togeter:


```js
import { Game, Scene, SimpleText } from 'athenajs';

// create a new game with a 320x200 screen
const myGame = new Game({
    name: 'my-first-athena-game',
    showFps: true,
    width: 320,
    height: 200,
    debug: true
});

// create a new empty scene
const scene = new Scene();

// create a new SimpleText drawable
text = new SimpleText("nextString", {
    text: "Canvas text",
    x: 150,
    y: 120,
    color: 'black'
});

// add a new text object onto the scene, at position 150, 120
scene.addObject(text);

// set `scene` as the active scene
myGame.setScene(scene);
```




## Drawables

 Every element that can be drawn onto the screen inherits from the [Drawable](?api=drawable#Drawable) class which provides the following features:

  - x/y position
  - basic collision hitBox
  - visibility/opacity
  - scaling/rotation

 The following type of objects have been created on top of the Drawable class and can be used in your games.

  - [Sprite](#sprite): stylesheet based image with any number of animations
  - [SimpleText](#simpletext): Canvas-based text rendering
  - [BitmapText](#bitmaptext): text-rendering using a bitmap font
  - [Paint](#paint): for drawing shapes

These are of course just examples and you can (and **should**) also extend `Drawable` to write your own drawables!

### Paint

The [Paint](?api=drawable#Paint) class allows to manipulate drawing HTML5-Canvas functions without having to deal with the *rendering context* and other low-level Canvas stuff.

The Paint class also benefits from every `Drawable` features: animation, colision, etc.

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

### BitmapText

The [BitmapText](?api=drawable#BitmapText) class allows to draw text using an image-based font.

This class also allows to scroll text using the element's bounding box.

Much like the Sprite drawable, the BitmapText class requires an image to have been loaded.

Here is an example that will create a font using the `myFont` image with the following options:

 - each character is 32x32 pixels
 - each character + padding takes 34 pixels
 - the drawing starts at y = 0

```js
class MyFont extends BitmapText {
    constructor(options) {
        super('myFont', Object.assign({
            width: 320,
            height: 64,
            charWidth: 32,
            charHeight: 32,
            imageId: 'myFont',
            offsetX: 34,
            startY: 2
        }, options));
    }
}
```

**Note** Right now, characters are limited to [A-Z0-9] set. The `options.characters` will later allow to have wider character set.

### SimpleText

The [SimpleText](?api=drawable#SimpleText) class allows to draw text using any *TrueType* font supported by the browser.

This class uses the HTML5 Canvas Text methods to draw fonts onto the screen.

Using SimpleText is easy as:

```js
const myText = new SimpleText("nextString", {
    text: "Canvas text",
    x: 150,
    y: 120,
    color: 'black'
});
```

## Going Further

To go further, you can checkout the *athenajs-samples* [repository](https://github.com/AthenaJS/athenajs-samples) which contains more advanced topics like:

 - Maps
 - Sound
 - Behaviors

For a complete game using AthenaJS you can have a look at [AthenaJS-Tetris](https://github.com/AthenaJS/athenajs-tetris).