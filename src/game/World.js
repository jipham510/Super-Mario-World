import Mario from './Mario';
import collision from './collision';

export default class World {
    constructor() {
        this.gravity = 20;
        this.objects = new Set();
        this.mario = new Mario();
        this.objects.add(this.mario);
        this.tiles = [];
        this.layers = [];
        
    }

    update(deltaTime){
        this.objects.forEach( object => {
            object.update(deltaTime);            
            object.vel.y += this.gravity;
            collision(object, 700, 400);
        })
    }
}