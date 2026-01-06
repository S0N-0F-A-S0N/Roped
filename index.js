import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CONFIG } from './src/config.js';
import { UI } from './src/UI.js';
import { initInstanceObjects } from './src/instance/InstanceInit.js';

// Removed webpack requires
// require('normalize.css/normalize.css');
// require('./src/index.css');

let renderer, scene, camera, composer;
let container, stats, clock;
let raycaster, color, mouse, leftMouseButtonDown, clicked;
let instanceSticks, instancePoints;
let dist, controls, ui;

window.onload = function () {

    dist = CONFIG.dist;

    initScene();
    initObjects();
    initRaycaster();
    initStats();

    // Initialize UI
    ui = new UI(CONFIG);

    animate();

    initEventListeners();
    onWindowResize();
}

function initScene() {

    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(CONFIG.camera.fov, window.innerWidth / window.innerHeight, CONFIG.camera.near, CONFIG.camera.far);
    camera.position.set(0, 0, dist);

    scene = new THREE.Scene();

}

function initObjects() {

    var dimensions = getTrueCanvasSize()
    var canvasW = dimensions[0];
    var canvasH = dimensions[1];

    var instancedObj = initInstanceObjects(canvasW, canvasH);
    instancePoints = instancedObj[0];
    instanceSticks = instancedObj[1];

    scene.add(instancePoints.mesh);
    scene.add(instanceSticks.mesh);

}

function initStats() {

    stats = new Stats();
    document.body.appendChild(stats.dom);

}

function initRaycaster() {

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2(CONFIG.mouse.initialX, CONFIG.mouse.initialY);

    color = new THREE.Color(CONFIG.colors.raycastColor);
    clicked = false;

}

function animate() {

    requestAnimationFrame(animate);

    raycaster.setFromCamera(mouse, camera);

    let delta = clock.getDelta();

    // if less than 5 fps pause animation to stop glitches
    if (delta > CONFIG.physics.timeStep) {
        delta = 0;
    }

    instancePoints.updatePoints(delta);

    var selected = raycastPoints();

    // run update sticks from 3-5 times to make it more stable and less jittery
    for (let i = 0; i < CONFIG.physics.subSteps; i++) {
        instanceSticks.update(delta);
    }

    if (selected == false) {
        raycastSticks();
    }

    stats.update();
    
    renderer.render(scene, camera);

}

function raycastPoints() {

    var selected = false;

    var intersection = raycaster.intersectObject(instancePoints.mesh);

    if (intersection.length > 0) {

        var intersectionId = intersection[0].instanceId;

        instancePoints.mesh.setColorAt(intersectionId, color);
        instancePoints.mesh.instanceColor.needsUpdate = true;

        selected = true

        if (clicked) {
            clicked = false;
            instancePoints.points[intersectionId].toggleLocked();
        }

    }
    else {
        clicked = false;
    }

    return selected;
}

function raycastSticks() {

    var intersection = raycaster.intersectObject(instanceSticks.mesh);

    if (intersection.length > 0) {

        var intersectionId = intersection[0].instanceId;

        instanceSticks.mesh.setColorAt(intersectionId, color);
        instanceSticks.mesh.instanceColor.needsUpdate = true;

        if (leftMouseButtonDown) {
            instanceSticks.sticks.splice(intersectionId, 1);
            instanceSticks.mesh.count = instanceSticks.sticks.length;
        }

    }
}

// calculates the size of the bounding box of what is visible on the canvas given
// different screen sizes
function getTrueCanvasSize() {

    var returnArray = [];

    var vFOV = THREE.MathUtils.degToRad(camera.fov); // convert vertical fov to radians

    var canvasH = 2 * Math.tan(vFOV / 2) * dist; // visible height
    // camera aspect changes on resize
    var canvasW = canvasH * camera.aspect;           // visible width

    returnArray.push(canvasW);
    returnArray.push(canvasH);

    return returnArray;

}

function initEventListeners() {

    // for resize
    window.addEventListener('resize', onWindowResize, false);

    // for mouse
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick, false);

    document.body.onmousedown = setLeftButtonState;
    document.body.onmousemove = setLeftButtonState;
    document.body.onmouseup = setLeftButtonState;

    // for mobile touch
    document.addEventListener('touchstart', onTouchStart, false);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, false);

}

/*
 *  CODE BELOW IS FOR EVENT LISTENERS 
 */

function setLeftButtonState(e) {
    leftMouseButtonDown = e.buttons === undefined
        ? e.which === 1
        : e.buttons === 1;
}

function onWindowResize() {
    var container = document.getElementById('canvas');

    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

}

function onMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

function onClick() { 
    clicked = true;
}

function onTouchStart(event) {

    // overrites default mouse functionality 
    // event.preventDefault();

    mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

    leftMouseButtonDown = true;

}

function onTouchMove(event) {

    event.preventDefault();
    
    mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

}

function onTouchEnd() {

    // event.preventDefault();

    leftMouseButtonDown = false;

}
