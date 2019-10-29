import "babel-polyfill";
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { Game } from "./Game";

describe('game class', () => {
    const rhino = new Rhino(5, 5);
    const skier = new Skier(0, 0);
    const game = new Game();
    jest.useFakeTimers();

    test('rhino should wake up some time after game starts', () => {
        const scheduleToWakeUpRhino = jest.spyOn(game, 'scheduleToWakeUpRhino');
        // jest.advanceTimersByTime(20000);
        expect(scheduleToWakeUpRhino).toHaveBeenCalled();
    });

});