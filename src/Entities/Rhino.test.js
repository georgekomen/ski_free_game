import "babel-polyfill";
import * as Constants from "../Constants";
import { Rhino } from "./Rhino";
import { Skier } from "./Skier";

describe('rhino class', () => {
    const rhino = new Rhino(5, 5);
    const skier = new Skier(0, 0);

    afterEach(() => {    
        jest.clearAllMocks();
    });
    
    test('rhino should not be awake when class initializes', () => {
        expect(rhino).toBeTruthy();
        expect(rhino.isAwake).toBeFalsy();
    });

    test('rhino should appear at a position 500 pixels from the skier', () => {
        expect(rhino.isAwake).toBeFalsy();
        expect(rhino.y).toBe(5);

        rhino.appear(skier.getPosition());

        expect(rhino.isAwake).toBeTruthy();
        expect(rhino.y).toBe(-500);
    });

    test('rhino should hide at a position of x, y - 0, 0 and should not be awake', () => {
        rhino.hide();

        expect(rhino.x).toBe(0);
        expect(rhino.y).toBe(0);
        expect(rhino.awake).toBeFalsy();
    });

    test('shoud not draw rhino when it is not awake', () => {
        const draw = jest.spyOn(rhino, 'draw');

        rhino.draw(null, null);

        expect(draw).toHaveReturned();
    });

});