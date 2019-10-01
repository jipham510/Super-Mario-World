import Controller from './Controller';
export default class GameMain {
    constructor(game, display, controller) {
        this.game = game;
        this.display = display;
        this.pauseStatus = false;


        this.animate = this.animate.bind(this);
        this.run = this.run.bind(this);
        this.pause = this.pause.bind(this);
        this.togglePause = this.togglePause.bind(this);

    }
    start() {
        this.lastTime = 0;
        this.accumulatedTime = 0;
        
        this.display.loadWorld();
        this.display.loadMario();

        const controller = new Controller(this);
        controller.listenForInput();
        
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
        // console.log("animating")
        this.accumulatedTime += (time - this.lastTime) / 1000;
        while (this.accumulatedTime > this.deltaTime) {
            this.game.update( this.deltaTime )
            // console.log(this.game.mario.pos.y);
            this.display.drawWorld(this.game);
            this.display.drawMario(this.game.mario);
            this.accumulatedTime -= this.deltaTime;
        }

        this.lastTime = time;

        this.id = requestAnimationFrame(this.animate);
    };

}

