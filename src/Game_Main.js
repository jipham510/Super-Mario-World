
export default class GameMain {
    constructor(game, display, controller) {
        this.game = game;
        this.display = display;
        this.controller = controller;

        this.animate = this.animate.bind(this);
    }
    start() {
        this.lastTime = 0;
        this.accumulatedTime = 0;
        
        this.display.loadWorld();
        this.display.loadMario();
        this.controller.listenForInput();
        
        //start fixed timestep of 1/60
        this.deltaTime = 1 / 60;
        requestAnimationFrame(this.animate);
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

        requestAnimationFrame(this.animate);
    };

}

