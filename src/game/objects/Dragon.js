import GameObject from './Game_Object';
import AutoMove from '../behaviors/Auto_Move';
import { stomp1Sound, stomp2Sound, music, mushroomMarioHitSound } from '../../files';
import JumpOnLose from '../behaviors/Jump_On_Lose';

export default class Dragon extends GameObject {
    constructor(xSpawn, ySpawn, moveLeftLimit, moveRightLimit) {
        super();
        this.pos.set(xSpawn, ySpawn);
        this.width = 43;
        this.height = 63;
        this.speed = 6000;
        this.JumpOnLose = new JumpOnLose();
        this.addBehavior(this.JumpOnLose);
        this.addBehavior(new AutoMove(moveLeftLimit, moveRightLimit));
        this.stompedCount = 0;

        this.dragon = "dragonRegular";
        this.facing = "left";
        this.frame = "regularWalkLeft1";
        this.regularWalkLeftFrames = ["regularWalkLeft1", "regularWalkLeft2"];
        this.regularWalkRightFrames = ["regularWalkRight1", "regularWalkRight2"];
        this.regularWalkRightFrames = ["regularWalkRight1", "regularWalkRight2"];
        
        this.halfWalkLeftFrames = ["halfFlattenedWalkLeft1", "halfFlattenedWalkLeft2"];
        this.halfWalkRightFrames = ["halfFlattenedWalkRight1", "halfFlattenedWalkRight2"];

    }
    collidesShell(shell){
        if (this.status === "ignoreCollisions") return;
        if (shell.getRight() > this.getLeft()) {
            this.jumpOnLose.start();
            if (!music.paused) {
                stomp2Sound.currentTime = 0;
                stomp2Sound.play();
            }
        }
        if (shell.getLeft() < this.getRight()) {
            this.jumpOnLose.start();
            if (!music.paused) {
                stomp2Sound.currentTime = 0;
                stomp2Sound.play();
            }
        }
    }
    collides(mario) {
        if (mario.invinciblity || this.status ==="ignoreCollisions") return;
        if (this.stompedCount !== 2) {
            if (mario.vel.y > this.vel.y && mario.getBottom() > this.getTop() && mario.getLastBottom() <= this.getTop()) {
                
                mario.stomp.bounce();
                this.stompedCount += 1;
                if (!music.paused) {
                    if ((this.stompedCount === 1)) {
                        stomp1Sound.currentTime = 0;
                        stomp1Sound.play();
                    } else {
                        stomp2Sound.currentTime = 0;
                        stomp2Sound.play();
                    }
                }

            } else {
                if (mario.lives === 2 && !music.paused) mushroomMarioHitSound.play();
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
        this.decideFrame(totalTime, objects);
        if (this.pos.y > 400) objects.delete(this);

    }
    decideFrame(totalTime, objects){
        if (this.stompedCount === 2 && this.speed !== 0){
            setTimeout(() => {
                objects.delete(this);
            }, 5000)
            this.speed = 0;
            this.vel.x = 0;
            this.dragon = "dragonFlattened";
            this.width = 43;
            this.height = 20;

            this.frame = (this.facing === "left") ? "flattenedLeft" : "flattenedRight";    

        } else if (this.stompedCount === 1) {
            this.dragon = "dragonHalfFlattened";
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
        // ctx.strokeStyle = 'red';
        // ctx.beginPath();
        // ctx.rect(this.pos.x - camera.pos.x,
        //     this.pos.y - camera.pos.y,
        //     this.width, this.height);
        // ctx.stroke(); 
        spriteSheets.get(this.dragon).draw( this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y)
    }
}

