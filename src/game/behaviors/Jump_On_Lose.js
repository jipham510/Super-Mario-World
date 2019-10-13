import Behavior from './Behavior';
export default class JumpOnLose extends Behavior {
    constructor() {
        super('jumpOnLose');
        this.maxDuration = 0.2;
        this.vel = 250;
        this.duration = 0;
    }

    start() {
        this.duration = this.maxDuration;
    }
    update(obj, deltaTime) {
        if (this.duration > 0) {
            obj.status = "ignoreCollisions";
            obj.vel.y = -this.vel;
            this.duration -= deltaTime;
        } 
    }
}

