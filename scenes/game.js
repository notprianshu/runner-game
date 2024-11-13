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
        this.load.bitmapFont('arcade', '../assets/fonts/arcade.png', '../assets/fonts/arcade.xml');
    }
    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        
        this.score = 0;
        this.scoreText = this.add.bitmapText(
            this.width/2,
            10, 
            'arcade',
            this.score,
            20
        )

        this.audios = {
            jump: this.sound.add('jump'),
            coin: this.sound.add('coin'),
            dead: this.sound.add('dead')
        }

        this.player = new Player(this, 100, 16);
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

        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, () => true, this); //when player hits a bomb
        this.physics.add.overlap(this.player, this.coins, this.hitCoins, () => true, this); //when player hits a coin

        this.playTheme();

        this.updateScore = this.time.addEvent({
            delay: 100,
            callback: () => {
                this.score += 1;
                this.scoreText.setText(this.score);
            },
            callbackScope: this,
            loop: true
        })

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

    hitCoins(player, coin) {
        this.score += 200;
        this.scoreText.setText(this.score);
        this.audios.coin.play();
        coin.destroy();
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