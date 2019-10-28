import "babel-polyfill";
import { Skier } from "./Skier";
import * as Constants from "../Constants";

describe('skier turn behaviour', () => {
    const skier = new Skier(5, 5);
    let setDirection;
    jest.useFakeTimers();

    test('class should initialize', () => {
        expect(skier).toBeTruthy();
    });

    afterEach(() => {    
        jest.clearAllMocks();
    });

    describe('skier behavior when turned left', () => {
        let moveLeft;

        beforeEach(() => {
            setDirection = jest.spyOn(skier, 'setDirection');
            moveLeft = jest.spyOn(skier, 'moveLeft');
        });

        test('should move left down if turned left while moving down', () => {
            skier.turnLeft();

            expect(setDirection).toHaveBeenCalledWith(Constants.DIRECTIONS.LEFT_DOWN);
            expect(skier.direction).toBe(Constants.DIRECTIONS.LEFT_DOWN);
            expect(moveLeft).not.toHaveBeenCalled();
        });

        test('should move left if turned left while moving left down', () => {
            skier.setDirection(Constants.DIRECTIONS.LEFT_DOWN);

            skier.turnLeft();

            expect(setDirection).toHaveBeenCalledWith(Constants.DIRECTIONS.LEFT);
            expect(skier.direction).toBe(Constants.DIRECTIONS.LEFT);
            expect(moveLeft).toHaveBeenCalled();
        });

        test('should wake up facing left and move if turned left when crashed', () => {
            skier.setDirection(Constants.DIRECTIONS.CRASH);

            expect(skier.assetName).toBe(Constants.SKIER_CRASH);

            skier.turnLeft();

            expect(skier.assetName).toBe(Constants.SKIER_LEFT);

            expect(setDirection).toHaveBeenCalledWith(Constants.DIRECTIONS.LEFT);
            expect(skier.direction).toBe(Constants.DIRECTIONS.LEFT);
            expect(moveLeft).toHaveBeenCalled();
        });
    });


    describe('skier behavior when turned right', () => {
        let moveRight;

        beforeEach(() => {
            setDirection = jest.spyOn(skier, 'setDirection');
            moveRight = jest.spyOn(skier, 'moveRight');
        });

        test('should move right down if turned right while moving down', () => {
            skier.setDirection(Constants.DIRECTIONS.DOWN);

            skier.turnRight();

            expect(setDirection).toHaveBeenCalledWith(Constants.DIRECTIONS.RIGHT_DOWN);
            expect(skier.direction).toBe(Constants.DIRECTIONS.RIGHT_DOWN);
            expect(moveRight).not.toHaveBeenCalled();
        });

        test('should move right if turned right while moving right down', () => {
            skier.setDirection(Constants.DIRECTIONS.RIGHT_DOWN);

            skier.turnRight();

            expect(setDirection).toHaveBeenCalledWith(Constants.DIRECTIONS.RIGHT);
            expect(skier.direction).toBe(Constants.DIRECTIONS.RIGHT);
            expect(moveRight).toHaveBeenCalled();
        });

        test('should wake up facing right and move if turned right when crashed', () => {
            skier.setDirection(Constants.DIRECTIONS.CRASH);

            expect(skier.assetName).toBe(Constants.SKIER_CRASH);

            skier.turnRight();

            expect(skier.assetName).toBe(Constants.SKIER_RIGHT);
            expect(setDirection).toHaveBeenCalledWith(Constants.DIRECTIONS.RIGHT);
            expect(skier.direction).toBe(Constants.DIRECTIONS.RIGHT);
            expect(moveRight).toHaveBeenCalled();
        });
    });


    describe('skier conditions for jumping', () => {
        let jump;

        beforeEach(() => {
            jump = jest.spyOn(skier, 'jump');
            skier.setDirection(Constants.DIRECTIONS.DOWN);
        });

        test('skier should increase speed and be on jumping asset when jumping', () => {
            expect(skier.assetName).toBe(Constants.SKIER_DIRECTION_ASSET[Constants.DIRECTIONS.DOWN]);
            expect(skier.speed).toBe(Constants.SKIER_STARTING_SPEED);

            skier.jump();

            expect(skier.speed).toBe(Constants.SKIER_JUMPING_SPEED);
            expect(skier.assetName).toBe(Constants.SKIER_JUMPING_POSTURE_ASSET[Constants.SKIER_JUMPING_POSTURE.JUMP1]);
        });

        test('skier should always jump over jump rumps', () => {
            skier.checkIfShouldJumpOrCrashAfterCollision(Constants.JUMP_RUMP);

            expect(jump).toHaveBeenCalled();
        });

        test('skier is jumping if he moves at jumping speed', () => {
            skier.speed = Constants.SKIER_JUMPING_SPEED;

            expect(skier.isJumping()).toBe(true);
        });

        test('skier should jump over rocks only if already in jumping mode / speed', () => {
            skier.speed = Constants.SKIER_JUMPING_SPEED;

            expect(skier.isJumping()).toBe(true);
            expect(skier.canJumpObstacle(Constants.ROCK1)).toBe(true);
            expect(skier.canJumpObstacle(Constants.ROCK2)).toBe(true);

            skier.checkIfShouldJumpOrCrashAfterCollision(Constants.ROCK1);

            expect(jump).toHaveBeenCalled();
        });

        test('skier should not jump over rocks if not in jumping mode / speed', () => {
            skier.speed = Constants.SKIER_STARTING_SPEED;

            expect(skier.isJumping()).toBe(false);
            expect(skier.canJumpObstacle(Constants.ROCK1)).toBe(false);
            expect(skier.canJumpObstacle(Constants.ROCK2)).toBe(false);
            
            skier.checkIfShouldJumpOrCrashAfterCollision(Constants.ROCK1);

            expect(jump).not.toHaveBeenCalled();
        });

        test('skier should never jump over trees even on jumping mode / speed', () => {
            skier.speed = Constants.SKIER_JUMPING_SPEED;

            expect(skier.canJumpObstacle(Constants.TREE)).toBe(false);
            expect(skier.canJumpObstacle(Constants.TREE_CLUSTER)).toBe(false);
            
            skier.checkIfShouldJumpOrCrashAfterCollision(Constants.TREE);

            expect(jump).not.toHaveBeenCalled();
        });

        test('skier should be animated while jumping', () => {
            const updateAsset = jest.spyOn(skier, 'updateAsset');

            skier.speed = Constants.SKIER_JUMPING_SPEED;
            skier.jump();
            jest.advanceTimersByTime(Constants.SKIER_JUMP_TIME);

            expect(setInterval).toHaveBeenCalledTimes(1);
            expect(setInterval).toHaveBeenCalledWith(expect.any(Function), (Constants.SKIER_JUMP_TIME / 5));
            expect(updateAsset).toHaveBeenNthCalledWith(1, Constants.SKIER_JUMPING_POSTURE.JUMP1);
            expect(updateAsset).toHaveBeenNthCalledWith(2, Constants.SKIER_JUMPING_POSTURE.JUMP2);
            expect(updateAsset).toHaveBeenNthCalledWith(3, Constants.SKIER_JUMPING_POSTURE.JUMP3);
            expect(updateAsset).toHaveBeenNthCalledWith(4, Constants.SKIER_JUMPING_POSTURE.JUMP4);
            expect(updateAsset).toHaveBeenNthCalledWith(5, Constants.SKIER_JUMPING_POSTURE.JUMP5);
        });
    });
});