import World from './World.js';
export default class Game {
    constructor(height, width){
        this.height = height;
        this.width = width;
        this.world = new World();
    }
    // step(timeDelta){
    //     this.moveObjects(delta);
    // }
}