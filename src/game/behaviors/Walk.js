import Behavior from './Behavior';
export default class Walk extends Behavior {
    constructor() {
        super('walk');
        this.leftDirection = 0;
        this.rightDirection = 0;
        this.speed = 10000;
        this.distance = 0;
    }

    update(mario, deltaTime) {
        if (mario.frame === "lose") return;
        mario.vel.x = (this.leftDirection + this.rightDirection)  * this.speed * deltaTime;
        this.distance += mario.vel.x;
        // mario.vel.x = this.speed * this.direction * deltaTime;
    }
}

