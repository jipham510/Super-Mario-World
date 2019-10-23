import SpriteSheet from "./Sprite_Sheet.js";
import { backgroundImage, marioImage, backgroundFirstLayerImage, enemiesImage, thanksImage} from "../files";
import Camera from './Camera';
import backgroundSheet1Sprites from './sprites/background_sheet1_sprites';
import marioSheetSprites from './sprites/mario_sprites';
import enemiesSheetSprites from './sprites/enemy_sprites';

export default class Display {
    constructor(canvas, height, width) {
        canvas.height = height;
        canvas.width = width;
        this.camera = new Camera(height, width);
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.height = height;
        this.width = width;
        this.backgroundColor = "#0F5EF1";
        this.spriteSheets = new Map();
        this.loadedSheets = new Set();
        this.loadWorld = this.loadWorld.bind(this);
        
    }

    loadWorld() {
        const spriteSheets = this.spriteSheets;
        const loadedSheets = this.loadedSheets;
        thanksImage.onload = function() {
            const thanksSheet = new SpriteSheet(thanksImage, 600, 400);
            thanksSheet.addSprite( "thanks", 0, 0);
            spriteSheets.set("thanks", thanksSheet);
            loadedSheets.add("thanks");

        }
        backgroundImage.onload = function () {
            const backgroundSheet = new SpriteSheet(backgroundImage, 29, 29);
            backgroundSheet1Sprites.sprites.forEach( (sprite) => {
                backgroundSheet.addSprite( sprite.name, sprite.x, sprite.y );
            });
           spriteSheets.set("background", backgroundSheet);
           loadedSheets.add("background");
        }   

        backgroundFirstLayerImage.onload = function () {
            loadedSheets.add("backgroundLastLayer");
        }   

        marioImage.onload = function () {
            marioSheetSprites.marios.forEach((mario) => {
                const marioSheet = new SpriteSheet(marioImage, mario.width, mario.height);
                mario.sprites.forEach(sprite => {
                    if (sprite.type === "flip") {
                        marioSheet.addSpriteFlipped(sprite.name, sprite.x, sprite.y);
                    } else {
                        marioSheet.addSprite(sprite.name, sprite.x, sprite.y);
                    }
                });
                spriteSheets.set( mario.SpriteSheet , marioSheet);
            })
            loadedSheets.add("mario");
        }

        enemiesImage.onload = function () {
            enemiesSheetSprites.enemies.forEach((enemy) => {
                const enemySheet = new SpriteSheet(enemiesImage, enemy.width, enemy.height);
                enemy.sprites.forEach( (sprite) => {
                    if (sprite.type === "flip") {
                        enemySheet.addSpriteFlipped(sprite.name, sprite.x, sprite.y);

                    } else {
                        enemySheet.addSprite(sprite.name, sprite.x, sprite.y);
                    }
                });
                spriteSheets.set( enemy.SpriteSheet, enemySheet);
            })
            loadedSheets.add("enemies");
        }
    }



    drawWorld(game){
        if (this.finishedLoading()) {
            //draw first layer of background
            this.ctx.drawImage(backgroundFirstLayerImage, -this.camera.pos.x / 4.6, 0);
            const backgroundSheet = this.spriteSheets.get("background");

            // only draw the tiles that the camera is viewing
            const cameraPanel = game.cameraView(this.camera, backgroundSheet);
            this.ctx.drawImage(cameraPanel, -this.camera.pos.x % 29, 0);
            
            game.objects.forEach(object => object.draw(this.ctx, this.spriteSheets, this.camera) )
            
                        if(game.mario.pos.x > 5000)
                        this.spriteSheets.get("thanks").draw("thanks", this.ctx, 5900 - this.camera.pos.x, 0 - this.camera.pos.y)
        }
    }
    finishedLoading(){ 
        return this.loadedSheets.has("background") && this.loadedSheets.has("backgroundLastLayer") && this.loadedSheets.has("mario") && this.loadedSheets.has("enemies") && this.loadedSheets.has("thanks") 
    }

}

