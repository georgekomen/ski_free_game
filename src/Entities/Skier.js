import * as Constants from "../Constants";
import { intersectTwoRects, Rect } from "../Core/Utils";
import { Entity } from "./Entity";
import { interval } from "rxjs";
import { takeWhile } from "rxjs/operators";

export class Skier extends Entity {
    behaviourState = {
        isJumping: false,
        hasStopped: false
    };

    /**
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(x, y) {
        super(x, y);
        this.assetName = Constants.SKIER_DOWN;
        this.direction = Constants.SKIER_DIRECTIONS.DOWN;
        this.speed = Constants.SKIER_STARTING_SPEED;
        this.isAlive = true;
        this.score = 0;
    }

    isMoving() {
        return (
            this.direction ===
            (Constants.SKIER_DIRECTIONS.DOWN ||
                Constants.SKIER_DIRECTIONS.LEFT_DOWN ||
                Constants.SKIER_DIRECTIONS.RIGHT_DOWN)
        );
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset(direction);
    }

    eaten() {
        this.isAlive = false;
    }

    ressurect() {
        this.isAlive = true;
        this.speed = Constants.SKIER_STARTING_SPEED;
        this.moveSkierDown();
    }

    /**
     * @param {Canvas} canvas - a graphics container that will render in dom 
     * @param {Number} rhinoSpeed - speed of rhino instantiated from the game class
     * Prints on the screen state of the game e.g. rhino and skier speeds
     */
    displaySkierControls(canvas, rhinoSpeed) {
        let startingYposition = 7;

        const scoreDisplayText = `Current score: ${this.score}`;
        const speedDisplayText = `Speeds: skier: ${this.speed.toFixed(2)}, rhino: ${rhinoSpeed.toFixed(2)}`;
        const jumpInstr = "Shift key - jump over rocks";
        const pauseInstr = "Space key - pause game";
        const restartInstr = "Enter key - restart game";
        const moveInstr = "Arrow keys - move skier";

        const displayText = [
            scoreDisplayText,
            speedDisplayText,
            jumpInstr,
            pauseInstr,
            restartInstr,
            moveInstr
        ];

        displayText.forEach(text => {
            startingYposition += 11;
            super.drawText(
                canvas,
                text,
                { x: 3, y: startingYposition },
                { x: 500, y: 500 }
            );
        });
    }

    /**
     * @param {Canvas} canvas 
     * @param {Assetmanager} assetManager 
     */
    draw(canvas, assetManager) {
        if (!this.isAlive) {
            return;
        }
        super.draw(canvas, assetManager);
    }

    /**
     * @param {Number} assetId 
     */
    updateAsset(assetId) {
        if (this.behaviourState.isJumping) {
            this.assetName = Constants.SKIER_JUMPING_ASSET[assetId];
        } else {
            this.assetName = Constants.SKIER_DIRECTION_ASSET[assetId];
        }
    }

    move() {
        if (!this.isAlive) {
            return;
        }
        switch (this.direction) {
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

    turnLeft() {
        if (this.direction == Constants.SKIER_DIRECTIONS.DOWN) {
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        } else {
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
            this.moveSkierLeft();
        }
    }

    turnRight() {
        if (this.direction == Constants.SKIER_DIRECTIONS.DOWN) {
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        } else {
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
            this.moveSkierRight();
        }
    }

    turnUp() {
        if (
            this.direction === Constants.SKIER_DIRECTIONS.LEFT ||
            this.direction === Constants.SKIER_DIRECTIONS.RIGHT
        ) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    /**
     * @param {ObstacleManager} obstacleManager 
     * @param {Assetmanager} assetManager 
     */
    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        let obstacleName;
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find(obstacle => {
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

        if (collision) {
            this.checkIfShouldJumpOrCrashAfterCollision(obstacleName);
        }
    }

    skierCrashed() {
        return this.direction === Constants.SKIER_DIRECTIONS.CRASH;
    }

    /**
     * @param {String} obstacleName - name of obstacle skier just collided with
     * The skier will either jump or crash depending on the obstacle
     */
    checkIfShouldJumpOrCrashAfterCollision(obstacleName) {
        if (
            obstacleName === Constants.JUMP_RUMP ||
            this.canJumpObstacle(obstacleName)
        ) {
            this.jump();
        } else {
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        }
    }

    /**
     * 
     * @param {String} obstacleName - name of obstacle skier just collided with
     * @returns A boolean value whether skier can jump the obstacle or not
     */
    canJumpObstacle(obstacleName) {
        return jumpableObstacles().includes(obstacleName) &&
            this.behaviourState.isJumping;

        function jumpableObstacles() {
            return [Constants.ROCK1, Constants.ROCK2];
        }
    }

    jump() {
        this.behaviourState.isJumping = true;
        this.subscribeToJumpingAnimation();
        this.subscribeToEndJump();
    }

    subscribeToEndJump() {
        setTimeout(() => {
            this.behaviourState.isJumping = false;
            this.updateAsset(this.direction);
        }, Constants.SKIER_JUMP_TIME);
    }

    subscribeToJumpingAnimation() {
        interval(Constants.SKIER_JUMP_TIME / 5)
            .pipe(
                takeWhile(
                    val => val !== Constants.SKIER_JUMPING.JUMP5,
                    Constants.SKIER_JUMPING.JUMP5
                )
            )
            .subscribe(assetId => this.updateAsset(assetId));
    }
}
