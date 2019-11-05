import "babel-polyfill";
import * as Constants from "../Constants";
import { Rhino } from "./Rhino";
import { Skier } from "./Skier";

describe("rhino class", () => {
    const rhino = new Rhino(5, 5);
    const skier = new Skier(0, 0);
    jest.useFakeTimers();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("rhino should not be awake when class initializes", () => {
        expect(rhino).toBeTruthy();
        expect(rhino.isAwake).toBeFalsy();
    });

    test("rhino should appear at a position 500 pixels from the skier", () => {
        expect(rhino.isAwake).toBeFalsy();
        expect(rhino.y).toBe(5);

        rhino.appear(skier.getPosition());

        expect(rhino.isAwake).toBeTruthy();
        expect(rhino.y).toBe(-500);
    });

    test("rhino should hide at a position of x, y - 0, 0 and should not be awake", () => {
        rhino.hide();

        expect(rhino.x).toBe(0);
        expect(rhino.y).toBe(0);
        expect(rhino.awake).toBeFalsy();
    });

    test("shoud not draw rhino when it is not awake", () => {
        const draw = jest.spyOn(rhino, "draw");

        rhino.draw(null, null);

        expect(draw).toHaveReturned();
    });

    test("rhino should move right or left depending on skier position", () => {
        const rhino = new Rhino(50, 50);
        let skier = new Skier(20, 20);
        const updateRunningAsset = jest.spyOn(rhino, "updateRunningAsset");
        rhino.isAwake = true;

        rhino.moveTowardsSkier(skier);

        expect(updateRunningAsset).toHaveBeenCalledWith(
            Constants.RHINO_RUN.RHINO_RUN_RIGHT
        );

        skier = new Skier(100, 100);

        rhino.moveTowardsSkier(skier);

        expect(updateRunningAsset).toHaveBeenCalledWith(
            Constants.RHINO_RUN.RHINO_RUN_LEFT
        );
    });

    test("should change asset while eating skier", () => {
        const updateEatingAsset = jest.spyOn(rhino, "updateEatingAsset");
        rhino.isAwake = true;

        rhino.subscribeToEatAnimation(skier);
        jest.advanceTimersByTime(2000);

        expect(updateEatingAsset).toHaveBeenCalledWith(
            Constants.RHINO_EAT.EAT1
        );
        expect(updateEatingAsset).toHaveBeenCalledWith(
            Constants.RHINO_EAT.EAT2
        );
        expect(updateEatingAsset).toHaveBeenCalledWith(
            Constants.RHINO_EAT.EAT3
        );
        expect(updateEatingAsset).toHaveBeenCalledWith(
            Constants.RHINO_EAT.EAT4
        );
        expect(updateEatingAsset).toHaveBeenCalledWith(
            Constants.RHINO_EAT.OPEN_MOUTH
        );
        expect(updateEatingAsset).toHaveBeenCalledWith(
            Constants.RHINO_EAT.LIFT
        );
    });
});
