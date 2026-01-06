# Rope Grid 🪢
![Rope Grid](https://user-images.githubusercontent.com/48356710/141658822-20d2f3b7-a218-4c14-94bb-03d8d4e9c3f8.png)

## Live Demo
- https://robertolovece.github.io/Rope-Grid/

## Instructions

- Drag the mouse/pointer across the screen to cut ropes.
- Click onto a point to toggle whether it's locked or not.

## Installation
__Requires npm (https://www.npmjs.com/)__

- __Install__ - npm i

- __Run__ - npm run start

## CDN Import Example

To import this project using jsdelivr CDN with auto-minification:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Cloth Demo</title>
<script type="importmap">
{ "imports": {
  "three": "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.min.js",
  "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/"
}}</script>
</head>
<body>
<!-- Your content here -->
<script type="module">
// Note: The original project structure might not export everything by default.
// Adjust the import path according to where the build artifacts are hosted.
// Example:
// import { initInstanceObjects } from 'https://cdn.jsdelivr.net/gh/RobertoLovece/Rope-Grid@master/src/instance/InstanceInit.js';
</script>
</body>
</html>
```
