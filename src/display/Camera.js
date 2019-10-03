import {Vector} from "../util";

export default class Camera {
    constructor() {
        this.pos = new Vector(0, 0);
        this.size = new Vector(500, 500);
    }
}