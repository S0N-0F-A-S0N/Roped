import { Vector2 } from 'three';
import { CONFIG } from '../config.js';

//

export default class Point {

    constructor(x, y, locked) {

        this.position = new Vector2(x, y);
        this.prevPosition;
        this.locked = locked

        if (this.locked) {
            this.defaultColor = CONFIG.colors.pointDefault;
        }
        else {
            this.defaultColor = CONFIG.colors.pointWhite;
        }

    }

    //

    setPreviousPosition(prevX, prevY) {
        this.prevPosition = new Vector2(prevX, prevY);
    }

    //

    updatePoint(delta) {

        if (!this.locked) {

            var vx = (this.position.x - this.prevPosition.x) * CONFIG.physics.friction;
            var vy = (this.position.y - this.prevPosition.y) * CONFIG.physics.friction;

            this.prevPosition.x = this.position.x;
            this.prevPosition.y = this.position.y;

            this.position.x += vx; 
            this.position.y += vy;

            var g = CONFIG.physics.gravity;
            g /= CONFIG.physics.gMultiplier;

            this.position.y += g * delta;

        }

    }

    //

    constrainPoint(sceneW, sceneH) {

        if (!this.locked) {

            var vx = (this.position.x - this.prevPosition.x) * CONFIG.physics.friction;
            var vy = (this.position.y - this.prevPosition.y) * CONFIG.physics.friction;

            if (this.position.x > sceneW / 2) {
                this.position.x = sceneW / 2;
                this.prevPosition.x = this.position.x + vx * CONFIG.physics.bounce;
            }
            else if (this.position.x < -sceneW / 2) {
                this.position.x = -sceneW / 2;
                this.prevPosition.x = this.position.x + vx * CONFIG.physics.bounce;
            }

            if (this.position.y > sceneH / 2) {
                this.position.y = sceneH / 2;
                this.prevPosition.y = this.position.y + vy * CONFIG.physics.bounce;
            }
            else if (this.position.y < -sceneH / 2) {
                this.position.y = -sceneH / 2;
                this.prevPosition.y = this.position.y + vy * CONFIG.physics.bounce;
            }

        }

    }

    //

    toggleLocked() {
        
        this.locked = !this.locked;

        this.updateColor();
        
    }

    //

    updateColor() {

        if (this.locked) {
            this.defaultColor = CONFIG.colors.pointDefault;
        }
        else {
            this.defaultColor = CONFIG.colors.pointWhite;
        }

    }
}
