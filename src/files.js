import backgroundAssets from "./imgs/background_assets.png";
import mario from "./imgs/mario.png";
import enemies from "./imgs/enemies.png";
import backgroundFirstLayer from "./imgs/background.png";
import pageBackground from "./imgs/pageBackground.png";
import thanks from "./imgs/thank_you.png";
import favicon from "./imgs/favicon.png";
import titleScreen from "./imgs/super-mario-world.png";


import musicAudio from "./audio/music.mp3";
import jumpAudio from "./audio/jump.mp3";
import bulletLaunchedAudio from "./audio/bulletLaunched.mp3";
import coinAudio from "./audio/coin.mp3";
import marioLoseAudio from "./audio/marioLose.mp3";
import stomp1Audio from "./audio/stomp1.mp3";
import stomp2Audio from "./audio/stomp2.mp3";
import itemEmergingAudio from "./audio/itemEmerging.mp3";
import mushroomMarioHitAudio from "./audio/mushroomMarioHit.mp3";
import powerUpAudio from "./audio/powerUp.mp3";

export const music = new Audio(musicAudio);
music.loop = true;

export const jumpSound = new Audio(jumpAudio);
export const bulletLaunchedSound = new Audio(bulletLaunchedAudio);
export const coinSound = new Audio(coinAudio);
export const marioLoseSound = new Audio(marioLoseAudio);
export const stomp1Sound = new Audio(stomp1Audio);
export const stomp2Sound = new Audio(stomp2Audio);
export const itemEmergingSound = new Audio(itemEmergingAudio);
export const mushroomMarioHitSound = new Audio(mushroomMarioHitAudio);
export const powerUpSound = new Audio(powerUpAudio);

export const backgroundImage = new Image();
backgroundImage.src = backgroundAssets;

export const thanksImage = new Image();
thanksImage.src = thanks;

export const titleScreenImage = new Image();
titleScreenImage.src = titleScreen;

export const backgroundFirstLayerImage = new Image();
backgroundFirstLayerImage.src = backgroundFirstLayer;




export const marioImage = new Image();
marioImage.src = mario;

export const enemiesImage = new Image();
enemiesImage.src = enemies;

