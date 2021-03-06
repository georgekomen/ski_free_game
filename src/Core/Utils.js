export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function intersectTwoRects(rect1, rect2) {
    return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top);
}

export class Rect {
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;

    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}

/**
 * 
 * @param {Object {x: Number, y: Number} } pointA - x and y coordinates of a point
 * @param {Object {x: Number, y: Number} } pointB - x and y coordinates of another point
 * Calculate and returns the gradient between the two points
 */
export function getSlope(pointA, pointB) {
    const Ydifference = pointB.y - pointA.y;
    const Xdifference = pointB.x - pointA.x;
    return Ydifference / Xdifference;
}
