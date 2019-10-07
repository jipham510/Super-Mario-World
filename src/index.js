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
    titleScreenImage.onload = function () {
        display.ctx.drawImage( titleScreenImage, 100, 10, 500, 200);
    }
});
