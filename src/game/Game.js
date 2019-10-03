import Mario from './objects/Mario';
import Collider from './Collider';
import tilemap from '../display/tilemap';

export default class Game {
    constructor(height, width){
        this.height = height;
        this.width = width;
        this.gravity = 20;
        this.objects = new Set();
        this.mario = new Mario();
        this.objects.add(this.mario);
        this.layers = [];
        
        this.tileMap = [];
        this.collider = new Collider(this.tileMap);
        this.setTilemapLayer = this.setTilemapLayer.bind(this);
        this.setTilemapLayer();
    }
    update(deltaTime) {
        this.objects.forEach(object => {
            object.update(deltaTime); //updates velocities
            object.lastPos.x = object.pos.x;
            object.pos.x += object.vel.x * deltaTime;
            this.collider.checkX(object);
            
            object.lastPos.y = object.pos.y;
            object.vel.y += this.gravity;
            object.pos.y += object.vel.y * deltaTime;
            this.collider.checkY(object);
            // this.collider.checkCollision(object, this.width, this.height);
        })
    }

    setTilemapLayer() {
        tilemap.backgrounds.forEach(background => {
            background.ranges.forEach(range => {
                const [xStart, xEnd, yStart, yEnd] = range;
                for (let x = xStart; x < xEnd; x++) {
                    for (let y = yStart; y < yEnd; y++) {
                        this.setTile(x, y, {
                            name: background.tile,
                            type: background.type
                        })
                    }
                }
            });
        });
    }

    setTile(x, y, tile){
        if(!this.tileMap[x]) this.tileMap[x] = [];
        this.tileMap[x][y] = tile;
    }
    getTile(x,y){
        if(this.tileMap[x]) return this.tileMap[x][y];
    }
    iterateTilemap(cb){
        this.tileMap.forEach((col,x) =>{
            col.forEach((tile, y) =>{
                cb(tile, x, y);
            });
        });
    }
}