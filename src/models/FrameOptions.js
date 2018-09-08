export default class FrameOptions {
    constructor(image, device, orientation, color, offsetX=0, offsetY=0, scale=1) {
        this.image = image;
        this.device = device;
        this.orientation = orientation;
        this.color = color;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.scale = scale;
    }
}
