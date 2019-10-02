import SpriteSheet from "./Sprite_Sheet.js";
import { backgroundImage, marioImage} from "../files";
import tilemap from './tilemap.js';

export default class Display {
    constructor(canvas, height, width) {
        canvas.height = height;
        canvas.width = width;
        this.ctx = canvas.getContext("2d");
        this.height = height;
        this.width = width;
        this.backgroundColor = "#0F5EF1";
        this.spriteSheets = new Map();

        this.layers = [];
        this.loadWorld = this.loadWorld.bind(this);
        this.loadMario = this.loadMario.bind(this);
        this.drawTilemapLayer = this.drawTilemapLayer.bind(this);
        
        // this.sprites = this.createSprites();
    }
    drawTilemapLayer(backgroundSheet, game, tileWidth, tileHeight) {
        game.iterateTilemap((tile, x, y) => 
            backgroundSheet.draw(tile.name, this.ctx, x * tileWidth, y * tileHeight)
        );
    }
    loadWorld() {
        const spriteSheets = this.spriteSheets;
        backgroundImage.onload = function () {
            const backgroundSheet = new SpriteSheet(backgroundImage, 29, 29);
            backgroundSheet.addSprite("sky", 155, 165);
            backgroundSheet.addSprite("ground1", 445, 202);
            backgroundSheet.addSprite("ground2", 445, 220);
            backgroundSheet.addSprite("cloudLeft", 171.5, 113);
            backgroundSheet.addSprite("cloudMiddle", 190, 113);
            backgroundSheet.addSprite("cloudRight", 206.5, 113);
           spriteSheets.set("background", backgroundSheet);
        }   
    }
    loadMario(){
        const spriteSheets = this.spriteSheets;
        marioImage.onload = function() {
            const marioSheet = new SpriteSheet(marioImage, 60, 60);
            marioSheet.addSprite("idle", 209, 0);
            spriteSheets.set("mario", marioSheet);
        }
    }

    drawWorld(game){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (this.spriteSheets.has("background")){
            const backgroundSheet = this.spriteSheets.get("background");
            const tileWidth = 29;
            const tileHeight = 29;
            game.iterateTilemap((tile, x, y) =>
                backgroundSheet.draw(tile.name, this.ctx, x * tileWidth, y * tileHeight)
            );
        } 
    }
    drawMario(mario){
        if (this.spriteSheets.has("mario")) {
            this.spriteSheets.get("mario").draw("idle", this.ctx, mario.pos.x, mario.pos.y);
        }
    }
}
