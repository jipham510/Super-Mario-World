import Behavior from './Behavior';
export default class Jump extends Behavior {
    constructor() {
        super('jump');
        this.maxDuration = 0.3;
        this.vel = 300;
        this.duration = 0;
    }

    start() {
        this.duration = this.maxDuration;
    }
    cancel() {
        this.duration = 0;
    }
    update(mario, deltaTime) {
        if (this.duration > 0) {
            mario.vel.y = -this.vel;
            this.duration -= deltaTime;
        }
    }
}

