export default class Collider {
    constructor(tileMap){
        this.tileMap = tileMap; 
    }

    checkCollision(movingObj, screenWidth, screenHeight) {
        if (movingObj.pos.x < 0) {
            movingObj.pos.x = 0;
            movingObj.vel.x = 0;
        } else if (movingObj.pos.x + movingObj.size.x > screenWidth) {
            movingObj.pos.x = screenWidth - movingObj.size.x;
            movingObj.vel.x = 0;
        }

        if (movingObj.pos.y < 0) {
            movingObj.pos.y = 0; movingObj.vel.y = 0;
        } else if (movingObj.pos.y + movingObj.size.y > screenHeight) {
            movingObj.pos.y = screenHeight - movingObj.size.y; movingObj.vel.y = 0;
        }
    }
    // checkY(movingObj){
    //     let y;
    //     if (CustomElementRegistry.vel.y >)
    // }
    // check x and y for tile collision types like "ground"
    // only check for tiles around object

}



// export function createCollisionLayer(level) {
//     const resolvedTiles = [];
//     const tileResolver = level.tileCollider.tiles;
//     // const tileSize = tileResolver.tileSize;

//     const getByIndexOriginal = tileResolver.getByIndex;
//     tileResolver.getByIndex = function getByIndexFake(x, y) {

//         resolvedTiles.push({ x, y });
//         return getByIndexOriginal.call(tileResolver, x, y);
//     }
// }