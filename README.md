# Super-Mario-World
Recreating a level of Super Mario World with Vanilla Javascript and HTML Canvas

[Live Link](https://jipham510.github.io/Super-Mario-World/dist/)

![](https://media.giphy.com/media/mCP59MqYjuxwGOVm88/giphy.gif)
## Technologies

* Javascript
* CSS and HTML5 Canvas

## Features
### OOP Design
Incorporated Object oriented programming principles to create fun and interactive world where objects have different interactions with Mario. Everything is class based, so all moving objects inherit from the base class of "GameObject". Any unique behaviors get implemented in the specific objects that they belong to. For example, the Koopa class is very unique since it is the only object that turns into a lethal shell when Mario stomps on it.
![](https://media.giphy.com/media/KG4JbabIH20tuclwfq/giphy.gif)

### AABB Tile Based Collision
Used axis-aligned bounding box to check if objects or tiles were colliding with each other. For a platformer, this can be tricky since there are many objects and tiles. My first approach was checking collisions for every tile and object in my game. As I added more to my level, I quicky realized how inefficient that was and optimized my code by only checking for the collisions around my objects. The code below checks the X axis of an object and finds all the matching tiles around it. Then it will handle the tiles based on whether or not it is an actual collision tile that the object needs to respond to.
``` 
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
```
### JSON Level Parser
Organized level tiles by putting them in an object file that maps where they belong in the level and how many there should be. This allows for easy level editing as I would just need to specifiy the x and y grid coordinates of where I want a tile to be in order to place it somewhere. For the first range array in the code below, 0 and 125 mean that I want to place a "groundTop" tile at the x-grid coordinate of 0 and have 125 of them in a row, letting me easily place all the ground tiles I want for the whole level. 12 and 1 correspond to the y axis, saying that I want to only place a single tile at the y-coordinate of 12.
```
export default {
    "backgrounds": [
        {
            "tile": "groundTop",
            "type": "ground",
            "ranges": [
                [
                   0, 125,
                   12, 1
                ],
                [
                   130, 18,
                   10, 1
                ], .....
            ]
                
         }
   ]
}
```
