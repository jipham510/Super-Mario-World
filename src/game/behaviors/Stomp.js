import Behavior from './Behavior';
export default class Stomp extends Behavior {
    constructor() {
        super('stomp');
        this.bouncing = false;
        this.bounceSpeed = 400;
    }
    bounce(){
        this.bouncing = true;
    }
    update(mario) {
        if (this.bouncing) {
            mario.vel.y = -this.bounceSpeed;
            mario.invincible.startFrame();
            this.bouncing = false;
        }
    }
}

