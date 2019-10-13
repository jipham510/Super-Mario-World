import GameObject from './Game_Object';
import BoxJump from '../behaviors/Box_Jump';
import Mushroom from './Mushroom';
import { itemEmergingSound, stomp2Sound,music } from '../../files';

export default class MysteryBox extends GameObject {
    constructor(x,y, tile) {
        super();
        // this.item = item;
        this.tile = tile;
        this.addBehavior(new BoxJump());
        this.width = 29;
        this.height = 29;
        this.pos.x = this.width * x;
        this.pos.y = this.height * y;
        this.originalPos = this.height * y;
        this.frame = "mysteryBox1";
        this.hit = false;
        this.status = "ignoreCollisions";
        this.boxIdleAnimation = ["mysteryBox1", "mysteryBox2", "mysteryBox3", "mysteryBox4"];

    }
    collides(mario) {
        if (mario.vel.y < 0) {
            if (mario.pos.y < this.getBottom()) {
                if (!music.paused) { 
                    stomp2Sound.currentTime = 0;
                    stomp2Sound.play();
                }
                mario.pos.y = this.getBottom();
                mario.vel.y = 0;
                mario.jump.cancel();
                this.status = "collided";
                this.boxJump.start();
            }
        }
    }
    update(deltaTime, totalTime, objects) {
        this.behaviors.forEach(behavior => {
            behavior.update(this, deltaTime, objects); //takes in object and deltaTime
        })
        this.decideFrame(totalTime, objects);
    }
    decideFrame(totalTime, objects) {
        if (this.status === "ignoreCollisions") {
            this.frame = this.animationFrame(this.boxIdleAnimation, totalTime, 0.20);
        } else {
            this.frame = "singlePlatform";
        }
    }
    setToTile(objects){
        this.tile.name = "singlePlatform";
        this.tile.type = "ground";
        
        const mushroom = new Mushroom(this.pos.x, this.pos.y);
        if (!music.paused) itemEmergingSound.play();
        objects.add(mushroom);
    }

    draw(ctx, spriteSheets, camera) {
        spriteSheets.get("background").draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
    }
}

