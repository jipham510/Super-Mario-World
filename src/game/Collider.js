export default class Collider {
    constructor(tileMap, game){
        this.tileMap = tileMap; 
        this.tileSize = 29;
        this.game = game;
        this.handleMatchingTiles = this.handleMatchingTiles;
    }

    checkCollision(movingObj, screenWidth, screenHeight) {
        if (movingObj.pos.x < 0) {
            movingObj.pos.x = 0;
            movingObj.vel.x = 0;
        } else if (movingObj.pos.x + movingObj.width > screenWidth) {
            movingObj.pos.x = screenWidth - movingObj.width;
            movingObj.vel.x = 0;
        }

        if (movingObj.pos.y < 0) {
            movingObj.pos.y = 0; 
            movingObj.vel.y = 0;
        } else if (movingObj.pos.y + movingObj.height > screenHeight) {
            movingObj.pos.y = screenHeight - movingObj.height; movingObj.vel.y = 0;
        }
    }

    checkX(movingObj) {
        if (movingObj.pos.x < 0) {
            movingObj.pos.x = 0;
            movingObj.vel.x = 0;
        }
        let x;
        if (movingObj.vel.x > 0) {
            x = movingObj.pos.x + movingObj.width; //mario right side
        } else if (movingObj.vel.x < 0) {
            x = movingObj.pos.x; //mario bottom side
        } else {
            return;
        }
        const matchingTiles = this.findMatchingTiles(x, x,
            movingObj.pos.y, movingObj.pos.y + movingObj.height);
        this.handleMatchingTilesX(movingObj, matchingTiles);

    }

    handleMatchingTilesX(movingObj, matchingTiles) {
        matchingTiles.forEach(match => {
            if (match.tile.type === "ground") {
                this.handleGroundCollisionX(movingObj, match);
            // } else if (match.tile.type === "floatingPlatform") {
                //no x detection needed for floating platform
            }

        });
    }

    handleGroundCollisionX(movingObj, match) {
        if (movingObj.vel.x > 0) {
            if (movingObj.pos.x + movingObj.width > match.left) {
                movingObj.pos.x = match.left - movingObj.width;
                movingObj.vel.x = 0;
            }
        }
        if (movingObj.vel.x < 0) {
            if (movingObj.pos.x < match.right) {
                movingObj.pos.x = match.right;
                movingObj.vel.x = 0;
            }
        }
    }


    checkY(movingObj){
        let y;
        // 3 cases of velocity 
        if ( movingObj.vel.y === 0 ) {
            return;
        } else if ( movingObj.vel.y > 0 ) {
            //object moving down, check bottom of object
            y = movingObj.pos.y + movingObj.height;
        } else if ( movingObj.vel.y < 0 ) {
            //object moving up, check top of object
            y = movingObj.pos.y;
        }
        const xStart = movingObj.pos.x;
        const xEnd = movingObj.pos.x + movingObj.width;

        const matchingTiles = this.findMatchingTiles(xStart, xEnd, y, y);
        this.handleMatchingTilesY(movingObj, matchingTiles);
    }

    handleMatchingTilesY(movingObj,matchingTiles) {
        matchingTiles.forEach(match => {
            if (match.tile.type === "ground") {
                this.handleGroundCollisionY(movingObj,match);
            } else if (match.tile.type === "floatingPlatform") {
                this.handleFloatingPlatformY(movingObj,match);
            }

        });
    }
    handleGroundCollisionY(movingObj, match) {
        if (movingObj.vel.y > 0) {
            if (movingObj.pos.y + movingObj.height > match.top) {
                movingObj.pos.y = match.top - movingObj.height;
                movingObj.vel.y = 0;
                movingObj.isGrounded = true;
            }
        }
        if (movingObj.vel.y < 0) {
            if (movingObj.pos.y < match.bottom) {
                movingObj.pos.y = match.bottom;
                movingObj.vel.y = 0;
            }
        }
    }
    handleFloatingPlatformY(movingObj, match) {
        if (movingObj.vel.y > 0) {
            if (movingObj.pos.y + movingObj.height > match.top) {
                movingObj.pos.y = match.top - movingObj.height;
                movingObj.vel.y = 0;
                movingObj.isGrounded = true;
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
        const tile = this.game.getTile(indexX, indexY);
        if (tile) { // top left corner, bottom right corner
            const left = indexX * this.tileSize;
            const right = left + this.tileSize;
            const top = indexY * this.tileSize;
            const bottom = top + this.tileSize;
            return { tile, left, right, top, bottom, }; 
        }
    }


}