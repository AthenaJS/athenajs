# Debugging with AthenaJS

## 1. Debugger
Since version `0.1.0` AthenaJS comes with a little visual debugger that can be enabled by passing the `debug` parameter to the `Game` constructor:

```js
new Game({
    debug: true
});
```

The debugger is then be brought up by pressing the `d` key at any time.

Here is how it works:

 - `wall` type tiles will be shown in `red`
 - `ladder` type tiles will be shown in `blue`
 - sprites `hit boxes` are shown with `green` borders

By hovering a tile with the mouse, you can see its position and tile number in the tileset:

![scene_debugger](https://user-images.githubusercontent.com/199648/28566522-b3d309c2-712f-11e7-857d-2f90627e59e4.gif)

When debug mode is enabled, the following shortcurts also work automatically:

 - pressing `p` will toggle pause mode, stopping render and update loops when in pause
 - pressing `f` will switch to fullscreen mode

## 2. Inspecting scenes/maps

In addition to the debugger, AthenaJS also exports a number of properties that you can easily inspect in the JavaScript console:

 - `window.scenes` contains a list of current scenes
 - `window.currentScene` is a reference to the current running scene
 - `window.currentMap` is a reference to the current map (if any)

### 2.1 Inspecting scene objects

Scene objects are stored in `currentScene.layers`: each layer is a simple array with all objects found into this layer.

To show/hide an object you may simply change its visible property:

```js
// hide the first drawable of the first layer
currentScene.layers[0][0].visible = false;
```

You may also change its position:

```js
// hide the first drawable of the first layer
currentScene.layers[0][0].x = 10;
currentScene.layers[0][0].y = 15;
```

### 2.2 Inspecting current map

Current map reference in stored in `window.currentMap`.

To inspect drawables of the map, you may use the following code:

```js
// hide the first object of the map
window.currentMap.objects[0].visible = false;
```

To test/debug scrolling you may use the `Map.moveTo()` method:

 ```js
 window.currentMap.moveTo(0, 0);
 ```