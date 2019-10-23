import Game from './game/Game.js';
import Display from './display/Display.js';
import GameMain from './Game_Main.js';
import { titleScreenImage, music} from './files';

document.addEventListener("DOMContentLoaded", function () {
    const height = 400;
    const width = 700;

    const canvas = document.getElementById("canvas");
    const game = new Game(height, width); 
    const display = new Display(canvas, height, width);
    display.loadWorld();
    const gameMain = new GameMain(game,display);
    const sound = document.querySelector(".sound");
    const noSound = document.querySelector(".noSound");
    const soundControls = document.querySelector(".sound-controls");
    const expand = document.querySelector(".expand");
    const touchControls = document.querySelector(".input-controls-wrapper")

    
    sound.addEventListener("click", ()=> {
        music.play();
        gameMain.start();
        soundControls.parentNode.removeChild(soundControls);
    }, { once: true })
    noSound.addEventListener("click", ()=> {        
        gameMain.start();
        soundControls.parentNode.removeChild(soundControls);
    }, { once: true })

    canvas.style.maxWidth = "700px";
    expand.addEventListener("click", (e)=> {        
        const canvas = document.getElementById("canvas"); 
        const instructions = document.querySelector(".instructions"); 
        const controllerPadding = document.querySelector(".controller-padding"); 
        if (canvas.style.maxWidth === "700px"){
            canvas.style.maxWidth = "100vw";
            // e.target.innerHTML = "Shrink";
            e.target.classList.remove("fa-expand-arrows-alt");
            e.target.classList.add("fa-compress-arrows-alt");
            instructions.classList.add("close");

            if (window.innerWidth > 1024 ) { 
                controllerPadding.classList.add("close");
            } else {
                canvas.classList.add("canvas-max-height")
            }
            window.scrollTo(0, 0);
            // touchControls.classList.add("attach-controls-to-bottom");
        } else {
            canvas.style.maxWidth = "700px";
            e.target.classList.remove("fa-compress-arrows-alt");
            instructions.classList.add("remove");
            e.target.classList.add("fa-expand-arrows-alt");
            instructions.classList.remove("close");

            if (window.innerWidth > 1024) {
                controllerPadding.classList.remove("close");
            } else {
                canvas.classList.remove("canvas-max-height")
            }
            window.scrollTo(0, document.body.scrollHeight);
            
            // touchControls.classList.remove("attach-controls-to-bottom");
        }
    })
    titleScreenImage.onload = function () {
        display.ctx.drawImage( titleScreenImage, 100, 10, 500, 200);
    }
});
