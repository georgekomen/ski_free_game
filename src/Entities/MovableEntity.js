import * as Constants from "../Constants";
import { Entity } from "./Entity";

export class MovableEntity extends Entity {
    startingSpeed = 0;
    direction = '';
    speed = 0;

    constructor(x, y) {
        super(x, y);
    }

    moveLeft() {
        this.x -= this.startingSpeed;
    }

    moveLeftDown() {
        this.x -= this.speed / Constants.DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.DIAGONAL_SPEED_REDUCER;
    }

    moveDown() {
        this.y += this.speed;
    }

    moveRightDown() {
        this.x += this.speed / Constants.DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.DIAGONAL_SPEED_REDUCER;
    }

    moveRight() {
        this.x += this.startingSpeed;
    }

    moveUp() {
        this.y -= this.startingSpeed;
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset(direction);
    }

    updateAsset() {
        // ovveride method in base class
    }
}