import GameObject from './Game_Object';
import IgnoreGravity from '../behaviors/Ignore_Gravity';

export default class Bullet extends GameObject {
    constructor() {
        super();
        this.width = 140;
        this.height = 128;
        this.addBehavior(new IgnoreGravity());
        this.frame = "bulletLeft"
    }
    update(deltaTime) {
        this.behaviors.forEach(behavior => {
            behavior.update(this, deltaTime); //takes in object and deltaTime
        })
    }
    draw(ctx, spriteSheets, camera) {
        // ctx.strokeStyle = 'red';
        // ctx.beginPath();
        // ctx.rect(this.pos.x - camera.pos.x,
        //     this.pos.y - camera.pos.y,
        //     this.width, this.height);
        // ctx.stroke();

        spriteSheets.get("bullet").draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y)
    }
}

