import backgroundAssets from "./imgs/background_assets.png";
import mario from "./imgs/mario.png";
import enemies from "./imgs/enemies.png";
import backgroundFirstLayer from "./imgs/background.png";
import thanks from "./imgs/thank_you.png";
import titleScreen from "./imgs/super-mario-world.png";
import musicAudio from "./audio/music.mp3";

export const backgroundImage = new Image();
backgroundImage.src = backgroundAssets;

export const thanksImage = new Image();
thanksImage.src = thanks;

export const titleScreenImage = new Image();
titleScreenImage.src = titleScreen;

export const backgroundFirstLayerImage = new Image();
backgroundFirstLayerImage.src = backgroundFirstLayer;

export const music = new Audio(musicAudio);

export const marioImage = new Image();
marioImage.src = mario;

export const enemiesImage = new Image();
enemiesImage.src = enemies;
