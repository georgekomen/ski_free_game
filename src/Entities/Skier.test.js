import "babel-polyfill";
import { Skier } from "./Skier";
import * as Constants from "../Constants";

describe("skier turn behaviour", () => {
    const skier = new Skier(5, 5);
    let setDirection;
    jest.useFakeTimers();

    test("class should initialize", () => {
        expect(skier).toBeTruthy();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("skier behavior when turned left", () => {
        let moveSkierLeft;

        beforeEach(() => {
            setDirection = jest.spyOn(skier, "setDirection");
            moveSkierLeft = jest.spyOn(skier, "moveSkierLeft");
        });

        test("should move left down if turned left while moving down", () => {
            skier.turnLeft();

            expect(setDirection).toHaveBeenCalledWith(
                Constants.SKIER_DIRECTIONS.LEFT_DOWN
            );
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
            expect(moveSkierLeft).not.toHaveBeenCalled();
        });

        test("should move left if turned left while moving left down", () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

            skier.turnLeft();

            expect(setDirection).toHaveBeenCalledWith(
                Constants.SKIER_DIRECTIONS.LEFT
            );
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
            expect(moveSkierLeft).toHaveBeenCalled();
        });

        test("should wake up facing left and move if turned left when crashed", () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

            expect(skier.assetName).toBe(Constants.SKIER_CRASH);

            skier.turnLeft();

            expect(skier.assetName).toBe(Constants.SKIER_LEFT);

            expect(setDirection).toHaveBeenCalledWith(
                Constants.SKIER_DIRECTIONS.LEFT
            );
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
            expect(moveSkierLeft).toHaveBeenCalled();
        });
    });

    describe("skier behavior when turned right", () => {
        let moveSkierRight;

        beforeEach(() => {
            setDirection = jest.spyOn(skier, "setDirection");
            moveSkierRight = jest.spyOn(skier, "moveSkierRight");
        });

        test("should move right down if turned right while moving down", () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

            skier.turnRight();

            expect(setDirection).toHaveBeenCalledWith(
                Constants.SKIER_DIRECTIONS.RIGHT_DOWN
            );
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
            expect(moveSkierRight).not.toHaveBeenCalled();
        });

        test("should move right if turned right while moving right down", () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

            skier.turnRight();

            expect(setDirection).toHaveBeenCalledWith(
                Constants.SKIER_DIRECTIONS.RIGHT
            );
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
            expect(moveSkierRight).toHaveBeenCalled();
        });

        test("should wake up facing right and move if turned right when crashed", () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

            expect(skier.assetName).toBe(Constants.SKIER_CRASH);

            skier.turnRight();

            expect(skier.assetName).toBe(Constants.SKIER_RIGHT);
            expect(setDirection).toHaveBeenCalledWith(
                Constants.SKIER_DIRECTIONS.RIGHT
            );
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
            expect(moveSkierRight).toHaveBeenCalled();
        });
    });

    describe("skier conditions for jumping", () => {
        let jump;

        beforeEach(() => {
            jump = jest.spyOn(skier, "jump");
            skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        });

        test("skier should always jump over jump rumps", () => {
            skier.checkIfShouldJumpOrCrashAfterCollision(Constants.JUMP_RUMP);

            expect(jump).toHaveBeenCalled();
        });

        test("skier is jumping if he moves at jumping speed", () => {
            skier.speed = Constants.SKIER_JUMPING_SPEED;

            expect(skier.behaviourState.isJumping).toBe(true);
        });

        test("skier should jump over rocks only if already in jumping mode / speed", () => {
            skier.speed = Constants.SKIER_JUMPING_SPEED;

            expect(skier.behaviourState.isJumping).toBe(true);
            expect(skier.canJumpObstacle(Constants.ROCK1)).toBe(true);
            expect(skier.canJumpObstacle(Constants.ROCK2)).toBe(true);

            skier.checkIfShouldJumpOrCrashAfterCollision(Constants.ROCK1);

            expect(jump).toHaveBeenCalled();
        });

        test("skier should not jump over rocks if not in jumping mode / speed", () => {
            skier.behaviourState.isJumping = false;

            expect(skier.behaviourState.isJumping).toBe(false);
            expect(skier.canJumpObstacle(Constants.ROCK1)).toBe(false);
            expect(skier.canJumpObstacle(Constants.ROCK2)).toBe(false);

            skier.checkIfShouldJumpOrCrashAfterCollision(Constants.ROCK1);

            expect(jump).not.toHaveBeenCalled();
        });

        test("skier should never jump over trees even on jumping mode / speed", () => {
            skier.behaviourState.isJumping = true;

            expect(skier.canJumpObstacle(Constants.TREE)).toBe(false);
            expect(skier.canJumpObstacle(Constants.TREE_CLUSTER)).toBe(false);

            skier.checkIfShouldJumpOrCrashAfterCollision(Constants.TREE);

            expect(jump).not.toHaveBeenCalled();
        });

        test("skier should increase speed when jumping and get animated", () => {
            const subscribeToJumpingAnimation = jest.spyOn(skier, "subscribeToJumpingAnimation");

            skier.jump();

            expect(skier.speed).toBe(Constants.SKIER_JUMPING_SPEED);
            expect(subscribeToJumpingAnimation).toHaveBeenCalled();
        });

        test("skier should be animated while jumping", () => {
            const updateAsset = jest.spyOn(skier, "updateAsset");

            skier.speed = Constants.SKIER_JUMPING_SPEED;
            skier.jump();
            jest.advanceTimersByTime(Constants.SKIER_JUMP_TIME + 1000);

            expect(updateAsset).toHaveBeenNthCalledWith(
                1,
                Constants.SKIER_JUMPING.JUMP1
            );
            expect(updateAsset).toHaveBeenCalledWith(
                Constants.SKIER_JUMPING.JUMP2
            );
            expect(updateAsset).toHaveBeenCalledWith(
                Constants.SKIER_JUMPING.JUMP3
            );
            expect(updateAsset).toHaveBeenCalledWith(
                Constants.SKIER_JUMPING.JUMP4
            );
            expect(updateAsset).toHaveBeenCalledWith(
                Constants.SKIER_JUMPING.JUMP5
            );
        });
    });
});
