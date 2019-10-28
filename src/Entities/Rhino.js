import * as Constants from "../Constants";
import { Entity } from "./Entity";

export class Yeti extends Entity {
    assetName = Constants.RHINO;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;

    constructor(x, y) {
        super(x, y);
    }
}