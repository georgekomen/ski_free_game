export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getAssetName() {
        return this.assetName;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    draw(canvas, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }

    /**
     * 
     * @param {Canvas} canvas 
     * @param {*string} text - text to render in the view
     * @param {Object} position - position in the view where text should be rendered
     * @param {Object} size - box size in which text is rendered
     */
    drawText(canvas, text, position, size) {
        canvas.fillText(text, position.x, position.y, size.x, size.y);
    }
}
