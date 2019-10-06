import Behavior from './Behavior';
export default class JumpOnLose extends Behavior {
    constructor() {
        super('jumpOnLose');
        this.maxDuration = 0.3;
        this.vel = 300;
        this.duration = 0;
    }

    start() {
        this.duration = this.maxDuration;
    }
    update(mario, deltaTime) {
        if (this.duration > 0) {
            mario.vel.y = -this.vel;
            this.duration -= deltaTime;
        } 
    }
}

