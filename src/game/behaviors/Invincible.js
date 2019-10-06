import Behavior from './Behavior';
export default class Invincible extends Behavior {
    constructor() {
        super('invincible');
        this.maxDuration = 2;
        this.duration = 0;
    }
    start() {
        this.duration = this.maxDuration;
    }
    update(mario, deltaTime) {
        if (this.duration > 0) {
            mario.invinciblity = true;
            this.duration -= deltaTime;
            console.log(this.duration);
        } else {
            mario.invinciblity = false;
        }
    }
}

