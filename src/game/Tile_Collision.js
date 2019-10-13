export default class TileCollision {
    constructor(tileMap){
        this.tileMap = tileMap; 
        this.tileSize = 29;
        this.handleMatchingTiles = this.handleMatchingTiles;
    }

    checkX(gameObj) {
        if(gameObj.status === "ignoreCollisions") return;
        
        if (gameObj.pos.x < 0) {
            gameObj.pos.x = 0;
            gameObj.vel.x = 0;
        }
        let x;
        if (gameObj.vel.x > 0) {
            x = gameObj.getRight(); //mario right side
        } else if (gameObj.vel.x < 0) {
            x = gameObj.pos.x; //mario bottom side
        } else {
            return;
        }
        const matchingTiles = this.findMatchingTiles(x, x,
            gameObj.pos.y, gameObj.getBottom());
        this.handleMatchingTilesX(gameObj, matchingTiles);
    }

    handleMatchingTilesX(gameObj, matchingTiles) {
        matchingTiles.forEach(match => {
            if (match.tile.type === "ground" || match.tile.type === "box") {
                this.handleGroundCollisionX(gameObj, match);
            // } else if (match.tile.type === "floatingPlatform") {
                //no x detection needed for floating platform
            }

        });
    }

    handleGroundCollisionX(gameObj, match) {
        if (gameObj.vel.x > 0) {
            if (gameObj.getRight() > match.left && gameObj.getLastRight() <= match.left ) {
                gameObj.pos.x = match.left - gameObj.width;
                gameObj.vel.x = (gameObj.koopa === "koopaShell") ? -gameObj.vel.x : 0;
            }
        }
        if (gameObj.vel.x < 0) {
            if (gameObj.getLeft() < match.right && gameObj.getLastLeft() >= match.right ) {
                gameObj.pos.x = match.right;
                gameObj.vel.x = (gameObj.koopa === "koopaShell") ? -gameObj.vel.x : 0;
            }
        }
    }

    checkY(gameObj){
        let y;
        // 3 cases of velocity 
        if (gameObj.vel.y === 0 || gameObj.status === "ignoreCollisions") {
            return;
        } else if ( gameObj.vel.y > 0 ) {
            //object moving down, check bottom of object
            y = gameObj.getBottom();
        } else if ( gameObj.vel.y < 0 ) {
            //object moving up, check top of object
            y = gameObj.pos.y;
        }
        const xStart = gameObj.pos.x;
        const xEnd = gameObj.getRight();

        const matchingTiles = this.findMatchingTiles(xStart, xEnd, y, y);
        this.handleMatchingTilesY(gameObj, matchingTiles);
    }

    handleMatchingTilesY(gameObj,matchingTiles) {
        matchingTiles.forEach(match => {
            if (match.tile.type === "ground") {
                this.handleGroundCollisionY(gameObj,match);
            } else if (match.tile.type === "floatingPlatform" || match.tile.type === "box") {
                this.handleFloatingPlatformY(gameObj,match);
            }

        });
    }
    handleGroundCollisionY(gameObj, match) {
        if (gameObj.vel.y > 0) {
            if (gameObj.getBottom() > match.top) {
                gameObj.pos.y = match.top - gameObj.height;
                gameObj.vel.y = 0;
                gameObj.isGrounded = true;
            }
        }
        if (gameObj.vel.y < 0) {
            if (gameObj.pos.y < match.bottom) {
                gameObj.pos.y = match.bottom;
                gameObj.vel.y = 0;
                if (gameObj.jump) gameObj.jump.cancel();
            }
        }
    }
    handleFloatingPlatformY(gameObj, match) {
        if (gameObj.vel.y > 0) {
            if (gameObj.getBottom() > match.top && gameObj.getLastBottom() <= match.top ) {
                gameObj.pos.y = match.top - gameObj.height;
                gameObj.vel.y = 0;
                gameObj.isGrounded = true;
            }
        }
    }


    findMatchingTiles(left,right,top,bottom) {
        const matchingTiles = [];
        this.toIndexRange(left, right).forEach(indexX => {
            this.toIndexRange(top, bottom).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) {
                    matchingTiles.push(match);
                }
            });
        });
        return matchingTiles;        
    }
    toIndexRange(pos1, pos2) {
        const posMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(Math.floor(pos / this.tileSize));
            pos += this.tileSize;
        } while (pos < posMax);
        return range;
    }
    getByIndex(indexX, indexY) {
        let tile;
        if (this.tileMap[indexX]) tile = this.tileMap[indexX][indexY];
        if (tile) { // top left corner, bottom right corner
            const left = indexX * this.tileSize;
            const right = left + this.tileSize;
            const top = indexY * this.tileSize;
            const bottom = top + this.tileSize;
            return { tile, left, right, top, bottom, }; 
        }
    }

}