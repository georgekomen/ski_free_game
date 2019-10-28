import * as Constants from "../Constants";
import { Entity } from "./Entity";

export class MovableEntity extends Entity {
    assetName = '';
    direction = '';
    speed = 0;

    constructor(x, y) {
        super(x, y);
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
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