import "babel-polyfill";
import { Skier } from "./Skier";
import * as Constants from "../Constants";

describe('skier turn behaviour', () => {
    const skier = new Skier(5, 5);
    let setDirection;
    let moveSkierLeft;
    let moveSkierRight;

    test('class should initialize', () => {
        expect(skier).toBeTruthy();
    });

    describe('skier behavior when turned left', () => {
        beforeEach(() => {
            setDirection = jest.spyOn(skier, 'setDirection');
            moveSkierLeft = jest.spyOn(skier, 'moveSkierLeft');
        });

        test('should move left down if turned left while moving down', () => {
            skier.turnLeft();

            expect(setDirection).toHaveBeenCalledWith(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
            expect(moveSkierLeft).not.toHaveBeenCalled();
        });

        test('should move left if turned left while moving left down', () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

            skier.turnLeft();

            expect(setDirection).toHaveBeenCalledWith(Constants.SKIER_DIRECTIONS.LEFT);
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
            expect(moveSkierLeft).toHaveBeenCalled();
        });

        test('should wake up facing left and move left if turned left when crashed', () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

            expect(skier.assetName).toBe(Constants.SKIER_CRASH);

            skier.turnLeft();

            expect(skier.assetName).toBe(Constants.SKIER_LEFT);

            expect(setDirection).toHaveBeenCalledWith(Constants.SKIER_DIRECTIONS.LEFT);
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
            expect(moveSkierLeft).toHaveBeenCalled();
        });
    });


    describe('skier behavior when turned right', () => {
        beforeEach(() => {
            setDirection = jest.spyOn(skier, 'setDirection');
            moveSkierRight = jest.spyOn(skier, 'moveSkierRight');
        });

        test('should move right down if turned right while moving down', () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

            skier.turnRight();

            expect(setDirection).toHaveBeenCalledWith(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
            expect(moveSkierRight).not.toHaveBeenCalled();
        });

        test('should move right if turned right while moving right down', () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

            skier.turnRight();

            expect(setDirection).toHaveBeenCalledWith(Constants.SKIER_DIRECTIONS.RIGHT);
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
            expect(moveSkierRight).toHaveBeenCalled();
        });

        test('should wake up facing right and move right if turned right when crashed', () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

            expect(skier.assetName).toBe(Constants.SKIER_CRASH);

            skier.turnRight();

            expect(skier.assetName).toBe(Constants.SKIER_RIGHT);
            expect(setDirection).toHaveBeenCalledWith(Constants.SKIER_DIRECTIONS.RIGHT);
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
            expect(moveSkierRight).toHaveBeenCalled();
        });
    });
});