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
        this.mapJump("ArrowUp"); 
        this.mapJump("touch-input-jump"); 
        
        this.mapRightMove("ArrowRight"); 
        this.mapRightMove("KeyD"); 
        this.mapRightMove("touch-input-right"); 

        this.mapLeftMove("ArrowLeft");
        this.mapLeftMove("KeyA");
        this.mapLeftMove("touch-input-left");

        this.mapCrouch("ArrowDown");
        this.mapCrouch("KeyS");
        this.mapCrouch("touch-input-crouch");

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
    mapCrouch(input) {
        const mario = this.gameMain.game.mario
        this.map(input, keyState => {
            if ( keyState === 1) {
                mario.crouch.start(mario);
            } else {
                mario.crouch.cancel(mario);
            }
        })
    }
    mapJump(input){
        const mario = this.gameMain.game.mario
        this.map(input, keyState => {
            if (keyState && mario.vel.y <= 0) {
                if(mario.isGrounded) mario.jump.start();
                mario.isGrounded = false;
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
    handleTouchEvent(e) { 
        e.preventDefault();
        
        if (!this.keyMap.has(e.currentTarget.id)) return;
        let keyState 
        if(e.type === "touchstart") {
            keyState = 1;
            e.currentTarget.classList.add("touch-btn-active");
        } else {
            keyState = 0;
            e.currentTarget.classList.remove("touch-btn-active");
        }

        if (this.keyStates.get(e.currentTarget.id) === keyState) return;
        this.keyStates.set(e.currentTarget.id, keyState);
        this.keyMap.get(e.currentTarget.id)(keyState);
    }
    listenForInput() {
        window.addEventListener("keydown", e => {
            this.handleEvent(e);
        });
        window.addEventListener("keyup", e => {
            this.handleEvent(e);
        });
        const touchInputLeft = document.getElementById("touch-input-left");
        const touchInputRight = document.getElementById("touch-input-right");
        const touchInputJump = document.getElementById("touch-input-jump");
        const touchInputCrouch = document.getElementById("touch-input-crouch");
        
        

        touchInputLeft.ontouchstart = e => {
            this.handleTouchEvent(e);
        }
        touchInputLeft.ontouchend = e => {
            this.handleTouchEvent(e);
        }

        touchInputRight.ontouchstart = e => {
            this.handleTouchEvent(e);
        }
        touchInputRight.ontouchend = e => {
            this.handleTouchEvent(e);
        }

        touchInputJump.ontouchstart = e => {
            this.handleTouchEvent(e);
        }
        touchInputJump.ontouchend = e => {
            this.handleTouchEvent(e);
        }

        // touchInputCrouch.ontouchstart = e => {
        //     this.handleTouchEvent(e);
        // }
        // touchInputCrouch.ontouchend = e => {
        //     this.handleTouchEvent(e);
        // }

    }
}

