import Behavior from './Behavior';
export default class Crouch extends Behavior {
    constructor() {
        super('crouch');
        this.stationaryVel = 1;
        this.active = false;
    }
    start(mario){
        this.stationaryVel = 0;
        this.active = true;
    }
    cancel(mario){
        this.stationaryVel = 1;
        this.active = false;
    }
    update(mario, deltaTime) {
        mario.vel.x =  mario.vel.x * this.stationaryVel;
    }
}

