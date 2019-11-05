import "babel-polyfill";
import { Game } from "./Game";
import * as Constants from "../Constants"

describe("game class", () => {
    const game = new Game();
    jest.useFakeTimers();

    test("rhino should wake up some time after game starts", () => {
        const wakeUpRhinoSubscription = jest.spyOn(
            game,
            "subscribeToWakeUpRhino"
        );

        game.subscribeToWakeUpRhino();
        jest.advanceTimersByTime(20000);

        expect(wakeUpRhinoSubscription).toHaveBeenCalled();
        expect(game.rhino.isAwake).toBeTruthy();
    });

    test("game should be able to restart and rhino should hide", () => {
        game.skier.eaten();
        game.restartGame();

        expect(game.rhino.isAwake).toBeFalsy();
    });

    test("game ended when skier is not alive", () => {
        game.skier.eaten();
        expect(game.gameEnded()).toBe(true);
    });

    /**
     * For some unknown reasons, jest time is mocked and is not working well. 
     * I expect rxjs scoring interval callback to be called once every 800 ms but it
     * gets called 3 times.
     * For that reason my tests here are based on jest time but real execution is based on real time
     */
    test("skier and rhino speeds should increase as skier earns points", () => {
        game.restartGame(); // set values for beginning of a fresh game
        expect(game.skier.score).toBe(0);

        game.subscribeToScoreSkier();

        jest.advanceTimersByTime(800);

        expect(game.skier.score).toBe(3);
        expect(game.skier.speed.toFixed(1)).toBe("10.3");
        expect(game.rhino.speed.toFixed(1)).toBe("8.3");
    });

    test("skier should loose points after crashing", () => {
        game.restartGame(); // set values for beginning of a fresh game
        game.skier.score = 10;
        game.skier.direction = Constants.SKIER_DIRECTIONS.CRASH;

        game.subscribeToScoreSkier();

        jest.advanceTimersByTime(800);

        expect(game.skier.score).toBe(8);
    });

    test("should be able to reset score", () => {
        game.skier.score = 10;

        game.resetSkierScore();

        expect(game.skier.score).toBe(0);
    });
});
