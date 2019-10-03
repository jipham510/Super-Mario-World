import {Vector} from '../../util';
export default class GameObject {
    constructor() {
        this.behaviors = [];
        this.vel = new Vector();
        this.pos = new Vector();
        this.lastPos = new Vector();

        this.width = 0;
        this.height = 0;
        this.isGrounded = true;
        this.frames = 0;
    }
    // top and left positions of object are already defined by pos.x and pos.y
    getRight(){
        return this.pos.x + this.width;
    }
    getBottom(){
        return this.pos.y + this.height;
    }
    getLastBottom(){
        return this.lastPos.y + this.height;
    }
    update(deltaTime) {
        this.behaviors.forEach( behavior => {
            behavior.update(this, deltaTime); //takes in object and deltaTime
        })
    }
    addBehavior(behavior){
        this.behaviors.push( behavior ); 
        this[behavior.name] = behavior;
    }
}

