export default function collision(movingObj,screenWidth, screenHeight){
    if (movingObj.pos.x < 0) { 
        movingObj.pos.x = 0; 
        movingObj.vel.x = 0; 
    } else if (movingObj.pos.x + movingObj.size.x > screenWidth){ 
        movingObj.pos.x = screenWidth - movingObj.size.x; 
        movingObj.vel.x = 0; 
    }
    
    if (movingObj.pos.y < 0) {
         movingObj.pos.y = 0; movingObj.vel.y = 0; 
    } else if (movingObj.pos.y + movingObj.size.y > screenHeight) {          
        movingObj.pos.y = screenHeight - movingObj.size.y; movingObj.vel.y = 0; 
    }
}