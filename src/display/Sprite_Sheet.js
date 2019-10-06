export default class SpriteSheet {
    constructor(image, tileWidth, tileHeight){
        this.image = image
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.sprites = new Map(); //store sprites in key/value object
    }
    addSprite(sprite, offsetX, offsetY){ 
    //clip from spritesheet and store into sprites;
        const clip = document.createElement('canvas');
        clip.width = this.tileWidth;
        clip.height = this.tileHeight;
        const ctx = clip.getContext('2d');
        ctx.drawImage( this.image, 
                        offsetX, offsetY, 
                        this.tileWidth, this.tileHeight, 
                        0, 0, 
                        this.tileWidth * 2, this.tileHeight * 2
                    );

        this.sprites.set(sprite, clip);
    }
    addSpriteFlipped(sprite, offsetX, offsetY){ 
    //add sprite flipped horizontally

        const clip = document.createElement('canvas');
        clip.width = this.tileWidth;
        clip.height = this.tileHeight;
        const ctx = clip.getContext('2d');
        ctx.translate(this.tileWidth, 0);
        ctx.scale(-1, 1);
        ctx.drawImage( this.image, 
                        offsetX, offsetY, 
                        this.tileWidth, this.tileHeight, 
                        0, 0, 
                        this.tileWidth * 2, this.tileHeight * 2
                    );

        this.sprites.set(sprite, clip);
    }

    draw( sprite, ctx, x, y) {
        const spriteImg = this.sprites.get(sprite);
        ctx.drawImage(spriteImg, x, y)
        // debugger
    }
}
