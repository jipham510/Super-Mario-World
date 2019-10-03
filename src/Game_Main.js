import Controller from './Controller';

export default class GameMain {
    constructor(game, display) {
        this.game = game;
        this.display = display;
        this.pauseStatus = false;


        this.animate = this.animate.bind(this);
        this.run = this.run.bind(this);
        this.pause = this.pause.bind(this);
        this.togglePause = this.togglePause.bind(this);

    }
    start() {
        //starting player position
        this.game.mario.pos.set(145, 250);


        this.lastTime = 0;
        this.accumulatedTime = 0;
        
        this.display.loadWorld();
        this.display.loadMario();
        const controller = new Controller(this);
        controller.listenForInput();
//////TESTING///////////////////////////////
        mouseDebugger(this.display.canvas, this.game.mario, this.display.camera)
////////////////////////////////////////////




        //start fixed timestep of 1/60
        this.deltaTime = 1 / 60;
        this.run();
    }
    togglePause(){
        if (this.pauseStatus) {
            this.run();
        } else {
            this.pause();
        }
    }
    run(){
        this.pauseStatus = false;
        this.id = requestAnimationFrame(this.animate);
    }
    pause(){
        this.pauseStatus = true;
        cancelAnimationFrame(this.id);
    }
    animate(time) {
        this.accumulatedTime += (time - this.lastTime) / 1000;
        while (this.accumulatedTime > this.deltaTime) {
            this.game.update( this.deltaTime )
            this.display.drawWorld(this.game);
            this.display.drawMario(this.game.mario);
 
            this.accumulatedTime -= this.deltaTime;
        }

        this.lastTime = time;

        this.id = requestAnimationFrame(this.animate);
    };

}

function mouseDebugger(canvas, entity, camera) {
    let lastEvent;
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {

                entity.vel.set(0, 0);
                entity.pos.set(event.offsetX + camera.pos.x, event.offsetY + camera.pos.y);
            } else if (event.buttons === 2 && lastEvent && lastEvent.buttons === 2 && lastEvent.type === "mousemove") {

                camera.pos.x -= event.offsetX - lastEvent.offsetX;
            }
            lastEvent = event;
        });
    });
    canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
    })
}