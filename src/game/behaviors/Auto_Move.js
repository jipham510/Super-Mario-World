import Behavior from './Behavior';
export default class AutoMove extends Behavior {
    constructor(moveLeftLimit = 0, moveRightLimit = 9999999, startingDirection = -1) {
        super('autoMove');
        this.startingDirection = startingDirection;
        this.moveLeftLimit = moveLeftLimit;
        this.moveRightLimit = moveRightLimit;
    }

    update(object, deltaTime) {
        //100 left limit
        // pos.x = 200
        // 300 right limit
        if(object.pos.x < this.moveLeftLimit ) {
            object.vel.x = object.speed * deltaTime;
            // if (object.status === "koopa") debugger
        } else if (object.pos.x > this.moveRightLimit) {
            object.vel.x = -object.speed * deltaTime;
        } else if ( object.vel.x === 0 ) {
            object.vel.x = this.startingDirection * object.speed * deltaTime;
        }
        // object.vel.x = this.speed * this.direction * deltaTime;
    }
}

