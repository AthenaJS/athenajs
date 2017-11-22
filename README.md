# AthenaJS is a framework for building 2D games using HTML5

AthenaJS is a complete framework for building HTML5 2D games.

- Visit the [API documentation](https://athenajs.github.io/athenajs-documentation/) for a list of classes and methods available
- Visit the [samples](https://github.com/AthenaJS/athenajs-samples) repository to get started with AthenaJS
- For an example of a complete game written using AthenaJS check [athenajs-tetris](https://github.com/AthenaJS/athenajs-tetris)

# Features

 Here is a non-exhaustive liste of features of AthenaJS:

 - Unlimited number of scenes with an unlimited number of sprites
 - Image-based Sprites with any number of animations
 - Tiles-based Maps with horizontal & vertical scrolling
 - Special scene transition effects like Fades, Mosaic can be added easily
 - Map VS Sprite and Sprite vs Sprite collision detection
 - Map Triggers support
 - Sound support with volume and horizontal panning
 - Keyboard & Joytisck input event supported (touch support is planned)

# Install

```
npm install athenajs --save
```

# Quick Start

AthenaJS can be used in any ES5 & ES6 projects.

**ES6**

````javascript
import { Game, Scene, SimpleText } from 'athenajs';

// create a new game
const myGame = new Game({
    name: 'first-game',
    width: 320,
    height: 200
}),
// create a new empty scene
myScene = new class MyScene extends Scene{
    start() {
        const myText = new SimpleText('my text', {
            text: 'This is a test',
            color: 'black'
        });
        // add the object onto the scene
        this.addObject(myText);
    }
};

// play this scene
myGame.setScene(myScene);
````

**ES5**

in your html file:
````html
<script type="text/javascript" src="athenajs.js"></script>
<script type="text/javascript">
    window.onload = function() {
    var Game = AthenaJS.Game,
        Scene = AthenaJS.Scene,
        SimpleText = AthenaJS.SimpleText;

    // create a new game
    var myGame = new Game({
        name: 'first-game',
        width: 320,
        height: 200
    });
    // // create a new empty scene
    // myScene = new class MyScene extends Scene{
    //     start() {
    //         const myText = new SimpleText('my text', {
    //             text: 'This is a test',
    //             color: 'black'
    //         });
    //         // add the object onto the scene
    //         this.addObject(myText);
    //     }
    // };

    // play this scene
    myGame.setScene(myScene);
</script>
````

## Apps written using AthenaJS

- [Gods](https://athenajs.github.io/athenajs-documentation/)
- [Tetris](https://github.com/AthenaJS/athenajs-samples)

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

## Credits

Athena JS icon by [Icons8](https://icons8.com/). Used under open-source licence.

## License

Copyright (c) Nicolas Ramz.

Licensed under the [MIT](LICENSE) License.
