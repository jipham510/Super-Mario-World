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
        this.game.mario.pos.set(0, 250);

        // //testing for maping out area
        // this.display.camera.pos.x = 4000;
        this.lastTime = 0;
        this.accumulatedTime = 0;
        // this.display.loadWorld();

        const controller = new Controller(this);
        controller.listenForInput();
        const touchControls = document.querySelector(".input-controls-wrapper");
        touchControls.style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);

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
        if (this.accumulatedTime > 1) this.accumulatedTime = 1;
        while (this.accumulatedTime > this.deltaTime) {
            this.game.update( this.deltaTime )
            this.display.drawWorld(this.game);
            
            this.accumulatedTime -= this.deltaTime;
        }

        this.lastTime = time;

        this.id = requestAnimationFrame(this.animate);
    };

}