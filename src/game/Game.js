import Mario from './Mario';
import collision from './collision';
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
        this.setTilemapLayer();
    }
    update(deltaTime) {
        this.objects.forEach(object => {
            object.update(deltaTime);
            object.vel.y += this.gravity;
            collision(object, this.width, this.height);
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