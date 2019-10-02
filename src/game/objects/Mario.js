import MovingObject from './Moving_Object';
import Jump from '../behaviors/Jump';
import Walk from '../behaviors/Walk';

export default class Mario extends MovingObject {
    constructor(){
        super();
        this.width = 29;
        this.height = 40;
        this.pos.y = 200;
        this.addBehavior (new Jump());
        this.addBehavior (new Walk());
    }

    draw(ctx){
        // sprite
    }

}