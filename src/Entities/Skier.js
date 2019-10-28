import * as Constants from "../Constants";
import { intersectTwoRects, Rect } from "../Core/Utils";
import { MovableEntity } from "./MovableEntity";

export class Skier extends MovableEntity {
    constructor(x, y) {
        super(x, y);

        this.assetName = Constants.SKIER_DOWN;
        this.direction = Constants.DIRECTIONS.DOWN;
        this.speed = Constants.SKIER_STARTING_SPEED;
    }

    move() {
        switch(this.direction) {
            case Constants.DIRECTIONS.LEFT_DOWN:
                this.moveLeftDown();
                break;
            case Constants.DIRECTIONS.DOWN:
                this.moveDown();
                break;
            case Constants.DIRECTIONS.RIGHT_DOWN:
                this.moveRightDown();
                break;
        }
    }

    turnLeft() {
        if(this.direction == Constants.DIRECTIONS.DOWN){
            this.setDirection(Constants.DIRECTIONS.LEFT_DOWN);
        } else {
            this.setDirection(Constants.DIRECTIONS.LEFT);
            this.moveLeft();
        }
    }

    turnRight() {
        if(this.direction == Constants.DIRECTIONS.DOWN){
            this.setDirection(Constants.DIRECTIONS.RIGHT_DOWN);
        } else {
            this.setDirection(Constants.DIRECTIONS.RIGHT);
            this.moveRight();
        }
    }

    turnUp() {
        if(this.direction === Constants.DIRECTIONS.LEFT || this.direction === Constants.DIRECTIONS.RIGHT) {
            this.moveUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.DIRECTIONS.DOWN);
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
            this.setDirection(Constants.DIRECTIONS.CRASH);
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
        this.updateAsset(Constants.SKIER_JUMPING_POSTURE.JUMP1);

        const jumpingAnimationInterval = setInterval(() => {
            this.jumpingAnimations();
        }, (Constants.SKIER_JUMP_TIME / 5));

        setTimeout(() => {
            this.speed = Constants.SKIER_STARTING_SPEED;
            this.updateAsset(this.direction);
            clearInterval(jumpingAnimationInterval);
        }, Constants.SKIER_JUMP_TIME);
    }

    jumpingAnimations() {
        switch(this.assetName) {
            case Constants.SKIER_JUMP1:
                this.updateAsset(Constants.SKIER_JUMPING_POSTURE.JUMP2);
                break;
            case Constants.SKIER_JUMP2:
                this.updateAsset(Constants.SKIER_JUMPING_POSTURE.JUMP3);
                break;
            case Constants.SKIER_JUMP3:
                this.updateAsset(Constants.SKIER_JUMPING_POSTURE.JUMP4);
                break;
            case Constants.SKIER_JUMP4:
                this.updateAsset(Constants.SKIER_JUMPING_POSTURE.JUMP5);
                break;
        }
    }
}