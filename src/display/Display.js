import SpriteSheet from "./Sprite_Sheet.js";
import { backgroundImage, marioImage} from "../files";
import Camera from './Camera';
import backgroundSheet1Sprites from './sprites/background_sheet1_sprites';
import marioSheetSprites from './sprites/mini_mario_sheet_sprites';

export default class Display {
    constructor(canvas, height, width) {
        canvas.height = height;
        canvas.width = width;
        this.camera = new Camera();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.height = height;
        this.width = width;
        this.backgroundColor = "#0F5EF1";
        this.spriteSheets = new Map();

        this.layers = [];
        this.loadWorld = this.loadWorld.bind(this);
        this.loadMario = this.loadMario.bind(this);
        
        // this.sprites = this.createSprites();
    }

    loadWorld() {
        const spriteSheets = this.spriteSheets;
        backgroundImage.onload = function () {
            const backgroundSheet = new SpriteSheet(backgroundImage, 29, 29);
            backgroundSheet1Sprites.sprites.forEach( (sprite) => {
                backgroundSheet.addSprite( sprite.name, sprite.x, sprite.y );
            });
           spriteSheets.set("background", backgroundSheet);
        }   
    }
    loadMario(){
        const spriteSheets = this.spriteSheets;
        marioImage.onload = function() {
            const marioSheet = new SpriteSheet(marioImage, 60, 60);
            marioSheetSprites.sprites.forEach( (sprite) => {
                marioSheet.addSprite( sprite.name, sprite.x, sprite.y );
            })
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
            
            // only draw the tiles that the camera is viewing
            game.cameraView( this.camera,(tile, x, y) =>
                backgroundSheet.draw(tile.name, this.ctx, x * tileWidth, y * tileHeight)
            );
        } 
    }
    drawMario(mario){
        if (this.spriteSheets.has("mario")) {
            this.spriteSheets.get("mario").draw( mario.frame, this.ctx, mario.pos.x, mario.pos.y);
        }
    }
    drawCameraRect(cameraToDraw) {
        this.ctx.strokeStyle = 'purple';
        this.ctx.beginPath();
        this.ctx.rect(
            cameraToDraw.pos.x - this.camera.pos.x,
            cameraToDraw.pos.y - this.camera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y
        );
        this.ctx.stroke();
    }
}

