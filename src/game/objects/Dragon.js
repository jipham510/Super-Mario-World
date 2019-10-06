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
    collides(mario) {
        if (mario.invinciblity) return;
        if (this.stompedCount !== 2) {
            if (mario.vel.y > this.vel.y) {
                mario.stomp.bounce();
                this.stompedCount += 1;
            } else {
                console.log("hit mario")
                mario.lives -= 1;
                mario.invincible.start();
                mario.invinciblity = true;
            }
        }
    }
    update(deltaTime, totalTime, objects) {
        this.behaviors.forEach(behavior => {
            behavior.update(this, deltaTime); //takes in object and deltaTime
        })
        this.decideStatus(totalTime, objects);
    }
    decideStatus(totalTime, objects){
        if (this.stompedCount === 2 && this.speed !== 0){
            setTimeout(() => {
                objects.delete(this);
            }, 5000)
            this.speed = 0;
            this.vel.x = 0;
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

        } else if (this.stompedCount === 0) {
            this.facing = (this.vel.x > 0) ? "right" : "left";
            const frames = (this.facing === "left") ? this.regularWalkLeftFrames : this.regularWalkRightFrames;
            this.frame = this.animationFrame(frames, totalTime, 0.20);
        }


    }


    draw(ctx, spriteSheets, camera) {
        spriteSheets.get(this.status).draw( this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y)
    }
}

