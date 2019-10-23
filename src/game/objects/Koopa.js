import GameObject from './Game_Object';
import AutoMove from '../behaviors/Auto_Move';
import { stomp1Sound, stomp2Sound, music, mushroomMarioHitSound } from '../../files';
import JumpOnLose from '../behaviors/Jump_On_Lose';

export default class Koopa extends GameObject {
    constructor(xSpawn, ySpawn, moveLeftLimit, moveRightLimit) {
        super();
        this.pos.set(xSpawn, ySpawn);

        this.width = 35;
        this.height = 50;
        this.speed = 5000;
        this.shellSpeed = 400;
        this.addBehavior(new AutoMove(moveLeftLimit, moveRightLimit));
        this.addBehavior(new JumpOnLose());
        this.stomped = false;
        this.lethalShell = false;

        this.koopa = "koopa";
        this.facing = "left";
        this.frame = "walkLeft1";
        this.walkLeftFrames = ["walkLeft1", "walkLeft2"];
        this.walkRightFrames = ["walkRight1", "walkRight2"];
        this.shellFrames = ["shell1","shell2","shell3"]

    }
    collidesShell(shell) {
        if (this.status === "ignoreCollisions") return;
        if (shell.getRight() > this.getLeft()) {
            this.jumpOnLose.start();
            if (!music.paused) {
                stomp2Sound.currentTime = 0;
                stomp2Sound.play();
            }
        } else if (shell.getLeft() < this.getRight()) {
            this.jumpOnLose.start();
            if (!music.paused) {
                stomp2Sound.currentTime = 0;
                stomp2Sound.play();
            }
        }

    }
    collides(mario) {
        if (mario.invinciblity || this.status === "ignoreCollisions") return;
        if (!this.stomped) {
            if (mario.vel.y > this.vel.y && mario.getBottom() > this.getTop() && mario.getLastBottom() <= this.getTop()) {
    
                mario.stomp.bounce();
                this.stomped = true;
                if (!music.paused) {
                    stomp2Sound.currentTime = 0;
                    stomp2Sound.play();
                }
    
            } else {
                mario.damage();
            }
        } else if ( this.koopa === "koopaShell" ) {
            if (mario.getRight() > this.getLeft()) {
                if (mario.vel.x > 0 && this.vel.x === 0) {
                    this.vel.x = this.shellSpeed;
                    mario.invincible.startFrame();
                    mario.invinciblity = true;
                } else if (this.vel.x !== 0) {
                    if (mario.vel.y > this.vel.y && mario.getBottom() > this.getTop() && mario.getLastBottom() <= this.getTop()) {
                        if (!music.paused) {
                            stomp1Sound.currentTime = 0;
                            stomp1Sound.play();
                        }
                        mario.stomp.bounce();
                        this.lethalShell = false;
                        this.vel.x = 0;
                        return ;
                    } else {
                        mario.damage();
                    }
                }           
            }
            if (mario.getLeft() < this.getRight()) {
                if (mario.vel.x < 0 && this.vel.x === 0) {
                    this.vel.x = -this.shellSpeed;
                    mario.invincible.startFrame();
                    mario.invinciblity = true;
                } else if (this.vel.x !== 0) {
                    if (mario.vel.y > this.vel.y && mario.getBottom() > this.getTop() && mario.getLastBottom() <= this.getTop()) {
                        mario.stomp.bounce();
                        if (!music.paused) {
                            stomp1Sound.currentTime = 0;
                            stomp1Sound.play();
                        }
                    } else {
                        mario.damage();
                    }
                }
            }
        }
    }
    update(deltaTime, totalTime, objects, mario) {
        this.behaviors.forEach(behavior => {
            behavior.update(this, deltaTime); //takes in object and deltaTime
        })
        this.decideFrame(totalTime, objects);
        if ( this.pos.y > 400 || (mario.pos.x > this.pos.x + 1000)) objects.delete(this);
    }
    decideFrame(totalTime, objects) {
        if (this.stomped && this.autoMove) {

            this.removeBehavior("autoMove");
            this.vel.x = 0;
            this.koopa = "koopaShell";
            this.width = 35;
            this.height = 35;
            this.frame = "shell1";
        } else if (this.koopa === "koopa") {
            this.facing = (this.vel.x > 0) ? "right" : "left";
            const frames = (this.facing === "left") ? this.walkLeftFrames : this.walkRightFrames;
            this.frame = this.animationFrame(frames, totalTime, 0.20);
        } else if (this.koopa === "koopaShell") {
            this.facing = (this.vel.x > 0) ? "right" : "left";
            // const frames = (this.facing === "left") ? this.walkLeftFrames : this.walkRightFrames;
            if(this.vel.x !== 0) {
                this.lethalShell = true;
                this.frame = this.animationFrame(this.shellFrames, totalTime, 0.1);
            }
        }


    }


    draw(ctx, spriteSheets, camera) {
        // ctx.strokeStyle = 'red';
        // ctx.beginPath();
        // ctx.rect(this.pos.x - camera.pos.x,
        //     this.pos.y - camera.pos.y,
        //     this.width, this.height);
        // ctx.stroke();
        spriteSheets.get(this.koopa).draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y)
    }
}

