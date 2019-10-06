import GameObject from './Game_Object';
import AutoWalk from '../behaviors/Auto_Walk';

export default class Dragon extends GameObject {
    constructor() {
        super();
        this.width = 43;
        this.height = 63;
        this.addBehavior(new AutoWalk());
        this.status = "dragonRegular";
        this.facing = "left";
        this.frame = "regularWalkLeft1";
        this.regularWalkLeftFrames = ["regularWalkLeft1", "regularWalkLeft2"];
        this.regularWalkRightFrames = ["regularWalkRight1", "regularWalkRight2"];
        
        this.halfWalkLeftFrames = ["halfFlattenedWalkLeft1", "halfFlattenedWalkLeft2"];
        this.halfWalkRightFrames = ["halfFlattenedWalkRight1", "halfFlattenedWalkRight2"];

    }
    update(deltaTime, totalTime) {
        this.behaviors.forEach(behavior => {
            behavior.update(this, deltaTime); //takes in object and deltaTime
        })
        this.decideStatus(totalTime);
    }
    decideStatus(totalTime){
    // status 1 regular
        const frames = (this.facing === "left") ? this.regularWalkLeftFrames : this.regularWalkRightFrames;
        this.frame = this.animationFrame( frames, totalTime, 0.15);
    // status 2 half flattened
    // need to determine flatten by top collision stomp
        // this.status = "dragonHalfFlattened";
        // this.width = 43;
        // this.height = 34;

        // const frames = (this.facing === "left") ? this.halfWalkLeftFrames : this.halfWalkRightFrames;
        // this.frame = this.animationFrame(frames, totalTime, 0.15);

    // status 3 flattened
        // this.status = "dragonFlattened";
        // this.width = 43;
        // this.height = 20;

        // this.frame = (this.facing === "left") ? "flattenedLeft" : "flattenedRight";
    }

    draw(ctx, spriteSheets, camera) {
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.rect(this.pos.x - camera.pos.x, 
            this.pos.y - camera.pos.y,
            this.width, this.height);
        ctx.stroke();
        
        spriteSheets.get(this.status).draw( this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y)
    }
}

