import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { Rhino } from "../Entities/Rhino";
import { interval } from "rxjs";
import { takeWhile,delay } from "rxjs/operators";

export class Game {
    gameWindow = null;
    wakeUpRhinoSubscription = null;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.rhino = new Rhino(0, 0);
        this.obstacleManager = new ObstacleManager();

        this.scheduleToWakeUpRhino();
        this.scoreSkier();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        requestAnimationFrame(this.run.bind(this));
    }

    scoreSkier() {
        this.skier.score = 0;
        interval(Constants.SKIER_SCORING_INTERVAL)
        .pipe(
            delay(500),
            takeWhile(() => this.skier.isAlive)
            )
        .subscribe(() => {
            if(this.skier.isMoving()) {
                ++this.skier.score;
                this.skier.speed += 0.1;
                this.rhino.speed += 0.1;
            } else if (this.skier.skierCrashed() && this.skier.score > 0) {
                this.skier.score -= 0.5;
            }
        });
    }

    restartGame() {
        if(!this.gameEnded()) {
            return;
        }
        this.skier.ressurect();
        this.rhino.hide();
        this.scheduleToWakeUpRhino();
        this.scoreSkier();
    }

    gameEnded() {
        return !this.skier.isAlive;
    }

    scheduleToWakeUpRhino() {
        clearTimeout(this.wakeUpRhinoSubscription);
        
        this.wakeUpRhinoSubscription = setTimeout(() => {
            this.rhino.appear(this.skier.getPosition());
        }, Constants.TIME_TO_WAKE_UP_RHINO);
    }

    updateGameWindow() {
        this.rhinoSkierGame();

        const previousGameWindow = this.gameWindow;

        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
    }

    rhinoSkierGame() {
        this.skier.move();
        this.skier.displaySkierControls(this.canvas);

        const skierCaught = this.rhino.checkIfRhinoCatchedSkier(this.skier, this.assetManager);

        if (skierCaught) {
            this.endGame();
            return;
        }
        this.rhino.moveTowardsSkier(this.skier.getPosition()); 
    }

    endGame() {
        this.rhino.eatSkierWithAnimation(this.skier);
        this.skier.eaten();
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.rhino.draw(this.canvas, this.assetManager);
        this.skier.draw(this.canvas, this.assetManager);
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    displayGameInstructions() {

    }

    handleKeyDown(event) {
        if(event.which === Constants.KEYS.SPACE && this.gameEnded()) {
            this.restartGame();
        } else if(this.gameEnded()) {
            return;
        }

        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.SHIFT:
                this.skier.jump();
                event.preventDefault();
                break;
        }
    }
}