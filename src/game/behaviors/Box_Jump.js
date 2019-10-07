import Behavior from './Behavior';
export default class BoxJump extends Behavior {
    constructor() {
        super('boxJump');
        this.maxDuration = 0.1;
        this.vel = 150;
        this.duration = 0;
    }

    start() {
        this.duration = this.maxDuration;
    }
    update(box, deltaTime, objects) {
        if (this.duration > 0) {
            box.vel.y = -this.vel;
            this.duration -= deltaTime;
        }
        if (box.vel.y > 0) {
            if (box.getTop() > box.originalPos) {
                box.pos.y = box.originalPos;
                box.vel.y = 0;
                if(this.duration < 0) {
                    box.setToTile(objects);
                    objects.delete(box);
                }
            }
        }
    }

}



