# Slice Revealer
Slice Revealer is a easy to use dependency free library that allows users to cover and uncover DOM elements with customizable animated slices. The idea was inspired by [Zhenya Rynzhuk](https://zhenyary.com/) of [Sochnik](https://dribbble.com/Sochnik)'s [transition experiments](https://dribbble.com/shots/4132057-Selected-Works-Transitions-Experiments) and [Mary Lou's](https://github.com/crnacura) [Slice Revealer Demo](https://tympanus.net/codrops/2018/02/06/slice-revealer/) which is on [Codrops](https://tympanus.net/codrops/).

## Demos & Documentation
[Demo 1](https://realtayy.github.io/slice-revealer/demo/demo1/demo1.html)

[Demo 2](https://realtayy.github.io/slice-revealer/demo/demo2/demo2.html)

[Options & Targeting Demo](https://codepen.io/maiCoding/pen/VVWMRM)

Documentation site coming soon. For now refer to the [**Documentation**](https://github.com/RealTayy/slice-revealer#documentation) section below.

## Getting Started
Currently the only way to use Slice Revealer is to manually [download](https://github.com/RealTayy/slice-revealer/files/2647540/slice-revealer-v1.0.1.zip) and link `slickRevealer.min.js` and `slickRevealer.css` in your HTML
```html
<head>
    <link rel="stylesheet" type="text/css" href="./sliceRevealer.css">
</head>
<body>
    <script src="./sliceRevealer.min.js"></script>	
    <!-- Link your JavaScript file that uses sliceRevealer here --->
</body>
```

## How to use
For a basic example head over to this [CodePen](https://codepen.io/maiCoding/pen/JeJEXr).
### Basic Initialization
The DOM Element you want to cover/reveal MUST have it's position, height, and width set explicitly.
```html
<!-- Important! Always set the container position/height/width explicitly in your HTML or CSS-->
<div id="sr-target" style="position: relative; height: 100%; width: 100%"></div>
```

Then in your javascript you need to target a DOM Element you want to cover/reveal and create a `SliceRevealer()` instance. For more information on a valid target refer to the [**Targeting**](https://github.com/RealTayy/slice-revealer#targeting) section below.
``` javascript
const target = document.getElementById("sr-target");
const instance = sliceRevealer(target);
```

### Basic Usage
When you want to cover up your image just type:
```javascript
instance.goPhase("end");
```

When you want it to go back to it's starting position just type:
```javascript
instance.goPhase("start")
```

And that's it! For more in-depth information on customizing your Slice Revealer refer to the [**Initialization**](https://github.com/RealTayy/slice-revealer#initialization) section below.

# Documentation
## Initialization
For a quick demo on intializing, targeting, and setting options head to this [CodePen](https://codepen.io/maiCoding/pen/VVWMRM)

### Creating an Instance
All Slice revealer instances are made through the `sliceRevealer()` function which takes two arguments.

### sliceRevealer(target, options)
Creates and returns an instance of `SliceRevealer()`

```javascript
const target = document.getElementById('sr-target');
const instance = sliceRevealer(target, options);
```

| Parameter          | Type                                               | Description                                                                                                                              |
|--------------------|----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| target             | Element object \| NodeList object \| jQuery Object | For more information on the target parameter refer to the [**Targeting**](https://github.com/RealTayy/slice-revealer#targeting) section |
| options (optional) | Object                                             | For more information on the options parameter refer to the [**Options (Initializing)**](https://github.com/RealTayy/slice-revealer#options---initializing-optional) section                                        |

#### Targeting
When passing a target to `sliceRevealer()` you can use both `getElementById()` or `getElementsByClassName()`. Please note that using `getElementsByClassName()` will only initialize Slice Revealer on the first element found.
```javascript
// Both of these work!
const target = document.getElementById("targetID");
const target = document.getElementsByClassName("targetClassName")[0];
```

While Slice Revealer is dependency free and does not rely on jQuery you can still pass in jQuery objects as targets.
```javascript
// This works too!
const target = $(someJQuerySelector)[0];
```

#### Options - Initializing (Optional)

| Name            | Type             | Default               | Example                                            | Description                                                                                                                                                                                                                                                                            |
|-----------------|------------------|-----------------------|----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| direction       | String           | "horizontal"          | [CodePen](https://codepen.io/maiCoding/pen/OajRdb) | Accepts "horizontal" or "vertical". Determines the   slices will be laid out as horizontal rows or vertical columns.                                                                                                                                                                   |
| numOfSlices     | Number (Integer) | 8                     | [CodePen](https://codepen.io/maiCoding/pen/oQeQWe) | The number of slices.                                                                                                                                                                                                                                                                  |
| sliceDuration   | Number (Float)   | 0.8                   | [CodePen](https://codepen.io/maiCoding/pen/gQxZpJ) | The transition duration for a single slice.                                                                                                                                                                                                                                            |
| totalDuration   | Number (Float)   | 1.3                   | [CodePen](https://codepen.io/maiCoding/pen/gQxZpJ) | The transition duration of the entire animation.                                                                                                                                                                                                                                       |
| transitionOrder | String \| Array  | "standard"            | [CodePen](https://codepen.io/maiCoding/pen/OajrdX) | Accepts "standard", "random", "reverse", or   an Array. Determines the order in which the slices will animate.                                                                                                                                                                         |
| color           | String           | "#ffffff"             | [CodePen](https://codepen.io/maiCoding/pen/vQddEz) | Accepts a [CSS Color   Value](https://www.w3schools.com/cssref/css_colors_legal.asp) Determines the   color the slices will be in throughout the animation.                                                                                                                            |
| startPosition   | String \| Array  | "left"                | [CodePen](https://codepen.io/maiCoding/pen/OajRdb) | Accepts "top", "bottom", "right",   "left", or "middle". Determines the position the slices   to animate to for the start phase.                                                                                                                                                       |
| halfwayPostion  | String \| Array  | "middle"              | [CodePen](https://codepen.io/maiCoding/pen/OajRdb) | Accepts "top", "bottom", "right",   "left", or "middle". Determines the position the slices   to animate to for the halfway phase.                                                                                                                                                     |
| endPosition     | String \| Array  | "middle"              | [CodePen](https://codepen.io/maiCoding/pen/OajRdb) | Accepts "top", "bottom", "right",   "left", or "middle". Determines the position the slices   to animate to for the end phase.                                                                                                                                                         |
| curPosition     | String \| Array  | matches startPosition | N/A                                                | Accepts "top", "bottom", "right",   "left", or "middle". Determines the position the slices   will be in when the instance is created with `sliceRevealer()`.                                                                                                                          |
| startOptions    | Object           | {}                    | [CodePen](https://codepen.io/maiCoding/pen/MzLBoB) | Accepts an Object that will pass options whenever you animate to the   start phase. For a list of valid phase options refer to the [Options   (Phase)](https://github.com/RealTayy/slice-revealer#options---phase-optional)   section.                                                 |
| halfwayOptions  | Object           | {}                    | [CodePen](https://codepen.io/maiCoding/pen/MzLBoB) | Accepts an Object that will pass options whenever you animate to the   halfway phase. For a list of valid phase options refer to the [Options   (Phase)](https://github.com/RealTayy/slice-revealer#options---phase-optional)   section.                                               |
| endOptions      | Object           | {}                    | [CodePen](https://codepen.io/maiCoding/pen/MzLBoB) | Accepts an Object that will pass options whenever you animate to the end   phase. For a list of valid phase options refer to the [Options   (Phase)](https://github.com/RealTayy/slice-revealer#options---phase-optional)   section.                                                   |
| queueAnimation  | Boolean          | false                 | N/A                                                | If true then firing an animation while an animation is already playing   will queue the second animation behind the first one and fire when the first   one finishes. You can only have one queued animation per instance at a time.   Queuing a new one will replace the current one. |
| sticky          | Boolean          | false                 | N/A                                                | By default the position of the element that contains the Slice Revealer   instance has `position: abosolute`. If true then container element will have   `position: sticky`. Used when target has scrollable content.                                                                  |
| zIndex          | Number (Integer) | 1                     | N/A                                                | Sets the `z-index` of the instance's container element.                                                                                                                                                                                                                                |

## Methods
All methods are called on the instance that is created when initializing
```javascript
const target = document.getElementById("sr-target");
const instance = sliceRevealer(target);
```

### .goPhase(phase, options)
```javascript
instance.goPhase(phase, options);
```
Calling `.goPhase()` will animate the instance's slices to the passed phase's set position. It takes a [**phase**](https://github.com/RealTayy/slice-revealer#phase) parameter and an optional [**options (phase)**](https://github.com/RealTayy/slice-revealer#options---phase-optional) parameter.
#### Phase
There are 3 different phases you can pass: `"start"`, `"halfway"`, and `"end"`. The phase passed will animate the slices according to that phases's option that were set during initialization.

#### Options - Phase (Optional)
The options passed during `goPhase()` will override any default options and options that were set during initialization.

| Name            | Type            | Default    | Example                                            | Description                                                                                                                                                                                                                                                                            |
|-----------------|-----------------|------------|----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| startCB         | Function        | undefined  | [CodePen](https://codepen.io/maiCoding/pen/JexvLW) | Callback function that runs once the animation starts                                                                                                                                                                                                                                  |
| doneCB          | Function        | undefined  | [CodePen](https://codepen.io/maiCoding/pen/JexvLW) | Callback function that runs once the animation has fully completed. Does   not run if animation is replaced by another `goPhase()` call.                                                                                                                                               |
| sliceDuration   | Number (Float)  | 0.8        | N/A                                                | The transition duration for a single slice.                                                                                                                                                                                                                                            |
| totalDuration   | Number (Float)  | 1.3        | N/A                                                | The transition duration of the entire animation.                                                                                                                                                                                                                                       |
| transitionOrder | String \| Array | "standard" | N/A                                                | Accepts "standard", "random", "reverse", or   an Array. Determines the order in which the slices will animate.                                                                                                                                                                         |
| color           | String          | "#ffffff"  | N/A                                                | Accepts a [CSS Color   Value](https://www.w3schools.com/cssref/css_colors_legal.asp) Determines the   color the slices will be in throughout the animation.                                                                                                                            |
| queueAnimation  | Boolean         | false      | N/A                                                | If true then firing an animation while an animation is already playing   will queue the second animation behind the first one and fire when the first   one finishes. You can only have one queued animation per instance at a time.   Queuing a new one will replace the current one. |

### **.resetPosition(position)**
```javascript
instance.resetPosition(position);
```
Calling `.resetPosition()` will position slices instantly without a transition. It takes an optional [**position**](https://github.com/RealTayy/slice-revealer#position-optional) parameter. Not passing in a position will automatically reset to whatever startPosition was set to during instance initializing.

#### Position (Optional)
There are 5 different positions" `"top"`, `"bottom"`, `"left"`, `"right"`, and `"middle"`. You can also pass in an array of positions for each individual slice.

## Misc
### License
Slice Revealer is an open source software under the [MIT license](https://github.com/RealTayy/slice-revealer/blob/master/LICENSE.md)
### Credit/Shameless Plug
Interested in who made this? Come visit my portfolio at [MaiCoding](https://www.maiCoding.me)

Want more sick and easy to use animations? Come over to [AnimationZone](https://realtayy.github.io/animation-zone/)