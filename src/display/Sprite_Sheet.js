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
        clip.getContext('2d')
            .drawImage( this.image, 
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

// const buffer = document.createElement('canvas');
// buffer.width = this.width;
// buffer.height = this.height;
// buffer.getContext('2d')
//     .drawImage(this.image,
//         x, y,                            // clip from (x,y)
//         this.width, this.height,         // width/height of clipped image
//         0, 0,                            //(x,y) to position image on canvas
//         this.width * 2, this.height * 2      // stretch or reduce width/height
//     );