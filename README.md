# AthenaJS is a framework for building 2D games using HTML5

AthenaJS is a complete framework for building HTML5 2D games.

Although its development is not finished yet, AthenaJS already supports the following features:

 - Image-based Sprites with any number of animations
 - Tiles-based Maps with horizontal & vertical scrolling
 - Special effects like Fades, Mosaic can be added easily
 - Map VS Sprite and Sprite vs Sprite collision detection
 - Map Triggers support
 - Sound support
 - Keyboard input event (touch & joystick support is being worked on)

# Demo

[AthenaJS-Gods](https://athenajs.github.io/athenajs-gods/) was designed as a proof of concept for what can AthenaJS can do.

The game was designed while developing the [AthenaJS](https://github.com/AthenaJS/athenajs) framework and only supports the begining of level one.

Although incomplete, this demo already makes use of and validates the following AthenaJS components:

 - maps with tiles & tile behaviors
 - map triggers based on player position & other conditions
 - enemy waves
 - tile-based collision detection
 - map vertical & horizontal scrolling
 - png-based sprites and bitmap fonts
 - sprites collision detection
 - special effects like [SNES-like mosaic](https://github.com/warpdesign/jquery-mosaic) & sprite rotation
 - game scenes

## Installation

AthenaJS can be used in any ES5 & ES6 projects.

**Old-school**

in your html file:
````html
<script type="text/javascript" src="athenajs.js"></script>
<script type="text/javascript">
    window.onload = function() {
        var myGame = new AthenaJS.Game({
            width: 320,
            height: 200
        });
    }
</script>
````

**using npm**

Install the athenajs module:
````bash
npm install --save athenajs
````

in your index.js:
````javascript
import { Game, Scene, Circle } from 'athenajs';

const myGame = new Game({
    width: 320,
    height: 200
});
````

## Core concepts

At the heart of AthenaJS is the `Game` class.

Creating a new game is as easy as instanciating or sublcassing the Game class.

But the `Game` class does nothing by itself other than creating necessary Canvas elements needed to render a game.

That's where the `Scene` class comes into play. In AthenaJS, a game renders a `Scene`.

And a `Scene` renders whatever objects it contains. Objects can be anything that inherits from the `GfxObject` class. AthenaJS comes with this type of objects:

 - Sprite: image-based sprite that can have any number of animations with different framerate
 - BitmapFont: image-based font
 - Menu: simple text-based menu
 - Circle: simple circle shape

Of course, you can write your own objects by simply extending the base `GfxObject` class or any other object.

In the end, here is a very simple game that just renders a circle onto the screen:

````javascript
const myGame = new AthenaJS.Game({
    name: 'first-game',
    width: 320,
    height: 200
}),
myScene = new AthenaJS.Scene();

myGame.onReady(function() {
    this.setScene(myScene);
});

myScene.scene.onStart(function() {
    const circle = new AthenaJS.Circle({w: 20, h: 20});
    this.addObject(circle);
});
````

## Documentation

- [Documenation](https://athenajs.github.io/athenajs-documentation/)
- [Samples](https://github.com/AthenaJS/athenajs-samples)

## Contributing

If you are interested in contributing to the AthenaJS code base, simply fork the repository and make a pull-request.

Once you have cloned the repository, simply type:

````bash
npm install && npm link && npm start
````

This will install the prerequisites, add a link to athenajs into your global npm modules directory and build & start watching for changes.

Now to start using athenaJS for testing, simply type the following in the directory of your project using AthenaJS:

````bash
npm link athenajs
````

This will add a link from your project to the global athenajs link that was just created.

## License

Copyright (c) Nicolas Ramz.

Licensed under the [MIT](LICENSE) License.
