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

     /**
     * @param {Canvas} canvas 
     * @param {Assetmanager} assetManager 
     */
    draw(canvas, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }

    /**
     * 
     * @param {Canvas} canvas 
     * @param {String} text - text to render in the view
     * @param {Object {x: Number, y: Number} } position - position in the view where text should be rendered
     * @param {Object {x: Number, y: Number} } size - box size in which text is rendered
     */
    drawText(canvas, text, position, size) {
        canvas.fillText(text, position.x, position.y, size.x, size.y);
    }
}
