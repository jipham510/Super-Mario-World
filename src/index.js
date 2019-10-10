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
    const expand = document.querySelector(".expand");

    sound.addEventListener("click", ()=> {
        music.play();
        gameMain.start();
        noSound.parentNode.removeChild(noSound);
        sound.parentNode.removeChild(sound);
    }, { once: true })
    noSound.addEventListener("click", ()=> {        
        gameMain.start();
        sound.parentNode.removeChild(sound);
        noSound.parentNode.removeChild(noSound);
    }, { once: true })

    canvas.style.maxWidth = "700px";
    expand.addEventListener("click", (e)=> {        
        const canvas = document.getElementById("canvas"); 
        if (canvas.style.maxWidth === "700px"){
            canvas.style.maxWidth = "1200px";
            // e.target.innerHTML = "Shrink";
            e.target.classList.remove("fa-expand-arrows-alt");
            e.target.classList.add("fa-compress-arrows-alt");
        } else {
            canvas.style.maxWidth = "700px";
            e.target.classList.remove("fa-compress-arrows-alt");
            e.target.classList.add("fa-expand-arrows-alt");
            
        }
    })
    titleScreenImage.onload = function () {
        display.ctx.drawImage( titleScreenImage, 100, 10, 500, 200);
    }
});
