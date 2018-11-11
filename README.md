# Slice Revealer
Slice Revealer is a easy to use dependency free library that allows users to cover and uncover images with customizable animated slices. The idea was inspired by [Zhenya Rynzhuk](https://zhenyary.com/) of [Sochnik](https://dribbble.com/Sochnik)'s [transition experiments](https://dribbble.com/shots/4132057-Selected-Works-Transitions-Experiments).

## Demo
Demo site coming soon!

## Getting Started
Currently the only way to use Slice Revealer is to manually [download]() and link `slickRevealer.min.js` and `slickRevealer.css` in your HTML
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
### Basic Initialization
The DOM Element you want to cover/ reveal MUST have it's position, height, and width set explicitly.
```html
<!-- Important! Always set the container position/height/width explicitly in your HTML or CSS-->
<div id="sr-target" style="position: relative; height: 100%; width: 100%"></div>
```

Then in your javascript you need to target a DOM Element you want to cover/reveal and create a `SliceRevealer()` instance. For more information on a valid target refer to the [**Targeting**](https://github.com/RealTayy/slice-revealer#targeting) section below.
``` javascript
var target = document.getElementById("sr-target");
var instance = sliceRevealer(target);
```

### Basic Usage
When you want to cover up your image just type:
```javascript
instance.doIt("halfway");
```

When you want it to go back to it's starting position just type:
```javascript
instance.doIt("start")
```

And that's it! For more in-depth information on customizing your Slice Revealer refer to the [**Initialization**](https://github.com/RealTayy/slice-revealer#initialization) section below.
For a basic example head over this [jsFiddle](https://jsfiddle.net/MaiCoding/jvb4oce8/15).

# Documentation
## Initialization
For a quick demo on intializing, targeting, and setting options head to this [jsFiddle](https://jsfiddle.net/MaiCoding/akLcrot7/)

### Creating an Instance
All Slice revealer instances are made through the `sliceRevealer()` function which takes two .
```javascript
var target = document.getElementById('sr-target');
sliceRevealer(target, options);
```

#### **sliceRevealer(target, option)**
Creates and returns an instance of `SliceRevealer()`

| Parameter          | Type                                               | Description                                                                                                                              |
|--------------------|----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| target             | Element object \| NodeList object \| jQuery Object | For more information on the target parameter refer to the [**Targetting**](https://github.com/RealTayy/slice-revealer#targeting) section |
| options (optional) | Object                                             | For more information on the options parameter refer to the [**Options (Initializing)**]() section                                        |

```javascript
var target = document.getElementById('sr-target');
sliceRevealer(target, options);
```

### Targeting
When passing a target to `sliceRevealer()` you can use both `getElementById()` or `getElementsByClassName()`. Please note that using `getElementsByClassName()` will only initializing Slice Revealer on the first element found.
```javascript
// Both of these work!
var target = document.getElementById("targetID");
var target = document.getElementsByClassName("targetClassName");
```

While Slice Revealer is dependency free and does not rely on jQuery you can still pass in jQuery objects as targets.
```javascript
// This works too!
var target = $(someJQuerySelector);
```

### Options (Initializing)

## Methods
All methods are called on the instance that is created when initializing
```javascript
var element = document
var instance = slick
```

##### .doIt()
.doIt() description
###### Arguements
**options (optional):**  description
```javascript
Example javascript
```

#### Options
| Name | Type | Default |
|------|------|---------|
| asdf | asdf | asdf    |
|      |      |         |
|      |      |         |

# Misc
## License
Slice Reavealer is an open source software under the [MIT license](https://github.com/RealTayy/slice-revealer/blob/master/LICENSE.md)
## Credit/Shameless Plug
Interested in who made this? Come visit my portfolio at [**MaiCoding**](http://www.maiCoding.me)
Want more sick and easy to use animations? Come over to [**AnimationZone**]()
