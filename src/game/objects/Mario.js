import GameObject from './Game_Object';
import Jump from '../behaviors/Jump';
import Walk from '../behaviors/Walk';

export default class Mario extends GameObject {
    constructor(){
        super();
        this.width = 29;
        this.height = 40;
        this.addBehavior(new Jump());
        this.addBehavior(new Walk());

        // this.frames = ["idle"];
        this.status = "idle";
    }
    update(deltaTime) {
        this.behaviors.forEach(behavior => {
            behavior.update(this, deltaTime); //takes in object and deltaTime
        })
        if (this.vel.x > 0) {
            this.status = "runningRight";
        } else if (this.vel.x < 0) {
            this.status = "runningLeft";
        } else {
            this.status = "idle";
        }
    }


}