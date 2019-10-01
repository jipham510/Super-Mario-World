import Behavior from './Behavior';
export default class Walk extends Behavior {
    constructor() {
        super('walk');
        this.leftDirection = 0;
        this.rightDirection = 0;
        this.speed = 10000;
    }

    update(mario, deltaTime) {
        mario.vel.x = (this.leftDirection + this.rightDirection)  * this.speed * deltaTime;
        // mario.vel.x = this.speed * this.direction * deltaTime;
    }
}

