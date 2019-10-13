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
        this.trigger = 0;
    }
    // top and left positions of object are already defined by pos.x and pos.y
    getRight(){
        return this.pos.x + this.width;
    }
    getLastRight(){
        return this.lastPos.x + this.width;
    }
    getLeft(){
        return this.pos.x;
    }
    getLastLeft(){
        return this.lastPos.x;
    }
    getTop(){
        return this.pos.y;
    }
    getLastTop(){
        return this.lastPos.y;
    }
    getBottom(){
        return this.pos.y + this.height;
    }
    getLastBottom(){
        return this.lastPos.y + this.height;
    }
    overlaps(object) {
        return this.getBottom() > object.getTop()
            && this.getTop() < object.getBottom()
            && this.getLeft() < object.getRight()
            && this.getRight() > object.getLeft();
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
    removeBehavior(behavior){
        this.behaviors.forEach( (beh, idx) => {
            if (beh.name === behavior) this.behaviors.splice(idx, 1);
        });
        this[behavior] = undefined;
    }
    animationFrame(frames, totalTime, frameRate) {
        const frameIdx = Math.floor(totalTime / frameRate) % frames.length;
        return frames[frameIdx];
    }
    draw(spriteSheets, camera) { 
        
    }
    collides(object){
    }
    collidesShell(object){
        
    }
}

