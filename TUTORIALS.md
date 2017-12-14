## AthenaJS Tutorials

On this page you will find some tutorials on specific parts of AthenaJS

Most of these tutorials can be downloaded on the *athenajs-samples* [https://github.com/AthenaJS/athenajs-samples](repository)

### TOC

 - [Games & Scenes](#games-scenes) Athena-JS core concepts: check these before first
 - [Drawables](#drawables): getting started with graphical elements


 ### Drawables

 Athena supports the following built-in objects:

  - [Sprite](?api=drawables#Sprite): stylesheet based image that can have any number of *animations*
  - [SimpleText](?api=drawables#SimpleText): Canvas-based text rendering
  - [BitmapText](?api=drawables#BitmapText): text-rendering using a bitmap font
  - [Paint](?api=drawables#Paint): for drawing shapes

All of the classes extend the [Drawable](?api=drawables#Drawable) class. You can use any number of these elements in your scene, and you can (and **should**) also extend `Drawable` to write your own drawables.

#### Paint

The `Paint` class allows to manipulate drawing HTML5-Canvas functions without having to manipulate the *rendering context* and also benefits fromm every `Drawable` features: animation, colision, etc.

Paint elements can also be used on Scene as well as on Maps, just like any other Drawable.

```js
class Smiley extends Paint {
    constructor(options) {
        super(Paint.name, options);
        // this.vx = 0;
        // this.vy = 0;
        // this.gravity = 0.1;
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

### Games & Scenes

### foo