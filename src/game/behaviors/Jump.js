import Behavior from './Behavior';
import { jumpSound, music } from '../../files';
export default class Jump extends Behavior {
    constructor() {
        super('jump');
        this.maxDuration = 0.2;
        this.vel = 300;
        this.duration = 0;
        this.isGrounded = true;
    }

    start() {
        if(this.isGrounded) {
            this.duration = this.maxDuration;
            if (!music.paused )jumpSound.play();
        }
    }
    cancel() {
        this.isGrounded = false;
        this.duration = 0;
    }
    update(mario, deltaTime) {
        if (mario.frame === "lose") return;

        if (this.duration > 0) {
            mario.vel.y = -this.vel;
            this.duration -= deltaTime;
        }
        if(mario.isGrounded) this.isGrounded = true;
    }
}

