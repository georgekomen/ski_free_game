import * as Constants from "../Constants";
import { MovableEntity } from "./MovableEntity";
import { randomInt } from "../Core/Utils";

export class Rhino extends MovableEntity {
    constructor(x, y) {
        super(x, y);

        this.assetName = Constants.RHINO;
        this.direction = Constants.DIRECTIONS.DOWN;
        this.speed = Constants.SKIER_STARTING_SPEED;
        this.startingSpeed = Constants.SKIER_STARTING_SPEED;
    }

    appear(skierPosition) {
        this.x = (randomInt(-700, 700) * Math.random());
        this.y = (skierPosition.y - 200);
    }

    move(skierPosition) {
        console.log(skierPosition);

        console.log(this.getPosition());
        
    }
}