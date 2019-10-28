import * as Constants from "../Constants";
import { randomInt } from "../Core/Utils";
import { Entity } from "./Entity";

export class Rhino extends Entity {
    assetName = Constants.RHINO;
    speed = Constants.RHINO_SPEED;

    constructor(x, y) {
        super(x, y);
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