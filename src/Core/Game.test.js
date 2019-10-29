import "babel-polyfill";
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { Game } from "./Game";

describe('game class', () => {
    const game = new Game();
    jest.useFakeTimers();

    test('game should be able to restart', () => {
        const scheduleToWakeUpRhino = jest.spyOn(game, 'scheduleToWakeUpRhino');
        game.skier.eaten();
        game.restartGame();
        jest.advanceTimersByTime(2000);

        expect(scheduleToWakeUpRhino).toHaveBeenCalled();
    });

    test('game ended when skier is not alive', () => {
        game.skier.eaten();
        expect(game.gameEnded()).toBe(true);
    })

});