import "babel-polyfill";
import { getSlope } from "./Utils";
import { Rhino } from "../Entities/Rhino";
import { Skier } from "../Entities/Skier";

describe("rhino class", () => {
    const rhino = new Rhino(50, 50);
    const skier = new Skier(2, 15);

    test("class should initialize classes", () => {
        expect(rhino).toBeTruthy();
        expect(skier).toBeTruthy();
    });

    test("should calculate correct slope", () => {
        expect(getSlope(skier.getPosition(), rhino.getPosition())).toBe(
            0.7291666666666666
        );
    });
});
