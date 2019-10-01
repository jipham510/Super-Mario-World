export default class Controller {
    constructor(gameMain){
        this.gameMain = gameMain;
        this.keyStates = new Map();
        this.keyMap = new Map();  //response for a key code
        this.mapLeftMove = this.mapLeftMove.bind(this)
        this.mapRightMove = this.mapRightMove.bind(this)
        this.mapJump = this.mapJump.bind(this)
        this.mapInputResponses();
    }
    mapInputResponses(){
        this.mapJump("Space"); //coresponds to e.code
        this.mapJump("KeyW"); 
        
        this.mapRightMove("ArrowRight"); 
        this.mapRightMove("KeyD"); 

        this.mapLeftMove("ArrowLeft");
        this.mapLeftMove("KeyA");
        const togglePause = this.gameMain.togglePause;
        this.map("KeyP", keyState => { 
            if( keyState) {
                // console.log("key P pressed")
                togglePause();
            }
        });

    }
    mapRightMove(input) {
        const mario = this.gameMain.game.mario
        this.map(input, keyState => {
            mario.walk.rightDirection = keyState;
        })
    }
    mapLeftMove(input) {
        const mario = this.gameMain.game.mario
        this.map(input, keyState => {
            mario.walk.leftDirection = -keyState;
        })
    }
    mapJump(input){
        const mario = this.gameMain.game.mario
        this.map(input, keyState => {
            if (keyState) {
                mario.jump.start();
            } else {
                mario.jump.cancel();
            }
        })
    }
    map(code, callback) {
        this.keyMap.set(code, callback);
    }
    handleEvent(e) { // only need to know code and type of input
        e.preventDefault();
        if (!this.keyMap.has(e.code)) return;
        const keyState = e.type === 'keydown' ? 1 : 0;

        if (this.keyStates.get(e.code) === keyState) return;
        this.keyStates.set(e.code, keyState);
        this.keyMap.get(e.code)(keyState);
    }
    listenForInput() {
        window.addEventListener("keydown", e => {
            this.handleEvent(e);
        });
        window.addEventListener("keyup", e => {
            this.handleEvent(e);
        });
    }
}

