import Behavior from './Behavior';
import { bulletLaunchedSound, music } from '../../files';

export default class SpawnEnemies extends Behavior {
    constructor(gameObjects, enemies) {
        super('spawnEnemies');
        this.enemies = enemies;
        this.gameObjects = gameObjects;
    }

    update(mario, deltaTime) {
        this.enemies.forEach(enemy => {
            if (mario.pos.x >= enemy.trigger) {
                this.spawnEnemy(enemy);
                if (enemy.isBullet && !music.paused) bulletLaunchedSound.play();
            }
        });
    }
    addEnemy(enemy){
        this.enemyPositions.add(enemy)
    }
    spawnEnemy(enemy){
        this.gameObjects.add(enemy);
        this.enemies.delete(enemy);
    }

}
