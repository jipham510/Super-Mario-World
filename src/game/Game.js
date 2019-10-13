import Mario from './objects/Mario';
import Dragon from './objects/Dragon';
import Bullet from './objects/Bullet';
import Koopa from './objects/Koopa';
import MysteryBox from './objects/Mystery_Box';
import TileCollision from './Tile_Collision';
import tilemap from './background_tiles';
import enemySpawns from './enemy_spawns';
import SpawnEnemies from './behaviors/Spawn_Enemies';

export default class Game {
    constructor(height, width){
        this.height = height;
        this.width = width;
        this.gravity = 20;
        this.objects = new Set();
        this.mario = new Mario();
        this.objects.add(this.mario);
        this.addSpawns()
        
        this.restarting = false;
        this.totalTime = 0;
        this.tileMap = [];
        this.tileSize = 29;
        this.tileCollision = new TileCollision(this.tileMap);
        this.setTilemapLayer = this.setTilemapLayer.bind(this);
        this.cameraView = this.cameraView.bind(this);
        this.restartLevel = this.restartLevel.bind(this);
        this.checkEnemyCollision = this.checkEnemyCollision.bind(this);
        this.checkShellCollision = this.checkShellCollision.bind(this);
        this.setTilemapLayer();
    }
    update(deltaTime) {
        this.objects.forEach(object => {
            object.update(deltaTime, this.totalTime, this.objects, this.mario); //updates velocities
            object.frames = (object.frames + 1) % 60;
            object.lastPos.x = object.pos.x;
            object.lastPos.y = object.pos.y;
            object.pos.x += object.vel.x * deltaTime;
            this.tileCollision.checkX(object);
            
            object.vel.y += this.gravity;
            object.pos.y += object.vel.y * deltaTime;
            this.tileCollision.checkY(object);
            if (object !== this.mario) this.checkEnemyCollision(object);
            if (object.lethalShell) this.checkShellCollision(object);
        })
        this.totalTime += deltaTime;
    }
    checkEnemyCollision(object){
        if (this.mario.overlaps(object)) object.collides(this.mario);
    }
    checkShellCollision(shell){
        this.objects.forEach( object => {
            if (object === this.mario || object === shell) return;
            if (shell.overlaps(object)) object.collidesShell(shell);
        })
    }
    addSpawns() {
        const enemies = new Set();
        let newEnemy;
        enemySpawns.enemies.forEach( enemy => {
            if (enemy.name === "dragon") {
                newEnemy = new Dragon(
                    enemy.x, enemy.y,  //initial spawn
                    enemy.x1Limit, enemy.x2Limit // walk path
                );
            } else if ( enemy.name === "bullet") {
                newEnemy = new Bullet(
                    enemy.x, enemy.y //initial spawn
                );
            } else if ( enemy.name === "koopa") {
                newEnemy = new Koopa(
                    enemy.x, enemy.y,  //initial spawn
                    enemy.x1Limit, enemy.x2Limit // walk path
                );
            }
            newEnemy.trigger = enemy.trigger;
            enemies.add(newEnemy);
        })
        this.mario.addBehavior(new SpawnEnemies(this.objects,enemies));

    }
    setTilemapLayer() {
        tilemap.backgrounds.forEach(background => {
            background.ranges.forEach(range => {
                const [xStart, xLength, yStart, yLength] = range;
                const xEnd = xStart + xLength;
                const yEnd = yStart + yLength;
                for (let x = xStart; x < xEnd; x++) {
                    for (let y = yStart; y < yEnd; y++) {
                        const tile = {
                            name: background.tile,
                            type: background.type
                        };
                        this.setTile(x, y, tile)
                        if (background.tile === "mysteryBox") {
                            const box = new MysteryBox(x, y, tile);
                            this.objects.add(box);
                        }
                    }
                }
            });
        });
    }
    restartLevel(camera){
        if(this.mario.status === "ignoreCollisions" && !this.restarting){
            this.restarting = true;
            const game = this;
            setTimeout( () => {
                game.removeEnemies();
                game.mario.lives = 1;
                game.mario.pos.set(0, 250);
                game.mario.invincible.cancel();
                camera.pos.x = 0;

                game.addSpawns()
                this.setTilemapLayer();
                game.restarting = false;

            }, 1500)
        }
    }
    removeEnemies() {
        this.objects.forEach( object => {
            if (object !== this.mario) this.objects.delete(object);
        })
    }
    setTile(x, y, tile){
        if(!this.tileMap[x]) this.tileMap[x] = [];
        this.tileMap[x][y] = tile;
    }
    getTile(x,y){
        if(this.tileMap[x]) return this.tileMap[x][y];
    }
    cameraView(camera, backgroundSpriteSheet){
        // center camera on mario
        //scrolling commented out for testing
        this.restartLevel(camera);

        if ( this.mario.pos.x > 300 && this.mario.frame !== "lose") {
            camera.pos.x = this.mario.pos.x - 300;
        }
    
        const cameraPanel = document.createElement('canvas');
        cameraPanel.width = camera.width + this.tileSize;
        cameraPanel.height = camera.height;
        const panelCtx = cameraPanel.getContext('2d');
        // first need to figure out what tile columns to draw
        const columnStart = this.getTileIndex( camera.pos.x);
        const columnEnd = columnStart + this.getTileIndex( camera.width);

        // draw what the camera is focusing on
        for (let x = columnStart; x <= columnEnd; x++) {
            const column = this.tileMap[x];
            if (column) {
                column.forEach((tile, y) => {
                    if (tile.name === "mysteryBox") {

                        backgroundSpriteSheet.draw("transparent", panelCtx, (x - columnStart) * this.tileSize, y * this.tileSize);
                    } else {
                        backgroundSpriteSheet.draw(tile.name, panelCtx, (x - columnStart) * this.tileSize, y * this.tileSize);
                    }
                });
            }
        }
        const marioPosX = this.getTileIndex(this.mario.pos.x) + 1;
        const marioPosY = this.getTileIndex(this.mario.pos.y) + 1;
        let tileName = this.getTile(marioPosX, marioPosY);
        if (tileName) tileName = tileName.name;
        // console.log("x: ", marioPosX, ", y: ", marioPosY, ", tilename: ", tileName);
        //draw camera by pixel for a smooth transition
        return cameraPanel;
    }
    getTileIndex(pos){
        return Math.floor(pos / this.tileSize)
    }
}