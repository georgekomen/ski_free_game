import * as Constants from "../Constants";
import { Entity } from "./Entity";

export class MovableEntity extends Entity {
    assetName = '';
    direction = '';
    speed = 0;

    constructor(x, y) {
        super(x, y);
    }

    moveLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveDown() {
        this.y += this.speed;
    }

    moveRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset(this.direction);
    }

    updateAsset(assetId) {
        if (this.isJumping()) {
            this.assetName = Constants.SKIER_JUMPING_POSTURE_ASSET[assetId];
        } else {
            this.assetName = Constants.SKIER_DIRECTION_ASSET[assetId];
        }
    }
}