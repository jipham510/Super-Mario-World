import MovingObject from './Moving_Object';
import Jump from './behaviors/Jump';
import Walk from './behaviors/Walk';

export default class Mario extends MovingObject {
    constructor(){
        super();
        this.size.x = 29;
        this.size.y = 40;
        this.addBehavior (new Jump());
        this.addBehavior (new Walk());
    }

    draw(ctx){
        // sprite
    }

}