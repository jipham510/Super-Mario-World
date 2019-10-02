import {Vector} from '../../util';
export default class MovingObject {
    constructor() {
        this.behaviors = [];
        this.vel = new Vector();
        this.pos = new Vector();
        this.width = 0;
        this.height = 0;
        this.isGrounded = true;

    }
    update(deltaTime) {
        this.behaviors.forEach( behavior => {
            behavior.update(this, deltaTime); //takes in object and deltaTime
        })
        // this.pos.x += this.vel.x * deltaTime;
        // this.pos.y += this.vel.y * deltaTime;
        //MIGHT NEED TO MOVE THIS LATER, predicting future collision bug
    }
    addBehavior(behavior){
        this.behaviors.push( behavior ); 
        this[behavior.name] = behavior;
    }
}

