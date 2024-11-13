class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, 400, y, 'player');
        this.scene = scene;
        this.setOrigin(0.5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.body.setSize(44, 62);
        this.setScale(1);
        this.jumping = false;
        this.body.mass=20;
        this.body.setDragY = 10;
        this.init();
    }
    init() {
        this.scene.anims.create({
            key: 'player',
            frames: this.scene.anims.generateFrameNumbers('player', {start: 0, end: 9}),
            frameRate: 12,
            repeat: -1,
        })
        this.anims.play('player', true);
    }

}
export default Player;