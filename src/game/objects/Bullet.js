import GameObject from './Game_Object';
import IgnoreGravity from '../behaviors/Ignore_Gravity';
import AutoMove from '../behaviors/Auto_Move';

export default class Bullet extends GameObject {
    constructor(xSpawn, ySpawn) {
        super();
        this.pos.set(xSpawn, ySpawn);
        this.initialPos = xSpawn;
        this.width = 140;
        this.height = 128;
        this.addBehavior(new IgnoreGravity());
        this.addBehavior(new AutoMove());
        this.frame = "bulletLeft"
        this.status = "ignoreCollisions";
        this.falling = false;
        this.speed = 10000;
    }
    update(deltaTime, totalTime, objects) {
        this.behaviors.forEach(behavior => {
            behavior.update(this, deltaTime); //takes in object and deltaTime
        })
        if(this.pos.x < this.initialPos - 1200 || this.pos.y > 400) objects.delete(this);
    }

    collides(mario) {
        if (mario.invinciblity) return;
        if (!this.falling) {
            if (mario.vel.y > this.vel.y &&  mario.getBottom() > this.getTop() && mario.getLastBottom() <= this.getTop() ) {

                mario.stomp.bounce();
                this.vel.y += 40;
                this.vel.x = 0;
                this.removeBehavior("ignoreGravity");
                this.removeBehavior("autoMove");
                this.falling = true;
            } else {
                mario.lives -= 1;
                mario.invincible.start();
                mario.invinciblity = true;
            }
        }
    }
    draw(ctx, spriteSheets, camera) {
        spriteSheets.get("bullet").draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y)
    }
}

