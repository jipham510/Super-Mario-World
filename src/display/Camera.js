import {Vector} from "../util";

export default class Camera {
    constructor(height, width) {
        this.pos = new Vector(0, 0);
        this.width = width, 
        this.height = height;
    }
}