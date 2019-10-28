import * as Constants from "../Constants";
import { MovableEntity } from "./MovableEntity";

export class Yeti extends MovableEntity {
    constructor(x, y) {
        super(x, y);

        this.assetName = Constants.RHINO;
        this.direction = Constants.DIRECTIONS.DOWN;
        this.speed = Constants.SKIER_STARTING_SPEED;
    }
}