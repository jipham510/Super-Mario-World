import GameObject from './Game_Object';
import AutoMove from '../behaviors/Auto_Move';

export default class Dragon extends GameObject {
    constructor(xSpawn, ySpawn, moveLeftLimit, moveRightLimit) {
        super();
        this.pos.set(xSpawn, ySpawn);

        this.width = 43;
        this.height = 63;
        this.speed = 8000;
        this.addBehavior(new AutoMove(moveLeftLimit, moveRightLimit));
        this.stompedCount = 0;

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
        if (this.stompedCount === 2){
            this.speed = 0;
            this.status = "dragonFlattened";
            this.width = 43;
            this.height = 20;

            this.frame = (this.facing === "left") ? "flattenedLeft" : "flattenedRight";    

        } else if (this.stompedCount === 1) {
            this.status = "dragonHalfFlattened";
            this.width = 43;
            this.height = 34;

            this.facing = (this.vel.x > 0) ? "right" : "left";
            const frames = (this.facing === "left") ? this.halfWalkLeftFrames : this.halfWalkRightFrames;
            this.frame = this.animationFrame(frames, totalTime, 0.20);

        } else {
            this.facing = (this.vel.x > 0) ? "right" : "left";
            const frames = (this.facing === "left") ? this.regularWalkLeftFrames : this.regularWalkRightFrames;
            this.frame = this.animationFrame(frames, totalTime, 0.20);
        }


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

