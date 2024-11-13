import Phaser from 'phaser';
import Player from '../gameobjects/player.js';
import Generator from '../gameobjects/generator.js'
export default class Game extends Phaser.Scene {
    constructor() {
        super({key: 'game'});
    }
    preload() {
        this.load.spritesheet('player', '../assets/img/Run.png', {frameWidth: 55, frameHeight: 69})
        this.load.spritesheet('coin', '../assets/img/coin.png', {frameWidth:32, frameHeight:32});
        this.load.image('bomb', '../assets/img/bomb.png');
        this.load.image('cloud', '../assets/img/cloud.png')
        this.load.audio('coin', '../assets/audio/coin.mp3')
        this.load.audio('dead', '../assets/audio/dead.mp3')
        this.load.audio('jump', '../assets/audio/jump.mp3')
        this.load.audio('theme', '../assets/audio/theme.mp3')
    }
    create() {
        this.audios = {
            jump: this.sound.add('jump'),
            coin: this.sound.add('coin'),
            dead: this.sound.add('dead')
        }
        this.player = new Player(this, 100, 16);
        // this.player.body.setOffset(10, 0)
        this.player.body.setSize(44, 62);
        this.player.body.setGravityY(800);
        this.obstacles = this.add.group();
        this.coins = this.add.group();
        this.anims.create({
            key: 'coinflip',
            frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 7}),
            frameRate: 8,
            repeat: true
        })
        this.generator = new Generator(this);
        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, () => true, this);
        this.playTheme();

        this.keys = {
            'up': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            'down': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        }
        this.anims.create({
            key: 'playerJump',
            frames: this.anims.generateFrameNumbers('player', {start: 2, end: 2}),
            frameRate: 12,
            // repeat: -1,
        })
    }
    update() {
        if (this.player.body.blocked.down) {
            this.player.anims.play('player', true);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keys.up) && this.player.body.blocked.down) {
            this.player.body.setVelocityY(-600);
            this.audios.jump.play();
            this.player.anims.play('playerJump')
        }
        if (this.keys.down.isDown && !this.player.body.blocked.down) {
            this.player.body.setVelocityY(600);
        }
    }
    hitObstacle(player, obstacle) {
        this.audios['dead'].play();
        this.theme.stop();
        this.scene.pause();
    }
    playTheme() {
        this.theme = this.sound.add('theme');
        this.theme.play({
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        })
    }
}