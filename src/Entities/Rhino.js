import * as Constants from "../Constants";
import { intersectTwoRects, Rect, getSlope, randomInt } from "../Core/Utils";
import { Entity } from "./Entity";
import { from, interval } from "rxjs";
import { takeWhile} from "rxjs/operators";

export class Rhino extends Entity {
    assetName = Constants.RHINO;
    speed = Constants.RHINO_SPEED;
    isAwake = false;

    constructor(x, y) {
        super(x, y);
    }

    wakeUp(skierPosition) {
        this.isAwake = true;
        this.x = (Math.random() * randomInt(-100, 100));
        this.y = (skierPosition.y - 1000);
    }

    draw(canvas, assetManager) {
        if(!this.isAwake) {
            return;
        }
        super.draw(canvas, assetManager)
    }

    moveTowardsSkier(skierPosition) {
        const slope = getSlope(skierPosition, this.getPosition());
        if (this.y > skierPosition.y) {
            this.y -= this.speed;
        } else {
            this.y += this.speed;
        }

        if (this.x > skierPosition.x) {
            this.updateRunningAsset(Constants.RHINO_RUN.RHINO_RUN_RIGHT);
            this.x -= (this.speed / (slope * -1));
        } else {
            this.updateRunningAsset(Constants.RHINO_RUN.RHINO_RUN_LEFT);
            this.x += (this.speed / slope);
        }
    }

    checkIfRhinoCatchedSkier(skier, assetManager) {
        const rhinoAsset = assetManager.getAsset(this.assetName);
        const skierAsset = assetManager.getAsset(skier.assetName);
        const rhinoBounds = new Rect(
            this.x - rhinoAsset.width / 2,
            this.y - rhinoAsset.height / 2,
            this.x + rhinoAsset.width / 2,
            this.y - rhinoAsset.height / 4
        );
        const skierBounds = new Rect(
            skier.x - skierAsset.width / 2,
            skier.y - skierAsset.height / 2,
            skier.x + skierAsset.width / 2,
            skier.y - skierAsset.height / 4
        );
        return intersectTwoRects(rhinoBounds, skierBounds);
    }

    eatSkier() {
            interval(100)
            .pipe(takeWhile(val => val !== Constants.RHINO_EAT.EAT4, Constants.RHINO_EAT.EAT4))
            .subscribe(assetId => this.updateEatingAsset(assetId));
    }

    updateRunningAsset(assetId) {
        this.assetName = Constants.RHINO_RUN_ASSET[assetId];
    }

    updateEatingAsset(assetId) {
        this.assetName = Constants.RHINO_EAT_ASSET[assetId];
    }
}