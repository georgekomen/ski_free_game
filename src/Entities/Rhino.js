import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { MovableEntity } from "./MovableEntity";

export class Yeti extends MovableEntity {
    constructor(x, y) {
        super(x, y);
    }
}