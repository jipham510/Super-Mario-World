import Behavior from './Behavior';
export default class SpawnEnemies extends Behavior {
    constructor(gameObjects, enemies) {
        super('spawnEnemies');
        this.enemies = enemies;
        this.gameObjects = gameObjects;
    }

    update(mario, deltaTime) {
        this.enemies.forEach(enemy => {
            if (mario.pos.x >= enemy.trigger) this.spawnEnemy(enemy);
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

// this.objects.add(dragon);
// this.objects.add(bullet);