import Behavior from './Behavior';
export default class Crouch extends Behavior {
    constructor() {
        super('crouch');
        this.stationaryVel = 1;
    }

    update(mario, deltaTime) {
        // mario.status = "crouching";
        mario.vel.x =  mario.vel.x * this.stationaryVel;
    }
}

