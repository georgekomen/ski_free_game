import * as Constants from "../Constants";
import { intersectTwoRects, Rect } from "../Core/Utils";
import { Entity } from "./Entity";
import { from, interval } from "rxjs";
import { delay,takeWhile } from "rxjs/operators";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;
    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset(direction);
    }

    updateAsset(assetId) {
        if (this.isJumping()) {
            this.assetName = Constants.SKIER_JUMPING_ASSET[assetId];
        } else {
            this.assetName = Constants.SKIER_DIRECTION_ASSET[assetId];
        }
    }

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if(this.direction == Constants.SKIER_DIRECTIONS.DOWN){
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        } else {
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
            this.moveSkierLeft();
        }
    }

    turnRight() {
        if(this.direction == Constants.SKIER_DIRECTIONS.DOWN){
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        } else {
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
            this.moveSkierRight();
        }
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        let obstacleName;
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            obstacleName = obstacle.getAssetName();
            const obstacleAsset = assetManager.getAsset(obstacleName);
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if(collision) {
            this.checkIfShouldJumpOrCrashAfterCollision(obstacleName);    
        }
    }

    checkIfShouldJumpOrCrashAfterCollision(obstacleName) {
        if (obstacleName === Constants.JUMP_RUMP || this.canJumpObstacle(obstacleName)) {
            this.jump();
        } else {
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        }
    }

    canJumpObstacle(obstacleName) {
        return [Constants.ROCK1, Constants.ROCK2].includes(obstacleName) && this.isJumping();
    }

    isJumping() {
        return this.speed === Constants.SKIER_JUMPING_SPEED;
    }

    jump() {
        this.speed = Constants.SKIER_JUMPING_SPEED;
        this.jumpingAnimation();
        this.endJump();
    }

    endJump() {
        setTimeout(() => {
            this.speed = Constants.SKIER_STARTING_SPEED;
            this.updateAsset(this.direction);
        }, Constants.SKIER_JUMP_TIME);
    }

    jumpingAnimation() {
        interval(Constants.SKIER_JUMP_TIME / 5)
        .pipe(takeWhile(val => val !== Constants.SKIER_JUMPING.JUMP5, Constants.SKIER_JUMPING.JUMP5))
        .subscribe(assetId => this.updateAsset(assetId));
    }
}