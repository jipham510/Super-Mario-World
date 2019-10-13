import GameObject from './Game_Object';
import AutoMove from '../behaviors/Auto_Move';
import { powerUpSound, music } from '../../files';

export default class Mushroom extends GameObject {
    constructor(x, y) {
        super();
        this.width = 29;
        this.height = 29;
        this.pos.x = x;
        this.pos.y = y - this.height;
        this.frame = "mushroom";
        this.status = "spawning";
        this.speed = 5000;
        this.addBehavior( new AutoMove(400, 700, 1));
        
        this.mushroomSpawn = ["mushroom1", "mushroom2", "mushroom3", "mushroom"];
    }
    collides(mario) {
        mario.lives = 2;
        this.status = "delete";
    }

    update(deltaTime, totalTime, objects) {
        this.behaviors.forEach(behavior => {
            behavior.update(this, deltaTime, objects); //takes in object and deltaTime
        })
        this.decideFrame(totalTime, objects);
    }
    decideFrame(totalTime, objects) {
        if (this.status === "spawning") {
            // this.frame = this.animationFrame(this.mushroomSpawn, totalTime, 0.20);
        } else if (this.status === "delete") {
            if (!music.paused) powerUpSound.play();
            objects.delete(this);
        }
    }

    draw(ctx, spriteSheets, camera) {
        spriteSheets.get("background").draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
    }
}

