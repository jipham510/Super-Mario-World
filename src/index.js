import Game from './game/Game.js';
import Display from './display/Display.js';
import GameMain from './Game_Main.js';

document.addEventListener("DOMContentLoaded", function () {
    const height = 400;
    const width = 700;

    const canvas = document.getElementById("canvas");
    const game = new Game(height, width); 
    const display = new Display(canvas, height, width);
    const gameMain = new GameMain(game,display);
    gameMain.start();
});
