import Phaser from 'phaser';
export default class Generator {
    constructor(scene){
        this.scene = scene;
        this.scene.time.delayedCall(2000, ()=>this.init(), null, this);
    }
    init(){
        this.generateCloud();
        this.generateObstacle();
        this.generateCoin();
    }

    generateCloud(){
        new Cloud(this.scene);
        this.scene.time.delayedCall(
            Phaser.Math.Between(1000,2000),
            () => this.generateCloud(),
            null
        );
    }

    generateObstacle(){
        this.scene.obstacles.add(
            new Obstacle(this.scene)
        );
        this.scene.time.delayedCall(
            Phaser.Math.Between(1000, 1200),
            () => this.generateObstacle()
        );
    }

    generateCoin() {
        this.scene.coins.add(
            new Coin(this.scene)
        );
        this.scene.time.delayedCall(
            Phaser.Math.Between(500, 1500),
            () => this.generateCoin(),
        )

    }
}

class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        const X = 800;
        const Y = 300 - Phaser.Math.Between(32, 180);
        super(scene, X, Y, 'coin');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.init();
    }
    init() {
        this.scene.tweens.add({
            targets: this,
            x: {from: 1100, to: -100},
            duration: 2200,
            onComplete: () => {this.destroy},
        })
        this.anims.play('coinflip', true);
        this.scene.physics.add.overlap(this.scene.player, this, this.hitCoin, () => true, this);
    }
    hitCoin(player, coin) {
        this.scene.audios.coin.play();
        this.destroy();
    }
}

class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene){
        const y = 300 - Phaser.Math.Between(32, 180);
        super(scene, 800, y, 'bomb');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setScale(2.5);
        this.init();
    }
    init() {
        this.scene.tweens.add({
            targets: this, 
            x: {from: 1100, to:-100},
            duration: 2200,
            onComplete: () => {this.destroy;}
        })
    }
}

class Cloud extends Phaser.GameObjects.Image {
    constructor(scene, x, y){
        const finalY = Phaser.Math.Between(40, 80);
        super(scene, 1100, finalY, 'cloud');
        scene.add.existing(this);
        const alpha = Phaser.Math.FloatBetween(0.5, 1.5);
        this.setScale(alpha);
        this.init();
    }
    init() {
        this.scene.tweens.add({
            targets: this,
            x: {from: 1200, to: -100},
            duration: 3000/this.scale,
            onComplete: () => {
                this.destroy();
            }
        });
    }
}
