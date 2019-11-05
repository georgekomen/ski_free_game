import "babel-polyfill";
import { Game } from "./Game";

describe('game class', () => {
    const game = new Game();
    jest.useFakeTimers();

    test('rhino should wake up some time after game starts', () => {
        const scheduleToWakeUpRhino = jest.spyOn(game, 'scheduleToWakeUpRhino');

        game.scheduleToWakeUpRhino();
        jest.advanceTimersByTime(20000);

        expect(scheduleToWakeUpRhino).toHaveBeenCalled();
        expect(game.rhino.isAwake).toBeTruthy();
    });

    test('game should be able to restart and rhino should hide', () => {
        game.skier.eaten();
        game.restartGame();

        expect(game.rhino.isAwake).toBeFalsy();
    });

    test('game ended when skier is not alive', () => {
        game.skier.eaten();
        expect(game.gameEnded()).toBe(true);
    });

});