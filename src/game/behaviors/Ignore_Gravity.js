import Behavior from './Behavior';
export default class IgnoreGravity extends Behavior {
    constructor() {
        super('ignoreGravity');
        this.gravity = 20;
    }

    update(object, deltaTime) {
        object.vel.y -= this.gravity;
    }
}

